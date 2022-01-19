import Pool from "pg";
import { DB_Config } from "./config";

export const pool = new Pool.Pool({
    user: DB_Config.database_user,
    password: DB_Config.database_user_password,
    host: DB_Config.database_host,
    port: 5432,
    database: DB_Config.database_name
});

