import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port: number = 3001;

app.use(bodyParser.json());
routes(app);

mongoose
    .connect("mongodb+srv://nguyenloisite:GjvbR4JBsia5Nejo@cluster0.herky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("====================================");
        console.log("Connect db success");
        console.log("====================================");
    })
    .catch((err: Error) => {
        console.log("====================================");
        console.log("Error :" + err.message);
        console.log("====================================");
    });

app.listen(port, () => {
    console.log("====================================");
    console.log("Server is running in PORT " + port);
    console.log("====================================");
});
