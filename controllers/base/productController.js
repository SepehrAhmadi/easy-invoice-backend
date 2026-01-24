const Product = require("../../model/base/Product");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");

const getAllProducts = async (req, res) => {
  const products = await Product.find().exec();
  if (!products) {
    return res.status(200).json({
      statusCode: 200,
      message: "No Products found",
      data: [],
    });
  }
  const productsData = products.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Products were successfuly received",
    data: {
      products: productsData,
    },
  });
};

const getProduct = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(499).json({
      statusCode: 400,
      message: `Product ID ${req.params.id} not found`,
    });
  }
  const productData = {
    id: product.id,
    name: product.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: "Product successfully received",
    data: productData,
  });
};

const addProduct = async (req, res) => {
  if (
    !req.body.name &&
    !req.body.amount &&
    !req.body.packagingId &&
    !req.body.unitId
  ) {
    res.status(400).json({
      statusCode: 400,
      message: "Please enter the require fields",
    });
  }

  const product = new Product();

  product.name = req.body.name;
  product.amount = req.body.amount;

  const package = await Packaging.findById(req.body.packagingId);
  if (!package) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid packagingId",
    });
  }
  product.packagingId = req.body.packagingId;
  product.packagingName = package.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid unitId",
    });
  }
  product.unitId = req.body.unitId;
  product.unitName = unit.name;

  product
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Product successfully added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Product",
      });
    });
};

const updateProduct = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: `Product ID ${req.params.id} not found`,
    });
  }

  if (
    !req.body.name &&
    !req.body.amount &&
    !req.body.packagingId &&
    !req.body.unitId
  ) {
    res.status(400).json({
      statusCode: 400,
      message: "Please enter the require fields",
    });
  }

  product.name = req.body.name;
  product.amount = req.body.amount;

  const package = await Packaging.findById(req.body.packagingId);
  if (!package) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid packagingId",
    });
  }
  product.packagingId = req.body.packagingId;
  product.packagingName = package.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid unitId",
    });
  }
  product.unitId = req.body.unitId;
  product.unitName = unit.name;

  product
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Product successfully updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Product",
      });
    });
};

const deleteProduct = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: `Product ID ${req.params.id} not found`,
    });
  }

  await product.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: "Product successfully deleted",
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
