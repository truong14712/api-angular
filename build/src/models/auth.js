"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    "default": "member"
  }
});
var _default = _mongoose["default"].model("users", userSchema);
exports["default"] = _default;