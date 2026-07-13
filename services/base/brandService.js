const brandRepository = require("../../repositories/base/brandRepository");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

// company type
const NOTIFICATION_TYPE = {
  CREATE: "brand_created",
  UPDATE: "brand_updated",
  DELETE: "brand_deleted",
};

const getAllBrands = async () => {
  const brands = await brandRepository.findAllBrands();
  if (!brands) {
    return { brands: [] };
  }
  const brandsData = brands.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });
  return { brands: brandsData };
};

const getBrand = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const brand = await brandRepository.findBrandById(params.id);
  if (!brand) throw new AppError(400, "notFound");
  return {
    id: brand.id,
    name: brand.name,
  };
};

const addBrand = async ({ body, userId }) => {
  if (!body.name) throw new AppError(400, "requireFields");

  const brand = await brandRepository.createBrand({ name: body.name });

  await notificationService.create({
    userId,
    action: "add",
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      brandName: brand.name,
    },
  });
};

const updateBrand = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const brand = await brandRepository.findBrandById(params.id);
  if (!brand) throw new AppError(400, "notFound");

  if (!body.name) throw new AppError(400, "requireFields");

  brand.name = body.name;
  await brandRepository.saveBrand(brand);

  await notificationService.create({
    userId,
    action: "update",
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      brandName: brand.name,
    },
  });
};

const deleteBrand = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const brand = await brandRepository.findBrandById(params.id);
  if (!brand) throw new AppError(400, "notFound");

  await brandRepository.deleteBrandByDoc(brand);

  await notificationService.create({
    userId,
    action: "delete",
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      brandName: brand.name,
    },
  });
};

module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
