import { IncomingMessage } from "http";
import { wss } from "../app";

import Docker from "dockerode"
import { PassThrough } from "node:stream";

const docker = new Docker()


wss.on("connection", async (ws, req: IncomingMessage)=> {
    console.log("user connection: ", req.url)
    try {
        const container = await docker.createContainer({
            Image: "node-repl-lab",
            Cmd: ["node"],
            Tty: true,
            // AttachStdin: true,
            OpenStdin: true,
            StdinOnce: false,
            name: `repl_${Math.floor(Math.random() * 300)}`,
        })

        await container.start()

        const stream =  await container.attach({
            stderr: true,
            stdin: true,
            stdout: true,
            stream: true,
            hijack: true
        })

        stream.write("console.log('Hello from container');\n");
        // Create output streams that will forward to WebSocket
        const stdout = new PassThrough()
        const stderr = new PassThrough()

        // container.modem.demuxStream(stream, ws, ws)

        
        container.modem.demuxStream(stream, stdout, stderr)

        //TODO: handle lab history

        stream.on("data", (data)=> {
            console.log(typeof data)
            console.log(data.toString())
            ws.send(data.toString())
        })


        stdout.on("data", (chunk)=>{
            ws.send(chunk.toString())
        })

       stderr.on("data", (chunk)=> {
            ws.send(chunk.toString())
        })
        ws.on("message",  (msg)=>{
            console.log(msg.toString())
            let input = msg.toString()

            stream.write(input, (e)=>{
                if (e) console.log("write error: ", e);
                
            })

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

const connectREPL = async(req: Request, res: Response):Promise<any> => {

}