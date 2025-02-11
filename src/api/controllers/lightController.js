let statusLuz = 'Desligado';

const obterStatusLuz = (req, res) => {
    res.send(statusLuz);
}

const ligarLuz = (req, res) => {
    statusLuz = 'Ligado';
    res.json({'mensagem': 'Led ligado com sucesso.'});
}

const desligarLuz = (req, res) => {
    statusLuz = 'Desligado';
    res.json({'mensagem': 'Led desligado com sucesso.'});
}

module.exports = {
    ligarLuz,
    obterStatusLuz,
    desligarLuz
}