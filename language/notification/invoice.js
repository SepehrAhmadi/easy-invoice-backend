const notification = {
    invoice_created: ({ invoiceNumber }) => ({
        title: {
          fa: "فاکتور جدید",
          en: "New Invoice",
        },
        message: {
          fa: `فاکتور "${invoiceNumber}" با موفقیت ثبت شد.`,
          en: `Invoice "${invoiceNumber}" has been created.`,
        },
      }),

      invoice_updated: ({ invoiceNumber }) => ({
        title: {
          fa: "ویرایش فاکتور",
          en: "Invoice Updated",
        },
        message: {
          fa: `فاکتور "${invoiceNumber}" ویرایش شد.`,
          en: `Invoice "${invoiceNumber}" has been updated.`,
        },
      }),

      invoice_deleted: ({ invoiceNumber }) => ({
        title: {
          fa: "حذف فاکتور",
          en: "Invoice Deleted",
        },
        message: {
          fa: `فاکتور "${invoiceNumber}" حذف شد.`,
          en: `Invoice "${invoiceNumber}" has been deleted.`,
        },
      }),
}
