import jwt from "jsonwebtoken";
import 'dotenv/config'
import { Config } from "../config/config";

const APP_SECRET = Config.jwtSecretKey;

export function validateToken(req: any, res: any, next: any) {
    const bearerHeader: string = req.headers['authorization'];
    if (bearerHeader == undefined || bearerHeader == '') {
        res.sendStatus(403);
    } else {
        if (APP_SECRET) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            let validToken: boolean = false;
            jwt.verify(bearerToken, APP_SECRET, (error: any, data: any) => {
                if (error) {
                    res.status(403).json({ "error": "Invalid JWT Token" });
                } else {
                    validToken = true;
                }
            });
            // Return isValid flag value with the request data.
            req.isValid = validToken;
            next();
        }
        else {
            res.status(500).json({ "error": "APP_SECRET not found!" })
        }

    }

}