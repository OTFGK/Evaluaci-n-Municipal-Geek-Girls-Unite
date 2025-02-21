import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { db } from "./firebase_config.js"; // Importa la configuración de Firebase

const tablaEvaluaciones = document.getElementById("tabla-evaluaciones");

onSnapshot(collection(db, "evaluaciones"), (snapshot) => {
    tablaEvaluaciones.innerHTML = ""; // Limpiar la tabla antes de agregar datos

    snapshot.forEach((doc) => {
        const evaluacion = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${new Date(evaluacion.fecha.seconds * 1000).toLocaleDateString()}</td>
            <td>${evaluacion.analisisProcesos[0][0]}</td>
            <td>${evaluacion.analisisProcesos[0][1]} días</td>
            <td>S/ ${evaluacion.analisisProcesos[0][2]}</td>
            <td>${evaluacion.analisisProcesos[0][3]}%</td>
        `;

        tablaEvaluaciones.appendChild(row);
    });

    // Inicializar DataTables después de cargar los datos
    $(document).ready(function() {
        $('#tabla-dashboard').DataTable();
    });
});