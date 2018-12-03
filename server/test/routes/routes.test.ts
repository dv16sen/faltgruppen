import {expect} from "chai";
import {startApp} from "../../setup/startApp";
import http from "http";
import {routes} from "../../utils/constants/routes";
import request, {Response} from "supertest";
import {httpCodes} from "../../utils/constants/httpCodes";
import {Sequelize} from "sequelize-typescript";
import settings from "../settings.json";

let server: http.Server = null;
let sequelize: Sequelize = null;

const checkSuccess = (response: Response) => {
    console.log(response.text);
    expect(response.status).to.be.equal(httpCodes.SUCCESS);
};

before(async () => {
    const app = await startApp(settings);
    server = app.server;
    sequelize = app.sequelize;
});

describe("Routes", () => {
    it("Should successfully GET all gettable routes.", () => {
        const gettableRoutes = [
            routes.sample
        ];

        return Promise.all(gettableRoutes.map(route => request(server).get(route)))
            .then(responses => responses.forEach(checkSuccess));
    });
});

after(() => {
    server.close();
    sequelize.close();
});