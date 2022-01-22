"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let port = process.env.PORT;
if (port == null || port == "") {
    console.error('PORT from env not found. Default PORT 3000 has been set');
    port = 3000;
}
app_1.app.listen(port, () => {
    console.log(`App started on port ${port}`);
});
