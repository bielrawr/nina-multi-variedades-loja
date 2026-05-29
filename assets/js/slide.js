const sliderRadios = document.querySelectorAll('input[name="radio-btn"]');
let currentSlide = 1;
let sliderTimer;
const sliderDelay = 5000;

function showSlide(slideNumber) {
    currentSlide = slideNumber;
    const selectedSlide = document.getElementById(`radio-${currentSlide}`);

    if (selectedSlide) {
        selectedSlide.checked = true;
    }
}

function nextSlide() {
    const nextSlideNumber = currentSlide >= sliderRadios.length ? 1 : currentSlide + 1;
    showSlide(nextSlideNumber);
}

function restartSliderTimer() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(nextSlide, sliderDelay);
}

if (sliderRadios.length > 0) {
    showSlide(1);
    restartSliderTimer();

    sliderRadios.forEach((radio, index) => {
        radio.addEventListener("click", () => {
            showSlide(index + 1);
            restartSliderTimer();
        });
    });
}
