import { app } from "./app";
import dotenv from 'dotenv';
dotenv.config();

let port:any = process.env.PORT;
if (port == null || port == "") {
  console.error('PORT from env not found. Default PORT 3000 has been set');
  port = 3000;
}
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});
