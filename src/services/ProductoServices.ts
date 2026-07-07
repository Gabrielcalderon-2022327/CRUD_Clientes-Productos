import { Producto } from "../models/Producto";
import { leerProductos } from "../utils/reader";
import { escribirProductos } from "../utils/writer";
import { Factura } from "../models/Factura";


export async function listarProductos(): Promise<Producto[]> {
    const productos: Producto[] = await leerProductos();
    return productos;
}

export async function agregarProducto(producto: Producto): Promise<void> {
    const productos: Producto[] = await leerProductos();
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

export async function editarProducto(id: number, data: Partial<Producto>): Promise<boolean> {
    const productos: Producto[] = await leerProductos();
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos[index] = {...productos[index], ...data};
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