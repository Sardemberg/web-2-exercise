const { labRepository } = require("./labRepository");

jest.mock("../model/lab", () => ({
    LabModel: {
        create: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis()
    }
}));

const { LabModel } = require('../model/lab')

describe("LabModel tests", () => {
    test("Deve chamar corretamente o create com os parâmetros passados", async () => {
        const nome = 'teste'
        const descricao = 'teste'
        const capacidade = 401
        const foto = 'teste.jpeg'

        labRepository.createLab(nome, capacidade, descricao, foto)

        expect(LabModel.create).toHaveBeenCalledWith({
            name: nome,
            capacity: capacidade,
            description: descricao,
            photo: foto
        })
    });

    test("Deve chamar corretamente o find", async () => {
        labRepository.getAllLabs()
        expect(LabModel.find).toHaveBeenCalled()
    })
});
