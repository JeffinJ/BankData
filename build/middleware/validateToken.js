"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const config_1 = require("../config/config");
const APP_SECRET = config_1.Config.jwtSecretKey;
function validateToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader == undefined || bearerHeader == '') {
        res.sendStatus(403);
    }
    else {
        console.log(APP_SECRET);
        if (APP_SECRET) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            let validToken = false;
            jsonwebtoken_1.default.verify(bearerToken, APP_SECRET, (error, data) => {
                if (error) {
                    console.error("Something went wrong while verifying JWT Token");
                }
                else {
                    validToken = true;
                }
            });
            req.isValid = validToken;
            next();
        }
        else {
            res.json("SECRET NOT FOUND");
        }
    }
}
exports.validateToken = validateToken;
