import {Request as Req, Response} from "express";
import {Sequelize} from "sequelize-typescript";
import ResponseHandler from "../utils/ResponseHandler";

export default class Request {
    req: Req;
    responseHandler: ResponseHandler;
    sequelize: Sequelize;

    constructor(req: Req, res: Response, sequelize: Sequelize) {
        this.req = req;
        this.responseHandler = new ResponseHandler(res);
        this.sequelize = sequelize;
    }

    async sendStandardResponse(promise: Promise<any>) {
        return promise
            .then(response => this.responseHandler.sendSuccess(response))
            .catch(err => this.responseHandler.sendBadRequest(err));
    }

    async handle() {
        switch(this.req.method){
        case "GET":
            return this.handleGet();
        case "PUT":
            return this.handleUpdate();
        case "POST":
            return this.handlePost();
        case "DELETE":
            return this.handleDelete();
        default:
            return this.responseHandler.sendMethodNotAllowed();
        }
    };

    async handleGet() {
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handlePost() {
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handleDelete() {
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handleUpdate() {
        return this.responseHandler.sendMethodNotAllowed();
    }
}