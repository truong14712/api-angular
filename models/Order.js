const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    payment: {
      type: String,
      enum: [1, 2],
      default: 1,
    },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, enum: [1, 2, 3, 4], default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
