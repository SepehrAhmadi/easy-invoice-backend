module.exports = (req) => {
  const lang = req.headers["accept-language"] || "en";

  if (lang == "en") {
    return {
      success: {
        dataReceived: "data successfully received",
        added: "Data successfully added",
        edited: "Data successfully updated",
        deleted: "Data successtully deleted",
      },
      error: {
        idRequired: "ID parametr is required",
        notFound: "No data found",
        requireFields: "Please enter require fields",
        faildToAdd: "Faild to add data",
        faildToEdit: "Faild to edit data",
        invalidPackagingId: "Invalid packaging ID",
        invalidUnitId: "Invalid unit ID",
        invalidCompanyId: "Invalid company ID",
        invoiceIdRequired: "Invoice ID is Required",
        invoiceIdRequired: "Invalid invoice ID",
        invalidProductId: "Invalid product ID",
        invalidBrandId: "Invalid brand ID",
        amountMin: "Amount must be bigger than 0",
        unitCountMin: "Unit count must be bigger than 0",
        pageCountMin: "Page count must be bigger than 0",
        singlePriceMin: "Single price must be bigger than 0",
      },
    };
  } else {
    return {
      success: {
        dataReceived: "داده ها با موفقیت دریافت شدند",
        added: "اطلاعات مد نظر با موفقیت اضافه گردید",
        edited: "اطلاعات مد نظر با موفقیت ویرایش گردید",
        deleted: "اطلاعات مد نظر با موفقیت حدف گردید",
      },
      error: {
        idRequired: "شناسه الزامی می باشد",
        notFound: "اطلاعات مورد نظر یافت نشد",
        requireFields: "لطفا موارد الزامی را وارد کنید",
        faildToAdd: "خطا در افزودن اطلاعات",
        faildToEdit: "خطا در ویرایش اطلاعات",
        invalidPackagingId: "شناسه بسته بندی معتبر نمی باشد",
        invalidUnitId: "شناسه واحد اندازه گیری معتبر نمی باشد",
        invalidCompanyId: "شناسه شرکت معتبر نمی باشد",
        invoiceIdRequired: "شناسه فاکتور الزامی می باشد",
        invalidInvoiceId: "شناسه فاکتور معتبر نمی باشد",
        invalidProductId: "شناسه محصول معتبر نمی باشد",
        invalidBrandId: "شناسه برند معتبر نمی باشد",
        amountMin: "مقدار باید بیشتر از صفر باشد",
        unitCountMin: "مقدار اندازه گیری باید بیشتر از صفر باشد",
        pageCountMin: "تعدا صفحه باید بیشتر از صفر باشد",
        singlePriceMin: "قیمت واحد باید بیشتر از صفر باشد",
      },
    };
  }
};
