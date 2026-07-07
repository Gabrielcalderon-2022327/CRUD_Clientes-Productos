import { Cliente } from "../models/Cliente";
import { clientes } from "../data/Clientes";

export function listarClientes(): Cliente[] {
    return clientes;
}

export function agregarCliente(cliente: Cliente): void {
    clientes.push(cliente);
}

export function buscarCliente(id: number): Cliente | null{
    return clientes.find(c => c.id === id) || null;
}

export function eliminarCliente(id: number): boolean{
    if (id <= 0) return false;
    const index = clientes.findIndex(c => c.id === id);
    
    if (index === -1) {
        return false;
    }
    clientes.splice(index, 1);
    return true;
}


export function editarCliente(id: number, data: Partial<Cliente>): boolean{
    if (id <= 0) return false;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        return false;
    }

    clientes[index] = { ...clientes[index], ...data };
    return true;
}
