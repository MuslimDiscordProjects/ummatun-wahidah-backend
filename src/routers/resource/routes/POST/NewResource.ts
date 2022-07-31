import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function NewResource(req: Request, res: Response) {
  const { name, description, file } = req.body;
  if (name == undefined || description == undefined || file == undefined) {
    res.status(400).send();
  } else {
    prisma.resource
      .create({
        data: {
          name: name,
          description: description,
          file: file,
        },
      })
      .then((result) => {
        res.status(200).send(result.id);
      })
      .catch((ex) => {
        new ErrorLog(ex);
        res.status(503).send();
      });
  }
}

export default NewResource;
