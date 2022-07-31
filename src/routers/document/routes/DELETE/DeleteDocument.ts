import { Request, Response } from "express";
import { document } from "@prisma/client";
import { existsSync, unlinkSync } from "fs";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function DeleteDocument(req: Request, res: Response, document: document) {
  const storage = process.env["STORAGE_PATH"];
  if (!existsSync(storage + "/" + document.id)) {
    res.status(404).send();
    return;
  } else {
    prisma.document
      .delete({
        where: {
          id: document.id,
        },
      })
      .then(() => {
        unlinkSync(storage + "/" + document.id);
        res.status(204).send();
      })
      .catch((ex) => {
        new ErrorLog(ex);
        res.status(503).send();
      });
  }
}

export default DeleteDocument;
