document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // COUNTDOWN TIMER
  // ==========================================
  const weddingDate = new Date("January 16, 2027 15:30:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  // ==========================================
  // 2. STATE-BASED DECK CAROUSEL (NO INDICATORS)
  // ==========================================
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (slides.length > 0) {
    let activeIndex = 0;
    let autoSlideInterval;

    function updateCarousel(index) {
      // Loop modulo math
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        let offset = i - activeIndex;
        if (offset < -1 && offset < -Math.floor(slides.length / 2)) offset += slides.length;
        if (offset > 1 && offset > Math.floor(slides.length / 2)) offset -= slides.length;

        slide.setAttribute('data-pos', offset);
      });
    }

    const nextSlide = () => updateCarousel(activeIndex + 1);
    const prevSlide = () => updateCarousel(activeIndex - 1);

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 4000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    };

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn?.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Initialize
    updateCarousel(0);
    startAutoSlide();
  }

// // ==========================================
//   // 2. STATE-BASED DECK CAROUSEL (ZERO FLICKER)
//   // ==========================================
//   const slides = Array.from(document.querySelectorAll('.carousel-slide'));
//   const nextBtn = document.getElementById('nextBtn');
//   const prevBtn = document.getElementById('prevBtn');
//   const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));

//   if (slides.length > 0) {
//     let activeIndex = 0;
//     let autoSlideInterval;

//     function updateCarousel(index) {
//       // Modulo math for mathematical infinite looping
//       activeIndex = (index + slides.length) % slides.length;

//       slides.forEach((slide, i) => {
//         // Calculate shortest relative offset around the loop
//         let offset = i - activeIndex;
//         if (offset < -1 && offset < -Math.floor(slides.length / 2)) offset += slides.length;
//         if (offset > 1 && offset > Math.floor(slides.length / 2)) offset -= slides.length;

//         // Assign position state
//         slide.setAttribute('data-pos', offset);
//       });

//       // Update dot indicators
//       indicators.forEach((dot, i) => {
//         dot.classList.toggle('active', i === activeIndex);
//       });
//     }

//     const nextSlide = () => updateCarousel(activeIndex + 1);
//     const prevSlide = () => updateCarousel(activeIndex - 1);

//     const startAutoSlide = () => {
//       autoSlideInterval = setInterval(nextSlide, 4000);
//     };

//     const resetAutoSlide = () => {
//       clearInterval(autoSlideInterval);
//       startAutoSlide();
//     };

//     nextBtn?.addEventListener('click', () => {
//       nextSlide();
//       resetAutoSlide();
//     });

//     prevBtn?.addEventListener('click', () => {
//       prevSlide();
//       resetAutoSlide();
//     });

//     indicators.forEach((indicator, i) => {
//       indicator.addEventListener('click', () => {
//         updateCarousel(i);
//         resetAutoSlide();
//       });
//     });

//     // Initialize
//     updateCarousel(0);
//     startAutoSlide();
//   }


  // ==========================================
  // 3. SMOOTH SCROLL REVEAL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal(); 
});