import { readFileSync } from "fs";
import { createServer as createHTTPServer } from "http";
import { createServer as createHTTPSServer } from "https";
import express from "./express.instance";

const httpServer = createHTTPServer(express);
const httpsServer = createHTTPSServer(
  {
    cert: readFileSync(__dirname + "/../../security/ssl/certificate.pem"),
    key: readFileSync(__dirname + "/../../security/ssl/key.pem"),
  },
  express
);

export default {
  http: httpServer,
  https: httpsServer,
};
