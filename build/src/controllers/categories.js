"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getOneCategory = exports.getAllCategory = exports.deleteCategory = exports.addCategory = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _categories = _interopRequireDefault(require("../models/categories.js"));
var _joi = _interopRequireDefault(require("joi"));
var categorySchema = _joi["default"].object({
  name: _joi["default"].string().required().min(6),
  products: _joi["default"].array()
});
var getAllCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _categories["default"].find().populate("products");
        case 3:
          categories = _context.sent;
          if (!(categories.length === 0)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.json({
            message: "Không có danh mục nào"
          }));
        case 6:
          return _context.abrupt("return", res.status(200).json(categories));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send({
            messenger: _context.t0
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getAllCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllCategory = getAllCategory;
var addCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var formData, newCategory;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          formData = req.body;
          _context2.next = 4;
          return categorySchema.validateAsync(formData);
        case 4:
          newCategory = new _categories["default"](formData);
          _context2.next = 7;
          return newCategory.save();
        case 7:
          return _context2.abrupt("return", res.status(201).send({
            messenger: "Thêm thành công",
            data: newCategory
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            messenger: _context2.t0
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function addCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.addCategory = addCategory;
var getOneCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return _categories["default"].findById(id).populate("products");
        case 4:
          category = _context3.sent;
          if (category) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.json({
            message: "Không có danh mục nào"
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json(category));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            messenger: _context3.t0
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function getOneCategory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getOneCategory = getOneCategory;
var deleteCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _categories["default"].findByIdAndRemove(id);
        case 4:
          category = _context4.sent;
          if (!category) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(200).send({
            data: category,
            messenger: "Xóa thành công"
          }));
        case 9:
          return _context4.abrupt("return", res.status(500).send({
            messenger: "Không tìm thấy category"
          }));
        case 10:
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).send({
            messenger: _context4.t0
          }));
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function deleteCategory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteCategory = deleteCategory;
var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var formData, id, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          formData = req.body;
          _context5.next = 4;
          return categorySchema.validateAsync(formData);
        case 4:
          console.log(formData);
          id = req.params.id;
          _context5.next = 8;
          return _categories["default"].findByIdAndUpdate(id, formData, {
            "new": true
          });
        case 8:
          data = _context5.sent;
          if (data) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(400).send({
            messenger: "Không tìm thấy danh mục"
          }));
        case 13:
          return _context5.abrupt("return", res.status(200).send({
            messenger: "Cập nhật thành công",
            data: formData
          }));
        case 14:
          _context5.next = 19;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).send({
            messenger: _context5.t0
          }));
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return function updateCategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateCategory = updateCategory;