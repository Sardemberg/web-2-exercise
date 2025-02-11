const { config } = require('dotenv');
const { connectDB } = require('../config/mongodb');
const { json } = require('express');
const express = require('express');
const { validateTokenMiddleware } = require('./middlewares/vadetionMiddleware');
const { dayMiddleware } = require("./middlewares/dayMiddleware")
const { labReportController } = require("./controllers/labReportController")
const { labCreateController } = require("./controllers/labCreateController")
const { multerMiddleware } = require("./middlewares/multerMiddleware");
const { healthCheckController } = require('./controllers/healthCheckController');
const { loginController } = require('./controllers/loginController');
const { ligarLuz, obterStatusLuz } = require('./controllers/lightController');

config();
connectDB();
const app = express();
app.use(json());
app.use(dayMiddleware);

//Healthcheck
app.get("/", healthCheckController)

// Rota para criar um acesso

app.post('/acesso', (req, res) => {
    const { login, password } = req.body;
    // Verifica se o usuário existe no banco de dados

    // Se o usuário existe, verifica se a senha está correta

    // Se a senha está correta, retorna um true
    // Se a senha está incorreta, retorna um false

    // Caso usuário não exista, cria um novo usuário

});

// Rota para logar
app.post('/validaLogin', loginController);

// Rota para Laboratório novo
app.post('/laboratorio', validateTokenMiddleware, multerMiddleware.single("foto"), labCreateController);
 
// Rota para relatório de laboratórios
app.get('/laboratorio/relatorio', validateTokenMiddleware, labReportController);

const app_port = process.env.APP_PORT || 10000

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});

// Rota para obter o status da luz
app.get('/obterStatusLuz', obterStatusLuz);

// Rota para ligar a luz
app.get('/ligarLuz', ligarLuz);
