import Request from "./Request";
import {Request as Req, Response} from "express";
import {Sequelize} from "sequelize-typescript";
import Sample from "../models/Sample";

export default class SampleRequest extends Request {
    model: any;

    constructor(req: Req, res: Response, sequelize: Sequelize) {
        super(req, res, sequelize);

        this.model = sequelize.models["Sample"];
    }

    async handleGet() {
        return this.sendStandardResponse(this.model.findAll());
    }
}