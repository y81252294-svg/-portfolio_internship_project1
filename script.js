const themeButton = document.querySelector(".theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "portfolio-theme";
const colorSchemePreference = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem(themeStorageKey);
let activeTheme = savedTheme === "light" || savedTheme === "dark"
  ? savedTheme
  : colorSchemePreference.matches ? "dark" : "light";

const applyTheme = (theme) => {
  activeTheme = theme;
  document.documentElement.dataset.theme = theme;
  themeButton?.setAttribute("aria-pressed", String(theme === "dark"));
  if (themeColorMeta) themeColorMeta.content = theme === "dark" ? "#142019" : "#f7f8f2";
};

applyTheme(activeTheme);

themeButton?.addEventListener("click", () => {
  applyTheme(activeTheme === "dark" ? "light" : "dark");
  localStorage.setItem(themeStorageKey, activeTheme);
});

colorSchemePreference.addEventListener("change", (event) => {
  if (localStorage.getItem(themeStorageKey) === null) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 800px)").matches) closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const subject = String(formData.get("subject"));
    const message = String(formData.get("message")).trim();
    const body = `From: ${name}\nReply to: ${email}\n\n${message}`;
    const mailto = `mailto:hello@taylormorgan.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector("#form-status");

    if (status) {
      status.textContent = "Your email app should open with your message ready. If it doesn't, email hello@taylormorgan.dev directly.";
    }
    window.location.href = mailto;
  });
}