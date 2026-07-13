const productRepository = require("../../repositories/base/productRepository");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

const NOTIFICATION_TYPE = {
  CREATE: "product_created",
  UPDATE: "product_updated",
  DELETE: "product_deleted",
};

const getAllProducts = async () => {
  const products = await productRepository.findAllProducts();
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

  const product = await productRepository.findProductById(params.id);
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

  if (
    !body.name &&
    !body.brandId &&
    !body.packagingId &&
    !body.unitId &&
    !body.amount
  ) {
    throw new AppError(400, "requireFields");
  }

  const package = await productRepository.findPackagingById(body.packagingId);
  if (!package) throw new AppError(400, "invalidPackagingId");

  const unit = await productRepository.findUnitById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");

  const brand = await productRepository.findBrandById(body.brandId);
  if (!unit) throw new AppError(400, "invalidUnitId");

  const product = await productRepository.createProduct({
    name: body.name,
    amount: body.amount,
    packagingId: body.packagingId,
    packagingName: package.name,
    packagingType: package.type,
    unitId: body.unitId,
    unitName: unit.name,
    brandId: body.brandId,
    brandName: brand.name,
  });

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

  const product = await productRepository.findProductByIdExec(params.id);
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

  const package = await productRepository.findPackagingById(body.packagingId);
  if (!package) throw new AppError(400, "invalidPackagingId");

  const unit = await productRepository.findUnitById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");

  const brand = await productRepository.findBrandById(body.brandId);
  if (!unit) throw new AppError(400, "invalidUnitId");

  product.name = body.name;
  product.amount = body.amount;
  product.packagingId = body.packagingId;
  product.packagingName = package.name;
  product.packagingType = package.type;
  product.unitId = body.unitId;
  product.unitName = unit.name;
  product.brandId = body.brandId;
  product.brandName = brand.name;

  await productRepository.saveProduct(product);

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

  const product = await productRepository.findProductByIdExec(params.id);
  if (!product) throw new AppError(400, "notFound");

  await productRepository.deleteProductByDoc(product);

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
