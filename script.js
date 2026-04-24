// Navbar scroll effect
const navbar = document.querySelector(".navbar");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

// Change navbar background on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle logic
mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger to X
  const bars = document.querySelectorAll(".bar");
  if (navLinks.classList.contains("active")) {
    bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      const bars = document.querySelectorAll(".bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });
});

// Testimonials Slider
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

if (track && prevBtn && nextBtn && dotsContainer) {
  const cards = track.querySelectorAll('.review-card');
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const translation = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${translation}px)`;

    updateDots(maxIndex);
  }

  function updateDots(maxIndex) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = 0;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, cards.length - getCardsPerView());
    currentIndex++;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);

  // Initialize slider layout
  setTimeout(updateSlider, 100);
}