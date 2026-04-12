const Invoice = require("../model/operation/invoice/Invoice");
const InvoiceItem = require("../model/operation/invoice/InvoiceItem");
const Company = require("../model/base/Company");
const Packaging = require("../model/base/Packaging");
const Product = require("../model/base/Product");

const getDashboard = async (req, res) => {
  const message = require("../language/message")(req);

  const packagings = await Packaging.find();
  const invoices = await Invoice.find();

  const invoiceItems = await InvoiceItem.find();
  let invoiceTotalPrice = 0;
  invoiceItems.forEach((item) => {
    invoiceTotalPrice += Number(item.totalPrice);
  });

  const companies = await Company.find();
  const valueByCompany = await Promise.all(
    companies.map(async (item) => {
      const invoices = await Invoice.find({
        companyId: item.id,
      });

      let totalPrice = 0;
      invoices.forEach((item) => {
        totalPrice += Number(item.totalPrice);
      });

      return {
        companyId: item.id,
        companyName: item.name,
        companyType: item.type,
        companyTypeTitle: item.typeTitle,
        totalPrice: totalPrice,
        count: invoices.length,
      };
    }),
  );

  const awaitingPaymentInvoices = await Invoice.find({
    paymentStatus: 2,
  });
  let awaitingPaymentInvoiceTotalPrice = 0;
  awaitingPaymentInvoices.forEach((item) => {
    awaitingPaymentInvoiceTotalPrice += Number(item.totalPrice);
  });
  const awaitingPaymentInvoicesData = awaitingPaymentInvoices.map((item) => {
    return {
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
    };
  });

  const paidInvoices = await Invoice.find({
    paymentStatus: 1,
  });
  let paidInvoiceTotalPrice = 0;
  paidInvoices.forEach((item) => {
    paidInvoiceTotalPrice += Number(item.totalPrice);
  });
  const paidInvoicesData = paidInvoices.map((item) => {
    return {
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
    };
  });

  const productByPackaging = await Promise.all(
    packagings.map(async (item) => {
      const products = await Product.find({
        packagingId: item.id,
      });

      return {
        packagingId: item.id,
        packagingName: item.name,
        packagingType: item.type,
        count: products.length,
      };
    }),
  );

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      invoicesCount: invoices.length,
      awaitingPaymentInvoicesCount: awaitingPaymentInvoices.length,
      paidInvoicesCount: paidInvoices.length,
      totalPrice: invoiceTotalPrice,
      awaitingPaymentTotalPrice: awaitingPaymentInvoiceTotalPrice,
      paidTotalPrice: paidInvoiceTotalPrice,
      valueByCompany: valueByCompany,
      invoicesByPaymentStatus: {
        awatintPayment: awaitingPaymentInvoicesData,
        paid: paidInvoicesData,
      },
      productByPackaging: productByPackaging,
    },
  });
};

module.exports = { getDashboard };
