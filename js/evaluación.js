// Importamos Firebase
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { db } from "./firebase_config.js";  // Conexión a Firestore

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");

    if (submitButton) {
        submitButton.addEventListener("click", async () => {
            try {
                // Extraer valores desde las tablas
                const analisisProcesos = obtenerDatosDeTabla("tabla-analisis");
                const capacidadFuncional = obtenerDatosDeTabla("tabla-funcional");
                const capacidadInstalada = obtenerDatosDeTabla("tabla-capacidad");

                // Guardar en Firestore
                await addDoc(collection(db, "evaluaciones"), {
                    analisisProcesos,
                    capacidadFuncional,
                    capacidadInstalada,
                    fecha: new Date()
                });

                alert("Evaluación guardada correctamente.");
            } catch (error) {
                console.error("Error al guardar:", error);
                alert("Hubo un problema al guardar la evaluación.");
            }
        });
    }
});

// Función para extraer datos de una tabla
function obtenerDatosDeTabla(idTabla) {
    const tabla = document.getElementById(idTabla);
    const filas = tabla.getElementsByTagName("tr");
    const datos = [];

    for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        const filaData = [];

        for (let j = 0; j < celdas.length; j++) {
            const input = celdas[j].querySelector("input, select");
            filaData.push(input ? input.value : celdas[j].innerText);
        }
        datos.push(filaData);
    }
    return datos;
}


import { auth } from './app/firebase';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado:", userCredential.user);
        window.location.href = "/pages/dashboard.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Usuario o contraseña incorrectos.");
    }
});
