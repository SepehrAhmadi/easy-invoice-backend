const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "company_created",
        "company_updated",
        "company_deleted",

        "category_created",
        "category_updated",
        "category_deleted",

        "brand_created",
        "brand_updated",
        "brand_deleted",

        "product_created",
        "product_updated",
        "product_deleted",
        
        "invoice_created",
        "invoice_updated",
        "invoice_deleted",
      ],
    },
    title: {
      fa: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    message: {
      fa: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    date: Date,
    isRead: {
      type: Boolean,
      default: false,
      index:true
    },
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
