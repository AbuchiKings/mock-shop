import { response } from "express";

function responseHandler(response, result, next, statusCode, message) {
    if (result instanceof Error) {
        next(result);
    } else {
        response.status(statusCode).json({
            status: "success",
            message,
            data: result
        })
    }
}

export default responseHandler;
