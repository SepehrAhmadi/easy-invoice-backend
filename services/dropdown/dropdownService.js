const Company = require("../../model/base/Company");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Units = require("../../model/base/Unit");
const Product = require("../../model/base/Product");
const Category = require("../../model/base/Category");

const COMPANY_TYPE = {
  LEGAL_ENTITY: 1,
  INDIVIDUAL: 2,
};

const PAYMENT_STATUS_TYPE = {
  PAID: 1,
  AWAITING_PAYMENT: 2,
};

const getCompanies = async () => {
  const companies = await Company.find().exec();
  return companies.map((item) => {
    return {
      id: item._id,
      name: item.name,
      type: item.type,
      typeTitle: item.typeTitle,
    };
  });
};

const getBrands = async () => {
  const brands = await Brand.find().exec();
  return brands.map((item) => {
    return { id: item._id, name: item.name };
  });
};

const getCategories = async () => {
  const categories = await Category.find().exec();
  return categories.map((item) => {
    return { id: item._id, name: item.name };
  });
};

const getProducts = async () => {
  const products = await Product.find().exec();
  return products.map((item) => {
    return {
      id: item._id,
      name: `${item.name} - ${item.packagingName} ${item.amount} ${item.unitName}ی`,
      packagingId: item.packagingId,
      unitId: item.unitId,
      unitAmount: item.amount,
      brandId: item.brandId,
    };
  });
};

const getPackagings = async () => {
  const packaging = await Packaging.find().exec();
  return packaging.map((item) => {
    return { id: item._id, name: item.name, type: item.type };
  });
};

const getUnits = async () => {
  const units = await Units.find().exec();
  return units.map((item) => {
    return { id: item._id, name: item.name };
  });
};

const getCompanyType = ({ companyTypeNames }) => {
  return [
    { id: COMPANY_TYPE.LEGAL_ENTITY, name: companyTypeNames.legalEntity },
    { id: COMPANY_TYPE.INDIVIDUAL, name: companyTypeNames.individual },
  ];
};

const getpaymentStatus = ({ paymentStatusNames }) => {
  return [
    { id: PAYMENT_STATUS_TYPE.PAID, name: paymentStatusNames.paid },
    {
      id: PAYMENT_STATUS_TYPE.AWAITING_PAYMENT,
      name: paymentStatusNames.awatingPayment,
    },
  ];
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
