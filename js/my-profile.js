function setUserData(userName, userEmail, userPhone, userAge) {
  let dataUser = new Object();
  dataUser.userName = userName;
  dataUser.userEmail = userEmail;
  dataUser.userPhone = userPhone;
  dataUser.userAge = userAge;

  localStorage.setItem("allDataUser", JSON.stringify(dataUser));
}

function showUserData() {
  let userData = JSON.parse(localStorage.getItem("allDataUser"));

  document.getElementById("fullName").value = userData.userName;
  document.getElementById("eMail").value = userData.userEmail;
  document.getElementById("phone").value = userData.userPhone;
  document.getElementById("age").value = userData.userAge;
}

function checkStorage() {
  if (localStorage.getItem("allDataUser")) {
    showUserData();
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  checkStorage();

  document.getElementById("modify").addEventListener("click", function () {
    document.getElementById("fullName").removeAttribute("readonly");
    document.getElementById("eMail").removeAttribute("readonly");
    document.getElementById("phone").removeAttribute("readonly");
    document.getElementById("age").removeAttribute("readonly");

    let saveBttn = document.getElementById("saveChanges");
    saveBttn.removeAttribute("hidden");

    let modifyBttn = document.getElementById("modify");
    modifyBttn.setAttribute("hidden", "true");
  });

  document.getElementById("saveChanges").addEventListener("click", function () {
    let userName = document.getElementById("fullName").value;
    let userEmail = document.getElementById("eMail").value;
    let userPhone = document.getElementById("phone").value;
    let userAge = document.getElementById("age").value;

    setUserData(userName, userEmail, userPhone, userAge);

    document.getElementById("fullName").setAttribute("readonly", "true");
    document.getElementById("eMail").setAttribute("readonly", "true");
    document.getElementById("phone").setAttribute("readonly", "true");
    document.getElementById("age").setAttribute("readonly", "true");

    let saveBttn = document.getElementById("modify");
    saveBttn.removeAttribute("hidden");

    let modifyBttn = document.getElementById("saveChanges");
    modifyBttn.setAttribute("hidden", "true");

    Swal.fire({
      icon: "success",
      title: "¡Listo!",
      text: "Se guardaron los cambios.",
    });
  });

  document.getElementById("addImg").addEventListener("click", function () {
    document.getElementById("addImg").setAttribute("hidden", "true");
    document.getElementById("inputUrl").removeAttribute("hidden");
    document.getElementById("submitImg").removeAttribute("hidden");
  });

  document.getElementById("submitImg").addEventListener("click", function () {
    let submittedImg = document.getElementById("inputUrl").value;

    document.getElementById("userImg").setAttribute("src", submittedImg);
    document.getElementById("inputUrl").setAttribute("hidden", "true");
    document.getElementById("submitImg").setAttribute("hidden", "true");
    document.getElementById("addImg").removeAttribute("hidden");
  });
});
