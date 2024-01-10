// Activities Carousel  

const carousel = document.querySelector('.activity-carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const activities = document.querySelectorAll('.activity');

let currentSlide = 0;
const numSlides = activities.length;

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + numSlides) % numSlides;
  displaySlide();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % numSlides;
  displaySlide();
});

function displaySlide() {
  activities.forEach((activity, index) => {
    if (index === currentSlide) {
      activity.style.display = 'flex';
    } else {
      activity.style.display = 'none';
    }
  });
}

displaySlide();

setInterval(() => {
  nextBtn.click();
}, 5000);

