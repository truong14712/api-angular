"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _categories = require("../controllers/categories");
var route = _express["default"].Router();
route.get("/", _categories.getAllCategory);
route.get("/:id", _categories.getOneCategory);
route.post("/", _categories.addCategory);
route["delete"]("/:id", _categories.deleteCategory);
route.put("/:id", _categories.updateCategory);
var _default = route;
exports["default"] = _default;