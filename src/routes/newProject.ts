import { Request, Response } from 'express'
import { Project } from '../database/entities/Project';
import { getProjectByName } from '../database/utils/Project';

async function handle(req: Request, res: Response) {
    const project_name = req.body.project_name;
    const project_meta = req.body.project_meta;
    const project_image = req.body.project_image;

    if (project_name == null || project_name == undefined) { res.status(400).send("Missing Project Name"); return; }
    if (project_meta == null || project_meta == undefined) { res.status(400).send("Missing Project Meta"); return; }
    if (project_image == null || project_image == undefined) { res.status(400).send("Missing Project Image"); return; }

    const project = await getProjectByName(project_name);
    if (project != null) { res.status(400).send("A Project with that name already exists"); return; }

    const newProject = new Project();
    newProject.project_name = project_name;
    newProject.project_meta = project_meta;
    newProject.project_image = project_image;

    newProject.save();
    res.status(204).send();
}

export { handle } ;