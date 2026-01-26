module.exports = (req) => {
  const lang = req.headers["accept-language"] || "en";

  if (lang == "en") {
    return {
      success: {
        dataReceived: "data successfully received",
        added: "Data successfully added",
        edited: "Data successfully updated",
        deleted: "Data successtully deleted",
        login: "Wellcome to the dashoard",
        logout: "You have successfully logout",
        userCreate: "Your account successfully created",
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
        userAndPassRequired: "Username and Password are required",
        usernameNotFond: "There is no user with this name",
        userAndPassNotMatch: "Username and Password doesn't match",
        userExist: "This username alredy exist",
      },
    };
  } else {
    return {
      success: {
        dataReceived: "داده ها با موفقیت دریافت شدند",
        added: "اطلاعات مد نظر با موفقیت اضافه گردید",
        edited: "اطلاعات مد نظر با موفقیت ویرایش گردید",
        deleted: "اطلاعات مد نظر با موفقیت حدف گردید",
        login: "به سامانه خوش آمدید",
        logout: "با موفقیت از سامانه خارج شدید",
        userCreate: "حساب کاربری شما ایجاد شد",
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
        userAndPassRequired: "نام کاربری و رمز عبور الزامی می باشد",
        usernameNotFond: "کاربری با این نام کاربری وجود ندارد",
        userAndPassNotMatch: "نام کاربری و کلمه رمز عبور تطابق ندارد",

        userExist: "این نام کاربری وجود دارد",
      },
    };
  }
};
