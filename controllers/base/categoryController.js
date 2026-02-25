const Category = require("../../model/base/Category");

const getAllCategories = async (req, res) => {
  const message = require("../../language/message")(req);

  const categories = await Category.find().exec();
  if (!categories) {
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: [],
    });
  }
  const categoriesData = categories.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      categories: categoriesData,
    },
  });
};

const getCategory = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }
  const categoryData = {
    id: category.id,
    name: category.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: categoryData,
  });
};

const addCategory = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.name) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const category = new Category();

  category.name = req.body.name;

  category
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

const updateCategory = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const category = await Category.findById(req.params.id).exec();
  if (!category) {
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

  category.name = req.body.name;
  category
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.edited,
      });
    })
    .catch((err) => {
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const deleteCategory = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await category.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

