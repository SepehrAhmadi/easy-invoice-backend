const Brand = require("../../model/base/Brand");

const getAllBrands = async (req, res) => {
  const message = require("../../language/message")(req);

  const brands = await Brand.find().exec();
  if (!brands) {
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
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
    message: message.success.dataReceived,
    data: {
      brands: brandsData,
    },
  });
};

const getBrand = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }
  const brandData = {
    id: brand.id,
    name: brand.name,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: brandData,
  });
};

const addBrand = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.name) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const brand = new Brand();

  brand.name = req.body.name;

  brand
    .save()
    .then(() => {
      res.status(201).json({
        statusCode: 201,
        message: message.success.added,
      });
    })
    .catch((err) => {
      err;
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToAdd,
      });
    });
};

const updateBrand = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const brand = await Brand.findById(req.params.id).exec();
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  if (!req.body.name) {
    return res
      .status(400)
      .json({ statusCode: 400, message: message.error.requireFields });
  }

  brand.name = req.body.name;
  brand
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.edited,
      });
    })
    .catch((err) => {
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const deleteBrand = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await brand.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = { getAllBrands, getBrand, addBrand, updateBrand, deleteBrand };
