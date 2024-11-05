"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTasks_1 = require("./routes/getTasks");
var postTask_1 = require("./routes/postTask");
function router(req, res) {
    var method = req.method, url = req.url;
    if (method === 'GET' && url === '/tasks') {
        return (0, getTasks_1.default)(req, res);
    }
    if (method === 'POST' && url === '/tasks') {
        return (0, postTask_1.default)(req, res);
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
}
exports.default = router;
