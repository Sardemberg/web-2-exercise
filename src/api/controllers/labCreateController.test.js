const { labCreateController } = require("./labCreateController");
const multer = require("multer");

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

    const multerMock = jest.spyOn(multer().constructor.prototype, "single").mockImplementation(() => (req, res, cb) => cb(null));

    await labCreateController(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Todos os campos são obrigatórios",
    });

    multerMock.mockRestore();
  });

  test("Deve retornar 400 se a capacidade for inválida", async () => {
    reqMock.body = {
      nome: "Laboratório X",
      descricao: "Teste",
      capacidade: "abc",
    };

    const multerMock = jest.spyOn(multer().constructor.prototype, "single").mockImplementation(() => (req, res, cb) => cb(null));

    await labCreateController(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Capacidade deve ser um número positivo",
    });

    multerMock.mockRestore();
  });

  test("Deve retornar 400 se o arquivo não for uma imagem", async () => {
    const multerMock = jest.spyOn(multer().constructor.prototype, "single").mockImplementation(() => (req, res, cb) => {
      cb(new Error("Apenas arquivos de imagem são permitidos!"));
    });

    await labCreateController(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      error: "Apenas arquivos de imagem são permitidos!",
    });

    multerMock.mockRestore();
  });

  test("Deve criar um novo laboratório e retornar 201 se os dados forem válidos", async () => {
    reqMock.body = {
      nome: "Laboratório X",
      descricao: "Teste",
      capacidade: 15,
    };

    reqMock.file = {
      filename: "unique-file-name.jpg",
    };

    labRepository.getNextId.mockResolvedValue(1);

    const multerMock = jest.spyOn(multer().constructor.prototype, "single").mockImplementation(() => (req, res, cb) => cb(null));

    await labCreateController(reqMock, resMock);

    expect(labRepository.getNextId).toHaveBeenCalledTimes(1);
    expect(labRepository.createLab).toHaveBeenCalledWith({
      id: 1,
      nome: "Laboratório X",
      descricao: "Teste",
      capacidade: 15,
      foto: "unique-file-name.jpg",
    });
    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith({
      message: "Laboratório cadastrado com sucesso!",
      laboratorio: {
        id: 1,
        nome: "Laboratório X",
        descricao: "Teste",
        capacidade: 15,
        foto: "unique-file-name.jpg",
      },
    });

    multerMock.mockRestore();
  });

});
