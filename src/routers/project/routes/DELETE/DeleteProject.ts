import { document, project, resource } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function DeleteProject(req: Request, res: Response, project: project) {
  prisma.project
    .delete({
      where: {
        id: project.id,
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

export default DeleteProject;
