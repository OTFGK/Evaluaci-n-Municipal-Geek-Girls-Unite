document.getElementById("startBtn").addEventListener("click", function() {
    window.location.href = "login.html";
});

document.getElementById("stepsBtn").addEventListener("click", function() {
    document.getElementById("qa-section").scrollIntoView({ behavior: "smooth" });
});

function toggleAnswer(id) {
    const answer = document.getElementById(id);
    answer.style.display = (answer.style.display === "none" || answer.style.display === "") ? "block" : "none";
}

const canvas = document.getElementById("statBall");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let angle = 0;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la bola
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath();

    // Dibujar gráficos estadísticos (sectores)
    const data = [30, 20, 50]; // Valores de ejemplo
    const colors = ["#e74c3c", "#2ecc71", "#f1c40f"];
    let startAngle = angle;

    for (let i = 0; i < data.length; i++) {
        let sliceAngle = (data[i] / 100) * (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle += sliceAngle;
    }

    angle += 0.01; // Velocidad de rotación
    requestAnimationFrame(drawBall);
}

drawBall();