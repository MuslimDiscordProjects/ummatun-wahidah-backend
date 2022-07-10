import { Request, Response } from 'express'
import { Project } from '../database/entities/Project';
import { getProjects } from '../database/utils/Project';

async function handle(req: Request, res: Response) {
    let limit;
    if (req.query.limit != null && parseInt(String(req.query.limit)) != null) limit = parseInt(String(req.query.limit));
    let projects: Project[] = []

    projects = await getProjects(limit || undefined);
    
    let toBeSentProjects: any = {};
    for (let i = 0; i < projects.length; i++) {
        toBeSentProjects[projects[i].project_name] = {
            project_name: projects[i].project_name,
            project_meta: projects[i].project_meta,
            project_image: projects[i].project_image
        }
    }

    res.status(200).send(toBeSentProjects);
}

export { handle } ;