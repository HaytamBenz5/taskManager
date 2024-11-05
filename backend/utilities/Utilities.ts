// Utilities.ts
import { ServerResponse } from "http";

// ####################  une simple fonction qui m'aide à envoyer des reponses en forme JSON ###############################

function sendResponse(res: ServerResponse, statusCode: number, data: unknown): void {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

export default sendResponse; // Correctly exporting the function
