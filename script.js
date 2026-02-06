const romanticText = document.getElementById("romanticText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const scene = document.querySelector(".scene");

const messages = [
  "Cada vez que pienso en ti, mi corazon sonrie sin permiso.",
  "Eres la calma que quiero en mis dias y la alegria que busco en mis noches.",
  "Si pudiera elegir de nuevo, te elegiria a ti una y mil veces.",
  "Tu forma de mirar convierte lo simple en algo magico.",
  "Gracias por existir tan bonito en mi vida.",
];

let messageIndex = 0;
let yesScale = 1;
const yesScaleStep = 0.06;

yesBtn.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;
  romanticText.textContent = messages[messageIndex];
  yesScale = Math.min(1.8, yesScale + yesScaleStep);
  yesBtn.style.setProperty("--scale", yesScale.toFixed(2));
});

function moveNoButton() {
  const sceneWidth = scene.clientWidth;
  const sceneHeight = scene.clientHeight;
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 20;

  const maxX = Math.max(padding, sceneWidth - btnRect.width - padding);
  const maxY = Math.max(padding, sceneHeight - btnRect.height - padding);

  const randomX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
  const randomY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  noBtn.classList.add("floating");
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = "translate(0, 0)";
}

noBtn.addEventListener("click", () => {
  if (!noBtn.classList.contains("floating")) {
    scene.appendChild(noBtn);
  }

  requestAnimationFrame(moveNoButton);
});
