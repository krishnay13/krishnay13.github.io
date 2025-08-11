/*
 * Script for Safari Wineries one‑page site.
 * Handles smooth scrolling, navbar style on scroll, section reveal animations
 * and contact modal interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', evt => {
      evt.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - navbar.offsetHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.15,
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });

  // Contact modal interactions
  const contactModal = document.getElementById('contactModal');
  const openModalBtn = document.getElementById('openContactModal');
  const closeModalBtn = document.getElementById('closeModal');
  const contactForm = document.getElementById('contactForm');

  openModalBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeModalBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', evt => {
    if (evt.target === contactModal) {
      contactModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Handle form submission (dummy)
  contactForm.addEventListener('submit', evt => {
    evt.preventDefault();
    // In a real implementation, you would send the message via email or API.
    alert('Thank you! Your message has been sent.');
    contactModal.style.display = 'none';
    document.body.style.overflow = '';
    contactForm.reset();
  });
});