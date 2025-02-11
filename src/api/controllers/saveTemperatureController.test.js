const { saveTemperatureController } = require('./saveTemperatureController');
const { temperatureRepository } = require('../../repository/temperatureRepository');

jest.mock('../../repository/temperatureRepository');

describe('Save Temperature Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {
        temp: '25',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve retornar 200 e a mensagem de sucesso quando a temperatura for salva corretamente', async () => {
    temperatureRepository.save.mockResolvedValue();

    await saveTemperatureController(req, res);

    expect(temperatureRepository.save).toHaveBeenCalledWith('25');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Temperatura salva com sucesso!',
    });
  });

  it('deve retornar 500 e a mensagem de erro em caso de falha ao salvar a temperatura', async () => {
    const errorMessage = 'Erro ao salvar a temperatura no banco';
    temperatureRepository.save.mockRejectedValue(new Error(errorMessage));

    await saveTemperatureController(req, res);

    expect(temperatureRepository.save).toHaveBeenCalledWith('25');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
  });
});
