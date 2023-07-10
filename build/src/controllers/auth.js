"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = exports.request_refreshToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _auth = _interopRequireDefault(require("../models/auth.js"));
var _auth2 = require("../schemas/auth.js");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
/**
 * B1: Tạo router mới routes/auth.js, add router vào trong app.js
 * B2: Tạo controller mới (signin với phương thức post)
 *  -
 * B3: Validation req.body với Joi -> tách riêng thành schemas/auth.js
 */
/**
 * B1: lấy ra req.body và dùng Joi validation
 * B2: Nếu validate lỗi thì trả về lỗi.
 * B3: Check xem email đã có trong hệ thống hay chưa bằng findOne({})
 * B4: Mã hoá password bằng bcryptjs
 * B5: Lưu dữ liệu vào database bằng model User.create()
 * B6: Xoá password và trả thông tin về cho người dùng.
 */
var _process$env = process.env,
  ACCESS_TOKEN = _process$env.ACCESS_TOKEN,
  REFRESH_TOKEN = _process$env.REFRESH_TOKEN;
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, userExists, _SignupSchema$validat, error, errors, hashedPassword, user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return _auth["default"].findOne({
            email: email
          });
        case 4:
          userExists = _context.sent;
          _SignupSchema$validat = _auth2.SignupSchema.validate(req.body, {
            abortEarly: false
          }), error = _SignupSchema$validat.error;
          if (!error) {
            _context.next = 9;
            break;
          }
          errors = error.details.map(function (err) {
            return err.message;
          });
          return _context.abrupt("return", res.status(404).json({
            message: errors
          }));
        case 9:
          if (!userExists) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "Email đã tồn tại"
          }));
        case 11:
          _context.next = 13;
          return _bcryptjs["default"].hash(password, 10);
        case 13:
          hashedPassword = _context.sent;
          _context.next = 16;
          return _auth["default"].create({
            name: name,
            email: email,
            password: hashedPassword
          });
        case 16:
          user = _context.sent;
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, ACCESS_TOKEN, {
            expiresIn: "5m"
          }); // Xoá bỏ password trước khi gửi lại thông báo phía client
          user.password = undefined;
          return _context.abrupt("return", res.status(200).json({
            message: "Người dùng đã tạo thành công",
            accessToken: token,
            user: user
          }));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).send({
            message: _context.t0.message
          }));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 22]]);
  }));
  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.signup = signup;
var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, _SigninSchema$validat, error, errors, user, isMatch, token, refreshToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _SigninSchema$validat = _auth2.SigninSchema.validate({
            email: email,
            password: password
          }, {
            abortEarly: false
          }), error = _SigninSchema$validat.error;
          if (!error) {
            _context2.next = 6;
            break;
          }
          errors = error.details.map(function (error) {
            return error.message;
          });
          return _context2.abrupt("return", res.status(404).json({
            message: errors
          }));
        case 6:
          _context2.next = 8;
          return _auth["default"].findOne({
            email: email
          });
        case 8:
          user = _context2.sent;
          if (user) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Tài khoản không tồn tại"
          }));
        case 11:
          _context2.next = 13;
          return _bcryptjs["default"].compare(password, user.password);
        case 13:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Mật khẩu không đúng"
          }));
        case 16:
          token = _jsonwebtoken["default"].sign({
            _id: user._id,
            email: user.email
          }, ACCESS_TOKEN, {
            expiresIn: "5m"
          });
          refreshToken = _jsonwebtoken["default"].sign({
            _id: user._id,
            email: user.email
          }, REFRESH_TOKEN, {
            expiresIn: "5h"
          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict"
          });
          user.password = undefined;
          return _context2.abrupt("return", res.status(200).json({
            status: 200,
            message: "Đăng nhập thành công",
            accessToken: token,
            user: user
          }));
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(404).json({
            message: _context2.t0
          }));
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 23]]);
  }));
  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.signin = signin;
var request_refreshToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var refreshToken;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          refreshToken = req.cookies.refreshToken;
          if (refreshToken) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            message: "Bạn chưa đăng nhập"
          }));
        case 3:
          _jsonwebtoken["default"].verify(refreshToken, REFRESH_TOKEN, /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, user) {
              var newAccessToken, newRefreshToken;
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 2;
                      break;
                    }
                    return _context3.abrupt("return", res.status(404).json({
                      message: err
                    }));
                  case 2:
                    _context3.next = 4;
                    return _jsonwebtoken["default"].sign({
                      _id: user._id,
                      email: user.email
                    }, REFRESH_TOKEN, {
                      expiresIn: "5m"
                    });
                  case 4:
                    newAccessToken = _context3.sent;
                    _context3.next = 7;
                    return _jsonwebtoken["default"].sign({
                      _id: user._id,
                      email: user.email
                    }, REFRESH_TOKEN, {
                      expiresIn: "5h"
                    });
                  case 7:
                    newRefreshToken = _context3.sent;
                    res.cookie("refreshToken", newRefreshToken, {
                      httpOnly: true,
                      secure: false,
                      path: "/",
                      sameSite: "strict"
                    });
                    return _context3.abrupt("return", res.status(200).json({
                      accessToken: newAccessToken
                    }));
                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x7, _x8) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function request_refreshToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.request_refreshToken = request_refreshToken;