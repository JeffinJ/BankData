import Pool from "pg";
import { DB_Config } from "./config";

export const pool = new Pool.Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "indian_banks"
});

