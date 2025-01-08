const { labReportController } = require("./labReportController");

jest.mock("../../repository/labRepository", () => ({
  labRepository: {
    getAllLabs: jest.fn()
  }
}));

const { labRepository } = require("../../repository/labRepository");

describe("labReportController tests", () => {
  let responseMock;
  const requestMock = {};

  beforeEach(() => {
    responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        setHeader: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis(),
        once: jest.fn().mockReturnThis(),
        pipe: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
        emit: jest.fn().mockReturnThis(),
        write: jest.fn()
      };

    jest.resetModules();
  });

  test("When getAllLabs returns empty array", async () => {
    labRepository.getAllLabs.mockResolvedValue([]);

    await labReportController(requestMock, responseMock);

    expect(responseMock.status).toBeCalledWith(404);
    expect(responseMock.json).toBeCalledWith({
      message: "Nenhum laboratório encontrado :("
    });
  });

  test("When getAllLabs returns valid array", async () => {
    labRepository.getAllLabs.mockResolvedValue([{
      name: "Laboratório de teste",
      capacity: 30,
      description: "Laboratório de teste",
      photo: null
    }]);

    await labReportController(requestMock, responseMock);

    expect(responseMock.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(responseMock.setHeader).toHaveBeenCalledWith('Content-Disposition', 'inline; filename="labs.pdf"');
  });
});
