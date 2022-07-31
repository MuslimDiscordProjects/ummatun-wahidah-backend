import { Request, Response, Router } from "express";
import multer from "multer";
import prisma from "../../global/prisma.instance";
import StorageDirectory from "../../middlewares/StorageDirectory.mw";
import DeleteDocument from "./routes/DELETE/DeleteDocument";
import DownloadDocument from "./routes/GET/DownloadDocument";
import GetDocumentMetadata from "./routes/GET/GetDocumentMetadata";
import NewDocument from "./routes/POST/NewDocument";
import GetManyDocuments from "./routes/GET/GetManyDocuments";

const SECTION = "/document/";
const MULTER = multer({ dest: process.env["STORAGE_PATH"] + "/tmp" });
const DocumentRouter = Router();
DocumentRouter.use(StorageDirectory);

DocumentRouter.all(
  SECTION + ":id/:action",
  async (req: Request, res: Response) => {
    const id = req.params["id"].toLowerCase();
    const action = req.params["action"].toLowerCase();

    await prisma.document
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((result) => {
        if (result == undefined || result == null) {
          res.status(404).send();
          return;
        } else {
          switch (action) {
            case "download":
              if (req.method != "GET") break;
              DownloadDocument(req, res, result);
              break;
            case "delete":
              if (req.method != "DELETE") break;
              DeleteDocument(req, res, result);
              break;
            case "metadata":
              if (req.method != "GET") break;
              GetDocumentMetadata(req, res, result);
              break;
            default:
              res.status(404).send("Action unknown");
              return;
          }
        }
      });
  }
);

DocumentRouter.post(
  SECTION + "new",
  MULTER.any(),
  async (req: Request, res: Response) => NewDocument(req, res)
);

DocumentRouter.get(SECTION + "many", async (req: Request, res: Response) =>
  GetManyDocuments(req, res)
);

export default DocumentRouter;
