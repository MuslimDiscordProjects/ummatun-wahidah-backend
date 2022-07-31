import { document, resource } from "@prisma/client";
import { Request, Response } from "express";

function GetResourceMetadata(req: Request, res: Response, resource: resource) {
  resource["file"] =
    process.env["PROTOCOL"] +
    "://" +
    req.headers["host"] +
    "/document/" +
    resource["file"] +
    "/download";
  res.status(200).send(resource);
}

export default GetResourceMetadata;
