const Company = require("../../model/base/Company");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Units = require("../../model/base/Unit");
const Product = require("../../model/base/Product");
const Category = require("../../model/base/Category");

const findAllCompanies = async () => {
  return Company.find().exec();
};

const findAllBrands = async () => {
  return Brand.find().exec();
};

const findAllCategories = async () => {
  return Category.find().exec();
};

const findAllProducts = async () => {
  return Product.find().exec();
};

const findAllPackagings = async () => {
  return Packaging.find().exec();
};

const findAllUnits = async () => {
  return Units.find().exec();
};

module.exports = {
  findAllCompanies,
  findAllBrands,
  findAllCategories,
  findAllProducts,
  findAllPackagings,
  findAllUnits,
};
