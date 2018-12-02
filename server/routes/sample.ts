import {Express, Request, Response} from "express";
import {routes} from "../utils/constants/routes";
import {Sequelize} from "sequelize-typescript";
import SampleRequest from "../request/SampleRequest";

export default (app: Express, sequelize: Sequelize) => {
    app.use(routes.sample, (req: Request, res: Response) => {
        return new SampleRequest(req, res, sequelize).handle();
    });
};