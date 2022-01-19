import { app } from "./app";
import 'dotenv/config'

let port:any = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});
