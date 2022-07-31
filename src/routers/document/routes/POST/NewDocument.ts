import { Request, Response } from "express";
import { document } from "@prisma/client";
import { renameSync, unlinkSync } from "fs";
import prisma from "../../../../global/prisma.instance";
import { Field } from "multer";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function NewDocument(req: Request, res: Response) {
  //@ts-ignore
  const FILE = req.files[0];
  const NAME = FILE["fieldname"];

  if (FILE == undefined) {
    res.status(400).send();
    unlinkSync(FILE["path"]);
  } else {
    const FILETYPE = (FILE["originalname"] as string).split(".").at(-1);
    prisma.document
      .create({
        data: {
          name: NAME,
          filetype: FILETYPE,
        },
      })
      .then((result: document) => {
        renameSync(FILE["path"], process.env["STORAGE_PATH"] + "/" + result.id);
        res.status(200).send(result.id);
      })
      .catch((ex) => {
        new ErrorLog(ex);
        res.status(503).send();
      });
  }
}

export default NewDocument;
