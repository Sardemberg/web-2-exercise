const { validateTokenMiddleware } = require("./vadetionMiddleware");

jest.mock("../../service/token_service", () => ({
    tokenService: {
        validateToken: jest.fn(),
    }
}));

const { tokenService } = require("../../service/token_service");

describe("validateTokenMiddleware tests", () => {
    let mockRequest = {};
    const mockResponse = {};
    const nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = { headers: {} };
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.json = jest.fn().mockReturnValue(mockResponse);
        nextFunction.mockClear();
    });

    test("Returns 401 when authorization header is missing", () => {
        validateTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith({ error: "Token não fornecido" });
        expect(nextFunction).not.toBeCalled();
    });

    test("Returns 401 when token is invalid", () => {
        mockRequest.headers["authorization"] = "Bearer ";

        validateTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith({ error: "Token inválido" });
        expect(nextFunction).not.toBeCalled();
    });

    test("Returns 401 when tokenService throws an error", () => {
        mockRequest.headers["authorization"] = "Bearer fakeToken";
        tokenService.validateToken.mockImplementation(() => {
            throw new Error("Token inválido");
        });

        validateTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith({ error: "Token inválido" });
        expect(nextFunction).not.toBeCalled();
    });

    test("Calls next when token is valid", () => {
        const mockDecoded = { userId: 1, username: "testuser" };
        mockRequest.headers["authorization"] = "Bearer validToken";
        tokenService.validateToken.mockReturnValue(mockDecoded);

        validateTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(tokenService.validateToken).toBeCalledWith("validToken");
        expect(mockRequest.user).toEqual(mockDecoded);
        expect(nextFunction).toBeCalled();
        expect(mockResponse.status).not.toBeCalled();
        expect(mockResponse.json).not.toBeCalled();
    });
});
