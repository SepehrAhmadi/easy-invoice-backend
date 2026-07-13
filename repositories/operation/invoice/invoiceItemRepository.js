const Invoice = require("../../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../../model/operation/invoice/InvoiceItem");
const Product = require("../../../model/base/Product");
const Brand = require("../../../model/base/Brand");
const Packaging = require("../../../model/base/Packaging");
const Unit = require("../../../model/base/Unit");
const Category = require("../../../model/base/Category");

const findInvoiceItemsByInvoiceId = async (invoiceId) => {
  return InvoiceItem.find({ invoiceId }).exec();
};

const findInvoiceItemByIdAndInvoiceId = async (itemId, invoiceId) => {
  return InvoiceItem.findOne({ _id: itemId, invoiceId });
};

const findInvoiceById = async (invoiceId) => {
  return Invoice.findById(invoiceId);
};

const findProductById = async (productId) => {
  return Product.findById(productId);
};

const findBrandById = async (brandId) => {
  return Brand.findById(brandId);
};

const findCategoryById = async (categoryId) => {
  return Category.findById(categoryId);
};

const findPackagingById = async (packagingId) => {
  return Packaging.findById(packagingId);
};

const findUnitById = async (unitId) => {
  return Unit.findById(unitId);
};

const createInvoiceItem = async (itemData) => {
  const invoiceItem = new InvoiceItem();
  invoiceItem.invoiceId = itemData.invoiceId;
  invoiceItem.isEdit = itemData.isEdit;
  invoiceItem.localDate = itemData.localDate;
  invoiceItem.date = itemData.date;
  invoiceItem.createdDate = itemData.createdDate;
  invoiceItem.productId = itemData.productId;
  invoiceItem.productName = itemData.productName;
  invoiceItem.brandId = itemData.brandId;
  invoiceItem.brandName = itemData.brandName;
  invoiceItem.categoryId = itemData.categoryId;
  invoiceItem.categoryName = itemData.categoryName;
  invoiceItem.packagingId = itemData.packagingId;
  invoiceItem.packagingName = itemData.packagingName;
  invoiceItem.unitId = itemData.unitId;
  invoiceItem.unitName = itemData.unitName;
  invoiceItem.amount = itemData.amount;
  invoiceItem.unitCount = itemData.unitCount;
  invoiceItem.pageCount = itemData.pageCount;
  invoiceItem.singlePrice = itemData.singlePrice;
  invoiceItem.totalPrice = itemData.totalPrice;
  invoiceItem.description = itemData.description;
  return invoiceItem.save();
};

const saveInvoiceItem = async (invoiceItem) => {
  return invoiceItem.save();
};

const deleteInvoiceItemByDoc = async (invoiceItem) => {
  return invoiceItem.deleteOne();
};

const updateInvoiceTotalPrice = async (invoiceId, totalPrice, lastUpdateDate) => {
  return Invoice.findByIdAndUpdate(invoiceId, {
    totalPrice: totalPrice.toString(),
    lastUpdateDate,
  });
};

module.exports = {
  findInvoiceItemsByInvoiceId,
  findInvoiceItemByIdAndInvoiceId,
  findInvoiceById,
  findProductById,
  findBrandById,
  findCategoryById,
  findPackagingById,
  findUnitById,
  createInvoiceItem,
  saveInvoiceItem,
  deleteInvoiceItemByDoc,
  updateInvoiceTotalPrice,
};
