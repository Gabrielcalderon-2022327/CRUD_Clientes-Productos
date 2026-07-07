import { readFile } from "fs/promises";

export async function leerClientes() {
    const data = await readFile("./src/data/Clientes.json", "utf8");
    return JSON.parse(data);
}

export async function leerProductos() {
    const data = await readFile("./src/data/Productos.json", "utf8");
    return JSON.parse(data);
}