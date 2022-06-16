
class Producto {
    static contadorProductos = 0;
    constructor(nombre, grupo, precio, stock=0){
        this.idProducto = ++Producto.contadorProductos;
        this.nombre = nombre.toUpperCase();
        this.grupo = grupo;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.cantidadCarrito = 0; 
    }
    disminuirStock (cantidad){
        this.stock -= parseInt(cantidad);
    }
    disponible (){
        return this.stock > 0 ? true : false;
    }
}


class Orden {
    
    static contadorOrdenes = (JSON.parse(localStorage.getItem("id-OrdenJSON")) != null) ? JSON.parse(localStorage.getItem("id-OrdenJSON")) : 1;
    constructor(){
        this.idOrden = Orden.contadorOrdenes++;
        
        this.productosOrden = [];
        this.contadorProductosAgregados = 0;
    }
    agregarProducto(producto, cantidad){
        if (isNaN(cantidad)){
            alertaInfo(`<p>Debe ingresar el NUMERO de cantidades que desea</p>`);
        }
        else if (producto.stock >= cantidad){
            
            if (this.productosOrden.some(prod => prod.idProducto == producto.idProducto)){
                let posicionProductoEnLaOrden = this.productosOrden.indexOf(producto);
                this.productosOrden[posicionProductoEnLaOrden].cantidadCarrito += cantidad;
            }
            
            else{
                this.productosOrden.push(producto);
                this.productosOrden[this.productosOrden.length-1].cantidadCarrito += cantidad;
            }
            producto.disminuirStock(cantidad);
            this.contadorProductosAgregados += parseInt(cantidad);
        }
    }
    borrarProducto (producto){
        let posicionProductoEnLaOrden = this.productosOrden.indexOf(producto);
        this.productosOrden.splice(posicionProductoEnLaOrden, 1);
        actualizarLocalStorage();
        location.reload();
    }
    calcularTotal(){
        let total = 0;
        for (let producto of this.productosOrden){
            total += producto.precio * producto.cantidadCarrito;
        }
        return total;
    }
    descuentoYtotal(porcentaje=0){
        let base = this.calcularTotal();
        let descuento = base*porcentaje/100;
        let total = base - descuento;
        const descuentoOrden = [descuento, total];
        return descuentoOrden; 
    }
}


const productos = []


productos.push(new Producto("Air Force Goretex", "Zapatillas-AirForce", 2800, 7));
productos.push(new Producto("Zapatillas Nike SB Dunk", "Zapatillas-SbDunk", 4500, 3));
productos.push(new Producto("Remera Levis azul", "Remeras-Estampadas", 1500, 2));
productos.push(new Producto("Camisa de fibrana MC", "Camisas-Fibrana", 2500, 3));
productos.push(new Producto("Remera VANS estampada", "Remeras-Estampadas", 1800));
productos.push(new Producto("Zapatillas Nike SB Dunk gris", "Zapatillas-SbDunk", 4500, 4));
productos.push(new Producto("Jogger Gabardina negro AM", "Pantalones-Joggers", 2500, 2));
productos.push(new Producto("Zapatillas Nike SB Dunk Green Eyes", "Zapatillas-SbDunk", 4500, 1));
productos.push(new Producto("Remera VANS estampada", "Remeras-Estampadas", 1800,5));
productos.push(new Producto("Jean Deep Chupin con roturas", "Pantalones-Jeans", 3000, 1));
productos.push(new Producto("Camisa de fibrana MC", "Camisas-Fibrana", 2500, 3));
productos.push(new Producto("Camisa de fibrana MC", "Camisas-Fibrana", 2500));


const ordenes = []

ordenes.push(new Orden())
if(JSON.parse(localStorage.getItem("id-OrdenJSON")) != null){
    ordenes[ordenes.length-1].idOrden = JSON.parse(localStorage.getItem("id-OrdenJSON"));
}

if(JSON.parse(localStorage.getItem("id-OrdenJSON")) != null){
    for (let producto of JSON.parse(localStorage.getItem("productos-OrdenJSON"))){
        let articuloSeleccionado = producto.idProducto-1;
        let cantidadSeleccionada = producto.cantidadCarrito;
        ordenes[ordenes.length-1].agregarProducto(productos[articuloSeleccionado], cantidadSeleccionada);
    }
}


function actualizarLocalStorage () {
    
    localStorage.setItem("id-OrdenJSON", JSON.stringify(ordenes[ordenes.length-1].idOrden));
    localStorage.setItem("productos-OrdenJSON", JSON.stringify(ordenes[ordenes.length-1].productosOrden));
    localStorage.setItem("contador-OrdenJSON", JSON.stringify(ordenes[ordenes.length-1].contadorProductosAgregados));
}


function comprar (idProducto, cantidad=1) {
    
    (!ordenes.length) ? ordenes.push(new Orden()) : console.log(`Se continuara agregando productos a la orden n° ${ordenes.length}`) ;
    let articuloSeleccionado = idProducto-1;
    let cantidadSeleccionada = cantidad;
    if (productos[articuloSeleccionado].stock >= cantidadSeleccionada){
        if (cantidadSeleccionada > 0){
            alertaInfo(`<p>Usted añadio ${cantidad} unidades de ${productos[articuloSeleccionado].nombre} al carrito</p>`); 
        }else if (cantidadSeleccionada < 0){
            alertaInfo(`<p>Usted quitó ${-cantidad} unidades de ${productos[articuloSeleccionado].nombre} del carrito</p>`); 
        }
    }
    else {
        alertaInfo(`<p>NO hay suficiente stock disponible. Quedan ${productos[articuloSeleccionado].stock} unidades</p>`); 
    };
    ordenes[ordenes.length-1].agregarProducto(productos[articuloSeleccionado], cantidadSeleccionada);
    actualizarLocalStorage();

    navCarrito.innerHTML = `Carrito (${ordenes[ordenes.length-1].contadorProductosAgregados})`
}


function finalizarOrden (){
    ordenes.push(new Orden());
    actualizarLocalStorage();
}


const dialogoInfo = document.getElementById("dialogoInfo");
function verAlerta() {
    dialogoInfo.classList.toggle("dialogoInfo-active");
}
let identificadorDeTemporizador;
function temporizadorAlerta() {
  identificadorDeTemporizador = setTimeout(verAlerta, 2000);
}
function alertaInfo(contenidoHTML){
    dialogoInfo.innerHTML = contenidoHTML;
    verAlerta();
    temporizadorAlerta();
}