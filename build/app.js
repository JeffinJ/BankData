"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const validateToken_1 = require("./middleware/validateToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config/config");
exports.app = (0, express_1.default)();
const APP_ID = config_1.Config.app_id;
const APP_PASSWORD = config_1.Config.app_password;
const APP_SECRET = config_1.Config.jwtSecretKey || "dfgh";
exports.app.use(express_1.default.json());
exports.app.get('/bank/:ifsc', validateToken_1.validateToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.isValid) {
        try {
            var ifsc = request.params.ifsc;
            const bankDetails = yield db_1.pool.query("SELECT * FROM branches WHERE ifsc=$1", [ifsc]);
            // const allBanks = await pool.query("SELECT * FROM banks FETCH FIRST 10 ROW ONLY;");
            response.json(bankDetails.rows);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        response.sendStatus(403);
    }
}));
exports.app.get('/branches/:bankName/:city/:limit?/:offset?', validateToken_1.validateToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //request.isValid is the result of validateToken function.
    if (request.isValid) {
        try {
            // get parameters
            var bankName = request.params.bankName;
            var cityName = request.params.city;
            var limit = request.params.limit;
            var offset = request.params.offset;
            // get branch code with branch name.
            const branchCode = yield db_1.pool.query("SELECT * FROM banks WHERE name=$1", [bankName]);
            // get all branches with bank name and city name with Limit and offset
            const allBranches = yield db_1.pool.query("SELECT * FROM branches WHERE bank_id=$1 AND city=$2 ORDER BY state LIMIT $3 OFFSET $4", [branchCode.rows[0].id, cityName, limit, offset]);
            // send result as response    
            response.json(allBranches.rows);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        // token is not valid. send 403 Forbidden status as response.
        response.sendStatus(403);
    }
}));
exports.app.post('/getToken', (request, response) => {
    console.log(request.body);
    if (request.body.app_id == APP_ID && request.body.password == APP_PASSWORD) {
        jsonwebtoken_1.default.sign({ app_id: APP_ID }, APP_SECRET, { expiresIn: "5 days" }, (error, token) => {
            if (error) {
                console.log(error);
            }
            else {
                response.json({ "token": token });
            }
        });
    }
    else {
        response.sendStatus(403);
    }
});
exports.app.get('/', (req, res) => {
    res.send("BankDetails Application");
});
