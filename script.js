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


var selectedSeats = [];
var occupiedSeats = ['A3','A7','B2','B9','C5','C6','D1','D8','E4','E10','F3','F7','G2','G9','H5','H6'];
var rows = ['A','B','C','D','E','F','G','H'];

function buildSeatMap() {
  var map = document.getElementById('seat-map');
  map.innerHTML = '';
  rows.forEach(function(row) {
    var rowDiv = document.createElement('div');
    rowDiv.style.cssText = 'display:flex; align-items:center; gap:6px; margin-bottom:8px;';
    var rowLabel = document.createElement('span');
    rowLabel.innerText = row;
    rowLabel.style.cssText = 'color:#aaa; font-size:0.8rem; width:16px; text-align:center;';
    rowDiv.appendChild(rowLabel);
    for (var i = 1; i <= 10; i++) {
      var seatId = row + i;
      var seat = document.createElement('div');
      seat.id = 'seat-' + seatId;
      seat.innerText = i;
      seat.dataset.seat = seatId;
      var isOccupied = occupiedSeats.indexOf(seatId) !== -1;
      seat.style.cssText = 'width:32px; height:32px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:' + (isOccupied ? 'not-allowed' : 'pointer') + '; background:' + (isOccupied ? '#d90429' : '#333') + '; color:#fff; transition:background 0.2s;';
      if (!isOccupied) {
        seat.addEventListener('click', function() { toggleSeat(this.dataset.seat); });
      }
      rowDiv.appendChild(seat);
    }
    map.appendChild(rowDiv);
  });
}

function toggleSeat(seatId) {
  var seat = document.getElementById('seat-' + seatId);
  var idx = selectedSeats.indexOf(seatId);
  if (idx === -1) { selectedSeats.push(seatId); seat.style.background = '#27ae60'; }
  else { selectedSeats.splice(idx, 1); seat.style.background = '#333'; }
  document.getElementById('selected-info').innerText = selectedSeats.length > 0 ? 'Seçilmiş yerlər: ' + selectedSeats.join(', ') : '';
}

function openPopup(name, price) {
  selectedSeats = [];
  document.getElementById('popup-name').innerText = name;
  document.getElementById('popup-price').innerText = 'Qiymət: ' + price;
  document.getElementById('selected-info').innerText = '';
  buildSeatMap();
  document.getElementById('popup-overlay').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup-overlay').style.display = 'none';
  selectedSeats = [];
}

function confirmTicket() {
  if (selectedSeats.length === 0) { alert('Zəhmət olmasa yer seçin!'); return; }
  alert('Biletiniz təsdiqləndi! 🎭\nYerlər: ' + selectedSeats.join(', '));
  closePopup();
}

document.getElementById('popup-overlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// NAVBAR POPUP
var navSelectedSeats = [];
var navOccupiedSeats = ['A3','A7','B2','B9','C5','C6','D1','D8','E4','E10','F3','F7','G2','G9','H5','H6'];
var navRows = ['A','B','C','D','E','F','G','H'];

function openNavPopup() {
  navSelectedSeats = [];
  document.getElementById('nav-tamasa-select').value = '';
  document.getElementById('nav-tamasa-info').style.display = 'none';
  document.getElementById('nav-sehne').style.display = 'none';
  document.getElementById('nav-selected-info').innerText = '';
  document.getElementById('nav-popup-overlay').style.display = 'flex';
}

function closeNavPopup() {
  document.getElementById('nav-popup-overlay').style.display = 'none';
  navSelectedSeats = [];
}

function onNavTamasaSelect() {
  var val = document.getElementById('nav-tamasa-select').value;
  if (!val) {
    document.getElementById('nav-tamasa-info').style.display = 'none';
    document.getElementById('nav-sehne').style.display = 'none';
    return;
  }
  var parts = val.split('|');
  document.getElementById('nav-popup-name').innerText = parts[0];
  document.getElementById('nav-popup-price').innerText = 'Qiymət: ' + parts[1];
  document.getElementById('nav-tamasa-info').style.display = 'block';
  document.getElementById('nav-sehne').style.display = 'block';
  navSelectedSeats = [];
  document.getElementById('nav-selected-info').innerText = '';
  buildNavSeatMap();
}

function buildNavSeatMap() {
  var map = document.getElementById('nav-seat-map');
  map.innerHTML = '';
  navRows.forEach(function(row) {
    var rowDiv = document.createElement('div');
    rowDiv.style.cssText = 'display:flex; align-items:center; gap:6px; margin-bottom:8px;';
    var rowLabel = document.createElement('span');
    rowLabel.innerText = row;
    rowLabel.style.cssText = 'color:#aaa; font-size:0.8rem; width:16px; text-align:center;';
    rowDiv.appendChild(rowLabel);
    for (var i = 1; i <= 10; i++) {
      var seatId = row + i;
      var seat = document.createElement('div');
      seat.id = 'nav-seat-' + seatId;
      seat.innerText = i;
      seat.dataset.seat = seatId;
      var isOccupied = navOccupiedSeats.indexOf(seatId) !== -1;
      seat.style.cssText = 'width:32px; height:32px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:' + (isOccupied ? 'not-allowed' : 'pointer') + '; background:' + (isOccupied ? '#d90429' : '#333') + '; color:#fff; transition:background 0.2s;';
      if (!isOccupied) {
        seat.addEventListener('click', function() { navToggleSeat(this.dataset.seat); });
      }
      rowDiv.appendChild(seat);
    }
    map.appendChild(rowDiv);
  });
}

function navToggleSeat(seatId) {
  var seat = document.getElementById('nav-seat-' + seatId);
  var idx = navSelectedSeats.indexOf(seatId);
  if (idx === -1) { navSelectedSeats.push(seatId); seat.style.background = '#27ae60'; }
  else { navSelectedSeats.splice(idx, 1); seat.style.background = '#333'; }
  document.getElementById('nav-selected-info').innerText = navSelectedSeats.length > 0 ? 'Seçilmiş yerlər: ' + navSelectedSeats.join(', ') : '';
}

function confirmNavTicket() {
  var val = document.getElementById('nav-tamasa-select').value;
  if (!val) { alert('Zəhmət olmasa tamaşa seçin!'); return; }
  if (navSelectedSeats.length === 0) { alert('Zəhmət olmasa yer seçin!'); return; }
  var parts = val.split('|');
  alert('Biletiniz təsdiqləndi! 🎭\nTamaşa: ' + parts[0] + '\nYerlər: ' + navSelectedSeats.join(', '));
  closeNavPopup();
}

document.getElementById('nav-popup-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeNavPopup();
});