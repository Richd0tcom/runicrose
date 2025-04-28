import { IncomingMessage } from "http";
import { wss } from "../app";

import Docker from "dockerode"
import { WebSocket } from "ws";
import { Buffer } from "node:buffer"

const docker = new Docker()


// wss.on("connection", async (ws, req: IncomingMessage)=> {
//     console.log("user connection: ", ws.url)
//     try {
//         const container = await docker.createContainer({
//             Image: "node-repl-lab",
//             Cmd: ["node"],
//             Tty: true,
//             OpenStdin: true,
//             StdinOnce: false,
//             name: `repl_${(Math.random() * 300)}`,
//         })

//         await container.start()

//         const stream =  await container.attach({
//             stderr: true,
//             stdin: true,
//             stdout: true,
//             stream: true
//         })

//         container.modem.demuxStream(stream, ws, ws)

//         //TODO: handle lab history

//         ws.on("message", (msg)=>{
//             stream.write(Buffer.from(msg as Buffer))

//             //store in history
//         })

//         ws.on("close", async ()=> {
//             await container.stop();
//             await container.remove();
//         })
//     } catch (error) {
//         console.error("WebSocket error:", error);
//         ws.send("Internal error");
//         ws.close();
//     }
// })

const connectREPL = async(req: Request, res: Response):Promise<any> => {

}