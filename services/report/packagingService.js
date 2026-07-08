const Packaging = require("../../model/base/Packaging");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");
const AppError = require("../../utils/AppError");

const getReport = async () => {
  const packagings = await Packaging.find();

  const packagingsReport = await Promise.all(
    packagings.map(async (item) => {
      const invoiceItems = await InvoiceItem.find({
        packagingId: item.id,
      });

      let totalPrice = 0;
      invoiceItems.forEach((invoice) => {
        totalPrice += invoice.totalPrice;
      });

      let totalPage = 0;
      invoiceItems.forEach((invoice) => {
        totalPage += invoice.pageCount;
      });

      return {
        packagingId: item.id,
        packagingName: item.name,
        packagingType: item.type,
        totalPrice: totalPrice,
        totalPage: totalPage,
        count: invoiceItems.length,
      };
    }),
  );

  return packagingsReport;
};

const getReportDetail = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const invoiceItems = await InvoiceItem.find({ packagingId: params.id });
  if (!invoiceItems) {
    throw new AppError(200, "notFound");
  }

  let totalPrice = 0;
  invoiceItems.forEach((invoice) => {
    totalPrice += invoice.totalPrice;
  });

  let totalPage = 0;
  invoiceItems.forEach((invoice) => {
    totalPage += invoice.pageCount;
  });

  const invoiceItemsData = invoiceItems.map((item) => {
    return {
      id: item.id,
      invoiceId: item.invoiceId,
      isEdit: item.isEdit,
      productId: item.productId,
      productName: item.productName,
      brandId: item.brandId,
      brandName: item.brandName,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
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

  return {
    items: invoiceItemsData,
    totalPrice: totalPrice,
    totalPage: totalPage,
  };
};

module.exports = {
  getReport,
  getReportDetail,
};
