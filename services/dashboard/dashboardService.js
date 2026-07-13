const dashboardRepository = require("../../repositories/dashboard/dashboardRepository");

const getDashboard = async () => {
  const packagings = await dashboardRepository.findAllPackagings();
  const invoices = await dashboardRepository.findAllInvoices();

  const invoiceItems = await dashboardRepository.findAllInvoiceItems();
  let invoiceTotalPrice = 0;
  invoiceItems.forEach((item) => {
    invoiceTotalPrice += Number(item.totalPrice);
  });

  const companies = await dashboardRepository.findAllCompanies();
  const valueByCompany = await Promise.all(
    companies.map(async (item) => {
      const companyInvoices = await dashboardRepository.findInvoicesByCompanyId(item.id);

      let totalPrice = 0;
      companyInvoices.forEach((inv) => {
        totalPrice += Number(inv.totalPrice);
      });

      return {
        companyId: item.id,
        companyName: item.name,
        companyType: item.type,
        companyTypeTitle: item.typeTitle,
        totalPrice: totalPrice,
        count: companyInvoices.length,
      };
    }),
  );

  const awaitingPaymentInvoices = await dashboardRepository.findInvoicesByPaymentStatus(2);
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

  const paidInvoices = await dashboardRepository.findInvoicesByPaymentStatus(1);
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
      const products = await dashboardRepository.findProductsByPackagingId(item.id);

      return {
        packagingId: item.id,
        packagingName: item.name,
        packagingType: item.type,
        count: products.length,
      };
    }),
  );

  return {
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
  };
};

module.exports = { getDashboard };
