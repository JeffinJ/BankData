"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Config = exports.Config = void 0;
const _jwtSecretKey = process.env.APP_SECRET;
const _app_id = process.env.APP_ID;
const _app_password = process.env.APP_PASSWORD;
const _serverPort = process.env.PORT || 3000;
const _database_name = process.env.DATABASE_NAME;
const _database_user = process.env.DATABASE_USER;
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
    database_user_password: _database_user_password
};
