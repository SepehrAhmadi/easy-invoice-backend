const Company = require("../../model/base/Company");

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
      name: item.name,
      id: item.id,
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
    name: company.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: companyData,
  });
};

const addCompany = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: message.error.requireFields });
  }

  const company = new Company();

  company.name = req.body.name;

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

  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: message.error.requireFields });
  }

  company.name = req.body.name;
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
