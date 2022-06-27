import { Request, Response } from 'express'
import { getAppKeyByKey, getAppKeys, verifyAppKey } from '../database/utils/AppKey';
import { deleteProject, getProjectByName, getProjects } from '../database/utils/Project';

async function handle(req: Request, res: Response) {
    if (req.query.project == null || req.query.project == undefined) { res.status(400).send("Missing Project Query Parameter"); return; }
    if (req.query.appkey == null || req.query.appkey == undefined) { res.status(400).send("Missing App Key Query Parameter"); return; }
    
    const AppKeyVerification = await verifyAppKey(req.query.appkey.toString());
    const project = await getProjectByName(req.query.project.toString());

    if (AppKeyVerification == false) { res.status(400).send("Invalid App Key"); return; };
    if (project == null) { res.status(400).send("Invalid Project"); return; };

    deleteProject(project.project_name);
}

export { handle } ;