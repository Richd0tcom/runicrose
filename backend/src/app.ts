import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import routes from "./router";
import { Authorize } from "./common/middleware/auth.middleware";
import { errorHandlingMiddleware } from "./common/middleware/error.middleware";
import { createServer, IncomingMessage } from "node:http";
import { WebSocketServer } from "ws"
import path from "node:path";
import Docker from "dockerode"
import { PassThrough, Stream } from "node:stream";


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
export const wss = new WebSocketServer({
    server: httpServer
})



export default httpServer;