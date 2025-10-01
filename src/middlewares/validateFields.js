/*
    Middleware que nos ayuda a validar los campos que vienen en las peticiones HTTP.
*/

import { validationResult } from "express-validator";

// Si hay errores en la validación, los enviamos en la respuesta. Si no, pasamos al siguiente middleware.
export const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
    next();
}