const notification = {
    product_created: ({ productName }) => ({
        title: {
          fa: "محصول جدید",
          en: "New Product",
        },
        message: {
          fa: `محصول "${productName}" با موفقیت ثبت شد.`,
          en: `Product "${productName}" has been created.`,
        },
      }),

      product_updated: ({ productName }) => ({
        title: {
          fa: "ویرایش محصول",
          en: "Product Updated",
        },
        message: {
          fa: `محصول "${productName}" ویرایش شد.`,
          en: `Product "${productName}" has been updated.`,
        },
      }),

      product_deleted: ({ productName }) => ({
        title: {
          fa: "حذف محصول",
          en: "Product Deleted",
        },
        message: {
          fa: `محصول "${productName}" حذف شد.`,
          en: `Product "${productName}" has been deleted.`,
        },
      }),
}
