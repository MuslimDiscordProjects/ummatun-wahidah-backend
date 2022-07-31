import { project } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../../global/prisma.instance";
import ErrorLog from "../../../../utils/errors/ErrorLog";

function GetManyProjects(req: Request, res: Response) {
  const limit = parseInt((req.query["limit"] || "25").toString());
  prisma.project
    .findMany({
      take: limit,
    })
    .then((result: project[]) => {
      result.forEach((project) => {
        project.files.forEach((file) => {
          project.files[project.files.indexOf(file)] =
            process.env["PROTOCOL"] +
            "://" +
            req.headers["host"] +
            "/document/" +
            project.files[project.files.indexOf(file)] +
            "/download";
        });

        project.resources.forEach((resource) => {
          project.resources[project.resources.indexOf(resource)] =
            process.env["PROTOCOL"] +
            "://" +
            req.headers["host"] +
            "/resource/" +
            project.resources[project.resources.indexOf(resource)] +
            "/metadata";
        });
      });
      res.status(200).send(result);
    })
    .catch((ex) => {
      new ErrorLog(ex);
      res.status(503).send();
    });
}

export default GetManyProjects;
