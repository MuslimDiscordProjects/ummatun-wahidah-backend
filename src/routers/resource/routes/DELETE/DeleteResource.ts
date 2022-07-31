import { document, resource } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function DeleteResource(req: Request, res: Response, resource: resource) {
  prisma.resource
    .delete({
      where: {
        id: resource.id,
      },
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((ex) => {
      new ErrorLog(ex);
      res.status(503).send();
    });
}

export default DeleteResource;
