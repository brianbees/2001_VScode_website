// Urban Bees main.js
// Nav toggle, accessibility, footer year

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('primary-nav');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
      if (!expanded) {
        navLinks.querySelector('a').focus();
      }
    });
    // Trap focus in nav when open
    navLinks.addEventListener('keydown', function (e) {
      if (!navLinks.classList.contains('open')) return;
      const focusable = navLinks.querySelectorAll('a');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
        navToggle.focus();
      }
    });
    // Close menu on link click
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // Contact form feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      status.textContent = '';
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const consent = contactForm.consent.checked;
      if (!name || !email || !message || !consent) {
        status.textContent = 'Please fill out all fields and consent.';
        return;
      }
      // Simple email validation
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }
      // Submit via Formspree
      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
          contactForm.reset();
          status.style.color = 'var(--color-accent)';
          status.textContent = 'Thank you! Your message has been sent.';
        })
        .catch(() => {
          status.style.color = 'var(--color-error)';
          status.textContent = 'Sorry, there was an error. Please try again.';
        });
    });
  }
});
