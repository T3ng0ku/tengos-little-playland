import { Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import settings from '../server-settings';

const uploadDir = path.join(settings.rootDir, "/uploads");

export const get = function (): (req: Request, res: Response) => void {
  return function (req, res) {
    let file = path.join(uploadDir, req.params.filename);
    console.log(file);
    if(!fs.existsSync(file)) {
      res.status(404);
      return res.json({'success': false});
    }

    res.status(200);
    res.download(file);
  }
}
