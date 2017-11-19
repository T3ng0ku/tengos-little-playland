import { Request, Response } from "express";
import * as formidable from "formidable";
import * as path from "path";
import * as fs from "fs";
import settings from '../server-settings';

const uploadDir = path.join(settings.rootDir, "/uploads");

export const post = function (): (req: Request, res: Response) => void {
  return function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err) {
        console.error(err);
        return res.sendStatus(500).end();
      }
      if(!fields['filename'] || !files['file']) {
        res.status(500);
        return res.json({'success': false})
      }
      let old_path = files['file'].path,
          new_path = path.join(uploadDir, fields['filename']);

          fs.readFile(old_path, (err, data) => {
            fs.writeFile(new_path, data, (err) => {
              fs.unlink(old_path, (result) => {
                if (result) {
                    res.status(500);
                    res.json({'success': false});
                } else {
                    res.status(200);
                    res.json({'success': true});
                }
              });
            });
          });
       });
     }
}
