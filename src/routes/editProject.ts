import { Request, Response } from 'express'
import db from '../database/Database';
import { Project } from '../database/entities/Project';
import { verifyAppKey } from '../database/utils/AppKey';
import { getProjectByName } from '../database/utils/Project';
import { errlog } from '../utils/Logger';

async function handle(req: Request, res: Response) {
    if (req.query.project == null || req.query.project == undefined) { res.status(400).send("Missing Project Query Parameter"); return; }
    if (req.query.appkey == null || req.query.appkey == undefined) { res.status(400).send("Missing App Key Query Parameter"); return; }
    
    const AppKeyVerification = await verifyAppKey(req.query.appkey.toString());
    const project = await getProjectByName(req.query.project.toString());

    if (AppKeyVerification == false) { res.status(400).send("Invalid App Key"); return; };
    if (project == null) { res.status(400).send("Invalid Project"); return; };

    // get project_name, project_owner, project_meta and project_image from req.body
    const project_name = req.body.project_name;
    const project_meta = req.body.project_meta;
    const project_image = req.body.project_image;
    
    if (project_name != null) project.project_name = project_name;
    if (project_meta != null) project.project_meta = project_meta;
    if (project_image != null) project.project_image = project_image;
    
    await db.get().getRepository(Project).save(Project).catch((err: any) => {errlog("Error editing project", "database");throw err;});
    res.status(200).send("Project Edited");
}

export { handle } ;