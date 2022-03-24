/// Variables

var receivedData = [];
var unitPrice;
var allUnitsPrice;
var subtotalPrice = 0;
var identifiedItems = new Map();
var htmlContent = "";
var cartView = document.getElementById("cartContent");
var obj = {};

function calcAllUnits(unitCost, i) {
  let selectedQuantity = document.getElementById(`quantity${i}`).value;
  let quantityValue = document.getElementById(`quantityValue${i}`);
  let unitPriceValue = document.getElementById(`unitPrice${i}`);
  let unitPriceCurrency = unitPriceValue.getAttribute("value");
  let quantityCost = unitCost * selectedQuantity;
  if (unitPriceCurrency == "USD") {
    quantityValue.innerHTML = quantityCost * 40;
  } else {
    quantityValue.innerHTML = quantityCost;
  }
  calcSubtotal();
}

function calcSubtotal() {
  let subtotalPrice = 0;
  let totals = document.getElementsByClassName("totalUnitsPrice");

  for (let i = 0; i < totals.length; i++) {
    subtotalPrice += parseInt(totals[i].innerHTML);
  }

  document.getElementById("subTotal").innerHTML = subtotalPrice;
  obj = {
    subtotalPreliminar: subtotalPrice,
  };
}

function inPesos(costo, cantidad, currency) {
  if (currency === "USD") {
    let finalCost = costo * 40;
    return finalCost * cantidad;
  } else {
    return costo * cantidad;
  }
}

function productsInCartToHtml(cartContent) {
  for (let i = 0; i < cartContent.length; i++) {
    htmlContent += `
    <tr>
        <td>
            <div class="product-item">
                <a class="product-thumb" href="#"><img src="${cartContent[i].src}"
                    alt="Product"></a>
                <div class="product-info">
                  <h4 class="product-title"><a href="#">${cartContent[i].name}</a></h4><span><em>Precio:</em>
                  <div id='unitPrice${i}' value='${cartContent[i].currency}'>${cartContent[i].currency} ${cartContent[i].unitCost}</div></span>
                </div>
            </div>
        </td>
        <td class="text-center" onchange='calcAllUnits(${cartContent[i].unitCost}, ${i})'>
            <div class="count-input">
                <input class="form-control selectQuantity" min='1' id='quantity${i}' type='number' value='${cartContent[i].count}'></input>
            </div>
        </td>
        <td class="text-center text-lg text-medium product-total"> $ <span class ='totalUnitsPrice' id='quantityValue${i}'> ${inPesos(
      cartContent[i].unitCost,
      cartContent[i].count,
      cartContent[i].currency
    )}</span>
        </td>
        <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a>
        </td>
    </tr>
    `;
  }
  document.getElementById("cartContent").innerHTML = htmlContent;
  calcSubtotal();
}

//DOMCONTENTLOADED FROM HERE
document.addEventListener("DOMContentLoaded", function (e) {
  let cartJSON = "http://localhost:3000/cart_products";

  // Fetch

  fetch(cartJSON)
    .then((response) => response.json())
    .then((data) => {
      receivedData = data.articles;
      productsInCartToHtml(receivedData);
    });

  $(".shippingInput").change(function () {
    var radios = document.getElementsByClassName("shippingInput");
    var value;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].type === "radio" && radios[i].checked) {
        value = radios[i].value;
      }
    }
    value = value / 100;
    subtotalPrice = obj.subtotalPreliminar;
    subtotalPrice += subtotalPrice * value;
    document.getElementById("subTotal").innerHTML = subtotalPrice;
  });

  $("#emptyCart").click(function () {
    cartView.innerHTML = null;
  });

  $("#creditCard").click(function () {
    document.getElementById("bankTransferInfo").style.display = "none";
    document.getElementById("creditCardInfo").style.display = "block";
  });

  $("#bankTransfer").click(function () {
    document.getElementById("creditCardInfo").style.display = "none";
    document.getElementById("bankTransferInfo").style.display = "block";
  });

  $("#savePayment").click(function () {
    if (document.getElementById("creditCard").checked) {
      var a = document.forms["creditCardInfo"]["fullNameCC"].value;
      var b = document.forms["creditCardInfo"]["numberCC"].value;
      var c = document.forms["creditCardInfo"]["securityCodeCC"].value;
      var d = document.forms["creditCardInfo"]["expirationDateCC"].value;
      if ((a === null || a === "", b === null || b === "", c === null || c === "", d === null || d === "")) {
        Swal.fire({
          icon: "error",
          title: "¡Espera!",
          text: "Debes completar todos los campos para avanzar.",
        });
      } else {
        document.getElementById("savePayment").setAttribute("data-dismiss", "modal");
        Swal.fire({
          icon: "success",
          title: "¡Listo!",
          text: "Método de pago ingresado.",
        });
        var lastFour = b.substr(b.length - 4);
        document.getElementById("selectedPaymentMethod").innerHTML = `Tarjeta de crédito ***${lastFour}`;
      }
    }
    if (document.getElementById("bankTransfer").checked) {
      var a = document.forms["bankTransferInfo"]["bankAccountNumber"].value;
      var b = document.forms["bankTransferInfo"]["bankName"].value;
      if ((a == null || a == "", b == null || b == "")) {
        Swal.fire({
          icon: "error",
          title: "¡Espera!",
          text: "Debes completar todos los campos para avanzar.",
        });
      } else {
        document.getElementById("savePayment").setAttribute("data-dismiss", "modal");
        Swal.fire({
          icon: "success",
          title: "¡Listo!",
          text: "Método de pago ingresado.",
        });
        document.getElementById("selectedPaymentMethod").innerHTML = `Transferencia bancaria ${b}`;
      }
    }
  });

  $("#checkout").click(function () {
    let totalValidation = false;
    let paymentValidation = false;
    let shippingValidation = false;
    let quantityValidation = false;
    if (document.getElementById(`quantity0`).value > 0 && document.getElementById(`quantity1`).value > 0) {
      quantityValidation = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Faltan datos!",
        text: "La cantidad de los productos no puede ser 0.",
      });
    }
    if (document.getElementById("creditCard").checked || document.getElementById("bankTransfer").checked) {
      paymentValidation = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Faltan datos!",
        text: "Debes seleccionar un método de pago",
      });
    }
    if (document.getElementById("goldradio").checked || document.getElementById("premiumradio").checked || document.getElementById("standardradio").checked) {
      shippingValidation = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Faltan datos!",
        text: "Debes seleccionar un tipo de envío.",
      });
    }
    if (paymentValidation === true && shippingValidation === true && quantityValidation === true) {
      totalValidation = true;
    }
    if (totalValidation === true) {
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        text: "Estarás recibiendo tu compra muy pronto.",
      });
    }
  });
});
