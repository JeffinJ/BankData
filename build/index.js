"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv/config");
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app_1.app.listen(port, () => {
    console.log(`App started on port 3000`);
});
