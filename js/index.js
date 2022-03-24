//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("signIn").addEventListener("click", function () {
    localStorage.setItem("email", document.getElementById("inputEmail").value);
    localStorage.setItem("password", document.getElementById("inputPassword").value);
  });
});
