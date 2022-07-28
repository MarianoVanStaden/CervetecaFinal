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
//     nombre: "Manzana roja",
//     precio: 15000,
//     img: "https://t1.ev.ltmcdn.com/es/posts/7/0/2/germinar_semillas_de_manzana_como_hacerlo_y_cuidados_2207_orig.jpg",
//     description: "Lorem ipsum dolor. ",
//     category: "Fruta",
//     cantidad:0,
//   },
//   {
//     id: "2",
//     nombre: "Banana",
//     precio: 2000,
//     img: "https://img.freepik.com/vector-gratis/racimo-platano-amarillo-maduro-vector-aislado-sobre-fondo-blanco_1284-45456.jpg",
//     description: "Lorem ipsum dolor. ",
//     category: "Fruta",
//     cantidad:0,
//   },
//   {
//     id: "3",
//     nombre: "Naranja",
//     precio: 80,
//     img: "https://imgs.globovision.com/Lyd_jKnB8qhC_YJOSxZJNgE1_ls=/600x0/smart/d5aaf1dbef774fedb10f2a1e95ffe53e",
//     description: "Lorem ipsum dolor. ",
//     category: "Fruta",
//     cantidad:0,
//   },
//   {
//     id: "4",
//     nombre: "Mandarina",
//     precio: 8033,
//     img: "https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2017/11/mandraina.jpg",
//     description: "Lorem ipsum dolor. ",
//     category: "Fruta",
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
      title: "Ups! No lo tenemos",
      text: "prueba con otra fruta",
    })
    limpiarContenido();
    console.log("No se encontro el producto buscado");
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