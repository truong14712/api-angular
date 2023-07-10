"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.getOneBlog = exports.getAllBlog = exports.deleteBlog = exports.addBlog = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Blogs = _interopRequireDefault(require("../models/Blogs"));
var _joi = _interopRequireDefault(require("joi"));
/* A validation BlogSchema for the data that is being sent to the server. */
var BlogSchema = _joi["default"].object({
  title: _joi["default"].string().min(4).required(),
  author: _joi["default"].string().required().min(6),
  body: _joi["default"].string().required().min(10),
  date: _joi["default"].date()
});
var getAllBlog = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var blogs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Blogs["default"].find();
        case 3:
          blogs = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            blogs: blogs
          }));
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
  return function getAllBlog(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllBlog = getAllBlog;
var addBlog = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, title, author, date, body, newBlogData, newBlog;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return BlogSchema.validateAsync(req.body);
        case 3:
          _req$body = req.body, title = _req$body.title, author = _req$body.author, date = _req$body.date, body = _req$body.body;
          newBlogData = {
            title: title,
            author: author,
            date: date,
            body: body
          };
          newBlog = new _Blogs["default"](newBlogData);
          _context2.next = 8;
          return newBlog.save();
        case 8:
          return _context2.abrupt("return", res.status(201).send({
            messenger: "Thêm thành công",
            data: newBlog
          }));
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).send({
            messenger: _context2.t0
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function addBlog(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.addBlog = addBlog;
var getOneBlog = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, blog;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return _Blogs["default"].findById(id);
        case 4:
          blog = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            blog: blog
          }));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            messenger: _context3.t0
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getOneBlog(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getOneBlog = getOneBlog;
var deleteBlog = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, blogs;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _Blogs["default"].findByIdAndRemove(id);
        case 4:
          blogs = _context4.sent;
          if (!blogs) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(200).send({
            messenger: "Xóa thành công"
          }));
        case 9:
          return _context4.abrupt("return", res.status(500).send({
            messenger: "Không tìm thấy blog"
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
  return function deleteBlog(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteBlog = deleteBlog;
var updateBlog = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, title, author, body, date, newData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return BlogSchema.validateAsync(req.body);
        case 3:
          id = req.params.id;
          _req$body2 = req.body, title = _req$body2.title, author = _req$body2.author, body = _req$body2.body, date = _req$body2.date;
          newData = {
            title: title,
            author: author,
            body: body,
            date: date
          }; // { title, author, body, date }
          _context5.next = 8;
          return _Blogs["default"].findByIdAndUpdate(id, newData);
        case 8:
          return _context5.abrupt("return", res.status(200).send({
            messenger: "Cập nhật thành công",
            data: newData
          }));
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).send({
            messenger: _context5.t0
          }));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function updateBlog(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateBlog = updateBlog;