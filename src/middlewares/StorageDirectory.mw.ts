import { Request, Response, NextFunction } from "express";
import createStorageDirectoryIfNotExists from "../utils/documents/createStorageDirectoryIfNotExists";

function StorageDirectory(req: Request, res: Response, n: NextFunction) {
  createStorageDirectoryIfNotExists();
  n();
}

export default StorageDirectory;
