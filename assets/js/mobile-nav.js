const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileLinks = document.querySelectorAll(".nav-links-mobile a");
const header = document.querySelector("header");

function setMenuOpen(isOpen) {
    if (!mobileMenu || !hamburgerButton) return;

    mobileMenu.classList.toggle("flex", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    hamburgerButton.setAttribute("aria-expanded", String(isOpen));
}

hamburgerButton?.addEventListener("click", () => {
    setMenuOpen(true);
});

closeButton?.addEventListener("click", () => {
    setMenuOpen(false);
});

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        setMenuOpen(false);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuOpen(false);
    }
});

function updateHeaderSize() {
    if (!header) return;

    header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeaderSize();
window.addEventListener("scroll", updateHeaderSize, { passive: true });
