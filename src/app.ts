import db from "./database/Database";
import { readFileSync } from "fs";
import { log } from "./utils/Logger";
import { getAppKeyByKey, getAppKeyByOwner, newAppKey } from "./database/utils/getAppKey";

async function main() {
    await db.connect(JSON.parse(JSON.parse(JSON.stringify(readFileSync(__dirname + '/../ormconfig.json', 'utf-8')))));
}

main();
