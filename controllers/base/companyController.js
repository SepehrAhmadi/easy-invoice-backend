const Company = require("../../model/base/Company");

const getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  if (!companies) {
    return res.status(200).json({
      statusCode: 200,
      message: "No Companies found",
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
    message: "Companies were successfully received",
    data: {
      companies: companiesData,
    },
  });
};

const getCompany = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parameter is required",
    });
  }

  const company = await Company.findById(req.params.id).exec();
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: `Company ID ${req.params.id} not found`,
    });
  };
  const companyData = {
    id: company.id,
    name: company.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: "Company successfully received",
    data: companyData,
  });
};

const addCompany = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "name is required" });
  }

  const company = new Company();

  company.name = req.body.name;

  company
    .save()
    .then(() => {
      res.status(201).json({
        statusCode: 201,
        message: "Company successfully added",
      });
    })
    .catch((err) => {
      (err);
      res.status(500).json({
        statusCode: 500,
        message: "failed to add Company",
      });
    });
};

const updateCompany = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parameter is required",
    });
  }

  const company = await Company.findById(req.params.id).exec();
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: `Company ID ${req.params.id} not found`,
    });
  }

  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Company name is required" });
  }

  company.name = req.body.name;
  company
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Company successfully updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "failed to update Company",
      });
    });
};

const deleteCompany = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parameter is required",
    });
  }

  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: `Company ID ${req.params.id} not found`,
    });
  }

  await company.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: "Company successfully deleted",
  });
};

module.exports = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
