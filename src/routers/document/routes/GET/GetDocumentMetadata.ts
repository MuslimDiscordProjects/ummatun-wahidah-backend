import { Request, Response } from "express";
import { document } from "@prisma/client";

function GetDocumentMetadata(req: Request, res: Response, document: document) {
  res.status(200).send(document);
}

export default GetDocumentMetadata;
