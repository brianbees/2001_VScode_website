// Urban Bees main.js
// Nav toggle, accessibility, footer year

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Sidebar nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const sidebar = document.getElementById('sidebar-nav');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      sidebar.classList.toggle('open');
      sidebar.setAttribute('aria-hidden', expanded);
      if (!expanded) {
        sidebar.querySelector('a').focus();
      }
    });
    // Trap focus in sidebar when open
    sidebar.addEventListener('keydown', function (e) {
      if (!sidebar.classList.contains('open')) return;
      const focusable = sidebar.querySelectorAll('a');
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
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden', true);
        navToggle.setAttribute('aria-expanded', false);
        navToggle.focus();
      }
    });
    // Close sidebar on link click
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden', true);
        navToggle.setAttribute('aria-expanded', false);
      }
    });
    // Optional: close sidebar when clicking outside
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== navToggle) {
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden', true);
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
