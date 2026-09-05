// En la siguiente línea ajusta el año, el mes (resta 1 al mes real) y el día que empezaron
// Ejemplo: Si empezaron el 15 de Noviembre de 2022 -> (2022, 10, 15) porque Noviembre es mes 10 en JS.
const startDate = new Date(2022, 10, 15); 

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('counter').innerText = 
    `${days} días, ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCounter, 1000);
updateCounter();

// Mostrar/Ocultar Carta
document.getElementById('openBtn').addEventListener('click', () => {
  const letter = document.getElementById('letter');
  letter.classList.toggle('hidden');
});

// Lluvia de Corazones
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y -= this.speedY;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI, true);
    ctx.arc(this.x + this.size / 2, this.y, this.size / 2, 0, Math.PI, true);
    ctx.lineTo(this.x + this.size / 4, this.y + this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 25; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});