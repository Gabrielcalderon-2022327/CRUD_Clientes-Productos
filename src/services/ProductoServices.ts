import { Producto } from "../models/Producto";
import { productos } from "../data/Productos";
import { Factura } from "../models/Factura";


export function listarProductos(): Producto[] {
    return productos;
}

export function agregarProductos(producto: Producto): void {
    productos.push(producto);
}

export function buscarProducto(id: number): Producto | null{
    return productos.find(p => p.id === id) || null;
}

export function eliminarProducto(id: number): boolean {
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos.splice(index,1);
    return true;
}

export function editarProducto(id: number, data: Partial<Producto>): boolean {
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos[index] = {...productos[index], ...data};
    return true;
}

export function calcularSubtotal(id: number) {
    const producto = buscarProducto(id);

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