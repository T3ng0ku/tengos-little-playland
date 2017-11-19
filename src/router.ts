import { Application } from "express";
import * as upload from './routes/upload';
import * as download from './routes/download';

class Router {
  upload(app: Application) {
    app.post('/upload', upload.post());
  }
  download(app: Application) {
    app.get('/download/:filename', download.get());
  }
}

export const router = new Router();
