"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;

/* This is creating a new schema for the blog. */
var blogSchema = new Schema({
  title: {
    type: String,
    require: true,
    minLength: 4
  },
  author: {
    type: String,
    require: true,
    minLength: 6
  },
  body: {
    type: String,
    require: true,
    minLength: 10
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var _default = _mongoose["default"].model("blogs", blogSchema);
exports["default"] = _default;