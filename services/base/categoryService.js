const Category = require("../../model/base/Category");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

// category type
const NOTIFICATION_TYPE = {
  CREATE: "category_created",
  UPDATE: "category_updated",
  DELETE: "category_deleted",
};

const getAllCategories = async () => {
  const categories = await Category.find().exec();
  if (!categories) {
    return { categories: [] };
  }
  const categoriesData = categories.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });
  return { categories: categoriesData };
};

const getCategory = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const category = await Category.findById(params.id);
  if (!category) throw new AppError(400, "notFound");
  return {
    id: category.id,
    name: category.name,
  };
};

const addCategory = async ({ body, userId }) => {
  if (!body.name) throw new AppError(400, "requireFields");

  const category = new Category();
  category.name = body.name;
  await category.save();

  await notificationService.create({
    userId,
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      categoryName: category.name,
    },
  });
};

const updateCategory = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const category = await Category.findById(params.id).exec();
  if (!category) throw new AppError(400, "notFound");

  if (!body.name) throw new AppError(400, "requireFields");

  category.name = body.name;
  await category.save();

  await notificationService.create({
    userId,
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      categoryName: category.name,
    },
  });
};

const deleteCategory = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const category = await Category.findById(params.id);
  if (!category) throw new AppError(400, "notFound");

  await category.deleteOne();

  await notificationService.create({
    userId,
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      categoryName: category.name,
    },
  });
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
