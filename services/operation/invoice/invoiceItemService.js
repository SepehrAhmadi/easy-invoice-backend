const invoiceItemRepository = require("../../../repositories/operation/invoice/invoiceItemRepository");
const AppError = require("../../../utils/AppError");

const moment = require("jalali-moment");

const getAllInvoiceItems = async ({ params }) => {
  if (!params.invoiceId) throw new AppError(400, "notFound");

  const invoiceItems = await invoiceItemRepository.findInvoiceItemsByInvoiceId(params.invoiceId);
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

const getInvoiceItem = async ({ params }) => {
  if (!params.invoiceId) throw new AppError(400, "invoiceIdRequired");
  if (!params?.itemId) throw new AppError(400, "idRequired");

  const invoiceItem = await invoiceItemRepository.findInvoiceItemByIdAndInvoiceId(
    params.itemId,
    params.invoiceId,
  );
  if (!invoiceItem) throw new AppError(404, "notFound");

  return {
    id: invoiceItem.id,
    invoiceId: invoiceItem.invoiceId,
    isEdit: invoiceItem.isEdit,
    productId: invoiceItem.productId,
    productName: invoiceItem.productName,
    brandId: invoiceItem.brandId,
    brandName: invoiceItem.brandName,
    categoryId: invoiceItem.categoryId,
    categoryName: invoiceItem.categoryName,
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
    description: invoiceItem.description,
  };
};

const addInvoiceItem = async ({ params, body }) => {
  if (!params.invoiceId) throw new AppError(400, "invoiceIdRequired");

  if (
    !body.productId &&
    !body.brandId &&
    !body.categoryId &&
    !body.unitCount &&
    !body.pageCount &&
    !body.singlePrice
  ) {
    throw new AppError(400, "requireFields");
  }

  const invoice = await invoiceItemRepository.findInvoiceById(params.invoiceId);
  if (!invoice) throw new AppError(400, "notFound");

  const localDate = body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) throw new AppError(400, "invalidDate");
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();

  const product = await invoiceItemRepository.findProductById(body.productId);
  if (!product) throw new AppError(400, "invalidProductId");

  const brand = await invoiceItemRepository.findBrandById(body.brandId);
  if (!brand) throw new AppError(400, "invalidBrandId");

  const category = await invoiceItemRepository.findCategoryById(body.categoryId);
  if (!category) throw new AppError(400, "invalidCategoryId");

  const packaging = await invoiceItemRepository.findPackagingById(body.packagingId);
  if (!packaging) throw new AppError(400, "invalidPackagingId");

  const unit = await invoiceItemRepository.findUnitById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");

  if (body.amount <= 0) throw new AppError(400, "amountMin");
  if (body.unitCount <= 0) throw new AppError(400, "unitCountMin");
  if (body.pageCount <= 0) throw new AppError(400, "pageCountMin");
  if (body.singlePrice <= 0) throw new AppError(400, "singlePriceMin");

  const totalPice = body.pageCount * body.singlePrice;

  await invoiceItemRepository.createInvoiceItem({
    invoiceId: params.invoiceId,
    isEdit: body.isEdit,
    localDate,
    date: gregorianDate,
    createdDate: new Date(),
    productId: body.productId,
    productName: product.name,
    brandId: body.brandId,
    brandName: brand.name,
    categoryId: body.categoryId,
    categoryName: category.name,
    packagingId: body.packagingId,
    packagingName: packaging.name,
    unitId: body.unitId,
    unitName: unit.name,
    amount: body.amount,
    unitCount: body.unitCount,
    pageCount: body.pageCount,
    singlePrice: body.singlePrice,
    totalPrice: totalPice,
    description: body.description,
  });

  const invoiceItems = await invoiceItemRepository.findInvoiceItemsByInvoiceId(params.invoiceId);

  let totalInvoicePrice = 0;
  invoiceItems.forEach((item) => {
    totalInvoicePrice += item.totalPrice;
  });

  await invoiceItemRepository.updateInvoiceTotalPrice(
    params.invoiceId,
    totalInvoicePrice,
    new Date(),
  );
};

const updateInvoiceItem = async ({ params, body }) => {
  if (!params.invoiceId) throw new AppError(400, "invoiceIdRequired");
  if (!params?.itemId) throw new AppError(400, "idRequired");

  const invoiceItem = await invoiceItemRepository.findInvoiceItemByIdAndInvoiceId(
    params.itemId,
    params.invoiceId,
  );
  if (!invoiceItem) throw new AppError(400, "notFound");

  if (
    !body.productId &&
    !body.brandId &&
    !body.categoryId &&
    !body.unitCount &&
    !body.pageCount &&
    !body.singlePrice
  ) {
    throw new AppError(400, "requireFields");
  }

  invoiceItem.isEdit = body.isEdit;

  const localDate = body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) throw new AppError(400, "invalidDate");
  invoiceItem.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoiceItem.date = gregorianDate;
  invoiceItem.lastUpdateDate = new Date();

  const product = await invoiceItemRepository.findProductById(body.productId);
  if (!product) throw new AppError(400, "invalidProductId");
  invoiceItem.productId = body.productId;
  invoiceItem.productName = product.name;

  const brand = await invoiceItemRepository.findBrandById(body.brandId);
  if (!brand) throw new AppError(400, "invalidBrandId");
  invoiceItem.brandId = body.brandId;
  invoiceItem.brandName = brand.name;

  const category = await invoiceItemRepository.findCategoryById(body.categoryId);
  if (!category) throw new AppError(400, "invalidCategoryId");
  invoiceItem.categoryId = body.categoryId;
  invoiceItem.categoryName = category.name;

  const packaging = await invoiceItemRepository.findPackagingById(body.packagingId);
  if (!packaging) throw new AppError(400, "invalidPackagingId");
  invoiceItem.packagingId = body.packagingId;
  invoiceItem.packagingName = packaging.name;

  const unit = await invoiceItemRepository.findUnitById(body.unitId);
  if (!unit) throw new AppError(400, "invalidUnitId");
  invoiceItem.unitId = body.unitId;
  invoiceItem.unitName = unit.name;

  if (body.amount <= 0) throw new AppError(400, "amountMin");
  invoiceItem.amount = body.amount;

  if (body.unitCount <= 0) throw new AppError(400, "unitCountMin");
  invoiceItem.unitCount = body.unitCount;

  if (body.pageCount <= 0) throw new AppError(400, "pageCountMin");
  invoiceItem.pageCount = body.pageCount;

  if (body.singlePrice <= 0) throw new AppError(400, "singlePriceMin");

  invoiceItem.singlePrice = body.singlePrice;

  let totalPice = invoiceItem.pageCount * invoiceItem.singlePrice;
  invoiceItem.totalPrice = totalPice;

  invoiceItem.description = body.description;

  await invoiceItemRepository.saveInvoiceItem(invoiceItem);

  const invoiceItems = await invoiceItemRepository.findInvoiceItemsByInvoiceId(params.invoiceId);

  let totalInvoicePrice = 0;
  invoiceItems.forEach((item) => {
    totalInvoicePrice += item.totalPrice;
  });

  await invoiceItemRepository.updateInvoiceTotalPrice(
    params.invoiceId,
    totalInvoicePrice,
    new Date(),
  );
};

const deleteInvoiceItem = async ({ params }) => {
  if (!params.invoiceId) throw new AppError(400, "invoiceIdRequired");
  if (!params?.itemId) throw new AppError(400, "idRequired");

  const invoiceItem = await invoiceItemRepository.findInvoiceItemByIdAndInvoiceId(
    params.itemId,
    params.invoiceId,
  );
  if (!invoiceItem) throw new AppError(400, "notFound");

  await invoiceItemRepository.deleteInvoiceItemByDoc(invoiceItem);

  const invoiceItems = await invoiceItemRepository.findInvoiceItemsByInvoiceId(params.invoiceId);

  let totalInvoicePrice = 0;
  invoiceItems.forEach((item) => {
    totalInvoicePrice += item.totalPrice;
  });

  await invoiceItemRepository.updateInvoiceTotalPrice(
    params.invoiceId,
    totalInvoicePrice,
    new Date(),
  );
};

module.exports = {
  getAllInvoiceItems,
  getInvoiceItem,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
