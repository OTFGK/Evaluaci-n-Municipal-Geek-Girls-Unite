document.getElementById("submitCrearCuenta").addEventListener("click", function(event) {
  let nombre = document.getElementById("nombre");
  let errorNombre = document.getElementById("error-nombre");

  let apellido = document.getElementById("apellido");
  let errorApellido = document.getElementById("error-apellido");

  let email = document.getElementById("email");
  let errorEmail = document.getElementById("error-email");

  let password = document.getElementById("password");
  let errorPassword = document.getElementById("error-password");

  if (nombre.value.trim() === "") {
      event.preventDefault(); // Evita que se envíe el formulario si hay errores
      nombre.classList.add("input-error");
      errorNombre.style.display = "block";
  } else {
      nombre.classList.remove("input-error");
      errorNombre.style.display = "none";
  }

  if (apellido.value.trim() === "") {
      event.preventDefault(); // Evita que se envíe el formulario si hay errores
      apellido.classList.add("input-error");
      errorApellido.style.display = "block";
  } else {
      apellido.classList.remove("input-error");
      errorApellido.style.display = "none";
  }

  if (email.value.trim() === "") {
      event.preventDefault(); // Evita que se envíe el formulario si hay errores
      email.classList.add("input-error");
      errorEmail.style.display = "block";
  } else {
      email.classList.remove("input-error");
      errorEmail.style.display = "none";
  }

  if (password.value.trim() === "") {
      event.preventDefault(); // Evita que se envíe el formulario si hay errores
      password.classList.add("input-error");
      errorPassword.style.display = "block";
  } else {
      password.classList.remove("input-error");
      errorPassword.style.display = "none";
  }
});

$(document).ready(function() {
    $('#tabla-analisis').DataTable();
    $('#tabla-funcional').DataTable();
    $('#tabla-capacidad').DataTable();
});
