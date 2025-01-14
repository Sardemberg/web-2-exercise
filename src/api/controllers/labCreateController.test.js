const { labCreateController } = require("./labCreateController");

jest.mock("../../repository/labRepository", () => ({
  labRepository: {
    getNextId: jest.fn(),
    createLab: jest.fn(),
  },
}));

const { labRepository } = require("../../repository/labRepository");

describe("labCreateController tests", () => {
  let reqMock;
  let resMock;

  beforeEach(() => {
    reqMock = {
      body: {},
      file: null,
      headers: {},
    };

    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  test("Deve retornar 400 se algum campo obrigatório estiver faltando", async () => {
    reqMock.body = { nome: "Laboratório X", descricao: "Teste" };

    await labCreateController(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Todos os campos são obrigatórios",
    });
  });

  test("Deve retornar 400 se a capacidade for inválida", async () => {
    reqMock.body = {
      nome: "Laboratório X",
      descricao: "Teste",
      capacidade: "abc",
    };

    await labCreateController(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Capacidade deve ser um número positivo",
    });
  });

  test("Deve criar um novo laboratório e retornar 201 se os dados forem válidos", async () => {
    reqMock.body = {
      nome: "Laboratório X",
      descricao: "Teste",
      capacidade: 15,
      filename: "unique-file-name.jpg",
    };

    reqMock.file = {
      filename: 'unique-file-name.jpg'
    }

    await labCreateController(reqMock, resMock)

    expect(labRepository.createLab).toHaveBeenCalledWith(
      "Laboratório X",
      15,
      "Teste",
      "unique-file-name.jpg",
    );

    expect(resMock.status).toHaveBeenCalledWith(201);

    expect(resMock.json).toHaveBeenCalledWith({
      message: "Laboratório cadastrado com sucesso!",
      laboratorio: {
        nome: "Laboratório X",
        capacidade: 15,
        descricao: "Teste",
      },
    });
  });
});
