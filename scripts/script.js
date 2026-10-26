/**
 * STUDENT PORTFOLIO - JAVASCRIPT
 * Plain Vanilla JavaScript: Zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Dynamic Copyright Year
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Mobile Navigation Toggle & Accessibility
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      navToggle.setAttribute('aria-expanded', String(newState));
      navToggle.classList.toggle('open', newState);
      navMenu.classList.toggle('open', newState);
    };

    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    };

    // Toggle menu on button click
    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav item
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when Escape key is pressed (Keyboard Accessibility)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        navToggle.focus(); // Return focus to the toggle button
      }
    });

    // Close menu when clicking outside of the navigation
    document.addEventListener('click', (event) => {
      const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     3. Active Navigation Link Highlighting on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

});