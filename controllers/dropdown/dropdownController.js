const Company = require("../../model/base/Company");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Units = require("../../model/base/Unit");
const Product = require("../../model/base/Product");
const Category = require("../../model/base/Category");

// company type
const COMPANY_TYPE = {
  LEGAL_ENTITY: 1,
  INDIVIDUAL: 2,
};

// payment status type
const PAYMENT_STATUS_TYPE = {
  PAID: 1,
  AWAITING_PAYMENT: 2,
};

const getCompanies = async (req, res) => {
  const message = require("../../language/message")(req);

  const companies = await Company.find().exec();

  const companiesData = companies.map((item) => {
    return {
      id: item._id,
      name: item.name,
      type: item.type,
      typeTitle: item.typeTitle,
    };
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

const getCategories = async (req, res) => {
  const message = require("../../language/message")(req);

  const categories = await Category.find().exec();

  const categoriesData = categories.map((item) => {
    return { id: item._id, name: item.name };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      categories: categoriesData,
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
      brandId: item.brandId,
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
    return { id: item._id, name: item.name, type: item.type };
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

const getCompanyType = async (req, res) => {
  const message = require("../../language/message")(req);

  const companyTypeData = [
    {
      id: COMPANY_TYPE.LEGAL_ENTITY,
      name: message.response.legalEntity,
    },
    {
      id: COMPANY_TYPE.INDIVIDUAL,
      name: message.response.individual,
    },
  ];

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      companyType: companyTypeData,
    },
  });
};

const getpaymentStatus = async (req, res) => {
  const message = require("../../language/message")(req);

  const paymentStatusData = [
    {
      id: PAYMENT_STATUS_TYPE.PAID,
      name: message.response.paid,
    },
    {
      id: PAYMENT_STATUS_TYPE.AWAITING_PAYMENT,
      name: message.response.awatingPayment,
    },
  ];

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      paymentStatus: paymentStatusData,
    },
  });
};

module.exports = {
  getCompanies,
  getBrands,
  getPackagings,
  getUnits,
  getProducts,
  getCategories,
  getCompanyType,
  getpaymentStatus,
};
