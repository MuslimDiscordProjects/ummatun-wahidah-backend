import { errlog } from "../../utils/Logger";
import db from "../Database";
import { Project } from "../entities/Project";

async function getProjectByName(name: string): Promise<Project | null> {
    const ProjectObject: Project | null = await db.get().getRepository(Project)
        .createQueryBuilder("project")
        .where("project.project_name = :name", { name })
        .getOne()
        .catch((err: any) => {errlog("Error getting project by name", "database");throw err;});

    if (ProjectObject === null) return null;
    else return ProjectObject;
}

async function getProjects(limit: number): Promise<Project[]> {
    const ProjectObjects: Project[] = await db.get().getRepository(Project)
        .createQueryBuilder("project")
        .limit(limit)
        .getMany()
        .catch((err: any) => {errlog("Error getting projects", "database");throw err;});

    return ProjectObjects;
} 

async function editProject(name: string, meta?: Object, image?: Blob): Promise<Project | null> {
    const ProjectObject: Project | null = await getProjectByName(name);
    if (ProjectObject === null) return null;
    if (meta !== undefined) ProjectObject.project_meta = meta;
    if (image !== undefined) ProjectObject.project_image = image;
    await db.get().getRepository(Project).save(ProjectObject).catch((err: any) => {errlog("Error editing project", "database");throw err;});
    return ProjectObject;
}

async function newProject(name: string, meta: Object, image: Blob): Promise<Project> {
    const ProjectObject: Project = new Project();
    ProjectObject.project_name = name;
    ProjectObject.project_meta = meta;
    ProjectObject.project_image = image;
    await db.get().getRepository(Project).save(ProjectObject).catch((err: any) => {errlog("Error creating new project", "database");throw err;});
    return ProjectObject;
}

export { getProjectByName, getProjects, editProject, newProject };