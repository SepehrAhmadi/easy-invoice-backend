const Invoice = require("../../model/operation/Invoice");
const InvoiceItem = require("../../model/operation/InvoiceItem");
const Product = require("../../model/base/Product");
const Brand = require("../../model/base/Brand");
const Packaging = require("../../model/base/Packaging");
const Unit = require("../../model/base/Unit");

const { format } = require("date-fns");

const getAllInvoiceItems = async (req, res) => {
  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invoice ID not found",
    });
  }
  const invoiceItems = await InvoiceItem.find({
    invoiceId: req.body.invoiceId,
  }).exec();
  console.log("fafa", invoiceItems);
  if (!invoiceItems) {
    return res.status(404).json({
      statusCode: 404,
      message: "No Invoice items found",
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
      date: item.date,
      createdDate: item.createdDate,
      lastUpdateDate: item.lastUpdateDate,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Invoice items were successfuly received",
    data: {
      invoiceItems: invoiceItemsData,
    },
  });
};

const getInvoiceItem = async (req, res) => {
  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invoice ID not found",
    });
  }

  const invoiceItems = await InvoiceItem.find({
    invoiceId: req.body.invoiceId,
  }).exec();
  if (!invoiceItems) {
    return res.status(404).json({
      statusCode: 404,
      message: `Invoice ID ${req.body.invoiceId} no found`,
    });
  }

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoiceItem = invoiceItems.find((value) => value.id === req.params.id);
  if (!invoiceItem) {
    return res.status(404).json({
      statusCode: 404,
      message: `Invoice item ID ${req.params.id} not found`,
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
    date: invoiceItem.date,
    createdDate: invoiceItem.createdDate,
    lastUpdateDate: invoiceItem.lastUpdateDate,
  };

  res.status(200).json({
    statusCode: 200,
    message: "Invoice item successfully received",
    data: invoiceItemData,
  });
};

const addInvoiceItem = async (req, res) => {
  if (!req.body.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invoice ID not found",
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
      message: "Please enter the require fields",
    });
  }

  const invoice = await Invoice.findById(req.body.invoiceId);
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid Invoice ID",
    });
  }

  const invoiceItem = new InvoiceItem();

  invoiceItem.invoiceId = req.body.invoiceId;
  invoiceItem.date = req.body.date;
  invoiceItem.isEdit = req.body.isEdit;

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid productId",
    });
  }
  invoiceItem.productId = req.body.productId;
  invoiceItem.productName = product.name;

  const brand = await Brand.findById(req.body.brandId);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid brandId",
    });
  }
  invoiceItem.brandId = req.body.brandId;
  invoiceItem.brandName = brand.name;

  const packaging = await Packaging.findById(req.body.packagingId);
  if (!packaging) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid packagingId",
    });
  }
  invoiceItem.packagingId = req.body.packagingId;
  invoiceItem.packagingName = packaging.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid unitId",
    });
  }
  invoiceItem.unitId = req.body.unitId;
  invoiceItem.unitName = unit.name;

  if (req.body.amount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Amount must be bigger than 0",
    });
  }
  invoiceItem.amount = req.body.amount;

  if (req.body.unitCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Unit count must be bigger than 0",
    });
  }
  invoiceItem.unitCount = req.body.unitCount;

  if (req.body.pageCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Page count must be bigger than 0",
    });
  }
  invoiceItem.pageCount = req.body.pageCount;

  if (req.body.singlePrice <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Single price must be bigger than 0",
    });
  }

  invoiceItem.singlePrice = req.body.singlePrice;

  let totalPice = invoiceItem.pageCount * invoiceItem.singlePrice;
  invoiceItem.totalPrice = totalPice;

  invoiceItem.createdDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  // invoice.items.push(invoiceItem);

  invoiceItem
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Invoice item successfully added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Invoice item",
      });
    });
};

const updateInvoiceItem = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoiceItem = await InvoiceItem.findById(req.params.id).exec();
  if (!invoiceItem) {
    return res.status(400).json({
      statusCode: 400,
      message: `Invoice item ID ${req.params.id} not found`,
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
      message: "Please enter the require fields",
    });
  }

  invoiceItem.isEdit = req.body.isEdit;
  invoiceItem.date = req.body.date;

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid productId",
    });
  }
  invoiceItem.productId = req.body.productId;
  invoiceItem.productName = product.name;

  const brand = await Brand.findById(req.body.brandId);
  if (!brand) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid brandId",
    });
  }
  invoiceItem.brandId = req.body.brandId;
  invoiceItem.brandName = brand.name;

  const packaging = await Packaging.findById(req.body.packagingId);
  if (!packaging) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid packagingId",
    });
  }
  invoiceItem.packagingId = req.body.packagingId;
  invoiceItem.packagingName = packaging.name;

  const unit = await Unit.findById(req.body.unitId);
  if (!unit) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid unitId",
    });
  }
  invoiceItem.unitId = req.body.unitId;
  invoiceItem.unitName = unit.name;

  if (req.body.amount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Amount must be bigger than 0",
    });
  }
  invoiceItem.amount = req.body.amount;

  if (req.body.unitCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Unit count must be bigger than 0",
    });
  }
  invoiceItem.unitCount = req.body.unitCount;

  if (req.body.pageCount <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Page count must be bigger than 0",
    });
  }
  invoiceItem.pageCount = req.body.pageCount;

  if (req.body.singlePrice <= 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Single price must be bigger than 0",
    });
  }

  invoiceItem.singlePrice = req.body.singlePrice;

  let totalPice = invoiceItem.pageCount * invoiceItem.singlePrice;
  invoiceItem.totalPrice = totalPice;

  invoiceItem.lastUpdateDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  invoiceItem
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Invoice item successfully updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Invoice item",
      });
    });
};

const deleteInvoiceItem = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoiceItem = await InvoiceItem.findById(req.params.id).exec();
  if (!invoiceItem) {
    return res.status(400).json({
      statusCode: 400,
      message: `Invoice item ID ${req.params.id} not found`,
    });
  }

  await invoiceItem.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: "Invoice item successfully deleted",
  });
};

module.exports = {
  getAllInvoiceItems,
  addInvoiceItem,
  getInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
