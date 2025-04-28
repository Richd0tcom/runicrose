import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import routes from "./router";
import { Authorize } from "./common/middleware/auth.middleware";
import { errorHandlingMiddleware } from "./common/middleware/error.middleware";
import { createServer } from "node:http";
import { Server } from "ws"
import path from "node:path";


//TODO: add cors

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));

app.use(Authorize())

app.use('/api',routes);


app.use(errorHandlingMiddleware)

const httpServer = createServer(app)
export const wss = new Server({
    server: httpServer
})

export default httpServer;