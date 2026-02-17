const Product = require("../../model/base/Product");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");

const getAllProducts = async (req, res) => {
  const message = require("../../language/message")(req);

  const products = await Product.find().exec();
  if (!products) {
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: [],
    });
  }
  const productsData = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      amount: item.amount,
      packagingId: item.packagingId,
      packagingName: item.packagingName,
      packagingType: item.packagingType,
      unitId: item.unitId,
      unitName: item.unitName,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      products: productsData,
    },
  });
};

const getProduct = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(499).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }
  const productData = {
    id: product.id,
    name: product.name,
    amount: product.amount,
    packagingId: product.packagingId,
    packagingName: product.packagingName,
    packagingType: product.packagingType,
    unitId: product.unitId,
    unitName: product.unitName,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: productData,
  });
};

const addProduct = async (req, res) => {
  const message = require("../../language/message")(req);
  if (
    !req.body.name &&
    !req.body.amount &&
    !req.body.packagingId &&
    !req.body.unitId
  ) {
    res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const product = new Product();

  product.name = req.body.name;
  product.amount = req.body.amount;

  const package = await Packaging.findById(req.body.packagingId);
  if (!package) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidPackagingId,
    });
  }
  product.packagingId = req.body.packagingId;
  product.packagingName = package.name;
  product.packagingType = package.type;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidUnitId,
    });
  }
  product.unitId = req.body.unitId;
  product.unitName = unit.name;

  product
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.added,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToAdd,
      });
    });
};

const updateProduct = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
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
      message: message.error.requireFields,
    });
  }

  product.name = req.body.name;
  product.amount = req.body.amount;

  const package = await Packaging.findById(req.body.packagingId);
  if (!package) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidPackagingId,
    });
  }
  product.packagingId = req.body.packagingId;
  product.packagingName = package.name;
  product.packagingType = package.type;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidUnitId,
    });
  }
  product.unitId = req.body.unitId;
  product.unitName = unit.name;

  product
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

const deleteProduct = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await product.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
