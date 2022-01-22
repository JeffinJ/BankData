import dotenv from 'dotenv';
dotenv.config();

const _jwtSecretKey = process.env.APP_SECRET;
const _app_id = process.env.APP_ID;
const _app_password = process.env.APP_PASSWORD;
const _serverPort = process.env.PORT || 3000;
const _database_name = process.env.DATABASE_NAME;
const _database_user = process.env.DATABASE_USER;
const _database_host = process.env.DATABASE_HOST
const _database_user_password = process.env.DATABASE_USER_PASSWORD;
const _JWT_validity = process.env.JWT_TOKEN_VALIDITY;


export const Config = {
    jwtSecretKey: _jwtSecretKey,
    jwt_validity: _JWT_validity,
    app_id: _app_id,
    app_password: _app_password,
    serverPort: _serverPort,
}

export const DB_Config = {
    database_name: _database_name,
    database_user: _database_user,
    database_user_password: _database_user_password,
    database_host: _database_host
}
