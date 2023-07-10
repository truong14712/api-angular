"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupSchema = exports.SigninSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var SignupSchema = _joi["default"].object({
  name: _joi["default"].string(),
  email: _joi["default"].string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc"
  }),
  password: _joi["default"].string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "any.required": "Trường password là bắt buộc",
    "string.min": "Password phải có ít nhất {#limit} ký tự"
  }),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required().messages({
    "any.only": "Password không khớp",
    "string.empty": "Confirm password không được để trống",
    "any.required": "Trường confirm password là bắt buộc"
  })
});
exports.SignupSchema = SignupSchema;
var SigninSchema = _joi["default"].object({
  email: _joi["default"].string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc"
  }),
  password: _joi["default"].string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "any.required": "Trường password là bắt buộc"
  })
});
exports.SigninSchema = SigninSchema;