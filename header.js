const header = document.querySelector(".site-header");
const links = [...header.querySelectorAll("nav a")];
const sections = links.map(link => document.getElementById(link.hash.slice(1)));
let currentLink;
let framePending = false;

function updateHeader() {
  framePending = false;
  const scrolled = window.scrollY > 20;
  header.classList.toggle("is-scrolled", scrolled);

  // Keep the marker below the fixed header on short viewports.
  const marker = Math.max(window.innerHeight * 0.4, header.offsetHeight + 8);
  let nextLink;
  if (scrolled) {
    for (const [index, section] of sections.entries()) {
      if (section.getBoundingClientRect().top <= marker) nextLink = links[index];
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      nextLink = links.at(-1);
    }
  }

  if (nextLink === currentLink) return;
  currentLink?.removeAttribute("aria-current");
  nextLink?.setAttribute("aria-current", "location");
  currentLink = nextLink;
}

function scheduleUpdate() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateHeader);
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
window.addEventListener("pageshow", scheduleUpdate);
updateHeader();

const pill = header.querySelector(".pill");
const label = pill.textContent.trim();
const animatedLabel = document.createElement("span");
animatedLabel.className = "pill-text";
animatedLabel.setAttribute("aria-hidden", "true");
Array.from(label).forEach((character, index) => {
  const letter = document.createElement("span");
  letter.className = "pill-letter";
  letter.style.setProperty("--letter", index);
  letter.textContent = character === " " ? "\u00a0" : character;
  animatedLabel.append(letter);
});
pill.setAttribute("aria-label", label);
pill.replaceChildren(animatedLabel);
