const notification = {
    brand_created: ({ brandName }) => ({
        title: {
          fa: "برند جدید",
          en: "New Brand",
        },
        message: {
          fa: `برند "${brandName}" با موفقیت ثبت شد.`,
          en: `Brand "${brandName}" has been created.`,
        },
      }),
    
      brand_updated: ({ brandName }) => ({
        title: {
          fa: "ویرایش برند",
          en: "Brand Updated",
        },
        message: {
          fa: `برند "${brandName}" ویرایش شد.`,
          en: `Brand "${brandName}" has been updated.`,
        },
      }),
    
      brand_deleted: ({ brandName }) => ({
        title: {
          fa: "حذف برند",
          en: "Brand Deleted",
        },
        message: {
          fa: `برند "${brandName}" حذف شد.`,
          en: `Brand "${brandName}" has been deleted.`,
        },
      }),
}