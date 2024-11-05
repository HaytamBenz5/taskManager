// Utilities.ts
import { ServerResponse } from "http";

function sendResponse(res: ServerResponse, statusCode: number, data: unknown): void {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

export default sendResponse; // Correctly exporting the function
