const Invoice = require("../../model/operation/Invoice");
const InvoiceItem = require("../../model/operation/InvoiceItem");
const Product = require("../../model/base/Product");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");

const moment = require("jalali-moment");
const { format } = require("date-fns");

const getAllInvoiceItems = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }
  const invoiceItems = await InvoiceItem.find({
    invoiceId: req.body.invoiceId,
  }).exec();
  console.log("fafa", invoiceItems);
  if (!invoiceItems) {
    return res.status(404).json({
      statusCode: 404,
      message: message.success.dataReceived,
      data: [],
    });
  }
  const invoiceItemsData = invoiceItems.map((item) => {
    return {
      id: item.id,
      invoiceId: item.invoiceId,
      isEdit: item.isEdit,
      productId: item.productId,
      productName: item.productName,
      brandId: item.brandId,
      brandName: item.brandName,
      packagingId: item.packagingId,
      packagingName: item.packagingName,
      unitId: item.unitId,
      unitName: item.unitName,
      amount: item.amount,
      unitCount: item.unitCount,
      pageCount: item.pageCount,
      singlePrice: item.singlePrice,
      totalPrice: item.totalPrice,
      localDate: item.localDate,
      createdDate: item.createdDate,
      lastUpdateDate: item.lastUpdateDate,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      invoiceItems: invoiceItemsData,
    },
  });
};

const getInvoiceItem = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invoiceIdRequired,
    });
  }

  const invoiceItems = await InvoiceItem.find({
    invoiceId: req.body.invoiceId,
  }).exec();
  if (!invoiceItems) {
    return res.status(404).json({
      statusCode: 404,
      message: message.error.notFound,
    });
  }

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoiceItem = invoiceItems.find((value) => value.id === req.params.id);
  if (!invoiceItem) {
    return res.status(404).json({
      statusCode: 404,
      message: message.error.notFound,
    });
  }
  const invoiceItemData = {
    id: invoiceItem.id,
    invoiceId: invoiceItem.invoiceId,
    isEdit: invoiceItem.isEdit,
    productId: invoiceItem.productId,
    productName: invoiceItem.productName,
    brandId: invoiceItem.brandId,
    brandName: invoiceItem.brandName,
    packagingId: invoiceItem.packagingId,
    packagingName: invoiceItem.packagingName,
    unitId: invoiceItem.unitId,
    unitName: invoiceItem.unitName,
    amount: invoiceItem.amount,
    unitCount: invoiceItem.unitCount,
    pageCount: invoiceItem.pageCount,
    singlePrice: invoiceItem.singlePrice,
    totalPrice: invoiceItem.totalPrice,
    localDate: invoiceItem.localDate,
    createdDate: invoiceItem.createdDate,
    lastUpdateDate: invoiceItem.lastUpdateDate,
  };

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: invoiceItemData,
  });
};

const addInvoiceItem = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invoiceIdRequired,
    });
  }

  if (
    !req.body.productId &&
    !req.body.brandId &&
    !req.body.unitCount &&
    !req.body.pageCount &&
    !req.body.singlePrice
  ) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const invoice = await Invoice.findById(req.body.invoiceId);
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  const invoiceItem = new InvoiceItem();

  invoiceItem.invoiceId = req.body.invoiceId;
  invoiceItem.isEdit = req.body.isEdit;

  const localDate = req.body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidDate,
    });
  }
  invoiceItem.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoiceItem.date = gregorianDate;
  invoiceItem.createdDate = new Date();

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidProductId,
    });
  }
  invoiceItem.productId = req.body.productId;
  invoiceItem.productName = product.name;

  const brand = await Brand.findById(req.body.brandId);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidBrandId,
    });
  }
  invoiceItem.brandId = req.body.brandId;
  invoiceItem.brandName = brand.name;

  const packaging = await Packaging.findById(req.body.packagingId);
  if (!packaging) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidPackagingId,
    });
  }
  invoiceItem.packagingId = req.body.packagingId;
  invoiceItem.packagingName = packaging.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidUnitId,
    });
  }
  invoiceItem.unitId = req.body.unitId;
  invoiceItem.unitName = unit.name;

  if (req.body.amount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.amountMin,
    });
  }
  invoiceItem.amount = req.body.amount;

  if (req.body.unitCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.unitCountMin,
    });
  }
  invoiceItem.unitCount = req.body.unitCount;

  if (req.body.pageCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.pageCountMin,
    });
  }
  invoiceItem.pageCount = req.body.pageCount;

  if (req.body.singlePrice <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.singlePriceMin,
    });
  }
  invoiceItem.singlePrice = req.body.singlePrice;

  let totalPice = invoiceItem.pageCount * invoiceItem.singlePrice;
  invoiceItem.totalPrice = totalPice;

  invoiceItem
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

const updateInvoiceItem = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoiceItem = await InvoiceItem.findById(req.params.id).exec();
  if (!invoiceItem) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  if (
    !req.body.productId &&
    !req.body.brandId &&
    !req.body.unitCount &&
    !req.body.pageCount &&
    !req.body.singlePrice
  ) {
    res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  invoiceItem.isEdit = req.body.isEdit;

  const localDate = req.body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidDate,
    });
  }
  invoiceItem.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoiceItem.date = gregorianDate;
  invoiceItem.lastUpdateDate = new Date();

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidProductId,
    });
  }
  invoiceItem.productId = req.body.productId;
  invoiceItem.productName = product.name;

  const brand = await Brand.findById(req.body.brandId);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidBrandId,
    });
  }
  invoiceItem.brandId = req.body.brandId;
  invoiceItem.brandName = brand.name;

  const packaging = await Packaging.findById(req.body.packagingId);
  if (!packaging) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidPackagingId,
    });
  }
  invoiceItem.packagingId = req.body.packagingId;
  invoiceItem.packagingName = packaging.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidUnitId,
    });
  }
  invoiceItem.unitId = req.body.unitId;
  invoiceItem.unitName = unit.name;

  if (req.body.amount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.amountMin,
    });
  }
  invoiceItem.amount = req.body.amount;

  if (req.body.unitCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.unitCountMin,
    });
  }
  invoiceItem.unitCount = req.body.unitCount;

  if (req.body.pageCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.pageCountMin,
    });
  }
  invoiceItem.pageCount = req.body.pageCount;

  if (req.body.singlePrice <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.singlePriceMin,
    });
  }

  invoiceItem.singlePrice = req.body.singlePrice;

  let totalPice = invoiceItem.pageCount * invoiceItem.singlePrice;
  invoiceItem.totalPrice = totalPice;

  invoiceItem
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

const deleteInvoiceItem = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoiceItem = await InvoiceItem.findById(req.params.id).exec();
  if (!invoiceItem) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await invoiceItem.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getAllInvoiceItems,
  addInvoiceItem,
  getInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
