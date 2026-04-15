const mongoose = require("mongoose");
const Company = require("../../model/base/Company");
const Invoice = require("../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");

const getReport = async (req, res) => {
  const message = require("../../language/message")(req);

  const invoiceItems = await InvoiceItem.find();
  let invoiceTotalPrice = 0;
  let invoiceTotalCount = 0;
  invoiceItems.forEach((item) => {
    invoiceTotalPrice += Number(item.totalPrice);
    invoiceTotalCount += 1;
  });

  const paidInvoices = await Invoice.find({
    paymentStatus: 2,
  });
  let totalPaidPrice = 0;
  let totalPaidCount = 0;
  paidInvoices.forEach((item) => {
    totalPaidPrice += Number(item.totalPrice);
    totalPaidCount += 1;
  });

  const awaitingPaymentInvoices = await Invoice.find({
    paymentStatus: 2,
  });
  let totalAwaitingPrice = 0;
  let totalAwaitingCount = 0;
  awaitingPaymentInvoices.forEach((item) => {
    totalAwaitingPrice += Number(item.totalPrice);
    totalAwaitingCount += 1;
  });

  const companies = await Company.find();
  const companiesData = await Promise.all(
    companies.map(async (item) => {
      const invoices = await Invoice.find({
        companyId: item.id,
      });

      let totalCompanyPrice = 0;
      let totalCompanyPaidPrice = 0;
      let totalCompanyAwaitingPrice = 0;

      let paidCompanyInvoicesCount = 0;
      let awaitingCompanyInvoicesCount = 0;

      invoices.forEach((item) => {
        totalCompanyPrice += Number(item.totalPrice);

        if (item.paymentStatus === 1) {
          totalCompanyPaidPrice += Number(item.totalPrice);
          paidCompanyInvoicesCount += 1;
        }

        if (item.paymentStatus === 2) {
          totalCompanyAwaitingPrice += Number(item.totalPrice);
          awaitingCompanyInvoicesCount += 1;
        }
      });

      return {
        companyId: item.id,
        companyName: item.name,
        companyType: item.type,
        companyTypeTitle: item.typeTitle,
        totalPrice: totalCompanyPrice,
        totalPaidPrice: totalCompanyPaidPrice,
        totalAwaitingPrice: totalCompanyAwaitingPrice,
        invoicesCount: invoices.length,
        paidInvoicesCount: paidCompanyInvoicesCount,
        awaitingInvoicesCount: awaitingCompanyInvoicesCount,
      };
    }),
  );

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      totalPrice: invoiceTotalPrice,
      totalPaidPrice: totalPaidPrice,
      totalAwaitingPrice: totalAwaitingPrice,
      invoicesCount: invoiceTotalCount,
      paidInvoicesCount: totalPaidCount,
      awaitingInvoicesCount: totalAwaitingCount,
      companies: companiesData,
    },
  });
};

const getInvoices = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req?.params?.companyId) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoices = await Invoice.find({
    companyId: req.params.companyId,
  }).exec();
  if (!invoices.length) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: [],
    });
  }

  const invoicesData = invoices.map((item) => ({
    id: item.id,
    invoiceNumber: item.invoiceNumber,
    companyId: item.companyId,
    companyName: item.companyName,
    companyType: item.companyType,
    companyTypeTitle: item.companyTypeTitle,
    paymentStatus: item.paymentStatus,
    paymentStatusName: item.paymentStatusName,
    totalPrice: item.totalPrice,
    localDate: item.localDate,
    date: item.date,
    createdDate: item.createdDate,
    lastUpdateDate: item.lastUpdateDate,
  }));

  return res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: invoicesData,
  });
};

const getInvoiceItems = async (req, res) => {
  const message = require("../../language/message")(req);

  if (!req.params.invoiceId) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  const invoiceItems = await InvoiceItem.find({
    invoiceId: req.params.invoiceId,
  }).exec();
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
      description: item.description,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: invoiceItemsData,
  });
};

// const getReportDetail = async (req, res) => {
//   const message = require("../../language/message")(req);

//   if (!req?.params?.id) {
//     return res.status(400).json({
//       statusCode: 400,
//       message: message.error.idRequired,
//     });
//   }

//   const company = await Company.findById(req.params.id);
//   if (!company) {
//     return res.status(200).json({
//       statusCode: 200,
//       message: message.error.notFound,
//       data: [],
//     });
//   }

//   const companyId = new mongoose.Types.ObjectId(req.params.id);

//   const companyItems = await Company.aggregate([
//     { $match: { _id: companyId } },
//     {
//       $lookup: {
//         from: "invoices",
//         localField: "_id",
//         foreignField: "companyId",
//         as: "invoices",
//       },
//     },
//     {
//       $unwind: "$invoices",
//     },
//     {
//       $lookup: {
//         from: "invoiceitems",
//         localField: "invoices._id",
//         foreignField: "invoiceId",
//         as: "invoiceItems",
//       },
//     },
//     {
//       $addFields: {
//         "invoiceItems.invoiceNumber": "$invoices.invoiceNumber",
//         "invoiceItems.invoiceLocalDate": "$invoices.localDate",
//       },
//     },
//     {
//       $unwind: "$invoiceItems",
//     },
//     {
//       $group: {
//         _id: "$_id", // آیدی کمپانی
//         companyName: { $first: "$name" },
//         companyType: { $first: "$type" },
//         companyTypeTitle: { $first: "$typeTitle" },
//         invoiceItems: { $push: "$invoiceItems" },
//       },
//     },
//   ]).exec();

//   const invoiceItemsData = companyItems[0].invoiceItems.map((item) => {
//     return {
//       id: item.id,
//       invoiceId: item.invoiceId,
//       invoiceNumber: item.invoiceNumber,
//       invoiceLocalDate: item.invoiceLocalDate,
//       isEdit: item.isEdit,
//       productId: item.productId,
//       productName: item.productName,
//       brandId: item.brandId,
//       brandName: item.brandName,
//       categoryId: item.categoryId,
//       categoryName: item.categoryName,
//       packagingId: item.packagingId,
//       packagingName: item.packagingName,
//       unitId: item.unitId,
//       unitName: item.unitName,
//       amount: item.amount,
//       unitCount: item.unitCount,
//       pageCount: item.pageCount,
//       singlePrice: item.singlePrice,
//       totalPrice: item.totalPrice,
//       localDate: item.localDate,
//       createdDate: item.createdDate,
//       lastUpdateDate: item.lastUpdateDate,
//       description: item.description,
//     };
//   });

//   res.status(200).json({
//     statusCode: 200,
//     message: message.success.dataReceived,
//     data: {
//       companyName: companyItems[0].companyName,
//       companyType: companyItems[0].companyType,
//       companyTypeTitle: companyItems[0].companyTypeTitle,
//       invoiceItems: invoiceItemsData,
//     },
//   });
// };

module.exports = { getReport, getInvoices, getInvoiceItems };
