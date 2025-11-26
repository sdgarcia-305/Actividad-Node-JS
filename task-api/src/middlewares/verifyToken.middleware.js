import jwt from 'jsonwebtoken';
import { isTokenActive } from '../models/token.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            return res.status(401).json({ message: "Necesitas autorización" });

        const token = authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "El formato de autorización es inválido" });

        const isActive = await isTokenActive(token);
        if (!isActive)
            return res.status(401).json({ message: "Token no activo, inicie sesión nuevamente" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next(); 

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado",
            error: error.message
        });
    }
};
