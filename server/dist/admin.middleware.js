"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAdminToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).json({ error: "Access Denied! No token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        req.admin = decoded; // Attach admin info to request
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid or expired token!" });
    }
};
exports.verifyAdminToken = verifyAdminToken;
