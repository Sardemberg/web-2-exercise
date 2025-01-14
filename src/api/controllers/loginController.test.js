const { loginController } = require('../../api/controllers/loginController');
const { userRepository } = require('../../repository/userRepository');
const { tokenService } = require('../../service/token_service');

jest.mock('../../repository/userRepository');
jest.mock('../../service/token_service');

describe('Login Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                login: 'testuser',
                password: '123456',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('deve retornar 404 quando o usuário não for encontrado', async () => {
        userRepository.findUserByLogin.mockResolvedValue(null);

        await loginController(req, res);

        expect(userRepository.findUserByLogin).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuário não encontrado :(',
        });
    });

    it('deve retornar 401 quando a senha estiver incorreta', async () => {
        userRepository.findUserByLogin.mockResolvedValue({
            login: 'testuser',
            password: 'wrongpassword',
        });

        await loginController(req, res);

        expect(userRepository.findUserByLogin).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Senha incorreta :(',
        });
    });

    it('deve retornar 200 e um token quando o login e a senha estiverem corretos', async () => {
        userRepository.findUserByLogin.mockResolvedValue({
            login: 'testuser',
            password: '123456',
        });

        tokenService.createToken.mockReturnValue('mocked-token');

        await loginController(req, res);

        expect(userRepository.findUserByLogin).toHaveBeenCalledWith('testuser');
        expect(tokenService.createToken).toHaveBeenCalledWith({ password: '123456' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login realizado com sucesso!',
            token: 'mocked-token',
        });
    });

    it('deve retornar 500 em caso de erro inesperado', async () => {
        userRepository.findUserByLogin.mockRejectedValue(new Error('Database error'));

        await loginController(req, res);

        expect(userRepository.findUserByLogin).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao fazer o login',
        });
    });
});
