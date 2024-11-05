"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var router_1 = require("./router");
var PORT = 3000;
var server = http.createServer(function (req, res) {
    (0, router_1.default)(req, res);
});
server.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
