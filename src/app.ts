import db from "./database/Database";
import cors from 'cors';
import { readFileSync } from "fs";
import { log } from "./utils/Logger";
import { createServer } from "https";
import e, {Request, Response} from "express";

import { handle as getProjectHandle } from './routes/getProject';
import { handle as getProjectsHandle } from './routes/getProjects';
import { handle as deleteProjectsHandle } from './routes/deleteProject';
import { handle as editProjectsHandle } from './routes/editProject';
import { handle as newProjectsHandle } from './routes/newProject';
import { newProject } from "./database/utils/Project";

async function main() {
    await db.connect(JSON.parse(JSON.parse(JSON.stringify(readFileSync(__dirname + '/../ormconfig.json', 'utf-8')))));
    const app = e()
        .use(e.json())
        .use(e.urlencoded({ extended: true }))
        .use(cors())

    const HTTPSserver = createServer({
        key: readFileSync(__dirname + '/../ssl/privkey.pem'),
        cert: readFileSync(__dirname + '/../ssl/fullchain.pem'),
    })

    app.get('/projects/getSpecific', async (req: Request, res: Response) => getProjectHandle(req, res))
    app.get('/projects/getMany', async (req: Request, res: Response) => getProjectsHandle(req, res))
    app.delete('/projects/delete', async (req: Request, res: Response) => deleteProjectsHandle(req, res))
    app.post('/projects/edit', async (req: Request, res: Response) => editProjectsHandle(req, res))
    app.post('/projects/new', async (req: Request, res: Response) => newProjectsHandle(req, res))
    
    app.listen(5555, () => log("Server started on port 5555"))
}

main();
