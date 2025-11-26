import { z } from 'zod';

export const validateSchema = (schema) => async (req, res, next) => {
    try {
        if(!req.body) return res.status(400).json({
            message: "No se proporcionarón datos para validar",
            error: []
        });
        const result = await schema.parseAsync(req.body);
        
        req.body = result;

        next();
    } catch (error) {
        if(error instanceof z.ZodError){
            error.issues;
            return res
            .status(400)
            .json({
                message: "Verifique los datos proporcionados",
                error: error.issues
            });
        }
        return res.status(500).json({
            message: "Ocurrio un error, por favor intente de nuevo más tarde",
            error: error.message
        });
    }
};