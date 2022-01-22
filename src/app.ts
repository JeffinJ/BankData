import express from "express";
import { pool } from "./config/db";
import { validateToken } from "./middleware/validateToken";
import jwt from "jsonwebtoken";
import { Config } from "./config/config";

export const app = express();

let APP_ID = Config.app_id;
let APP_PASSWORD = Config.app_password;
let APP_SECRET = Config.jwtSecretKey;

app.use(express.json());

app.get('/bank/:ifsc', validateToken, async (request: any, response) => {
    // JWT validity is checked by validateToken 
    if (request.isValid && request.params.ifsc) {
        try {
            var ifsc = request.params.ifsc;
            if (ifsc) {
                const bankDetails = await pool.query("SELECT * FROM branches WHERE ifsc=$1", [ifsc]);
                response.json(bankDetails.rows);
            } else {
                response.json("Add IFSC code with your request to get the Bank details.")
            }

        } catch (error) {
            console.error(error);
            response.status(500).json("error");
        }
    } else {
        response.sendStatus(403);
    }
});

app.get('/branches/:bankName/:city/:limit?/:offset?', validateToken, async (request: any, response) => {

    //request.isValid is the result of validateToken function.
    if (request.isValid) {
        console.log('👍😀 Verified successfully');

        try {
            // get parameters
            var bankName = request.params.bankName;
            var cityName = request.params.city;
            var limit = request.params.limit;
            var offset = request.params.offset;

            if (bankName && cityName) {
                // get branch code with branch name.
                const branchCode = await pool.query("SELECT * FROM banks WHERE name=$1", [bankName]);

                // get all branches with bank name and city name with Limit and offset
                const allBranches = await pool.query("SELECT * FROM branches WHERE bank_id=$1 AND city=$2 ORDER BY state LIMIT $3 OFFSET $4",
                    [branchCode.rows[0].id, cityName, limit, offset]);

                // send result as response    
                response.json(allBranches.rows);
            }


        } catch (error) {
            console.error(error);
            response.sendStatus(500);
        }

    }
    else {
        // token is not valid. send 403 Forbidden status as response.
        response.sendStatus(403);
    }

});

app.post('/getToken', (request, response) => {
    APP_ID = Config.app_id;
    APP_PASSWORD = Config.app_password;
    APP_SECRET = Config.jwtSecretKey;
    if (request.body.app_id == APP_ID && request.body.password == APP_PASSWORD && APP_SECRET) {
        jwt.sign({ app_id: APP_ID }, APP_SECRET, { expiresIn: "5 days" }, (error, token) => {
            if (error) {
                console.log(error);
            } else {
                response.json({ "token": token });
            }
        });
    }
    else {
        console.log(APP_ID, APP_PASSWORD, APP_SECRET);

        response.status(403).json({ "error": "Something went wrong" });
    }
});

app.get('/', (req, res) => {
    res.send("BankDetails Application")
});
