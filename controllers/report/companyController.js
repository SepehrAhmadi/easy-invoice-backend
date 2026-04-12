const mongoose = require("mongoose");
const Company = require("../../model/base/Company");
const Invoice = require("../../model/operation/invoice/Invoice");

const getReport = async (req, res) => {
  const message = require("../../language/message")(req);

  const companies = await Company.find();

  const valueByCompany = await Promise.all(
    companies.map(async (item) => {
      const invoices = await Invoice.find({
        companyId: item.id,
      });

      let totalPrice = 0;
      invoices.forEach((item) => {
        totalPrice += item.totalPrice;
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: valueByCompany,
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

  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: [],
    });
  }

  const companyId = new mongoose.Types.ObjectId(req.params.id);

  const companyItems = await Company.aggregate([
    { $match: { _id: companyId } },
    {
      $lookup: {
        from: "invoices",
        localField: "_id",
        foreignField: "companyId",
        as: "invoices",
      },
    },
    {
      $unwind: "$invoices",
    },
    {
      $lookup: {
        from: "invoiceitems",
        localField: "invoices._id",
        foreignField: "invoiceId",
        as: "invoiceItems",
      },
    },
    {
      $addFields: {
        "invoiceItems.invoiceNumber": "$invoices.invoiceNumber",
        "invoiceItems.invoiceLocalDate": "$invoices.localDate",
      },
    },
    {
      $unwind: "$invoiceItems",
    },
    {
      $group: {
        _id: "$_id", // آیدی کمپانی
        companyName: { $first: "$name" },
        companyType: { $first: "$type" },
        companyTypeTitle: { $first: "$typeTitle" },
        invoiceItems: { $push: "$invoiceItems" },
      },
    },
  ]).exec();

  const invoiceItemsData = companyItems[0].invoiceItems.map((item) => {
    return {
      id: item.id,
      invoiceId: item.invoiceId,
      invoiceNumber: item.invoiceNumber,
      invoiceLocalDate: item.invoiceLocalDate,
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
    data: {
      companyName: companyItems[0].companyName,
      companyType: companyItems[0].companyType,
      companyTypeTitle: companyItems[0].companyTypeTitle,
      invoiceItems: invoiceItemsData,
    },
  });
};

module.exports = { getReport, getReportDetail };
