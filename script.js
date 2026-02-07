const romanticText = document.getElementById("romanticText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const scene = document.querySelector(".scene");
const firstGif = document.getElementById("firstGif");
const card = document.querySelector(".card");
const finalCard = document.querySelector(".card-final");
const blankCard = document.querySelector(".card-blank");
const finalBtn = document.getElementById("finalBtn");
const finalText = document.getElementById("finalText");
const noBtnHome = {
  parent: noBtn.parentElement,
  nextSibling: noBtn.nextSibling,
};

if (card) {
  card.removeAttribute("hidden");
}
if (finalCard) {
  finalCard.setAttribute("hidden", "");
}
if (blankCard) {
  blankCard.setAttribute("hidden", "");
}

const targetUtcMs = Date.UTC(2026, 1, 7, 14, 30, 0);
let countdownTimer = null;

function startCountdown() {
  if (!finalBtn || countdownTimer) {
    return;
  }

  const tick = () => {
    const now = Date.now();
    const remaining = targetUtcMs - now;

    if (remaining <= 0) {
      if (finalText) {
        finalText.textContent = "Ahora si, puedes mirarlo, te amooooo.";
        finalText.classList.add("final-ready");
      }
      finalBtn.disabled = false;
      finalBtn.textContent = "Para ti 🤍";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    finalBtn.textContent = `Esperando para desbloquear... ${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  tick();
  countdownTimer = setInterval(tick, 1000);
}

if (finalBtn) {
  finalBtn.addEventListener("click", () => {
    if (finalBtn.disabled) return;
    window.location.href = "https://danielzzzterling.github.io/scroll/";
  });
}

const messages = [
  "Cada vez que pienso en ti, mi corazon sonrie sin permiso.",
  "Soy mas feliz desde que te conoci, y no quiero imaginar mi vida sin ti. ¿Sabías eso?",
  "¿Quieres estar conmigo toda la vida?",
  "Tengo algo muy importante que decirte, quieres saber que es?",
  "¿Quieres ser mi San Valentin para siempre?",
];

let messageIndex = 0;
let yesGrow = 0;
const yesGrowMax = 2.9;
const yesGrowStep = 0.9;

const gifUrls = [
  "https://i.pinimg.com/originals/47/6b/85/476b85783b816fef1d2c56ebe247cc0f.gif",
  "https://i.pinimg.com/originals/97/b6/09/97b6094cd0895322d7fcc95149b3af1b.gif",
  "https://i.pinimg.com/originals/b1/91/d7/b191d705ff9f124b79bbd1849b333c35.gif",
  "https://i.pinimg.com/originals/91/25/fc/9125fcf5c30e8f30e70650e059e265be.gif",
  "https://i.pinimg.com/originals/de/d5/20/ded520423e25c811bbff951c61a337f2.gif",
];

function setGif(index) {
  const baseUrl = gifUrls[index % gifUrls.length];
  const cacheBust = `${baseUrl}?v=${Date.now()}`;
  firstGif.classList.add("is-visible");
  firstGif.src = cacheBust;
}

function setTextWithResize(newText) {
  if (!card) {
    romanticText.textContent = newText;
    return;
  }

  const startHeight = card.getBoundingClientRect().height;
  card.style.height = `${startHeight}px`;

  romanticText.textContent = newText;

  const endHeight = card.scrollHeight;
  requestAnimationFrame(() => {
    card.style.height = `${endHeight}px`;
  });

  const onEnd = (event) => {
    if (event.propertyName !== "height") return;
    card.style.height = "auto";
    card.removeEventListener("transitionend", onEnd);
  };
  card.addEventListener("transitionend", onEnd);
}

function showFinalSequence() {
  if (!finalCard) {
    return;
  }
  card.setAttribute("hidden", "");
  finalCard.removeAttribute("hidden");
  if (blankCard) {
    setTimeout(() => {
      finalCard.setAttribute("hidden", "");
      blankCard.removeAttribute("hidden");
      startCountdown();
    }, 3000);
  }
}

yesBtn.addEventListener("click", () => {
  if (messageIndex >= messages.length - 1) {
    showFinalSequence();
    return;
  }
  messageIndex += 1;
  setTextWithResize(messages[messageIndex]);
  romanticText.classList.toggle(
    "final-message",
    messageIndex === messages.length - 1
  );
  if (messageIndex === messages.length - 1) {
    noBtn.textContent = "Si";
    noBtn.classList.add("btn-yes");
    noBtn.classList.remove("btn-no", "floating");
    if (noBtnHome.parent && noBtn.parentElement !== noBtnHome.parent) {
      noBtnHome.parent.insertBefore(noBtn, noBtnHome.nextSibling);
    }
    noBtn.style.top = "";
    noBtn.style.left = "";
    noBtn.style.transform = "";
    yesGrow = 0;
    yesBtn.style.setProperty("--grow", yesGrow.toFixed(2));
  } else {
    noBtn.textContent = messageIndex === 2 ? "Jamás" : "No";
    noBtn.classList.add("btn-no");
    noBtn.classList.remove("btn-yes");
  }
  setGif(messageIndex);
});

function moveNoButton() {
  const sceneWidth = scene.clientWidth;
  const sceneHeight = scene.clientHeight;
  const btnRect = noBtn.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();
  const yesViewport = yesBtn.getBoundingClientRect();
  const yesRect = {
    left: yesViewport.left - sceneRect.left,
    top: yesViewport.top - sceneRect.top,
    right: yesViewport.right - sceneRect.left,
    bottom: yesViewport.bottom - sceneRect.top,
  };
  const padding = 20;

  const maxX = Math.max(padding, sceneWidth - btnRect.width - padding);
  const maxY = Math.max(padding, sceneHeight - btnRect.height - padding);

  const maxTries = 40;
  let randomX = padding;
  let randomY = padding;
  let tries = 0;

  while (tries < maxTries) {
    randomX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
    randomY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

    const candidate = {
      left: randomX,
      top: randomY,
      right: randomX + btnRect.width,
      bottom: randomY + btnRect.height,
    };

    const overlapsYes =
      candidate.left < yesRect.right &&
      candidate.right > yesRect.left &&
      candidate.top < yesRect.bottom &&
      candidate.bottom > yesRect.top;

    if (!overlapsYes) break;
    tries += 1;
  }

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = "translate(0, 0)";
}

noBtn.addEventListener("click", () => {
  if (messageIndex >= messages.length - 1) {
    showFinalSequence();
    return;
  }
  yesGrow = Math.min(yesGrowMax, yesGrow + yesGrowStep);
  yesBtn.style.setProperty("--grow", yesGrow.toFixed(2));

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
