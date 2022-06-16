const productosHTML = document.getElementById("productos");
let vistaTienda = parseInt(localStorage.getItem("vista-tienda"));


escribirProductosHTML(productos, vistaTienda);

escribirModalesHTML(productos);

$("#ordenarPor").val('default');
let productosMostrados = productos;

function filtroGrupo (grupo) {
    productosMostrados = productos.filter(producto => producto.grupo.startsWith(grupo));
    productosHTML.innerHTML = "";
    (!productosMostrados.length) ? productosHTML.innerHTML = `<h4>No se encontraron ${grupo}</h4> ` : escribirProductosHTML(productosMostrados, vistaTienda);
    
    $("#ordenarPor").val('default');
};

const categorias = document.getElementsByClassName("categorias");
for (i=0; i< categorias.length; i++) {
    categorias[i].addEventListener("click", function () {
        filtroGrupo(this.id);
        window.location.hash = ""; 
    });
};

function filtroRango (){
    let valorMin = parseInt(range.noUiSlider.get()[0].slice(1));
    let valorMax = parseInt(range.noUiSlider.get()[1].slice(1));
    productosMostrados = productos.filter(producto => producto.precio >= valorMin && producto.precio <= valorMax);
    productosHTML.innerHTML = "";
    (!productosMostrados.length) ? productosHTML.innerHTML = `<h4>No se encontraron productos entre ${valorMin} y ${valorMax}</h4> ` : escribirProductosHTML(productosMostrados, vistaTienda);
};

$("#range-aplicar").change( function () {
    if ($(this).is(":checked")){
        filtroRango();
    }else{
        filtroGrupo(""); 
    }
});


document.getElementById("ordenarPor").addEventListener("change", function () {
    let productosOrdenado;
    switch (this.value) {
        case "default":
            productosOrdenado = productosMostrados.slice();
            break;
        case "low-high":
            
            productosOrdenado = productosMostrados.slice().sort((a,b)=>a.precio-b.precio);
            break;
        case "high-low":
            productosOrdenado = productosMostrados.slice().sort((a,b)=>b.precio-a.precio);
            break;
    }
    productosHTML.innerHTML = "";
    escribirProductosHTML(productosOrdenado, 4);
});


$("#vista-3").click(() =>{
    localStorage.setItem("vista-tienda", 4);
    vistaTienda = 4;
    productosHTML.innerHTML = "";
    escribirProductosHTML(productosMostrados, 4);
    $("#ordenarPor").val('default');
});
$("#vista-2").click(() =>{
    localStorage.setItem("vista-tienda", 6);
    vistaTienda = 6;
    productosHTML.innerHTML = "";
    escribirProductosHTML(productosMostrados, 6);
    $("#ordenarPor").val('default');
});


switch (window.location.hash) {
    case "#Camisas0":
        filtroGrupo("Camisas")
        break;
    case "#Remeras0":
        filtroGrupo("Remeras")
        break;
    case "#Pantalones0":
        filtroGrupo("Pantalones")
        break;
    case "#Zapatillas0":
        filtroGrupo("Zapatillas")
        break;        
};