import { project } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function NewProject(req: Request, res: Response) {
  const { name, description, sources, links, resources, files } = req.body;
  if (
    name == undefined ||
    description == undefined ||
    sources == undefined ||
    links == undefined ||
    resources == undefined ||
    files == undefined
  ) {
    res.status(400).send();
  } else {
    prisma.project
      .create({
        data: {
          name: name,
          description: description,
          sources: sources,
          links: links,
          resources: resources,
          files: files,
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

export default NewProject;
