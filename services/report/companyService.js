const mongoose = require("mongoose");
const Company = require("../../model/base/Company");
const Invoice = require("../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");
const AppError = require("../../utils/AppError");

const getReport = async () => {
  const invoiceItems = await InvoiceItem.find();
  let invoiceTotalPrice = 0;
  let invoiceTotalCount = 0;
  invoiceItems.forEach((item) => {
    invoiceTotalPrice += Number(item.totalPrice);
    invoiceTotalCount += 1;
  });

  const paidInvoices = await Invoice.find({
    paymentStatus: 1,
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

  return {
    totalPrice: invoiceTotalPrice,
    totalPaidPrice: totalPaidPrice,
    totalAwaitingPrice: totalAwaitingPrice,
    invoicesCount: invoiceTotalCount,
    paidInvoicesCount: totalPaidCount,
    awaitingInvoicesCount: totalAwaitingCount,
    companies: companiesData,
  };
};

const getInvoices = async ({ params }) => {
  if (!params?.companyId) throw new AppError(400, "idRequired");

  const invoices = await Invoice.find({
    companyId: params.companyId,
  }).exec();
  if (!invoices.length) {
    throw new AppError(200, "notFound");
  }

  return invoices.map((item) => ({
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
};

const getInvoiceItems = async ({ params }) => {
  if (!params.invoiceId) throw new AppError(400, "notFound");

  const invoiceItems = await InvoiceItem.find({
    invoiceId: params.invoiceId,
  }).exec();
  if (!invoiceItems) {
    throw new AppError(404, "dataReceived");
  }

  return invoiceItems.map((item) => {
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
};

module.exports = { getReport, getInvoices, getInvoiceItems };
