const Company = require("../../model/base/Company");

const findAllCompanies = async () => {
  return Company.find();
};

const findCompanyById = async (id) => {
  return Company.findById(id).exec();
};

const createCompany = async (companyData) => {
  const company = new Company();
  company.type = companyData.type;
  company.typeTitle = companyData.type === 1 ? "legal entity" : "individual";
  company.name = companyData.name;
  company.address = companyData.address;
  company.phone = companyData.phone;
  return company.save();
};

const saveCompany = async (company) => {
  return company.save();
};

const deleteCompanyByDoc = async (company) => {
  return company.deleteOne();
};

module.exports = {
  findAllCompanies,
  findCompanyById,
  createCompany,
  saveCompany,
  deleteCompanyByDoc,
};
