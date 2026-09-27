const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const backToTop = document.querySelector('#backToTop');

let currentIndex = 0;
let intervalId;

function renderDots() {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);

    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  dotsContainer?.querySelectorAll('button').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function startAutoplay() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 3500);
}

if (slides.length > 0) {
  renderDots();
  updateCarousel();
  startAutoplay();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
