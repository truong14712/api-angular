"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var ConnectDB = function ConnectDB() {
  var API_URI = process.env.API_URI;
  _mongoose["default"].connect(API_URI).then(function () {
    return console.log("Da ket noi Connected!");
  });
};
var _default = ConnectDB;
exports["default"] = _default;