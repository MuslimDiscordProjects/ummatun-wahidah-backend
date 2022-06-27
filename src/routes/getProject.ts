import { Request, Response } from 'express'
import { verifyAppKey } from '../database/utils/AppKey';
import { getProjectByName } from '../database/utils/Project';

async function handle(req: Request, res: Response) {
    if (req.query.project == null || req.query.project == undefined) { res.status(400).send("Missing Project Query Parameter"); return; }
    const project = await getProjectByName(req.query.project.toString());
    if (project == null) { res.status(400).send("Invalid Project"); return; };

    let toBeSentProject = {
        project_name: project.project_name,
        project_meta: project.project_meta,
        project_image: project.project_image
    }

    res.status(200).send(toBeSentProject);
}

export { handle } ;