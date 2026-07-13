const Product = require("../../model/base/Product");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");
const Brand = require("../../model/base/Brand");

const findAllProducts = async () => {
  return Product.find().exec();
};

const findProductById = async (id) => {
  return Product.findById(id);
};

const findProductByIdExec = async (id) => {
  return Product.findById(id).exec();
};

const createProduct = async (productData) => {
  const product = new Product();
  product.name = productData.name;
  product.amount = productData.amount;
  product.packagingId = productData.packagingId;
  product.packagingName = productData.packagingName;
  product.packagingType = productData.packagingType;
  product.unitId = productData.unitId;
  product.unitName = productData.unitName;
  product.brandId = productData.brandId;
  product.brandName = productData.brandName;
  return product.save();
};

const saveProduct = async (product) => {
  return product.save();
};

const deleteProductByDoc = async (product) => {
  return product.deleteOne();
};

const findPackagingById = async (id) => {
  return Packaging.findById(id);
};

const findUnitById = async (id) => {
  return Unit.findById(id);
};

const findBrandById = async (id) => {
  return Brand.findById(id);
};

module.exports = {
  findAllProducts,
  findProductById,
  findProductByIdExec,
  createProduct,
  saveProduct,
  deleteProductByDoc,
  findPackagingById,
  findUnitById,
  findBrandById,
};
