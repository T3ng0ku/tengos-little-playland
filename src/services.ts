import { Application, Request, Response } from "express";
import { router } from './router';

export class ServiceProvider {
    addRoutes(app: Application): void {
        router.upload(app);
        router.download(app);
      }
}
