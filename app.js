/* 
1) obtenerUsuarios() = leer usuarios de localStorage
2) guardarUsuarios() = guardar usuarios en localStorage
3) fakeRequest() = simular el servidor (asincronia)
4) mostrar() = escribir un mensaje en pantalla
5) emailValido() = validar el formato del email
6) calcularEdad() = calcular la edad desde la fecha
7) listener de REGISTRO = que pasa al apretar "Registrarse"
8) listener de LOGIN = que pasa al apretar "Ingresar"
*/


//1)
function obtenerUsuarios() {
  const data = localStorage.getItem("usuarios");
  return data ? JSON.parse(data) : [];
}


//2)
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


//3)
function fakeRequest(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
}


//4)
function mostrar(elemento, texto, color) {
  elemento.textContent = texto;
  elemento.style.color = color;
}


//5)
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


//6)
function calcularEdad(fecha) {
  const hoy = new Date();
  const nac = new Date(fecha);
  let edad = hoy.getFullYear() - nac.getFullYear();

  const cumpleEsteAnio = new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate());
  // Si no paso su cumple aun, resto un año
  if (hoy < cumpleEsteAnio) {
    edad--;
  }
  return edad;
}


//7)
const formRegistro = document.getElementById("formRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

formRegistro.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const fechaNac = document.getElementById("fechaNac").value;
  const terminos = document.getElementById("terminos").checked;

  // Campos obligatorios
  if (!nombre || !email || !password || !password2 || !fechaNac) {
    mostrar(mensajeRegistro, "Todos los campos son obligatorios", "red");
    return;
  }

  // Email con formato valido
  if (!emailValido(email)) {
    mostrar(mensajeRegistro, "El email no es valido", "red");
    return;
  }

  // minimo 8 caracteres y un numero
  if (password.length < 8 || !/[0-9]/.test(password)) {
    mostrar(mensajeRegistro, "La contrasena debe tener 8 caracteres y un numero", "red");
    return;
  }

  // verifica contra diferente
  if (password !== password2) {
    mostrar(mensajeRegistro, "Las contrasenas no coinciden", "red");
    return;
  }

  // Menor de 18
  if (calcularEdad(fechaNac) < 18) {
    mostrar(mensajeRegistro, "Debes ser mayor de 18 anios", "red");
    return;
  }

  // No marco chekcbox
  if (!terminos) {
    mostrar(mensajeRegistro, "Debes aceptar los terminos y condiciones", "red");
    return;
  }

  const usuarios = obtenerUsuarios();

  //email ya registrado
  if (usuarios.some(u => u.email === email)) {
    mostrar(mensajeRegistro, "El email ya esta registrado", "red");
    return;
  }


  //Simulacion asincrono
  mostrar(mensajeRegistro, "Cargando...", "black");

  
  const nuevoUsuario = await fakeRequest({ nombre, email, password });
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  mostrar(mensajeRegistro, "Usuario registrado correctamente", "green");
  formRegistro.reset();
});


//8)
const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // campos vacios?
  if (!email || !password) {
    mostrar(mensajeLogin, "Todos los campos son obligatorios", "red");
    return;
  }

  mostrar(mensajeLogin, "Cargando...", "black");

  const usuarios = await fakeRequest(obtenerUsuarios());

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    mostrar(mensajeLogin, "Usuario no encontrado", "red");
    return;
  }

  if (usuario.password !== password) {
    mostrar(mensajeLogin, "Contrasena incorrecta", "red");
    return;
  }

  mostrar(mensajeLogin, "Login exitoso", "green");
  formLogin.reset();
});