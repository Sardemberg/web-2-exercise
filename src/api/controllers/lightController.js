let statusLuz = 'Desligado';

const obterStatusLuz = (req, res) => {
    res.send(statusLuz);
}

const ligarLuz = (req, res) => {
    statusLuz = 'Ligado';
    res.json({'mensagem': 'Led ligado com sucesso.'});
}

module.exports = {
    ligarLuz,
    obterStatusLuz
}