import { Request, Response, Router } from "express";
import prisma from "../../global/prisma.instance";
import DeleteProject from "./routes/DELETE/DeleteProject";
import GetManyProjects from "./routes/GET/GetManyProjects";
import GetProjectMetadata from "./routes/GET/GetProjectMetadata";
import NewProject from "./routes/POST/NewProject";

const SECTION = "/project/";
const ProjectRouter = Router();

ProjectRouter.all(
  SECTION + ":id/:action",
  async (req: Request, res: Response) => {
    const id = req.params["id"].toLowerCase();
    const action = req.params["action"].toLowerCase();
    await prisma.project
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
              GetProjectMetadata(req, res, result);
              break;
            case "delete":
              if (req.method != "DELETE") return;
              DeleteProject(req, res, result);
              break;
          }
        }
      });
  }
);

ProjectRouter.post(SECTION + "new", async (req: Request, res: Response) =>
  NewProject(req, res)
);

ProjectRouter.get(SECTION + "many", async (req: Request, res: Response) =>
  GetManyProjects(req, res)
);

export default ProjectRouter;
