const { userRepository } = require("../../repository/userRepository");
const { tokenService } = require("../../service/token_service");


const loginController = async (req, res) => {
    const allLabs = await userRepository.listAllUsers();

    try {

        const { login, password } = req.body;
        const user = allLabs.find(user => user.login === login);
        const hasUser = !!user;

        if (!hasUser) {
            res.status(404).json({
                message: "Usuário não encontrado :("
            })

            return
        }
        //validar senha do usuário encontrado
        const passwordIsValid = user.password === password;
        if (!passwordIsValid) {
            res.status(401).json({
                message: "Senha incorreta :("
            });
            return;
        }

        //senha valida chama o serviço de token
        const token =  tokenService.createToken({ password });
        // retorna o token
        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao fazer o login" });
        return
    }

}

module.exports = {
    loginController
}