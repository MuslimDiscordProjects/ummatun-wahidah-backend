import { Request, Response, Router } from "express";
import DocumentRouter from "./document/router";
import ProjectRouter from "./project/router";
import ResourceRouter from "./resource/router";
import cors from "cors";
import morgan from "morgan";

const router = Router();
router.use(DocumentRouter).use(ProjectRouter).use(ResourceRouter);

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Ummatun Wahidah");
});

export default router;
