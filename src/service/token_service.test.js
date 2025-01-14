const jwt = require('jsonwebtoken');
const { tokenService } = require('../service/token_service');

describe('Token Service', () => {
    const payload = { id: 1, login: 'testuser' };

    describe('criando token', () => {
        it('deve criar um token válido', () => {
            const token = tokenService.createToken(payload);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });

        it('deve criar um token que pode ser decodificado com a chave correta', () => {
            const token = tokenService.createToken(payload);
            const decoded = jwt.verify(token, process.env.APP_KEY);
            expect(decoded).toMatchObject(payload);
        });
    });

    describe('validateToken', () => {
        it('deve validar um token válido', () => {
            const token = tokenService.createToken(payload);
            const decoded = tokenService.validateToken(token);
            expect(decoded).toMatchObject(payload);
        });

        it('deve lançar um erro para token inválido', () => {
            const invalidToken = 'invalid.token.value';
            expect(() => {
                tokenService.validateToken(invalidToken);
            }).toThrow('Token inválido ou expirado, faça login novamente');
        });

        it('deve lançar um erro para token expirado', () => {
            // Cria um token com expiração de 1 segundo
            const token = jwt.sign(payload, process.env.APP_KEY, { expiresIn: '1s' });
            // Aguarda 2 segundos para garantir que o token expire
            return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                expect(() => {
                    tokenService.validateToken(token);
                }).toThrow('Token inválido ou expirado, faça login novamente');
            });
        });
    });
});
