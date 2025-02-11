const { config } = require('dotenv');
const { connectDB } = require('../config/mongodb');
const { configureSocket } = require('../config/server');
const express = require('express');
const { json } = require('express');
const { validateTokenMiddleware } = require('./middlewares/vadetionMiddleware');
const { dayMiddleware } = require("./middlewares/dayMiddleware");
const { labReportController } = require("./controllers/labReportController");
const { labCreateController } = require("./controllers/labCreateController");
const { labBlock } = require("./controllers/labBlockController");
const { multerMiddleware } = require("./middlewares/multerMiddleware");
const { healthCheckController } = require('./controllers/healthCheckController');
const { loginController } = require('./controllers/loginController');
const { ligarLuz, obterStatusLuz, desligarLuz } = require('./controllers/lightController');
const { saveTemperatureController } = require('./controllers/saveTemperatureController');
const { getTemperatureController } = require('./controllers/getTemperatureController');
const http = require('http');
const { streamTutoria } = require('./controllers/stream_video');

config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = configureSocket(server); // Configura o Socket.IO

app.use(json());
app.use(dayMiddleware);
app.use(express.static('public'));

// Healthcheck
app.get("/", healthCheckController);
app.post('/validaLogin', loginController);
app.post('/laboratorio', validateTokenMiddleware, multerMiddleware.single("foto"), labCreateController);
app.get('/laboratorio/relatorio', validateTokenMiddleware, labReportController);

//Bloqueio de laboratório
app.post('/bloquear/:lab' ,(req, res)=> labBlock(req, res, io));

// Salvar a temperatura
app.post('/saveTemperature', saveTemperatureController)

// Pegar a temperatura
app.get('/temperaturaAtual', getTemperatureController)

//Stream do video de tutorial
app.get('/videoTutorial', streamTutoria)

// Rota para obter o status da luz
app.get('/obterStatusLuz', obterStatusLuz);

// Rota para ligar a luz
app.get('/ligarLuz', ligarLuz);

app.get('/desligarLuz', desligarLuz);

// Inicialização do servidor
const app_port = process.env.APP_PORT || 10000;
server.listen(app_port, () => {
    console.log(`Servidor rodando em http://localhost:${app_port}`);
});