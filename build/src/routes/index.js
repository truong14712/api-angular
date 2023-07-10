"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _categories = _interopRequireDefault(require("./categories.js"));
var _products = _interopRequireDefault(require("./products.js"));
var _blogs = _interopRequireDefault(require("./blogs.js"));
var _auth = _interopRequireDefault(require("./auth.js"));
var router = _express["default"].Router();
router.use("/blogs", _blogs["default"]);
router.use("/categories", _categories["default"]);
router.use("", _products["default"]);
router.use("/auth", _auth["default"]);
var _default = router;
exports["default"] = _default;