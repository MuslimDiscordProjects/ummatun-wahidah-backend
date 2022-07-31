import { createPrivateKey, sign } from "crypto";
import { config } from "dotenv";
import prisma from "./global/prisma.instance";
import * as jwt from "jsonwebtoken";
import { readFile, readFileSync } from "fs";
import { isErrored } from "stream";
import express from "./global/express.instance";
import httpserversInstance from "./global/httpservers.instance";

async function main() {
  httpserversInstance.http.listen(process.env["PORT_HTTP"]);
  httpserversInstance.https.listen(process.env["PORT_HTTPS"]);
}

main()
  .then(() => prisma.$disconnect())
  .catch((ex) => {
    prisma.$disconnect();
    throw ex;
  });
