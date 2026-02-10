const Company = require("../../model/base/Company");

// company type
const COMPANY_TYPE = {
  LEGAL_ENTITY: 1,
  INDIVIDUAL: 2,
};

const getAllCompanies = async (req, res) => {
  const message = require("../../language/message")(req);

  const companies = await Company.find();
  if (!companies) {
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: [],
    });
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      companies: companiesData,
    },
  });
};

const getCompany = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const company = await Company.findById(req.params.id).exec();
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }
  const companyData = {
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: companyData,
  });
};

const addCompany = async (req, res) => {
  const message = require("../../language/message")(req);

  if (
    ![1, 2].includes(req.body.type) &&
    !req.body.name &&
    !req.body.address &&
    !req.body.phone
  ) {
    return res
      .status(400)
      .json({ statusCode: 400, message: message.error.requireFields });
  }

  const company = new Company();

  company.type = req.body.type;
  company.typeTitle = req.body.type === 1 ? "legal entity" : "individual";
  company.name = req.body.name;
  company.address = req.body.address;
  company.phone = req.body.phone;

  company
    .save()
    .then(() => {
      res.status(201).json({
        statusCode: 201,
        message: message.success.added,
      });
    })
    .catch((err) => {
      err;
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToAdd,
      });
    });
};

const updateCompany = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const company = await Company.findById(req.params.id).exec();
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  if (
    ![1, 2].includes(req.body.type) &&
    !req.body.name &&
    !req.body.address &&
    !req.body.phone
  ) {
    return res
      .status(400)
      .json({ statusCode: 400, message: message.error.requireFields });
  }

  company.type = req.body.type;
  company.typeTitle = req.body.type === 1 ? "legal entity" : "individual";
  company.name = req.body.name;
  company.address = req.body.address;
  company.phone = req.body.phone;

  company
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.edited,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const deleteCompany = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await company.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
