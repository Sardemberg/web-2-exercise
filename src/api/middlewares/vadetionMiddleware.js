const { tokenService } = require("../../service/token_service");

const validateTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        const decoded = tokenService.validateToken(token);
        req.user = decoded; // Adiciona as informações do token ao objeto req
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = { validateTokenMiddleware };



