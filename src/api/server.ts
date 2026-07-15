import { createServer } from "node:http";
import { router } from "./router";
const PORT = 3000;

const server = createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log("--------------------------------");
    console.log("SERVER INCIADO");
    console.log(`PUERTO: ${PORT}`);
    console.log("URL: http://localhost:" + PORT);
    console.log("--------------------------------");
});   