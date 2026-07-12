document.addEventListener('DOMContentLoaded', () => {

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
      
      // Verhoed dat die agtergrond skrol wanneer menu oop is
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Maak toe sodra 'n skakel geklik word
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // 2. AUTOMATIC ENGAGEMENT PHOTOS CAROUSEL
  // ==========================================
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const navDotContainer = document.querySelector('.carousel-nav');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let autoSlideInterval;

    // Genereer die navigasie-kolletjies (indicators) dinamies
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-indicator');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Sien foto ${index + 1}`);
      navDotContainer.appendChild(dot);
    });

    const dots = Array.from(navDotContainer.querySelectorAll('.carousel-indicator'));

    // Move to specific slide function
    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active dot
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      
      currentIndex = index;
    };

    // Next Slide
    const nextSlide = () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      updateCarousel(nextIndex);
    };

    // Prev Slide
    const prevSlide = () => {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      updateCarousel(prevIndex);
    };

    // Event Listeners vir knoppies
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Klik aksies vir die kolletjies self
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateCarousel(index);
        resetAutoSlide();
      });
    });

    // Outomatiese blaai (elke 4 sekondes)
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 4000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    };

    // Begin die outomatiese loop
    startAutoSlide();
  }

  // ==========================================
  // 3. SMOOTH SCROLL REVEAL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85; // Animeer as item 15% van onder af verskyn

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;

      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  // Hardloop een keer by die begin en dan met elke skrol
  window.addEventListener('scroll', checkReveal);
  checkReveal(); 
});