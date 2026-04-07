const Packaging = require("../../model/base/Packaging");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");

const getReport = async (req, res) => {
  const message = require("../../language/message")(req);

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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: packagingsReport,
  });
};

const getReportDetail = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoiceItems = await InvoiceItem.find({ packagingId: req.params.id });
  if (!invoiceItems) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: [],
    });
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      items: invoiceItemsData,
      totalPrice: totalPrice,
      totalPage: totalPage,
    },
  });
};

module.exports = {
  getReport,
  getReportDetail,  
};
