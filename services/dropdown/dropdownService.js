const dropdownRepository = require("../../repositories/dropdown/dropdownRepository");

const COMPANY_TYPE = {
  LEGAL_ENTITY: 1,
  INDIVIDUAL: 2,
};

const PAYMENT_STATUS_TYPE = {
  PAID: 1,
  AWAITING_PAYMENT: 2,
};

const getCompanies = async () => {
  const companies = await dropdownRepository.findAllCompanies();
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
  const brands = await dropdownRepository.findAllBrands();
  return brands.map((item) => {
    return { id: item._id, name: item.name };
  });
};

const getCategories = async () => {
  const categories = await dropdownRepository.findAllCategories();
  return categories.map((item) => {
    return { id: item._id, name: item.name };
  });
};

const getProducts = async () => {
  const products = await dropdownRepository.findAllProducts();
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
  const packaging = await dropdownRepository.findAllPackagings();
  return packaging.map((item) => {
    return { id: item._id, name: item.name, type: item.type };
  });
};

const getUnits = async () => {
  const units = await dropdownRepository.findAllUnits();
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
