"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.searchProduct = exports.getOneProduct = exports.getAllProduct = exports.deleteProduct = exports.addProduct = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _products = _interopRequireDefault(require("../models/products.js"));
var _categories = _interopRequireDefault(require("../models/categories.js"));
var _joi = _interopRequireDefault(require("joi"));
var productSchema = _joi["default"].object({
  name: _joi["default"].string().required().min(6),
  price: _joi["default"].number().required(),
  description: _joi["default"].string(),
  image: _joi["default"].string(),
  categoryId: _joi["default"].string().required()
});
var getAllProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _products["default"].find().populate("categoryId");
        case 3:
          products = _context.sent;
          return _context.abrupt("return", res.status(200).json(products));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send({
            messenger: _context.t0
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllProduct = getAllProduct;
var searchProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query, category, name, query, products;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, category = _req$query.category, name = _req$query.name;
          console.log(req.query);
          query = {};
          if (category) {
            query.category = {
              $regex: category,
              $options: "i"
            };
          }
          if (name) {
            query.name = {
              $regex: name,
              $options: "i"
            };
          }
          _context2.prev = 5;
          _context2.next = 8;
          return _products["default"].find(query);
        case 8:
          products = _context2.sent;
          res.status(200).json(products);
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](5);
          res.status(500).json({
            message: _context2.t0
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 12]]);
  }));
  return function searchProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.searchProduct = searchProduct;
var addProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var formData, newProduct;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          formData = req.body;
          _context3.next = 4;
          return productSchema.validateAsync(req.body);
        case 4:
          newProduct = new _products["default"](formData);
          _context3.next = 7;
          return newProduct.save();
        case 7:
          _context3.next = 9;
          return _categories["default"].findByIdAndUpdate(newProduct.categoryId, {
            $addToSet: {
              products: newProduct._id
            }
          });
        case 9:
          return _context3.abrupt("return", res.status(201).send({
            messenger: "Thêm thành công",
            data: newProduct
          }));
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            messenger: _context3.t0
          }));
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function addProduct(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.addProduct = addProduct;
var getOneProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _products["default"].findById(id).populate("categoryId");
        case 4:
          product = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(product));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).send({
            messenger: _context4.t0
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getOneProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getOneProduct = getOneProduct;
var deleteProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return _products["default"].findByIdAndRemove(id);
        case 4:
          product = _context5.sent;
          if (!product) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(200).send({
            messenger: "Xóa thành công"
          }));
        case 9:
          return _context5.abrupt("return", res.status(404).json({
            messenger: "Không tìm thấy product"
          }));
        case 10:
          _context5.next = 15;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).send({
            messenger: _context5.t0
          }));
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function deleteProduct(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteProduct = deleteProduct;
var updateProduct = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var formData, id;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          formData = req.body;
          _context6.next = 4;
          return productSchema.validateAsync(req.body);
        case 4:
          id = req.params.id;
          _context6.next = 7;
          return _products["default"].findByIdAndUpdate(id, formData, {
            "new": true
          });
        case 7:
          return _context6.abrupt("return", res.status(200).send({
            messenger: "Cập nhật thành công",
            data: formData
          }));
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(500).send({
            messenger: _context6.t0
          }));
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function updateProduct(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateProduct = updateProduct;