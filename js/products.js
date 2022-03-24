// Muestra un producto representado en HTML

function productToHtml(product) {
  return `
  <div class="col-md-4">
  <div class="card mb-4 shadow-sm">
    <img class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice" focusable="false" role="img" src="${product.imgSrc}">
    <h4 class='text-center pt-4'>${product.name}</h4>
    <div class="card-body">
      <p class="card-text">${product.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location.href='/product-info.html'">Ver</button>
          <button type="button" class="btn btn-sm btn-outline-secondary" disabled>Precio: ${product.cost}</button>
        </div>
        <small class="text-muted">${product.soldCount} artículos vendidos</small>
      </div>
    </div>
  </div>
</div>
    `;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // MOSTRAR PRODUCTOS, INICIALMENTE

  let url = "http://localhost:3000/products";

  let productsData = [];

  let productsView = document.getElementById("cat-list-container");

  // Función que a partir de una lista de productos actualiza el HTML

  function updateProductsView(products) {
    let productsHTML = "";
    for (let i = 0; i < products.length; i++) {
      productsHTML += productToHtml(products[i]);
    }
    productsView.innerHTML = productsHTML;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      productsData = data;
      updateProductsView(productsData);
    });

  // FILTRAR POR RANGO DE PRECIO
  document.getElementById("buttonFilter").onclick = function () {
    let firstValue = Number(document.getElementById("firstValue").value);
    let secondValue = Number(document.getElementById("secondValue").value);

    // Filtro y luego convierto añado al HTML los filtrados
    updateProductsView(productsData.filter((product) => firstValue <= product.cost && product.cost <= secondValue));
  };

  // MOSTRAR ASCENDENTE POR PRECIO

  updateProductsView(productsData.sort((a, b) => b.cost - a.cost));

  // MOSTRAR DESCENDENTE POR PRECIO

  document.getElementById("buttonDown").onclick = function () {
    updateProductsView(productsData.sort((a, b) => a.cost - b.cost));
  };

  // MOSTRAR DESCENDENTE POR POPULARIDAD

  document.getElementById("buttonPop").onclick = function () {
    updateProductsView(productsData.sort((a, b) => b.soldCount - a.soldCount));
  };
});
