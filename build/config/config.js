"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Config = exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _jwtSecretKey = process.env.APP_SECRET;
const _app_id = process.env.APP_ID;
const _app_password = process.env.APP_PASSWORD;
const _serverPort = process.env.PORT || 3000;
const _database_name = process.env.DATABASE_NAME;
const _database_user = process.env.DATABASE_USER;
const _database_host = process.env.DATABASE_HOST;
const _database_user_password = process.env.DATABASE_USER_PASSWORD;
exports.Config = {
    jwtSecretKey: _jwtSecretKey,
    app_id: _app_id,
    app_password: _app_password,
    serverPort: _serverPort,
};
exports.DB_Config = {
    database_name: _database_name,
    database_user: _database_user,
    database_user_password: _database_user_password,
    database_host: _database_host
};
