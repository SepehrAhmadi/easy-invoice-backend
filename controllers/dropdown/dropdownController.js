const Company = require("../../model/base/Company");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Units = require("../../model/base/Unit");
const Product = require("../../model/base/Product");

const getCompanies = async (req, res) => {
  const companies = await Company.find().exec();

  const companiesData = companies.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Companies were successfully received",
    data: {
      companies: companiesData,
    },
  });
};

const getBrands = async (req, res) => {
  const brands = await Brand.find().exec();

  const brandsData = brands.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Companies were successfully received",
    data: {
      brands: brandsData,
    },
  });
};

const getProducts = async (req, res) => {
  const products = await Product.find().exec();

  const productsData = products.map((item) => {
    return {
      id: item._id,
      name: `${item.name} - ${item.packagingName} ${item.amount} ${item.unitName}ی`,
      packagingId : item.packagingId,
      unitId : item.unitId,
      unitAmount : item.amount,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Product were successfully received",
    data: {
      products: productsData,
    },
  });
};

const getPackagings = async (req, res) => {
  const packaging = await Packaging.find().exec();

  const packagingsData = packaging.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Packagings were successfully received",
    data: {
      packagings: packagingsData,
    },
  });
};

const getUnits = async (req, res) => {
  const units = await Units.find().exec();

  const unitsData = units.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Packagings were successfully received",
    data: {
      units: unitsData,
    },
  });
};

module.exports = {
  getCompanies,
  getBrands,
  getPackagings,
  getUnits,
  getProducts,
};
