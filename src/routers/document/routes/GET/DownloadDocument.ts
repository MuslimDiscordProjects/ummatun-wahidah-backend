import { document } from "@prisma/client";
import { Request, Response } from "express";
import { existsSync, readFileSync } from "fs";

function DownloadDocument(req: Request, res: Response, document: document) {
  const storage = process.env["STORAGE_PATH"];
  if (existsSync(storage + "/" + document.id)) {
    res.header("content-type", document.filetype);
    res.status(200).sendFile(storage + "/" + document.id);
    return;
  } else {
    res.status(404).send();
  }
}

export default DownloadDocument;
