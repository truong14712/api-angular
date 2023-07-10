"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth");
var router = _express["default"].Router();
router.post("/signup", _auth.signup);
router.post("/signin", _auth.signin);
router.post("/refresh", _auth.request_refreshToken);
var _default = router;
exports["default"] = _default;