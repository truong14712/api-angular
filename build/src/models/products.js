"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var Schema = _mongoose["default"].Schema;
var productSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 6
  },
  price: {
    type: Number,
    require: true,
    minLength: 2
  },
  image: {
    type: String,
    require: true,
    maxLength: 255
  },
  description: {
    type: String,
    require: true,
    minLength: 5
  },
  categoryId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "categories"
  }
});
productSchema.plugin(_mongoosePaginateV["default"]);
var _default = _mongoose["default"].model("products", productSchema);
exports["default"] = _default;