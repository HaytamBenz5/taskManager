"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
exports.default = sendResponse; // Correctly exporting the function
