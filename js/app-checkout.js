
const formulario = document.getElementById("form-checkout");
const inputOtroDomicilio = document.getElementById("alternateAddressCheckbox");
const otroDomicilio = document.getElementById("alternateAddress");
const iNombre = document.getElementById("nombre");
const iApellido = document.getElementById("apellido");
const iEmail = document.getElementById("email");
const iTel = document.getElementById("tel");
const iDni = document.getElementById("dni");
const iDomicilio = document.getElementById("domicilio");
const iCiudad = document.getElementById("ciudad");
const iProvincia = document.getElementById("provincia");
const iNombreEnvio = document.getElementById("nombreEnvio");
const iApellidoEnvio = document.getElementById("apellidoEnvio");
const iEmailEnvio = document.getElementById("emailEnvio");
const iTelEnvio = document.getElementById("telEnvio");
const iDniEnvio = document.getElementById("dniEnvio");
const iDomicilioEnvio = document.getElementById("domicilioEnvio");
const iCiudadEnvio = document.getElementById("ciudadEnvio");
const iProvinciaEnvio = document.getElementById("provinciaEnvio");
const orden = document.getElementById("productos");
const infoPost = [];

let bandera = false;

ordenes[ordenes.length-1].productosOrden.forEach(producto =>{
    let liProducto = document.createElement("li");
    liProducto.className = "d-flex align-items-center justify-content-between";
    let liSeparador = document.createElement("li");
    liSeparador.className = "border-bottom my-2";
    liProducto.innerHTML = `<strong class="small font-weight-bold">(${producto.cantidadCarrito})-${producto.nombre}</strong><span class="text-muted small">$${producto.precio*producto.cantidadCarrito}</span>`;
    orden.appendChild(liProducto);
    orden.appendChild(liSeparador);
});

let porcentaje = parseInt(localStorage.getItem("desc"));

if (porcentaje > 0) {
    let descuento = document.createElement("li");
    descuento.className = "d-flex align-items-center justify-content-between mt-2";
    descuento.innerHTML = `<strong class="text-uppercase small font-weight-bold">Descuento ${porcentaje}%</strong><span>$(${ordenes[ordenes.length-1].descuentoYtotal(porcentaje)[0]})</span>`;
    orden.appendChild(descuento);
}

let total = document.createElement("li");
total.className = "d-flex align-items-center justify-content-between mt-2 p-2 bg-dark text-white";
total.innerHTML = `<strong class="text-uppercase small font-weight-bold">Total</strong><span>$${ordenes[ordenes.length-1].descuentoYtotal(porcentaje)[1]}</span>`;
orden.appendChild(total);

(inputOtroDomicilio.checked) ? otroDomicilio.classList.remove("d-none") : otroDomicilio.classList.add("d-none");
inputOtroDomicilio.addEventListener("change",()=>{
    otroDomicilio.classList.toggle("d-none");
});

formulario.addEventListener("submit", function (e){
    e.preventDefault();
    validarForm();
    if (bandera) {
        pushDatos();
        postOrden();
        finalizarOrden();
    };
});

function validarForm () {
    
    let inputs = document.getElementsByClassName("form-input");
    
    for (let input = 0; input < 8; input++){
        if (inputs[input].value == ""){
            bandera = false;
            inputs[input].classList.add("border-danger");
            Swal.fire({
                title: '<strong>Hay campos <u>vacios</u></strong>',
                icon: 'info',
                html:
                  `Revise los campos en rojo` ,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
              });
        } else{
            bandera = true;
        };
        
        inputs[input].addEventListener("change",()=>{
            if (inputs[input].value != ""){
                inputs[input].classList.remove("border-danger");
            }else{
                inputs[input].classList.add("border-danger");
            }
        })
    }
    
    if (inputOtroDomicilio.checked){
        for (let input = 8; input < 16; input++){
            if (inputs[input].value == ""){
                bandera = false;
                inputs[input].classList.add("border-danger");
                Swal.fire({
                    title: '<strong>Hay campos <u>vacios</u></strong>',
                    icon: 'info',
                    html:
                      `Revise los campos en rojo` ,
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                  });
            }else{
                bandera = true;
            };
            
            inputs[input].addEventListener("change",()=>{
                if (inputs[input].value != ""){
                    inputs[input].classList.remove("border-danger");
                }else{
                    inputs[input].classList.add("border-danger");
                }
            })
        }
    }
    
}

function pushDatos(){
    infoPost.push({
        idOrden: ordenes[ordenes.length-1].idOrden,
        productos: ordenes[ordenes.length-1].productosOrden,
        fac_nombre: iNombre.value,
        fac_apellido: iApellido.value,
        fac_email: iEmail.value,
        fac_tel: iTel.value,
        fac_dni: iDni.value,
        fac_domicilio: iDomicilio.value,
        fac_ciudad: iCiudad.value,
        fac_provincia: iProvincia.value,
        envio_nombre: iNombreEnvio.value,
        envio_apellido: iApellidoEnvio.value,
        envio_email: iEmailEnvio.value,
        envio_tel: iTelEnvio.value,
        envio_dni: iDniEnvio.value,
        envio_domicilio: iDomicilioEnvio.value,
        envio_ciudad: iCiudadEnvio.value,
        envio_provincia: iProvinciaEnvio.value
    })
}

function postOrden () {
    $.post("https://jsonplaceholder.typicode.com/posts", infoPost[0] , (response, state)=>{
    if (state === "success"){
        Swal.fire({
            title: `<strong>Orden #${response.idOrden} enviada</strong>`,
            icon: 'success',
            html:
              `Gracias ${response.fac_nombre} por su compra.
              Será redireccionado al checkout de MERCADOPAGO` ,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 2000
          }).then(()=>{
              mercadoPago()
          });
    }
})
}

const itemsToMP = ordenes[ordenes.length-1].productosOrden.map((prod)=>{
    return {
       title: prod.nombre,
       description: "",
       picture_url: "",
       category_id: prod.grupo,
       quantity: prod.cantidadCarrito,
       currency_id: "ARS",
       unit_price: prod.precio
    }
})

const mercadoPago = async () =>{
    const BACK_URL = location.href.replace("checkout.html","index.html")
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            Authorization: "Bearer TEST-3644145109317975-102219-77b7021e8fcb20c51996fe477139bc44-208599844"
        },
        body: JSON.stringify({
            items: itemsToMP,
            back_urls: {
                success: BACK_URL,
                failure: BACK_URL
            }
        })
    })
    const data = await response.json() 
    location.replace(data.init_point)  
};