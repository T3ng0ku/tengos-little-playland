import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";

import {ServiceProvider} from './services';
import settings from './server-settings';

export class Server {
    serviceProvider: ServiceProvider;
    app: express.Application;
    server: http.Server;

    constructor () {
        this.serviceProvider = new ServiceProvider();
        this.app = express();
        this.server = new http.Server(this.app);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        this.serviceProvider.addRoutes(this.app);
    }

    public startServer(): void {
        this.server.listen(settings.serverPort, () => {
            console.log(`Server listening on port ${settings.serverPort}.`);
        });
    }
}

new Server().startServer();
