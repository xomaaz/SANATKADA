import { asyncError } from "../middleware/error.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { stripe } from "../server.js";

export const processPayment = asyncError(async(req, res, next) => {
  const { totalAmount } = req.body;
  const { client_secret } = await stripe.paymentIntents.create({
    amount: Number(totalAmount*100), // representing total amount in cents (the smallest unit of USD currency), instead of dollars
    currency: "usd",
  });

  res.status(200).json({
    success: true,
    client_secret,
  });
});

export const createOrder = asyncError(async(req, res, next) => {
  const { shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount } = req.body;
  
  await Order.create({
    user: req.user._id,
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  });

  for (let i = 0; i < orderItems.length; i++) {
    const product = await Product.findById(orderItems[i].product);
    product.stock -= orderItems[i].quantity;
    await product.save();
  };

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
  });

})

export const getMyOrders = asyncError(async(req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getAdminOrders = asyncError(async(req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async(req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

export const processOrder = asyncError(async(req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order Not Found", 400));

  if (order.orderStatus == "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus == "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  }
  else return next(new ErrorHandler("Order Already Delivered", 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
  });
});
