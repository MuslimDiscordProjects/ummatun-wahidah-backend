import { document } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function GetManyDocuments(req: Request, res: Response) {
  const limit = parseInt((req.query["limit"] || "25").toString());
  prisma.document
    .findMany({
      take: limit,
    })
    .then((result: document[]) => {
      res.status(200).send(result);
    })
    .catch((ex) => {
      new ErrorLog(ex);
      res.status(503).send();
    });
}

export default GetManyDocuments;
