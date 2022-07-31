import { existsSync, mkdirSync } from "fs";

function createStorageDirectoryIfNotExists() {
  if (process.env["STORAGE_PATH"])
    if (!existsSync(process.env["STORAGE_PATH"])) {
      mkdirSync(process.env["STORAGE_PATH"]);
      mkdirSync(process.env["STORAGE_PATH"] + "/tmp");
      return;
    } else if (!existsSync(process.env["STORAGE_PATH"] + "/tmp")) {
      mkdirSync(process.env["STORAGE_PATH"] + "/tmp");
      return;
    }
}

export default createStorageDirectoryIfNotExists;
