import { errlog } from "../../utils/Logger";
import db from "../Database";
import { AppKey } from "../entities/AppKey";

async function getAppKeyByKey(key: string): Promise<AppKey | null> {
    const AppKeyObject: AppKey | null = await db.get().getRepository(AppKey)
        .createQueryBuilder("appKey")
        .where("appKey.key = :key", { key })
        .getOne()
        .catch((err: any) => {errlog("Error getting app key by key", "database");throw err;})

    if (AppKeyObject === null) return null;
    else return AppKeyObject;
}

async function getAppKeyByOwner(owner: string): Promise<AppKey | null> {
    const AppKeyObject: AppKey | null = await db.get().getRepository(AppKey)
        .createQueryBuilder("appKey")
        .where("appKey.owner = :owner", { owner })
        .getOne()
        .catch((err: any) => {errlog("Error getting app key by owner", "database");throw err;})

    if (AppKeyObject === null) return null;
    else return AppKeyObject;
}

async function newAppKey(owner: string): Promise<AppKey> {
    const AppKeyObject: AppKey = new AppKey();
    AppKeyObject.owner = owner;
    await db.get().getRepository(AppKey).save(AppKeyObject).catch((err: any) => {errlog("Error creating new app key", "database");throw err;});
    return AppKeyObject;
}

async function editAppKey(appKey: string, owner?: string): Promise<AppKey | null> {
    const AppKeyObject: AppKey | null = await getAppKeyByKey(appKey);
    if (AppKeyObject === null) return null;
    if (owner !== undefined) AppKeyObject.owner = owner;
    await db.get().getRepository(AppKey).save(AppKeyObject).catch((err: any) => {errlog("Error editing app key", "database");throw err;});
    return AppKeyObject;
}

async function verifyAppKey(appKey: string): Promise<boolean> {
    const AppKeyObject: AppKey | null = await getAppKeyByKey(appKey);
    if (AppKeyObject === null) return false;
    else return true;
}

async function getAppKeys(limit?: number): Promise<AppKey[]> {
    const AppKeyObjects: AppKey[] = await db.get().getRepository(AppKey)
        .createQueryBuilder("appKey")
        .limit(limit || 10000)
        .getMany()
        .catch((err: any) => {errlog("Error getting app keys", "database");throw err;});

    return AppKeyObjects;
}

async function deleteAppKey(appKey: string): Promise<boolean> {
    const AppKeyObject: AppKey | null = await getAppKeyByKey(appKey);
    if (AppKeyObject === null) return false;
    await db.get().getRepository(AppKey).remove(AppKeyObject).catch((err: any) => {errlog("Error deleting app key", "database");throw err;});
    return true;
}

export { getAppKeyByKey, getAppKeyByOwner, newAppKey, editAppKey, verifyAppKey, getAppKeys, deleteAppKey };