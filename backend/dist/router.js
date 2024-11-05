"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTasks_1 = __importDefault(require("./routes/getTasks"));
const postTask_1 = __importDefault(require("./routes/postTask"));
function router(req, res) {
    const { method, url } = req;
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
