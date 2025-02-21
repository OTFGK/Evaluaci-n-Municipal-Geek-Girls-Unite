// Importa las funciones necesarias de Firebase Authentication y Firestore
import { auth } from '../app/firebase';
import { signOut } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getFirestore, doc, getDoc, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

// Inicializa Firestore
const db = getFirestore();
// Elemento donde se insertarán las donaciones
const tablaEvaluaciones = document.getElementById("tabla-evaluaciones");

// Verificar el estado de autenticación al cargar la página
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Usuario autenticado:", user);
      checkAdminPrivileges(user);
    } else {
      window.location.href = "../crearcuenta.html";
    }
});

function loadEvaluaciones() {
    onSnapshot(collection(db, "evaluaciones"), (snapshot) => {
        tablaEvaluaciones.innerHTML = "";
  
        snapshot.forEach((doc) => {
            const evaluacion = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${evaluacion.analisisProcesos}</td>
                <td>${evaluacion.analisisProcesos} días</td>
                <td>S/ ${evaluacion.analisisProcesos}</td>
                <td>${evaluacion.analisisProcesos}%</td>
                <td>${new Date(evaluacion.date.seconds * 1000).toLocaleString()}</td>
            `;
  
            tablaEvaluaciones.appendChild(row);
        });
    });
}