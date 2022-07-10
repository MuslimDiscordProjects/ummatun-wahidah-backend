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
    ProjectObject.project_meta = JSON.parse(ProjectObject.project_meta);
    return ProjectObject;
}

async function getProjects(limit?: number): Promise<Project[]> {
    const _ProjectObjects: Project[] = await db.get().getRepository(Project)
        .createQueryBuilder("project")
        .limit(limit || 10000)
        .getMany()
        .catch((err: any) => {errlog("Error getting projects", "database");throw err;});
    
    const ProjectObjects: Project[] = [];
    for (const ProjectObject of _ProjectObjects) {
        ProjectObject.project_meta = JSON.parse(ProjectObject.project_meta);
        ProjectObjects.push(ProjectObject);
    }

    return ProjectObjects;
} 

async function editProject(name: string, meta?: Object, image?: string): Promise<Project | null> {
    const ProjectObject: Project | null = await getProjectByName(name);
    if (ProjectObject === null) return null;
    if (meta !== undefined) ProjectObject.project_meta = `${meta}`;
    if (image !== undefined) ProjectObject.project_image = image;
    await db.get().getRepository(Project).save(ProjectObject).catch((err: any) => {errlog("Error editing project", "database");throw err;});
    return ProjectObject;
}

async function newProject(name: string, meta: Object, image: string): Promise<Project> {
    const ProjectObject: Project = new Project();
    ProjectObject.project_name = name;
    ProjectObject.project_meta = `${meta}`;
    ProjectObject.project_image = image;
    await db.get().getRepository(Project).save(ProjectObject).catch((err: any) => {errlog("Error creating new project", "database");throw err;});
    return ProjectObject;
}

async function deleteProject(name: string): Promise<boolean> {
    const ProjectObject: Project | null = await getProjectByName(name);
    if (ProjectObject === null) return false;
    await db.get().getRepository(Project).remove(ProjectObject).catch((err: any) => {errlog("Error deleting project", "database");throw err;});
    return true;
}

export { getProjectByName, getProjects, editProject, newProject, deleteProject };