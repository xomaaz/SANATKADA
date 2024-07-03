import { asyncError } from "../middleware/error.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllProducts = asyncError(async (req, res, next) => {
  // Search & Category query (to be done later)
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
});

export const getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});
