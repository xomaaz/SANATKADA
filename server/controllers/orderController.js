import { asyncError } from "../middleware/error.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";

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
