"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _blogs = require("../controllers/blogs");
var route = _express["default"].Router();
route.get("", _blogs.getAllBlog);
route.get("/:id", _blogs.getOneBlog);
route.post("/", _blogs.addBlog);
route["delete"]("/:id", _blogs.deleteBlog);
route.put("/:id", _blogs.updateBlog);
var _default = route;
exports["default"] = _default;