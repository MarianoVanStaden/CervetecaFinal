// let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let carrito;
if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}
const totalCarrito = () => {
  return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
};

//FUNCION QUE BUSCA POR ID
const buscarIdProducto = (id) => {
  const idBuscado = carrito.find((idBuscado) => Number(idBuscado.id) === id);

  return (resultadoBusqueda = idBuscado);
};

//FUNCION PARA ELMINAR UN ITEM DEL CARRITO (UTILIZANDO ONCLICK VIA HTML CADA VEZ QUE SE GENERE UN PRODUCTO EN EL CARRITO )
const eliminarProducto = (id) => {
  const productoPorEliminar = buscarIdProducto(id);
  const indice = carrito.indexOf(productoPorEliminar);
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
};

const texto = `
        <div class='container m-3'>
            <h1 class='h5 m-1'>No hay productos en el carrito</h1>
            <a  href='index.html'>
                <button class='btn btn-primary btn-sm'>Seguir Comprando</button>
            </a>
        </div>`;

const body = document.getElementById("carrito");
if (carrito.length == 0) {
  body.innerHTML += texto;
} else {
  const titulo = `
        <div class='container cartContainer'>
            <h1 class='h5 m-1 text-center border-bottom p-3'>Carrito de compras</h1>
        </div>`;
  body.innerHTML += titulo;
  const table = `
          <div class="container">
              <button class="btn text-center btn-danger vaciando" id="vaciarCarrito">
                  Vaciar Carrito
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
              </button>
          </div>
        <div class='tableContainer container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class='txtTabla'>PRODUCTOS</th>
                        <th class='txtTabla'>CANTIDAD</th>
                        <th class='txtTabla'>PRECIO</th>
                    </tr>
                </thead>
                <tbody id='tbody' class="bg-light cuerpoCarrito">
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th class='txtTotal'>Total:</th>
                        <th class='txtTotal' id='total'>$${totalCarrito().toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
            </div>
            <div class='container mb-3 text-center'>
                <a href="index.html"> <button class='btn btn-secondary btn-sm me-2'>Seguir comprando</button></a>
                <button class='btn btn-primary me-2 btn-sm'id="finalizarCompra">Finalizar Compra</button>
            </div>
            `;
  body.innerHTML += table;
  let cart;
  const tbody = document.getElementById("tbody");
  for (let i = 0; i < carrito.length; i++) {
    const element = carrito[i];
    const {
      id,
      nombre,
      img,
      precio,
      cantidad
    } = element;
    cart = `
            <tr id=${id} class="border-bottom">
                <th><button id="deleteOne" class="borrarTrash" onclick="eliminarProducto(${id})"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg></button></th>
                <th class='detallesTabla'><img class='imgProdCart' src=${img} alt='foto del producto'><span class='nombreProd'>${nombre}</span></th>
                <th>x${cantidad} Kg</th>
                <th id="text_price_${id}">$${(cantidad * precio).toFixed(2)}</th>
            </tr>`;
    tbody.innerHTML += cart;

  }
  const deleteOne = document.getElementById("deleteOne");

  deleteCart = document.getElementById("vaciarCarrito");

  deleteCart.onclick = () => {
    carrito = [];
    //vaciar localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    body.innerHTML = ``;
    body.innerHTML += texto;
  };
  finalizarCompra = document.getElementById("finalizarCompra");
  finalizarCompra.onclick = () => {
    Swal.fire({
      icon: "success",
      title: "Gracias por tu compra",
    });
  };
}