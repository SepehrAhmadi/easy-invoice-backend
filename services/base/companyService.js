const companyRepository = require("../../repositories/base/companyRepository");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

const COMPANY_TYPE = {
  LEGAL_ENTITY: 1,
  INDIVIDUAL: 2,
};

const NOTIFICATION_TYPE = {
  CREATE: "company_created",
  UPDATE: "company_updated",
  DELETE: "company_deleted",
};

const getAllCompanies = async () => {
  const companies = await companyRepository.findAllCompanies();
  if (!companies) {
    return { companies: [] };
  }
  const companiesData = companies.map((item) => {
    return {
      id: item.id,
      type: item.type,
      typeTitle:
        item.type === COMPANY_TYPE.LEGAL_ENTITY ? "legal entity" : "individual",
      name: item.name,
      address: item.address,
      phone: item.phone,
    };
  });
  return { companies: companiesData };
};

const getCompany = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const company = await companyRepository.findCompanyById(params.id);
  if (!company) throw new AppError(400, "notFound");
  return {
    id: company.id,
    type: company.type,
    typeTitle:
      company.type === COMPANY_TYPE.LEGAL_ENTITY
        ? "legal entity"
        : "individual",
    name: company.name,
    address: company.address,
    phone: company.phone,
  };
};

const addCompany = async ({ body, userId }) => {
  if (
    ![1, 2].includes(body.type) &&
    !body.name &&
    !body.address &&
    !body.phone
  ) {
    throw new AppError(400, "requireFields");
  }

  const company = await companyRepository.createCompany({
    type: body.type,
    name: body.name,
    address: body.address,
    phone: body.phone,
  });

  await notificationService.create({
    userId,
    action: "add",
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      companyName: company.name,
    },
  });
};

const updateCompany = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const company = await companyRepository.findCompanyById(params.id);
  if (!company) throw new AppError(400, "notFound");

  if (
    ![1, 2].includes(body.type) &&
    !body.name &&
    !body.address &&
    !body.phone
  ) {
    throw new AppError(400, "requireFields");
  }

  company.type = body.type;
  company.typeTitle = body.type === 1 ? "legal entity" : "individual";
  company.name = body.name;
  company.address = body.address;
  company.phone = body.phone;

  await companyRepository.saveCompany(company);

  await notificationService.create({
    userId,
    action: "update",
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      companyName: company.name,
    },
  });
};

const deleteCompany = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const company = await companyRepository.findCompanyById(params.id);
  if (!company) throw new AppError(400, "notFound");

  await companyRepository.deleteCompanyByDoc(company);

  await notificationService.create({
    userId,
    action: "delete",
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      companyName: company.name,
    },
  });
};

module.exports = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
