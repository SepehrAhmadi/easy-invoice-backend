const Brand = require("../../model/base/Brand");

const findAllBrands = async () => {
  return Brand.find().exec();
};

const findBrandById = async (id) => {
  return Brand.findById(id);
};

const createBrand = async ({ name }) => {
  const brand = new Brand();
  brand.name = name;
  return brand.save();
};

const saveBrand = async (brand) => {
  return brand.save();
};

const deleteBrandByDoc = async (brand) => {
  return brand.deleteOne();
};

module.exports = {
  findAllBrands,
  findBrandById,
  createBrand,
  saveBrand,
  deleteBrandByDoc,
};
