const Company = require("../../model/base/Company");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Units = require("../../model/base/Unit");
const Product = require("../../model/base/Product");

const getCompanies = async (req, res) => {
  const message = require("../../language/message")(req);

  const companies = await Company.find().exec();

  const companiesData = companies.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      companies: companiesData,
    },
  });
};

const getBrands = async (req, res) => {
  const message = require("../../language/message")(req);

  const brands = await Brand.find().exec();

  const brandsData = brands.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      brands: brandsData,
    },
  });
};

const getProducts = async (req, res) => {
  const message = require("../../language/message")(req);

  const products = await Product.find().exec();

  const productsData = products.map((item) => {
    return {
      id: item._id,
      name: `${item.name} - ${item.packagingName} ${item.amount} ${item.unitName}ی`,
      packagingId: item.packagingId,
      unitId: item.unitId,
      unitAmount: item.amount,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      products: productsData,
    },
  });
};

const getPackagings = async (req, res) => {
  const message = require("../../language/message")(req);

  const packaging = await Packaging.find().exec();

  const packagingsData = packaging.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      packagings: packagingsData,
    },
  });
};

const getUnits = async (req, res) => {
  const message = require("../../language/message")(req);

  const units = await Units.find().exec();

  const unitsData = units.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
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
