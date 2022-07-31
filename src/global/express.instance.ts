import cors from "cors";
import e from "express";
import morgan from "morgan";
import JWTValidator from "../middlewares/JWTValidator.mw";
import router from "../routers/router";
import multer from "multer";

const express = e();
express
  .use(JWTValidator)
  .use(e.json())
  .use(router)
  .use(cors())
  .use(morgan("common"))
  .use(multer().any);

export default express;
