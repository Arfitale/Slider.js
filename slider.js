// VAR
const slider = document.querySelector(".slider-ctr");
const sliderGallery = slider.querySelectorAll('.slider-gallery');
const mainSlider = slider.querySelector(".main-slider");

const length = sliderGallery.length;
const box = slider.getBoundingClientRect();
const width = box.width;
const height = box.height;

// determine dimension of main slider
const totalWidth = Number(length) * Number(width);
mainSlider.style.width = `${totalWidth}px`;
mainSlider.style.height = `${height}px`;

// reposition each gallery to each pos
sliderGallery.forEach(gallery => {
    const index = Number(gallery.getAttribute("data-index"));

    // Set position
    const posX = index * width;
    gallery.style.left = `${posX}px`;
});

// Animate slider

const time = 3000; // in milisecond
const transitionType = "smooth";

// Slideshow
let counter = 0;

// Checking current count
function checkCount(counter, max, state = 1) {
    state ? counter++ : counter--;
    if (counter >= max) {
        counter = 0;
    } else if (counter < 0) {
        counter = max - 1;
    }
    return counter
}

// Move slideshow
function slideShow() {
    let movePos = counter * width;
    mainSlider.style.transform = `translateX(-${movePos}px)`;
    counter = checkCount(counter, length, 1);
}

setInterval(slideShow, time);
