const { dayMiddleware } = require("./dayMiddleware")

describe("dayMiddleware tests", () => {
    let mockRequest = {}
    const mockResponse = {}
    const nextFunction = jest.fn()

    beforeEach(() => {
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    });

    test("Tests when not a util day", () => {
        const expectedResponse = {
            message: "Our api works in util week days. Sorry!"
        }

        jest
            .useFakeTimers()
            .setSystemTime(new Date('2025-01-05')); // Represents a sunday

        dayMiddleware(mockRequest, mockResponse, nextFunction)
        
        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    })

    test("Tests when day is a util day", () => {
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2025-01-06')); // Represents a saturday

        dayMiddleware(mockRequest, mockResponse, nextFunction)
        
        expect(nextFunction).toBeCalled()
    })
}) 