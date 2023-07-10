"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viteNodeApp = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _db = _interopRequireDefault(require("./db.js"));
var _cors = _interopRequireDefault(require("cors"));
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT;
var hostname = "localhost";
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: "*"
}));

/* A function that connects to the database. */
(0, _db["default"])();
// run website
// app.use(cors());

app.listen(PORT, hostname, function () {
  console.log("Hello Minh Truong Dev, I am running at ".concat(hostname, ":").concat(PORT));
});
app.use("/api", _index["default"]);
var viteNodeApp = app;
exports.viteNodeApp = viteNodeApp;