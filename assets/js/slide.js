const sliderRadios = document.querySelectorAll('input[name="radio-btn"]');
let currentSlide = 1;

if (sliderRadios.length > 0) {
    const firstSlide = document.getElementById("radio-1");
    if (firstSlide) {
        firstSlide.checked = true;
    }

    setInterval(() => {
        currentSlide += 1;

        if (currentSlide > sliderRadios.length) {
            currentSlide = 1;
        }

        const nextSlide = document.getElementById(`radio-${currentSlide}`);
        if (nextSlide) {
            nextSlide.checked = true;
        }
    }, 5000);
}
