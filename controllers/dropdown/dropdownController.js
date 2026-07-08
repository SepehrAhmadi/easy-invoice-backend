const dropdownService = require("../../services/dropdown/dropdownService");

const getCompanies = async (req, res) => {
  const message = require("../../language/message")(req);

  const companiesData = await dropdownService.getCompanies();

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

  const brandsData = await dropdownService.getBrands();

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

  const categoriesData = await dropdownService.getCategories();

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

  const productsData = await dropdownService.getProducts();

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

  const packagingsData = await dropdownService.getPackagings();

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

  const unitsData = await dropdownService.getUnits();

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

  const companyTypeData = dropdownService.getCompanyType({
    companyTypeNames: {
      legalEntity: message.response.legalEntity,
      individual: message.response.individual,
    },
  });

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

  const paymentStatusData = dropdownService.getpaymentStatus({
    paymentStatusNames: {
      paid: message.response.paid,
      awatingPayment: message.response.awatingPayment,
    },
  });

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
