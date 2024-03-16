document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const sliderInner = document.getElementById('slider-inner');
    const controlButtons = document.querySelectorAll('.control-button');
    let currentIndex = 0;
    let intervalId = null;
    let isPaused = false;

    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        const translateValue = -currentIndex * 100;
        sliderInner.style.transform = `translateX(${translateValue}%)`;
    }

    function startSlider() {
        intervalId = setInterval(() => moveSlide(1), 3000);
        isPaused = false;
        updatePauseButtonIcon();
    }

    function stopSlider() {
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
        updatePauseButtonIcon();
    }

    function togglePause() {
        if (intervalId) {
            stopSlider();
        } else {
            startSlider();
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        const translateValue = -currentIndex * 100;
        sliderInner.style.transform = `translateX(${translateValue}%)`;
    }

    function updatePauseButtonIcon() {
        const pauseButton = document.querySelector('.control-button.pause');
        if (pauseButton) {
            pauseButton.textContent = isPaused ? '⏯' : '⏸︎';
        }
    }

    controlButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 0) {
                moveSlide(-1);
            } else if (index === 1) {
                togglePause();
            } else if (index === 2) {
                moveSlide(1);
            }
        });
    });

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            stopSlider();
            alert(`Stopped at slide ${index + 1}`);
        });
    });

    startSlider();
});
