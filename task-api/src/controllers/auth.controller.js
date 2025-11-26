import jwt from 'jsonwebtoken';
import { verifyPassword } from '../services/user.service.js';
import { deleteToken, saveToken } from '../models/token.model.js';

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await verifyPassword(email, password);
        if(!user) return res.status(401).json({ message: "Verifique sus credenciales"});

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        await saveToken(user.id, token);

        return res
        .status(200)
        .json({ 
            message: "Inicio de sesion exitoso", 
            token: token
        });
    } catch (error) {
        return res
        .status(500)
        .json({ 
            message: "Ocurrio un error", 
            error: error
        });
    }
};

export const logout = async(req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.status(401).json({ message: "Necesita autorización"});

        const token = authHeader.split(" ")[1];
        if(!token) return res.status(401).json({ message: "Formato de autorización invalido "});

        const tokenDeleted = await deleteToken(token);
        if(!tokenDeleted) return res.status(400).json({ message: "No se puede cerrar la sesión"});

        return res.status(200).json({ message: "Sesión cerrada exitosamente"});
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Ocurrió un error, por favor intente de nuevo mas tarde",
            error: error
        });
    }
}