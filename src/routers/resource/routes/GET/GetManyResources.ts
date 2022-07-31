import { document, resource } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function GetManyResources(req: Request, res: Response) {
  const limit = parseInt((req.query["limit"] || "25").toString());
  prisma.resource
    .findMany({
      take: limit,
    })
    .then((result: resource[]) => {
      result.forEach((resource) => {
        result[result.indexOf(resource)].file =
          process.env["PROTOCOL"] +
          "://" +
          req.headers["host"] +
          "/document/" +
          resource["file"] +
          "/download";
      });
      res.status(200).send(result);
    })
    .catch((ex) => {
      new ErrorLog(ex);
      res.status(503).send();
    });
}

export default GetManyResources;
