const Product = require("../../model/base/Product");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");
const Brand = require("../../model/base/Brand");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

const NOTIFICATION_TYPE = {
  CREATE: "product_created",
  UPDATE: "product_updated",
  DELETE: "product_deleted",
};

const getAllProducts = async () => {
  const products = await Product.find().exec();
  if (!products) {
    return { products: [] };
  }
  const productsData = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      brandId: item.brandId,
      brandName: item.brandName,
      packagingId: item.packagingId,
      packagingName: item.packagingName,
      packagingType: item.packagingType,
      unitId: item.unitId,
      unitName: item.unitName,
      amount: item.amount,
    };
  });
  return { products: productsData };
};

const getProduct = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const product = await Product.findById(params.id);
  if (!product) throw new AppError(499, "notFound");
  return {
    id: product.id,
    name: product.name,
    brandId: product.brandId,
    brandName: product.brandName,
    packagingId: product.packagingId,
    packagingName: product.packagingName,
    packagingType: product.packagingType,
    unitId: product.unitId,
    unitName: product.unitName,
    amount: product.amount,
  };
};

const addProduct = async ({ body, userId }) => {
  if (
    !body.name &&
    !body.brandId &&
    !body.packagingId &&
    !body.unitId &&
    !body.amount
  ) {
    throw new AppError(400, "requireFields");
  }

  const product = new Product();

  if (
    !body.name &&
    !body.brandId &&
    !body.packagingId &&
    !body.unitId &&
    !body.amount
  ) {
    throw new AppError(400, "requireFields");
  }

  product.name = body.name;
  product.amount = body.amount;

  const package = await Packaging.findById(body.packagingId);
  if (!package) throw new AppError(400, "invalidPackagingId");
  product.packagingId = body.packagingId;
  product.packagingName = package.name;
  product.packagingType = package.type;

  const unit = await Unit.findById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");
  product.unitId = body.unitId;
  product.unitName = unit.name;

  const brand = await Brand.findById(body.brandId);
  if (!unit) throw new AppError(400, "invalidUnitId");
  product.brandId = body.brandId;
  product.brandName = brand.name;

  await product.save();

  await notificationService.create({
    userId,
    action: "add",
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      productName: product.name,
    },
  });
};

const updateProduct = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const product = await Product.findById(params.id).exec();
  if (!product) throw new AppError(400, "notFound");

  if (
    !body.name &&
    !body.brandId &&
    !body.packagingId &&
    !body.unitId &&
    !body.amount
  ) {
    throw new AppError(400, "requireFields");
  }

  if (
    !body.name &&
    !body.brandId &&
    !body.packagingId &&
    !body.unitId &&
    !body.amount
  ) {
    throw new AppError(400, "requireFields");
  }

  product.name = body.name;
  product.amount = body.amount;

  const package = await Packaging.findById(body.packagingId);
  if (!package) throw new AppError(400, "invalidPackagingId");
  product.packagingId = body.packagingId;
  product.packagingName = package.name;
  product.packagingType = package.type;

  const unit = await Unit.findById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");
  product.unitId = body.unitId;
  product.unitName = unit.name;

  const brand = await Brand.findById(body.brandId);
  if (!unit) throw new AppError(400, "invalidUnitId");
  product.brandId = body.brandId;
  product.brandName = brand.name;

  await product.save();

  await notificationService.create({
    userId,
    action: "update",
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      productName: product.name,
    },
  });
};

const deleteProduct = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const product = await Product.findById(params.id).exec();
  if (!product) throw new AppError(400, "notFound");

  await product.deleteOne();

  await notificationService.create({
    userId,
    action: "delete",
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      productName: product.name,
    },
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
