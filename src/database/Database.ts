import { ConnectionConfig, createConnection } from "mysql";
import { DataSource, DataSourceOptions, getConnection } from "typeorm";
import { errlog, log } from "../utils/Logger";
import DatabaseNotInitializedException from "./errors/DatabaseNotInitializedException";

class Database {
    public dataSource: DataSource | undefined = undefined;

    async connect(opts: DataSourceOptions): Promise<DataSource> {
        log("Attempting to connect to database", "database");
        this.dataSource = new DataSource(opts);
        await this.dataSource.initialize().then(() => {
            log("Database connection successful", "database");
        }).catch((err: any) => {
            throw err;
        });
        return this.dataSource;
    }

    get(): DataSource {
        if (this.dataSource === undefined) throw new DatabaseNotInitializedException("Database is not initialized");
        if (!this.dataSource.isInitialized) throw new DatabaseNotInitializedException("Database is not initialized");
        return this.dataSource;
    }

    close(): void {
        if (this.dataSource === undefined) throw new DatabaseNotInitializedException("Database is not initialized");
        if (!this.dataSource.isInitialized) throw new DatabaseNotInitializedException("Database is not initialized");
        this.dataSource.destroy();
    }
}

const db = new Database();
export default db;