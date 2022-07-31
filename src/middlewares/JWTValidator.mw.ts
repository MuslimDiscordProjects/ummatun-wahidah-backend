import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import * as jwt from "jsonwebtoken";

const env = config();

function JWTValidator(req: Request, res: Response, n: NextFunction) {
  if (["POST", "DELETE"].includes(req.method)) {
    //@ts-ignore
    const token = req.headers["authorization"]?.split(" ")[1] || null;
    if (token == null) {
      res.status(401).send("Unauthorized");
      return;
    } else {
      try {
        jwt.verify(
          token,
          readFileSync(__dirname + "/../../security/jwt-privatekey.pem")
        );
        n();
        return;
      } catch (Ex) {
        console.log(Ex);
        res.status(401).send("Invalid Authorization Token");
        return;
      }
    }
  } else {
    n();
  }
}

export default JWTValidator;
