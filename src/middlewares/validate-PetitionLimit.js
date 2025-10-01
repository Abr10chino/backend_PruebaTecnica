/*
    Middleware que nos ayuda a limitar la cantidad de peticiones que un usuario puede hacer en un periodo de tiempo determinado.
*/

import rateLimit from "express-rate-limit";

// Limite de peticiones
const apiLimiter = rateLimit({
    windowMs: 7 * 60 * 1000,
    max: 1000
});

export default apiLimiter;