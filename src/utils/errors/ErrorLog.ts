import { existsSync, mkdir, mkdirSync, writeFile, writeFileSync } from "fs";

class ErrorLog {
  constructor(ex: Error) {
    if (process.env["ERRLOG_PATH"])
      if (!existsSync(process.env["ERRLOG_PATH"])) {
        mkdirSync(process.env["ERRLOG_PATH"]);
      }

    writeFileSync(
      process.env["ERRLOG_PATH"] +
        "/" +
        new Date().toTimeString().split(" ")[0].replaceAll(":", "-"),
      String(ex)
    );
  }
}

export default ErrorLog;
