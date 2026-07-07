const notification = {
    category_created: ({ categoryName }) => ({
        title: {
          fa: "دسته‌بندی جدید",
          en: "New Category",
        },
        message: {
          fa: `دسته‌بندی "${categoryName}" با موفقیت ثبت شد.`,
          en: `Category "${categoryName}" has been created.`,
        },
      }),

      category_updated: ({ categoryName }) => ({
        title: {
          fa: "ویرایش دسته‌بندی",
          en: "Category Updated",
        },
        message: {
          fa: `دسته‌بندی "${categoryName}" ویرایش شد.`,
          en: `Category "${categoryName}" has been updated.`,
        },
      }),

      category_deleted: ({ categoryName }) => ({
        title: {
          fa: "حذف دسته‌بندی",
          en: "Category Deleted",
        },
        message: {
          fa: `دسته‌بندی "${categoryName}" حذف شد.`,
          en: `Category "${categoryName}" has been deleted.`,
        },
      }),
}

module.exports = notification