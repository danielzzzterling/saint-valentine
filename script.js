const romanticText = document.getElementById("romanticText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const scene = document.querySelector(".scene");
const firstGif = document.getElementById("firstGif");

const messages = [
  "Cada vez que pienso en ti, mi corazon sonrie sin permiso.",
  "Eres la calma que quiero en mis dias y la alegria que busco en mis noches.",
  "Si pudiera elegir de nuevo, te elegiria a ti una y mil veces.",
  "Tu forma de mirar convierte lo simple en algo magico.",
  "Gracias por existir tan bonito en mi vida.",
];

let messageIndex = 0;
let yesGrow = 0;
const yesClicksMax = 5;
const yesGrowMax = 1.15;
const yesGrowStep = yesGrowMax / yesClicksMax;

const gifUrls = [
  "https://i.pinimg.com/originals/47/6b/85/476b85783b816fef1d2c56ebe247cc0f.gif",
  "https://i.pinimg.com/originals/97/b6/09/97b6094cd0895322d7fcc95149b3af1b.gif",
  "https://i.pinimg.com/originals/b1/91/d7/b191d705ff9f124b79bbd1849b333c35.gif",
  "https://i.pinimg.com/originals/91/25/fc/9125fcf5c30e8f30e70650e059e265be.gif",
  "https://i.pinimg.com/originals/de/d5/20/ded520423e25c811bbff951c61a337f2.gif",
];

yesBtn.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;
  romanticText.textContent = messages[messageIndex];
  yesGrow = Math.min(yesGrowMax, yesGrow + yesGrowStep);
  yesBtn.style.setProperty("--grow", yesGrow.toFixed(2));
  firstGif.src = gifUrls[messageIndex];
  firstGif.classList.add("is-visible");
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

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = "translate(0, 0)";
}

noBtn.addEventListener("click", () => {
  if (!noBtn.classList.contains("floating")) {
    scene.appendChild(noBtn);
    noBtn.classList.add("floating");
    const sceneRect = scene.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    noBtn.style.left = `${btnRect.left - sceneRect.left}px`;
    noBtn.style.top = `${btnRect.top - sceneRect.top}px`;
    noBtn.style.transform = "translate(0, 0)";
    requestAnimationFrame(moveNoButton);
    return;
  }

  requestAnimationFrame(moveNoButton);
});
