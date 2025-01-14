const { userRepository } = require("./userRepository");

// Mock do UserModel
jest.mock("../model/user", () => ({
  UserModel: {
    create: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
  },
}));

const { UserModel } = require("../model/user");

describe("UserModel tests", () => {

  test("Deve chamar corretamente o create com os parâmetros passados", async () => {
    const login = "testeUser";
    const password = "testeSenha";

    await userRepository.createUser(login, password);

    expect(UserModel.create).toHaveBeenCalledWith({
      login: login,
      password: password,
    });
  });

  test("Deve chamar corretamente o find para listar todos os usuários", async () => {
    await userRepository.listAllUsers();

    expect(UserModel.find).toHaveBeenCalled();
  });
});
