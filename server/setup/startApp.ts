import {log} from "../utils/log";
import settings from "../settings.json";
import http from "http";
import {setupApp} from "./setupApp";
import {Sequelize} from "sequelize-typescript";
import {DatabaseOptions, setupDatabase} from "./setupDatabase";
import {constants} from "../utils/constants";

export const startApp = async (
    databaseOptions: DatabaseOptions
): Promise<{server: http.Server, sequelize: Sequelize}> => {
    const sequelize: Sequelize = await setupDatabase(databaseOptions);
    const app = setupApp(sequelize);

    log.sectionTitle(`Starting Server`);

    return new Promise<{server: http.Server, sequelize: Sequelize}>(resolve => {
        const port = process.env.PORT || settings.port;
        const homeUrl = (constants.isProduction)
            ? `https://${settings.productionHost}/\n`
            : `http://${settings.host}:${port}/\n`;

        const server = app.listen(port, () => {
            log.title("The server is now running.");
            log.message(homeUrl);
            log.apiPoints();
            log.endOfSection();
            resolve({server, sequelize});
        });
    });
};