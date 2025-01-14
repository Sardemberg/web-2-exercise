const { userRepository } = require("../../repository/userRepository");
const { tokenService } = require("../../service/token_service");


const loginController = async (req, res) => {
    const { login, password } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const user = await userRepository.findUserByLogin(login);
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado :("
            });
            return;
        }

        // Validar senha do usuário encontrado
        const passwordIsValid = user.password === password;
        if (!passwordIsValid) {
            res.status(401).json({
                message: "Senha incorreta :("
            });
            return;
        }

        // Senha válida chama o serviço de token
        const token = tokenService.createToken({ password });
        // Retorna o token
        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao fazer o login" });
        return;
    }
}

module.exports = {
    loginController
}