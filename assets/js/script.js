

window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');

mobileMenuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  headerNav.classList.toggle('open');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    mobileMenuToggle.classList.remove('active');
    headerNav.classList.remove('open');
  });
});

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


class TestimonialsCarousel {
  constructor() {
    this.carousel = document.getElementById('testimonialsCarousel');
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.getElementById('carouselIndicators');
    
    this.currentIndex = 0;
    this.totalSlides = document.querySelectorAll('.carousel-slide').length;
    this.autoplayInterval = null;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    // Create indicators
    this.createIndicators();
    
    // Event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });
    
    this.carousel.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });
    
    // Start autoplay
    this.startAutoplay();
    
    // Handle window resize
    window.addEventListener('resize', () => this.updateSlidePosition());
  }
  
  createIndicators() {
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicators.appendChild(indicator);
    }
  }
  
  updateSlidePosition() {
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.updateIndicators();
  }
  
  updateIndicators() {
    const allIndicators = this.indicators.querySelectorAll('.indicator');
    allIndicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlidePosition();
    this.resetAutoplay();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlidePosition();
    this.resetAutoplay();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlidePosition();
    this.resetAutoplay();
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }
  
  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new TestimonialsCarousel();
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});


// Observe elements and add animations when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
  const elementsToAnimate = document.querySelectorAll('.card, .benefit-item, .contact-item');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});


// Track WhatsApp button clicks for analytics (if needed)
const whatsappButtons = document.querySelectorAll('a[href*=\"wa.me\"]');
whatsappButtons.forEach(button => {
  button.addEventListener('click', function() {
    console.log('WhatsApp button clicked');
    // You can add Google Analytics or other tracking here
    // Example: gtag('event', 'click', { 'event_category': 'WhatsApp', 'event_label': 'Agendar Sessão' });
  });
});

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});
