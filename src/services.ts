import { Application, Request, Response } from "express";
import { router } from './router';
import * as path from "path";
import * as fs from "fs";
import settings from './server-settings';

const uploadDir = path.join(settings.rootDir, "/uploads");

export class ServiceProvider {
    addRoutes(app: Application): void {
        router.upload(app);
        router.download(app);

        if(!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
      }
}
