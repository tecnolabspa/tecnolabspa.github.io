console.log("Tecnolab SPA");

const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const dots = Array.from(document.querySelectorAll('.carousel-dot'));
let currentSlide = 0;
let slideInterval = null;

function updateCarousel(index) {
    if (!carouselTrack) return;
    const slides = Array.from(carouselTrack.children);
    currentSlide = (index + slides.length) % slides.length;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSlide);
    });
}

function nextSlide() {
    updateCarousel(currentSlide + 1);
}

function prevSlide() {
    updateCarousel(currentSlide - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

if (carouselTrack && prevButton && nextButton && dots.length) {
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    updateCarousel(0);
    startSlideShow();
}

const headerHeight = document.querySelector('.sidebar')?.offsetHeight || 75;

function smoothScrollTo(targetPosition, duration = 500) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        event.preventDefault();

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        smoothScrollTo(targetPosition, 500);
    });
});
