// Fetch

function fetchProcess(url, f) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      f(data);
      return data;
    });
}

// Funcion que muestra el score de comentario en estrellas

function scoreToStars(score) {
  let scoreInStars = "";
  for (let i = 0; i < score; i++) {
    scoreInStars += `
    <i class="fas fa-star"></i>
    `;
  }
  return scoreInStars;
}

// Funcion que muestra el producto en HTML

function productInfoToHtml(productData) {
  return `
  <div class="container-fluid pt-4 pl-5">
    <div class="row">
      <div class="col-md-6 text-center">
        <h1 class='font-weight-bolder'>${productData.name}</h1>
      </div>
    </div>
  </div>
  <div class="container pt-4">
      <div class='row'>
        <div class='col-md-6 justify-content-center'>
          <div class="pro-img-details">
            <img src="${productData.images[0]}" alt="" class="img-fluid">
          </div>
        </div>
        <div class='col-md-6'>
          <p class='card-text'>${productData.description}</p>
          <div class='col'>
            <div class="d-flex justify-content-end">
              <h6 class="card-subtitle mb-2 text-muted align-content-end">${productData.soldCount} unidades vendidas</h6>
            </div>
          </div>
          <div clas='col'>
            <div class="d-flex pb-1">
              <h6 class="card-subtitle mb-2 align-content-end">Categoría: ${productData.category}</h6>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title font-weight-bold pt-2">Precio:</h5>
                  <h5>${productData.currency} ${productData.cost}</h5>
                </div>
              </div>
            </div>
            <div class="col pl-4">
              <div d-flex class="pt-4 pl-4">
                <button type="button" class="btn btn-primary">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Funcion que convierte un comentario a HTML

function commentToHtml(comment) {
  return `
    <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center"> <img src="https://thumbs.dreamstime.com/z/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg" width="30" class="user-img rounded-circle mr-2"> 
                <span class=''>
                    <small class="font-weight-bold text-primary">${comment.user}</small> 
                    <small class="font-weight-bold">${comment.description}</small>
                    <small class="font-weight-light">● ${comment.dateTime}</small>
                   
                </span>
            </div>
        </div>
        <div class='col d-flex justify-content-center'>
          <div class='row'>
            ${scoreToStars(comment.score)} 
          </div>
        </div> 
    </div>
    <br>    
    `;
}

// Funcion que convierte Productos Relacionados a HTML

function relatedProductsToHtml(relatedProducts) {
  return `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${relatedProducts[0].imgSrc}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${relatedProducts[0].name}</h5>
        <p class='text-light'>${relatedProducts[0].description}</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="${relatedProducts[1].imgSrc}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>${relatedProducts[1].name}</h5>
        <p class='text-light'>${relatedProducts[1].description}</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
  `;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Variables

  let commentsUrl = "http://localhost:3000/comments";
  let productInfoUrl = "http://localhost:3000/product_info";
  let productsUrl = "http://localhost:3000/products";

  let commentsView = document.getElementById("showComments");
  let productInfoView = document.getElementById("showProductInfo");
  let relatedProductView = document.getElementById("showRelatedProducts");

  // Funciones que muestran los datos en HTML

  function updateProductInfo(info) {
    productInfoView.innerHTML = productInfoToHtml(info);
  }

  function updateCommentsView(comments) {
    let commentsHTML = "";
    for (let i = 0; i < comments.length; i++) {
      commentsHTML += commentToHtml(comments[i]);
    }
    commentsView.innerHTML = commentsHTML;
  }

  function updateRelatedProductsView(info) {
    relatedProductView.innerHTML = relatedProductsToHtml(info);
  }

  // Mostrar info y productos relacionados

  fetchProcess(productInfoUrl, updateProductInfo).then((productInfo) => {
    function getRelatedProducts(productsList) {
      let listRelatedProducts = [];
      productInfo.relatedProducts.forEach((i) => {
        listRelatedProducts.push(productsList[i]);
      });

      updateRelatedProductsView(listRelatedProducts);
    }
    fetchProcess(productsUrl, getRelatedProducts);
  });

  // Mostrar comentarios

  fetchProcess(commentsUrl, updateCommentsView);

  // Guardar comentario y mostrarlo

  document.getElementById("submitComment").addEventListener("click", function () {
    localStorage.setItem("newComment", document.getElementById("inputComment").value);
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("score", document.getElementById("score").value);
    localStorage.setItem("date", document.getElementById("submitComment").value);
    let descriptionComment = localStorage.getItem("newComment");
    let name = localStorage.getItem("name");
    let score = localStorage.getItem("score");
    let date = localStorage.getItem("date");
    let newComment = `
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center"> <img src="https://thumbs.dreamstime.com/z/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg" width="30" class="user-img rounded-circle mr-2"> 
                <span class=''>
                    <small class="font-weight-bold text-primary">${name}</small> 
                    <small class="font-weight-bold">${descriptionComment}</small>
                    <small class="font-weight-light">● ${date}</small>
                   
                </span>
            </div>
        </div>
        <div class='col d-flex justify-content-center'>
          <div class='row'>
            ${scoreToStars(score)} 
          </div>
        </div> 
      </div>
      <br>
      `;
    commentsView.innerHTML += newComment;
    document.getElementById("inputComment").value = "";
    document.getElementById("name").value = "";
    document.getElementById("score").value = "";
  });
});
