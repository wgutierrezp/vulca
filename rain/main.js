let images1 = [];
let images2 = [];
let slideIndex = 1;

// Function to fetch image paths from two text files
async function fetchImages() {
    const response1 = await fetch(imageFiles.file1); // Use the file name from the HTML
    const text1 = await response1.text();
    images1 = text1.split('\n').filter(line => line.trim() !== ''); // Split by new line and filter out empty lines

    const response2 = await fetch(imageFiles.file2); // Use the file name from the HTML
    const text2 = await response2.text();
    images2 = text2.split('\n').filter(line => line.trim() !== ''); // Split by new line and filter out empty lines

    initSlideshow();
}

// Function to initialize the slideshow
function initSlideshow() {
    const slideshowContainer = document.getElementById('slideshow-container');
    const dotContainer = document.getElementById('dot-container');

    const maxSlides = Math.max(images1.length, images2.length);

    for (let i = 0; i < maxSlides; i++) {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';
        slide.innerHTML = `
            <div class="numbertext">${i + 1} / ${maxSlides}</div>
            <img src="${images1[i] || ''}" alt="DispersiÃ³n de ceniza">
            <img src="${images2[i] || ''}" alt="CaÃ­da de ceniza">
        `;
        slideshowContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => currentSlide(i + 1);
        dotContainer.appendChild(dot);
    }

    showSlides(slideIndex);
    adjustLayout(); // Adjust layout based on orientation
}

// Slideshow functions
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active";
}

// Function to adjust layout based on orientation
function adjustLayout() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const slides = document.getElementsByClassName("mySlides");
    
    for (let slide of slides) {
        if (isPortrait) {
            slide.style.flexDirection = "column"; // Stack images vertically
        } else {
            slide.style.flexDirection = "row"; // Align images horizontally
        }
    }
}

// Event listener for window resize
window.addEventListener("resize", () => {
    adjustLayout();
    showSlides(slideIndex); // Ensure the current slide is shown after resizing
});

// Directly fetch images without checking for cookies
fetchImages();
