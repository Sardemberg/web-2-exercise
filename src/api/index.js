const { config } = require('dotenv')
const { connectDB } = require('../config/mongodb')
const { json } = require('express');
const express = require('express');
const { dayMiddleware } = require("./middlewares/dayMiddleware")
const { labReportController } = require("./controllers/labReportController")
const { labCreateController } = require("./controllers/labCreateController")

config()
connectDB()
const app = express();
app.use(json());
app.use(dayMiddleware);

//rota para criar um acesso
app.post('/acesso', (req, res) => {

});

//rota para logar
app.post('/login', (req, res) => {

});

//rota para Laboratório novo
app.post('/laboratorio', labCreateController);

//rota para relatório de laboratórios
app.get('/laboratorio/relatorio', labReportController);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});