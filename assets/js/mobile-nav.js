const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileLinks = document.querySelectorAll(".nav-links-mobile a");

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
