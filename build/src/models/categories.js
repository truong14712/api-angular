"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  products: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "products"
  }
});
var _default = _mongoose["default"].model("categories", categorySchema);
exports["default"] = _default;