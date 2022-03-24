const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

let user = localStorage.getItem("email", "password");

document.addEventListener("DOMContentLoaded", function (e) {
  let navBar = `
    <div class="container d-flex flex-column flex-md-row justify-content-between">
        <a class="py-2 d-none d-md-inline-block" href="home.html">Inicio</a>
        <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
        <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
        <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
`;

  if (user != null) {
    navBar += `
    <div class="dropdown" id='profileOptions'>
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${user}</a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
          <a class="dropdown-item" id='signout' href="index.html">Cerrar Sesión</a>
      </div>
    </div>
    `;
  } else {
    navBar += `
    <a class="py-2 d-none d-md-inline-block" id='loginButton' href="index.html">Iniciar Sesión</a>
    `;
  }

  navBar += `
  </div>
  `;
  document.getElementById("navBar").innerHTML = navBar;

  if (user != null) {
    document.getElementById("signout").addEventListener("click", function () {
      localStorage.clear();
    });
  }
});
