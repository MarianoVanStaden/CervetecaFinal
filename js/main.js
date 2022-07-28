// const peticion = async () => {
//     const resp = await
//     fetch('./local.json')
//     const data = await resp.json()
//     productos.push(...data)
//     desplegarProductos()
// }
// peticion()
// let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// let productos = [
//   {
//     id: "1",
//     nombre: "Kolsch",
//     precio: 200,
//     img: "https://www.alpuntodeventa.com.ar/wp-content/uploads/2297.jpg.webp",
//     description: "Escocia es tierra de cebada y la Scotch Ale lleva ese paisaje impregnado en su código genético. Rubí intenso. Seis grados de alcohol. Dulce y maltosa. La Antares más servida en nuestro Brewpub. Una fórmula a prueba del paso del tiempo.",
//     category: "Cerveza",
//     cantidad:0,
//   },
//   {
//     id: "2",
//     nombre: "Scotch",
//     precio: 240,
//     img: "https://www.cervezaantares.com/storage/app/uploads/public/615/715/9d9/6157159d9eaa7877306405.png",
//     description: "Lorem ipsum dolor. ",
//     category: "Cerveza",
//     cantidad:0,
//   },
//   {
//     id: "3",
//     nombre: "Porter",
//     precio: 260,
//     img: "https://www.cervezaantares.com/storage/app/uploads/public/615/71a/d71/61571ad71dae6402852456.png",
//     description: "Maltas oscuras. Sabor y aroma penetrante y nocturno. Chocolate, azúcar negro y café. La Porter es la cerveza tributo de Antares a la cultura de los primeros pubs en el puerto de Londres. Cheers.",
//     category: "Cerveza",
//     cantidad:0,
//   },
//   {
//     id: "4",
//     nombre: "Juice IPA",
//     precio: 300,
//     img: "https://www.cervezaantares.com/storage/app/uploads/public/61e/864/220/61e864220e306853000322.png",
//     description: "Una American IPA con sabores y aromas frutales intensos, cuerpo suave y sensación en boca con textura delicada, turbia. Se percibe menos amargor que en las IPAs tradicionales, pero el lúpulo siempre es dominante.",
//     category: "Cerveza",
//     cantidad:0,
//   },
// ];

let productos = fetch("./productos.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data;
    desplegarProductos(productos);
  });

//FUNCION PARA LIMPIAR EL CONTENIDO DEL CONTAINER PARA RENDERIZAR LUEGO
const limpiarContenido = () => {
  container.innerHTML = "";
};

//FUNCION PARA BUSCAR PRODUCTO POR NOMBRE Y MOSTRARLO.
const buscarNombreProducto = (nombre) => {
  const nombreBuscado = productos.find(
    (nombreBuscado) => nombreBuscado.nombre.toLowerCase() === nombre
  );
  if (nombreBuscado) {
    limpiarContenido();
    desplegarProductos([nombreBuscado]);
    return (resultadoBusqueda = nombreBuscado);
  } else {
    Swal.fire({
      icon: "error",
      title: "Ups! No la tenemos",
      text: "prueba con otra cerveza",
    })
    limpiarContenido();
    console.log("No se encontro la cerveza buscada");
    desplegarProductos(productos);
  }
};
const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("search-button");

//ESCUCHAMOS EL CLICK EN EL BOTON DE BUSCAR Y EJECUTAMOS LA FUNCION
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let resultadoBusqueda = buscarNombreProducto(inputSearch.value);
  console.log(resultadoBusqueda);
});

let carrito;
if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

function desplegarProductos(productos) {
  for (let i = 0; i < productos.length; i++) {
    const element = productos[i];
    const { id, nombre, precio, img, description } = element;
    const card = `
  
    <article class="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
      <div class="card">
        <div class="border-bottom d-flex justify-content-center align-content-center">
          <img class="rounded mt-2 d-flex justify-content-center align-content-center img-fluid"   src="${img}" alt="">
        </div>
        <div class="card-body">
          <div class="badge bg-infox text-wrap fw-normal text-uppercase mb-2">
            OFERTA DEL MES
          </div>
          <h5 class="h4">${nombre}</h5>
          <div class="fw-bold mb-2 text-primary price">$ ${precio.toFixed(
            2
          )} <span class="text-success small fst-italic fw-normal descuento" >50% OFF</span>
          </div>
          
          <div class="card-text description">${description}</div>
          <button id=${id} class="btn btn-primary btn-sm btnAgregar float-left mt-2 mb-2">Agregar al Carrito</button>
        </div>
      </div>
    </article>
`;
    const container = document.getElementById("container");
    container.innerHTML += card;
  }

  const btnAgregar = document.getElementsByClassName("btnAgregar");

  for (let i = 0; i < btnAgregar.length; i++) {
    const element = btnAgregar[i];
    element.addEventListener("click", agregarAlCarrito);
  }
}

desplegarProductos(productos);

function agregarAlCarrito(e) {
  const btn = e.target;
  const id = btn.getAttribute("id");
  const prodEncontrado = productos.find((item) => item.id == id);
  const enCarrito = carrito.find((prod) => prod.id == prodEncontrado.id);

  if (!enCarrito) {
    carrito.push({ ...prodEncontrado, cantidad: 1 });
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ];
  }

  //OPERADOR TERNARIO
// let carritoFiltrado;
// !enCarrito  ? carrito.push({ ...prodEncontrado, cantidad: 1 }) :
//   carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
//     carrito = [
//       ...carritoFiltrado,
//       { ...enCarrito, cantidad: enCarrito.cantidad + 1 }
//     ];

  Swal.fire({
    icon: "success",
    title: "Agregaste un item al carrito!",
    text: "Quieres seguir comprando?",
    footer: '<a href="carrito.html">Finalizar mi compra</a>',
  });
  console.log(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

const contador = document.getElementById("cartCounter");
contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
