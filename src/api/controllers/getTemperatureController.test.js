const { getTemperatureController } = require('./getTemperatureController')
const { temperatureRepository } = require('../../repository/temperatureRepository');

jest.mock('../../repository/temperatureRepository');

describe('Get Temperature Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve retornar 200 e a temperatura corretamente', async () => {
    temperatureRepository.getLastTemperature.mockResolvedValue(25);
    await getTemperatureController(req, res);
    expect(temperatureRepository.getLastTemperature).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'A temperatura é: 25•C',
    });
  });

  it('deve retornar 500 e a mensagem de erro em caso de falha', async () => {
    const errorMessage = 'Erro ao obter a temperatura';
    temperatureRepository.getLastTemperature.mockRejectedValue(new Error(errorMessage));
    await getTemperatureController(req, res);
    expect(temperatureRepository.getLastTemperature).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
  });
});
