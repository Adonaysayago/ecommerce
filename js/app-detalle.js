
const detalle = document.getElementById("detalle");

let seleccionado = Number(localStorage.getItem("detalle-id"))-1;
detalle.innerHTML = `
            <div class="col-lg-6">
              <!-- PRODUCT SLIDER-->
              <div class="row m-sm-0">
                <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                  <div class="owl-thumbs d-flex flex-row flex-sm-column" data-slider-id="1">
                    <div class="owl-thumb-item flex-fill mb-2 me-2 me-sm-0"><img class="w-100" src="img/product-${productos[seleccionado].idProducto}-detail-1.jpg" alt="${productos[seleccionado].nombre}"></div>
                    <div class="owl-thumb-item flex-fill mb-2 me-2 me-sm-0"><img class="w-100" src="img/product-${productos[seleccionado].idProducto}-detail-2.jpg" alt="${productos[seleccionado].nombre}"></div>
                    <div class="owl-thumb-item flex-fill mb-2 me-2 me-sm-0"><img class="w-100" src="img/product-${productos[seleccionado].idProducto}-detail-3.jpg" alt="${productos[seleccionado].nombre}"></div>
                  </div>
                </div>
                <div class="col-sm-10 order-1 order-sm-2">
                  <div class="owl-carousel product-slider" data-slider-id="1"><a class="d-block" href="img/product-${productos[seleccionado].idProducto}-detail-1.jpg" data-lightbox="product-${productos[seleccionado].idProducto}" title="${productos[seleccionado].nombre}"><img class="img-fluid" src="img/product-${productos[seleccionado].idProducto}-detail-1.jpg" alt="${productos[seleccionado].nombre}"></a><a class="d-block" href="img/product-${productos[seleccionado].idProducto}-detail-2.jpg" data-lightbox="product-${productos[seleccionado].idProducto}" title="${productos[seleccionado].nombre}"><img class="img-fluid" src="img/product-${productos[seleccionado].idProducto}-detail-2.jpg" alt="${productos[seleccionado].nombre}"></a><a class="d-block" href="img/product-${productos[seleccionado].idProducto}-detail-3.jpg" data-lightbox="product-${productos[seleccionado].idProducto}" title="${productos[seleccionado].nombre}"><img class="img-fluid" src="img/product-${productos[seleccionado].idProducto}-detail-3.jpg" alt="${productos[seleccionado].nombre}"></a></div>
                </div>
              </div>
            </div>
            <!-- DETALLES DE PRODUCTOS -->
            <div class="col-lg-6">
              <ul class="list-inline mb-2">
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star-half-alt small text-warning"></i></li>
              </ul>
              <h1>${productos[seleccionado].nombre}</h1>
              <p class="text-muted lead">$${productos[seleccionado].precio}.-</p>
              <p class="text-small mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
              <div class="row align-items-stretch mb-4">
                <div class="col-sm-5 pr-sm-0">
                  <div class="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white"><span class="small text-uppercase text-gray me-4 no-select">CANTIDAD</span>
                    <div class="quantity">
                      <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                      <input id="cantidad-detalle-${productos[seleccionado].idProducto}" class="form-control border-0 shadow-0 p-0" type="text" value="1">
                      <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3 pl-sm-0"><a id="agregarProducto-${productos[seleccionado].idProducto}-detalle" class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">Agregar al carrito</a></div>
              </div><a class="btn btn-link text-dark p-0 mb-4" href="#"><i class="far fa-star me-2"></i>Añadir a favoritos</a><br>
              <ul class="list-unstyled small d-inline-block">
                <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">idProducto: </strong><span class="ms-2 text-muted">${productos[seleccionado].idProducto}</span></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Categoria: </strong><a class="reset-anchor ms-2" href="#">${productos[seleccionado].grupo}</a></li>
              </ul>
            </div>`;


const productosRelacionados = productos.slice(2,6);

escribirProductosHTML(productosRelacionados);

escribirModalesHTML(productosRelacionados);


$(`#agregarProducto-${productos[seleccionado].idProducto}-detalle`).on('click', function () {
    const cantidad = parseInt($(`#cantidad-detalle-${productos[seleccionado].idProducto}`).val());
    comprar(productos[seleccionado].idProducto, cantidad);
});