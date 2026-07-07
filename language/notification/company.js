const notification = {
    company_created: ({ companyName }) => ({
        title: {
          fa: "شرکت جدید",
          en: "New Company",
        },
        message: {
          fa: `شرکت "${companyName}" با موفقیت ثبت شد.`,
          en: `Company "${companyName}" has been created.`,
        },
      }),

      company_updated: ({ companyName }) => ({
        title: {
          fa: "ویرایش شرکت",
          en: "Company Updated",
        },
        message: {
          fa: `شرکت "${companyName}" ویرایش شد.`,
          en: `Company "${companyName}" has been updated.`,
        },
      }),

      company_deleted: ({ companyName }) => ({
        title: {
          fa: "حذف شرکت",
          en: "Company Deleted",
        },
        message: {
          fa: `شرکت "${companyName}" حذف شد.`,
          en: `Company "${companyName}" has been deleted.`,
        },
      }),
}

module.exports = notification