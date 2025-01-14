const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.APP_KEY;

const tokenService = {
    createToken: (payload) => {
        return jwt.sign(payload, secret, { expiresIn: '5m' });
    },
    validateToken: (token) => {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new Error('Token inválido ou expirado, faça login novamente');
        }
    }
};

module.exports = {
    tokenService
};