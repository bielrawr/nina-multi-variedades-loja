const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
const navLinks = document.querySelectorAll(".nav-bar a");
const header = document.querySelector("header");
const shrinkHeaderAt = 90;
const expandHeaderAt = 24;
const topScrollDuration = 360;
let isHeaderCompact = false;
let topScrollFrameId = 0;

function isMenuOpen() {
    return mobileMenu?.classList.contains("flex");
}

function setMenuOpen(isOpen) {
    if (!mobileMenu || !hamburgerButton) return;

    mobileMenu.classList.toggle("flex", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    hamburgerButton.setAttribute("aria-expanded", String(isOpen));
}

hamburgerButton?.addEventListener("click", () => {
    setMenuOpen(!isMenuOpen());
});

closeButton?.addEventListener("click", () => {
    setMenuOpen(false);
});

function isHomePath(pathname) {
    const normalizedPath = pathname.replace(/\/$/, "");

    return normalizedPath === "" || normalizedPath === "/index.html";
}

function isHomeLink(link) {
    try {
        const linkUrl = new URL(link.getAttribute("href"), window.location.origin);

        return linkUrl.origin === window.location.origin && isHomePath(linkUrl.pathname);
    } catch {
        return false;
    }
}

function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

function clearHomeHash() {
    if (!window.location.hash) return;

    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function scrollToPageTop() {
    const startPosition = window.scrollY;
    const startTime = performance.now();

    if (topScrollFrameId) {
        cancelAnimationFrame(topScrollFrameId);
    }

    if (startPosition <= 0) {
        updateHeaderSize();
        return;
    }

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / topScrollDuration, 1);
        const nextPosition = Math.round(startPosition * (1 - easeOutCubic(progress)));

        window.scrollTo({
            top: nextPosition,
            left: 0,
            behavior: "instant"
        });

        if (progress < 1) {
            topScrollFrameId = requestAnimationFrame(animateScroll);
        } else {
            topScrollFrameId = 0;
            updateHeaderSize();
        }
    }

    topScrollFrameId = requestAnimationFrame(animateScroll);
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        setMenuOpen(false);

        if (isHomePath(window.location.pathname) && isHomeLink(link)) {
            event.preventDefault();
            clearHomeHash();
            scrollToPageTop();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuOpen(false);
    }
});

document.addEventListener("click", (event) => {
    if (!isMenuOpen()) return;
    if (mobileMenu.contains(event.target) || hamburgerButton.contains(event.target)) return;

    setMenuOpen(false);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        setMenuOpen(false);
    }
});

function updateHeaderSize() {
    if (!header) return;

    if (!isHeaderCompact && window.scrollY > shrinkHeaderAt) {
        isHeaderCompact = true;
    }

    if (isHeaderCompact && window.scrollY < expandHeaderAt) {
        isHeaderCompact = false;
    }

    header.classList.toggle("is-scrolled", isHeaderCompact);
}

updateHeaderSize();
window.addEventListener("scroll", updateHeaderSize, { passive: true });
