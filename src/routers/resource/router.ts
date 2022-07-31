import { Request, Response, Router } from "express";
import prisma from "../../global/prisma.instance";
import DeleteResource from "./routes/DELETE/DeleteResource";
import GetManyResources from "./routes/GET/GetManyResources";
import GetResourceMetadata from "./routes/GET/GetResourceMetadata";
import NewResource from "./routes/POST/NewResource";

const SECTION = "/resource/";
const ResourceRouter = Router();

ResourceRouter.all(
  SECTION + ":id/:action",
  async (req: Request, res: Response) => {
    const id = req.params["id"].toLowerCase();
    const action = req.params["action"].toLowerCase();
    await prisma.resource
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
            case "metadata":
              if (req.method != "GET") return;
              GetResourceMetadata(req, res, result);
              break;
            case "delete":
              if (req.method != "DELETE") return;
              DeleteResource(req, res, result);
              break;
          }
        }
      });
  }
);

ResourceRouter.post(SECTION + "new", async (req: Request, res: Response) =>
  NewResource(req, res)
);

ResourceRouter.get(SECTION + "many", async (req: Request, res: Response) =>
  GetManyResources(req, res)
);

export default ResourceRouter;
