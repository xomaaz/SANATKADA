import { asyncError } from "../middleware/error.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
import { Category } from "../models/categoryModel.js";

export const getAllProducts = asyncError(async (req, res, next) => {
  const { keyword, category } = req.query;

  const products = await Product.find({
    name: { // to search for product
      $regex: keyword ? keyword : "", // regex allows to search for patterns
      $options: "i",
    },
    category: category ? category : undefined, // to search for category
  });

  res.status(200).json({
    success: true,
    products,
  });
});

export const getAdminProducts = asyncError(async (req, res, next) => {
  const products = await Product.find({}).populate("category");

  const outOfStock = products.filter((i) => i.stock == 0); // gives an array of items that are out of stock

  res.status(200).json({
    success: true,
    products,
    outOfStock: outOfStock.length,
    inStock: products.length - outOfStock.length,
  });
});

export const getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

export const createProduct = asyncError(async (req, res, next) => {
  const { name, description, category, price, stock } = req.body;

  if(!req.file) return next(new ErrorHandler("Please add image", 400));

  const file = getDataUri(req.file); // get the buffer data from image
  const myCloud = await cloudinary.v2.uploader.upload(file.content); // upload new avatar image
  const image = { // store avatar details as an object in database
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Product.create({
    name,
    description,
    category,
    price,
    stock,
    images: [image],
  });

  res.status(200).json({
    success: true,
    message: "Product Created Successfully",
  });
});

export const updateProduct = asyncError(async (req, res, next) => {
  const { name, description, category, price, stock } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if(name) product.name = name;
  if(description) product.description = description;
  if(category) product.category = category;
  if(price) product.price = price;
  if(stock) product.stock = stock;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const addProductImage = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if(!req.file) return next(new ErrorHandler("Please add image", 400));

  const file = getDataUri(req.file); // get the buffer data from image
  const myCloud = await cloudinary.v2.uploader.upload(file.content); // upload new avatar image
  const image = { // store avatar details as an object in database
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  product.images.push(image);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Image Added Successfully",
  });
});

export const deleteProductImage = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const id = req.query.id;

  if (!id) return next(new ErrorHandler("Please enter image id", 400));

  let isExist = -1;

  product.images.forEach((item, index) => {
    if (item._id.toString() === id.toString()) isExist = index;
  });

  console.log(isExist);

  res.status(200).json({
    success: true,
    message: "Image Deleted Successfully",
  });
});

export const addCategory = asyncError(async (req, res, next) => {
  await Category.create(req.body);

  res.status(201).json({
    success: true,
    message: "Category Added Successfully",
  });
});

export const getAllCategories = asyncError(async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    categories,
  });
});

export const deleteCategory = asyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category Not Found", 404));
  const products = await Product.find({ category: category._id });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    product.category = undefined;
    await product.save();
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category Deleted Successfully",
  });
});
