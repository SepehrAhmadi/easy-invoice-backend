const Brand = require("../../model/base/Brand");

const getAllBrands = async (req, res) => {
  const brands = await Brand.find().exec();
  if (!brands) {
    return res.status(200).json({
      statusCode: 200,
      message: "No Brands found",
      data: [],
    });
  }
  const brandsData = brands.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Brands were successfully received",
    data: {
      brands: brandsData,
    },
  });
};

const getBrand = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parameters is required",
    });
  }

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: `Brand ID ${req.params.id} not found`,
    });
  }
  const brandData = {
    id: brand.id,
    name: brand.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: "Brand successfully received",
    data: brandData,
  });
};

const addBrand = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      statusCode: 400,
      message: "name is required",
    });
  }

  const brand = new Brand();

  brand.name = req.body.name;

  brand
    .save()
    .then(() => {
      res.status(201).json({
        statusCode: 201,
        message: "brand successfully added",
      });
    })
    .catch((err) => {
      (err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Brand",
      });
    });
};

const updateBrand = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parametr id required",
    });
  }

  const brand = await Brand.findById(req.params.id).exec();
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: `Brand ID ${req.params.id} not found`,
    });
  }

  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Brand name is required" });
  }

  brand.name = req.body.name;
  brand
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Brand successfully updated",
      });
    })
    .catch((err) => {
      
      res.status(500).json({
        statusCode: 500,
        message: "failed to update Brand",
      });
    });
};

const deleteBrand = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID parameter is required",
    });
  }

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: `Brand ID ${req.params.id} not found`,
    });
  }

  await brand.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: "Brand successfully deleted",
  });
};

module.exports = { getAllBrands, getBrand, addBrand, updateBrand, deleteBrand };
