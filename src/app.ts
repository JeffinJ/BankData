import express from "express";
import { pool } from "./config/db";
import { validateToken } from "./middleware/validateToken";
import jwt from "jsonwebtoken";
import { Config } from "./config/config";

export const app = express();

const APP_ID = Config.app_id;
const APP_PASSWORD = Config.app_password;
const APP_SECRET = Config.jwtSecretKey || "dfgh";

app.use(express.json());

app.get('/bank/:ifsc', validateToken, async (request: any, response) => {
    if (request.isValid) {
        try {
            var ifsc = request.params.ifsc;
            const bankDetails = await pool.query("SELECT * FROM branches WHERE ifsc=$1", [ifsc]);
            // const allBanks = await pool.query("SELECT * FROM banks FETCH FIRST 10 ROW ONLY;");
            response.json(bankDetails.rows);
        } catch (error) {
            console.error(error);
        }
    } else {
        response.sendStatus(403);
    }
});

app.get('/branches/:bankName/:city/:limit?/:offset?', validateToken, async (request: any, response) => {

    //request.isValid is the result of validateToken function.
    if (request.isValid) {

        try {
            // get parameters
            var bankName = request.params.bankName;
            var cityName = request.params.city;
            var limit = request.params.limit;
            var offset = request.params.offset;

            // get branch code with branch name.
            const branchCode = await pool.query("SELECT * FROM banks WHERE name=$1", [bankName]);

            // get all branches with bank name and city name with Limit and offset
            const allBranches = await pool.query("SELECT * FROM branches WHERE bank_id=$1 AND city=$2 ORDER BY state LIMIT $3 OFFSET $4",
                [branchCode.rows[0].id, cityName, limit, offset]);

            // send result as response    
            response.json(allBranches.rows);
        } catch (error) {
            console.error(error);
        }

    }
    else {

        // token is not valid. send 403 Forbidden status as response.
        response.sendStatus(403);
    }

});

app.post('/getToken', (request, response) => {
    console.log(request.body);
    if (request.body.app_id == APP_ID && request.body.password == APP_PASSWORD) {
        jwt.sign({ app_id: APP_ID }, APP_SECRET, { expiresIn: "5 days" }, (error, token) => {
            if (error) {
                console.log(error);
            } else {
                response.json({ "token": token });
            }
        });
    }
    else {
        console.log('😡');
        console.log(APP_ID);
        console.log(APP_PASSWORD);
        
        response.sendStatus(403);
    }
});