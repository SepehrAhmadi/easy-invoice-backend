const Category = require("../../model/base/Category");

const findAllCategories = async () => {
  return Category.find().exec();
};

const findCategoryById = async (id) => {
  return Category.findById(id);
};

const createCategory = async ({ name }) => {
  const category = new Category();
  category.name = name;
  return category.save();
};

const saveCategory = async (category) => {
  return category.save();
};

const deleteCategoryByDoc = async (category) => {
  return category.deleteOne();
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  saveCategory,
  deleteCategoryByDoc,
};
