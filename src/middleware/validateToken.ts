import jwt from "jsonwebtoken";
import 'dotenv/config'
import { Config } from "../config/config";

const APP_SECRET = Config.jwtSecretKey;

export function validateToken(req: any, res: any, next: any) {
    const bearerHeader: string = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader == undefined || bearerHeader == '') {
        res.sendStatus(403);
    } else {
        console.log(APP_SECRET);

        if (APP_SECRET) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            let validToken: boolean = false;
            jwt.verify(bearerToken, APP_SECRET, (error: any, data: any) => {
                if (error) {
                    console.error("Something went wrong while verifying JWT Token");
                } else {
                    validToken = true;
                }
            });

            req.isValid = validToken;
            next();
        }
        else {
            res.json("SECRET NOT FOUND")
        }

    }

}