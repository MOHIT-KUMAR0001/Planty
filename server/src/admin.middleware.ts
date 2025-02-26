import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(403).json({ error: "Access Denied! No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        (req as any).admin = decoded; // Attach admin info to request
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token!" });
    }
};
