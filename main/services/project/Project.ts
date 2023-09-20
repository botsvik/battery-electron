import path from "node:path";
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";

const APPLICATION_ID = 0xffff; // Determines sqlite db belongs to this application
const MIGRATION_HISTORY_TABLE = "__MigrationHistiry";

export class Project {
  private readonly _db: sqlite.Database;

  static async create(projectFilePath: string) {
    const db = await sqlite.open({
      filename: projectFilePath,
      driver: sqlite3.Database,
    });
    await db.migrate({
      table: MIGRATION_HISTORY_TABLE,
      migrationsPath: path.join(__dirname, "migrations"),
    });

    return new Project(db);
  }

  private constructor(db: sqlite.Database) {
    this._db = db;

    this._db.get("PRAGMA user_version").then(console.log);
    this._db.get("SELECT * FROM Settings").then(console.log);
    this._db.all("SELECT * FROM VoltageHistory").then(console.log);
  }
}
