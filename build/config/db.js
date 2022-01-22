"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
exports.pool = new pg_1.default.Pool({
    user: "gxuxumkgsoqxeq",
    password: "8baa90a4a4ea63aba136a10cc4ef9581cccfcd774ffa8363e62d9a3ff3af3fe1",
    host: "ec2-3-210-124-68.compute-1.amazonaws.com",
    port: 5432,
    database: "d58ge8etb5oo72"
});
