// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF_SU6MHinJEacgqzxJ9z90PYxpVv0s2E",
  authDomain: "geek-girls-unite.firebaseapp.com",
  projectId: "geek-girls-unite",
  storageBucket: "geek-girls-unite.firebasestorage.app",
  messagingSenderId: "409474902554",
  appId: "1:409474902554:web:3b997b71cf5f2c044fbfa3",
  measurementId: "G-HEVBTP2SXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firebase app initialized", app);

export { auth, db };

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const signUp = document.getElementById('submitCrearCuenta');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.querySelector('input[name="rol"]:checked');
    const distrito = document.getElementById('distrito').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            rol: rol.value,
            distrito: distrito
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href = "/inicio.html"; // Redirigir a la página de administración
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
});


// Obtiene el formulario de inicio de sesión
const loginForm = document.getElementById('login-form');

// Agrega un evento de envío al formulario
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtiene los valores del formulario
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Autentica al usuario con Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = "/inicio.html";
      // El usuario ha sido autenticado correctamente
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);
    })
    .catch((error) => {
      // Ha ocurrido un error durante la autenticación
      console.error('Error de autenticación:', error);
    });
});


// Obtiene el enlace para cerrar sesión
const cerrarSesionLink = document.getElementById('cerrar-sesion');

// Agrega un evento de clic al enlace
cerrarSesionLink.addEventListener('click', (e) => {
  e.preventDefault();

  // Cierra la sesión del usuario
  firebase.auth().signOut()
    .then(() => {
      // La sesión ha sido cerrada correctamente
      console.log('Sesión cerrada');
      // Redirige al usuario a la página de inicio de sesión
      window.location.href = 'login.html';
    })
    .catch((error) => {
      // Ha ocurrido un error durante el cierre de la sesión
      console.error('Error de cierre de sesión:', error);
    });
});