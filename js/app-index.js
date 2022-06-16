
const productosMasVendidos = productos.slice(3,7);


escribirProductosHTML(productosMasVendidos);


escribirModalesHTML(productosMasVendidos);


$(document).ready($("#bienvenida").fadeOut(2000));


$("#portada")
    .css({
    "height": "0vh",
    })
    .animate({
    "height": "100vh",
    }, 1000);

let textoNum = 0; 
function textosPortada (i) {
    $($(".portada-text")[i]) 
    .fadeIn(1000, () => {
        const salida = () =>{ 
            $($(".portada-text")[i]).fadeOut(1000, ()=>{
                (textoNum == $(".portada-text").length-1) ? textoNum = 0 : textoNum++;
                textosPortada(textoNum);
            });
        }
        setTimeout(salida , 3000); 
    })
};
textosPortada(textoNum);

$(".portada-boton")
        .css({
            "background-color": "#343a40",
            "color": "#fff",
            "box-shadow": "0 0 10px black",
            "display": "none"
        })
        .slideDown(1200, function (){
            $(this).css({"background-color": "#b68b23"})
        });