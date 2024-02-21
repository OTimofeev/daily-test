import {DatabaseConfig} from "@/utils/config";
import Database from "better-sqlite3";

export class AppDatabase {
    private readonly databaseFile: string;
    private readonly db: any;

    constructor(config: DatabaseConfig) {
        this.databaseFile = config.path;
        this.db = new Database(this.databaseFile, {verbose: console.log});
    }

    static async open(config: DatabaseConfig): Promise<AppDatabase> {
        return new AppDatabase(config);
    }
}
