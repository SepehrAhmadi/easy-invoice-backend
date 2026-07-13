const categoryRepository = require("../../repositories/base/categoryRepository");
const notificationService = require("../notification/notificationService");
const AppError = require("../../utils/AppError");

// category type
const NOTIFICATION_TYPE = {
  CREATE: "category_created",
  UPDATE: "category_updated",
  DELETE: "category_deleted",
};

const getAllCategories = async () => {
  const categories = await categoryRepository.findAllCategories();
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

  const category = await categoryRepository.findCategoryById(params.id);
  if (!category) throw new AppError(400, "notFound");
  return {
    id: category.id,
    name: category.name,
  };
};

const addCategory = async ({ body, userId }) => {
  if (!body.name) throw new AppError(400, "requireFields");

  const category = await categoryRepository.createCategory({ name: body.name });

  await notificationService.create({
    userId,
    action: "add",
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      categoryName: category.name,
    },
  });
};

const updateCategory = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const category = await categoryRepository.findCategoryById(params.id);
  if (!category) throw new AppError(400, "notFound");

  if (!body.name) throw new AppError(400, "requireFields");

  category.name = body.name;
  await categoryRepository.saveCategory(category);

  await notificationService.create({
    userId,
    action: "update",
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      categoryName: category.name,
    },
  });
};

const deleteCategory = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const category = await categoryRepository.findCategoryById(params.id);
  if (!category) throw new AppError(400, "notFound");

  await categoryRepository.deleteCategoryByDoc(category);

  await notificationService.create({
    userId,
    action: "delete",
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
