"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPermission = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _auth = _interopRequireDefault(require("../models/auth.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();

/**
 * B1: Check xem user có đăng nhập hay không bằng cách check xem có Autho không?
 * B2: Lấy jwt từ autho
 * B3: Lấy _id từ jwt
 * B4: Lấy user từ database với _id đã tìm được
 * B5: Check role của user đã lấy được (nếu là admin -> next, không phải admin -> throw Errors)
 *
 */
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var checkPermission = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var authHeader, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          authHeader = req.headers.authorization;
          _context2.prev = 1;
          if (authHeader) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: "Bạn chưa đăng nhập"
          }));
        case 4:
          // lấy jwt token từ header
          token = authHeader && authHeader.split(" ")[1]; // xác thực jwt token
          _context2.next = 7;
          return _jsonwebtoken["default"].verify(token, ACCESS_TOKEN, /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, payload) {
              var user;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!(err === "JsonWebTokenError")) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return", res.status(400).json({
                      message: "Token không hợp lệ"
                    }));
                  case 2:
                    if (!(err === "TokenExpireError")) {
                      _context.next = 4;
                      break;
                    }
                    return _context.abrupt("return", res.status(400).json({
                      message: "Token hết hạn"
                    }));
                  case 4:
                    _context.next = 6;
                    return _auth["default"].findById(payload._id);
                  case 6:
                    user = _context.sent;
                    if (user) {
                      _context.next = 9;
                      break;
                    }
                    return _context.abrupt("return", res.status(400).json({
                      message: "Không tìm thấy user"
                    }));
                  case 9:
                    if (!(user.role !== "admin")) {
                      _context.next = 11;
                      break;
                    }
                    return _context.abrupt("return", res.status(403).json({
                      message: "Bạn không có quyền truy cập tài nguyên!"
                    }));
                  case 11:
                    req.user = user;
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x4, _x5) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 7:
          // lưu thông tin user vào request để sử dụng cho các middleware khác
          next();
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          res.status(401).json({
            message: _context2.t0.message
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function checkPermission(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.checkPermission = checkPermission;