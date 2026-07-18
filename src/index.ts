import { iniciarServer } from "./api/server";
import { Cliente } from "./models/Cliente";
import { CategoriaCliente, EstadoCliente } from "./models/ClienteEnums";
import { Producto } from "./models/Producto";
import { Categoria, Estado } from "./models/ProductoEnums";
import { agregarCliente, buscarCliente, editarCliente, eliminarCliente, listarClientes } from "./services/ClienteServices";
import { agregarProducto, buscarProducto, calcularSubtotal, editarProducto, eliminarProducto, listarProductos } from "./services/ProductoServices";
import { rl } from "./utils/input";


async function menu() {
    let opcion = "";    
    do {
        console.log("|----------MENU----------|");
        console.log("|1. Clientes             |")
        console.log("|2. Productos            |")
        console.log("|3. Salir                |")
        console.log("|------------------------|")
        opcion = await rl.question("Seleccione opcion: ");

        switch (opcion) {
            case "1":
                await menuClientes();
                break;
            case "2":
                await menuProductos();
                break;
            case "3":
                console.log("Feliz día :)");
                break;
        }
    } while (opcion != "3");
    rl.close();
}

async function menuClientes() {
    let opcionClientes = "";
    console.clear();
    console.log("|--------CLIENTES--------|");
    console.log("|1. Agregar              |")
    console.log("|2. Editar               |")
    console.log("|3. Eliminar             |")
    console.log("|4. Buscar               |")
    console.log("|5. Listar               |")
    console.log("|6. Cancelar             |")
    console.log("|------------------------|")
    opcionClientes = await rl.question("Seleccione opción: ")

    switch (opcionClientes) {
        case "1":
            let nombre = await rl.question("Ingrese nombre: ")
            let apellido = await rl.question("Ingrese apellido: ");
            let telefono: number =  Number( await rl.question("Ingrese numero de telefono: "));
            let edad: number =  Number(await rl.question("Ingrese su edad: "));
            let dpi: number =  Number(await rl.question("Ingrese su DPI: "));
            let estado =  await rl.question( "Ingrese estado (Activo/Inactivo): ");
            let categoriaCliente = await rl.question("Ingrese categoria (Regular/Vip/Mayorista): ");

            let cliente: Cliente = {
                id: 0,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                edad: edad,
                dpi: dpi,
                estado: estado as EstadoCliente,
                categoria: categoriaCliente as CategoriaCliente
            }

            await agregarCliente(cliente);
            console.log("Cliente agregado!")
            break;
        
        case "2":
            let idEditar =  Number(await rl.question("Ingrese ID: "));
            let nombre1 = await rl.question("Ingrese nombre: ")
            let apellido1 = await rl.question("Ingrese apellido: ");
            let telefono1: number =  Number( await rl.question("Ingrese numero de telefono: "));
            let edad1: number =  Number(await rl.question("Ingrese su edad: "));
            let dpi1: number =  Number(await rl.question("Ingrese su DPI: "));
            let estado1 =  await rl.question( "Ingrese estado (Activo/Inactivo): ");
            let categoriaCliente1 = await rl.question("Ingrese categoria (Regular/Vip/Mayorista): ");

            let cliente1: Cliente = {
                id: idEditar,
                nombre: nombre1,
                apellido: apellido1,
                telefono: telefono1,
                edad: edad1,
                dpi: dpi1,
                estado: estado1 as EstadoCliente,
                categoria: categoriaCliente1 as CategoriaCliente
            }
            if (!await editarCliente(idEditar, cliente1)){
                console.log("El cliente no existe")
            } else {
                console.log("Cliente editado!")
            }
            break;
        case "3":
            let idEliminar =  Number(await rl.question("Ingrese ID: "));
            if (!await eliminarCliente(idEliminar)){
                console.log("El cliente no existe")
            } else {
                console.log("Cliente eliminado!")
            }
            break;
        case "4":
            let idBuscar =  Number(await rl.question("Ingrese ID: "));
            console.log(await buscarCliente(idBuscar));
            break;
        case "5":
            console.log(await listarClientes());
            break;
    }
}

async function menuProductos() {
    let opcionProductos = "";
    console.clear();
    console.log("|-------PRODUCTOS--------|");
    console.log("|1. Agregar              |")
    console.log("|2. Editar               |")
    console.log("|3. Eliminar             |")
    console.log("|4. Buscar               |")
    console.log("|5. Listar               |")
    console.log("|6. Consultar categorias |")
    console.log("|7. Calcular subtotal    |")
    console.log("|8. Cancelar             |")
    console.log("|------------------------|")
    opcionProductos = await rl.question("Seleccione opción: ")
    switch (opcionProductos) {
        case "1":
            let nombre = await rl.question("Ingrese nombre: ")
            let stock = Number(await rl.question("Ingrese stock: "));
            let descripcion =   await rl.question("Ingrese descripcion: ");
            let categoria =  await rl.question("Ingrese categoría (Consultar categorías disponibles): ");
            let estado = await rl.question("Ingrese estado (En venta/ Descontinuado/ Borrador)");
            let precio = Number(await rl.question("Ingrese precio: "));
            let descuento = Number(await rl.question("Ingrese descuento (0 si no quiere descuento): "))

            let producto: Producto = {
                id: 0,
                nombre: nombre,
                stock: stock,
                descripcion: descripcion,
                categoria: categoria as Categoria,
                estado: estado as Estado,
                precio: precio,
                descuento: descuento
            }

            await agregarProducto(producto);
            console.log("Producto agregado!")
            break;
        
        case "2":
            let idEditar =  Number(await rl.question("Ingrese ID: "));
            let nombre1 = await rl.question("Ingrese nombre: ")
            let stock1 = Number(await rl.question("Ingrese stock: "));
            let descripcion1 =   await rl.question("Ingrese descripcion: ");
            let categoria1 =  await rl.question("Ingrese categoría (Consultar categorías disponibles): ");
            let estado1 = await rl.question("Ingrese estado (En venta/ Descontinuado/ Borrador)");
            let precio1 = Number(await rl.question("Ingrese precio: "));
            let descuento1 = Number(await rl.question("Ingrese descuento (0 si no quiere descuento): "))

            let producto1: Producto = {
                id: idEditar,
                nombre: nombre1,
                stock: stock1,
                descripcion: descripcion1,
                categoria: categoria1 as Categoria,
                estado: estado1 as Estado,
                precio: precio1,
                descuento: descuento1
            }
            if (!await editarProducto(idEditar, producto1)){
                console.log("El producto no existe")
            } else {
                console.log("Producto editado!")
            }
            break;
        case "3":
            let idEliminar =  Number(await rl.question("Ingrese ID: "));
            if (!await eliminarProducto(idEliminar)){
                console.log("El producto no existe")
            } else {
                console.log("Producto eliminado!")
            }
            break;
        case "4":
            let idBuscar =  Number(await rl.question("Ingrese ID: "));
            console.log(await buscarProducto(idBuscar));
            break;
        case "5":
            console.log(await listarProductos());
            break;
        case "6":
            console.log("LISTA DE CATEGORIAS: ")
            console.log(Object.values(Categoria))
            break;
        case "7":
            let idCalculo = Number(await rl.question("Ingrese ID del producto deseado: "))
            console.log(await calcularSubtotal(idCalculo));
    }
}

async function main() {
    await iniciarServer();   
    await menu();                 
}
main();