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

const docker = new Docker()

wss.on("connection", async (ws, req: IncomingMessage)=> {
    console.log("user connection: ", ws.url)
    try {
        const container = await docker.createContainer({
            Image: "node-repl-lab",
            Cmd: ["node"],
            Tty: true,
            OpenStdin: true,
            StdinOnce: false,
            name: `repl_${Math.floor(Math.random() * 300)}`,
        })

        await container.start()

        const stream =  await container.attach({
            stderr: true,
            stdin: true,
            stdout: true,
            stream: true
        })

        container.modem.demuxStream(stream, ws, ws)

        //TODO: handle lab history

        stream.on("data", (data)=>{
            ws.send(data.toString())
        })
        ws.on("message", (msg)=>{
            console.log("msg : ",msg)
            stream.write(msg as any)
            ws.send(msg)
            //store in history
        })

        ws.on("close", async ()=> {
            await container.stop();
            await container.remove();
        })
    } catch (error) {
        console.error("WebSocket error:", error);
        ws.send("Internal error");
        ws.close();
    }
})

export default httpServer;