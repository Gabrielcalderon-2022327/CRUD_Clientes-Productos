import { Producto } from "../models/Producto";
import { leerProductos, escribirProductos } from "../data/ProductosRepository";
import { Factura } from "../models/Factura";
import { validarProducto } from "./validator";


export async function listarProductos(): Promise<Producto[]> {
    const productos: Producto[] = await leerProductos();
    return productos;
}

export async function agregarProducto(producto: Producto): Promise<void> {
    validarProducto(producto);
    const productos: Producto[] = await leerProductos();
    producto.id = productos.length + 1;
    productos.push(producto);
    await escribirProductos(productos);
}

export async function buscarProducto(id: number): Promise<Producto | null> {
    const productos: Producto[] = await leerProductos();
    return productos.find(p => p.id === id) || null;
}

export async function eliminarProducto(id: number): Promise<boolean> {
    const productos: Producto[] = await leerProductos();
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos.splice(index,1);
    await escribirProductos(productos);
    return true;
}

export async function editarProducto(id: number, producto: Producto): Promise<boolean> {
    validarProducto(producto);
    const productos: Producto[] = await leerProductos();
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos[index] = {...productos[index], ...producto};
    await escribirProductos(productos);
    return true;
}

export async function calcularSubtotal(id: number) {
    const producto = await buscarProducto(id);
    if (producto === null) {
        return null;
    }

    const iva = producto.precio * 0.12;
    const descuento = producto.precio * (producto.descuento * 0.01);

    const resultado: Factura = {
        "Producto" : producto.nombre,
        "Iva": iva,
        "Descuento_obtenido": descuento,
        "Subtotal" : (producto.precio - descuento) + iva
    }

    return resultado;
}