import Pool from "pg";
import { DB_Config } from "./config";

export const pool = new Pool.Pool({
    user: "gxuxumkgsoqxeq",
    password: "8baa90a4a4ea63aba136a10cc4ef9581cccfcd774ffa8363e62d9a3ff3af3fe1",
    host: "ec2-3-210-124-68.compute-1.amazonaws.com",
    port: 5432,
    database: "d58ge8etb5oo72"
});

