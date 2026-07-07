import { writeFile } from "fs/promises";
import { Cliente } from "../models/Cliente";
import { Producto } from "../models/Producto";

export async function escribirClientes(clientes: Cliente[]) {
    await writeFile("./src/data/Clientes.json", JSON.stringify(clientes, null, 2));
}

export async function escribirProductos(productos: Producto[]) {
    await writeFile( "./src/data/Productos.json", JSON.stringify(productos, null, 2) );
}