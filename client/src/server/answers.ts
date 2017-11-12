import * as HTTP from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export function internalError(response: Response) {
    response.status(HTTP.INTERNAL_SERVER_ERROR).send({
        okay: false,
        message: "An internal server error occured."
    });
}

export function created(response: Response, data: any) {
    response.status(HTTP.CREATED);
    response.send({
        okay: true,
        message: "OK",
        data
    });
}


export function okay(response: Response, data?: any) {
    response.status(HTTP.OK);
    if (data) {
        response.send({
            okay: true,
            message: "OK",
            data
        });
        return;
    }
    response.send({
        okay: true,
        message: "OK"
    });
}

export function notFound(response: Response, message = "Not found.") {
    response.status(HTTP.NOT_FOUND).send({
        okay: false,
        message
    });
}

export function badRequest(response: Response, message = "Bad Request.") {
    response.status(HTTP.BAD_REQUEST).send({
        okay: false,
        message
    });
}

export function missingArguments(response: Response, message = "Missing arguments.") {
    response.status(HTTP.BAD_REQUEST).send({
        okay: false,
        message
    });
}

export function conflict(response: Response, message: string) {
    response.status(HTTP.CONFLICT).send({
        okay: false,
        message
    });
}

export function forbidden(response: Response) {
    response.status(HTTP.FORBIDDEN).send({
        okay: false,
        message: "Forbidden."
    });
}

