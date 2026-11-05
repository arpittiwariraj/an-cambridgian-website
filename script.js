/**
 * A.N. Cambridgian Academy - Main Script
 * Handles: sliding menu, scroll animations, inquiry form (WhatsApp), lazy load
 * Optimized for performance
 */

(function () {
  'use strict';

  // --- Sliding menu with submenus ---
  var menuToggle = document.getElementById('menu-toggle');
  var menuPanel = document.getElementById('menu-panel');
  var menuOverlay = document.getElementById('menu-overlay');
  var menuClose = document.getElementById('menu-close');

  function openMenu() {
    if (menuPanel) menuPanel.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (menuPanel) menuPanel.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (menuPanel && menuPanel.classList.contains('active')) closeMenu();
      else openMenu();
    }, { passive: true });
  }
  if (menuClose) menuClose.addEventListener('click', closeMenu, { passive: true });
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu, { passive: true });

  // Close menu on link click (for same-page nav)
  document.querySelectorAll('.menu-panel a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      closeMenu();
    }, { passive: true });
  });

  // --- Optimized: Single IntersectionObserver for all lazy loading and animations ---
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  var combinedObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var target = entry.target;

      // Handle scroll animations
      if (target.classList.contains('animate-on-scroll') || target.classList.contains('stagger-children')) {
        if (entry.isIntersecting) {
          target.classList.add('visible');
        }
      }

      // Handle lazy load images
      if (target.tagName === 'IMG' && target.dataset.src) {
        var src = target.dataset.src;
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
          target.classList.add('loaded');
        }
        combinedObserver.unobserve(target);
      }

      // Handle lazy load iframes
      if (target.tagName === 'IFRAME' && target.dataset.src) {
        var src = target.dataset.src;
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
        }
        combinedObserver.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.animate-on-scroll, .stagger-children').forEach(function (el) {
    combinedObserver.observe(el);
  });

  // Observe images for lazy loading
  document.querySelectorAll('img[data-src]').forEach(function (img) {
    combinedObserver.observe(img);
  });

  // Observe iframes for lazy loading
  document.querySelectorAll('iframe[data-src]').forEach(function (iframe) {
    combinedObserver.observe(iframe);
  });

  // --- Admission inquiry form: submit via WhatsApp ---
  var inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('student-name') || {}).value || '';
      var parent = (document.getElementById('parent-name') || {}).value || '';
      var phone = (document.getElementById('phone') || {}).value || '';
      var email = (document.getElementById('email') || {}).value || '';
      var cls = (document.getElementById('class') || {}).value || '';
      var msg = (document.getElementById('message') || {}).value || '';

      var text = 'Admission Inquiry - A.N. Cambridgian Academy\n\n';
      text += 'Student Name: ' + name + '\n';
      text += 'Parent Name: ' + parent + '\n';
      text += 'Phone: ' + phone + '\n';
      text += 'Email: ' + email + '\n';
      text += 'Class: ' + cls + '\n';
      text += 'Message: ' + msg;

      var encoded = encodeURIComponent(text);
      var waNumber = '917905891085';
      var url = 'https://wa.me/' + waNumber + '?text=' + encoded;
      window.open(url, '_blank');
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, { passive: false });
    }
  });

  // --- Gallery Lightbox ---
  function initGallery() {
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    var lightboxClose = lightbox.querySelector('.lightbox-close');
    var lightboxImg = lightbox.querySelector('.lightbox-img');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        var img = item.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      }, { passive: true });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- Faculty Modals ---
  function initFacultyModals() {
    var facultyCards = document.querySelectorAll('.faculty-card');
    facultyCards.forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        var photoWrap = card.querySelector('.faculty-photo-wrap img');
        var name = card.querySelector('h3').textContent;
        var qual = card.querySelector('.qualification').textContent;
        var exp = card.querySelector('.experience').textContent;
        
        var modal = document.createElement('div');
        modal.className = 'faculty-modal';
        modal.innerHTML = `
          <div class="faculty-modal-content">
            <button class="faculty-modal-close">&times;</button>
            <div class="faculty-modal-img" style="background-image: url(${photoWrap ? photoWrap.src : ''}); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
            <div class="faculty-modal-info">
              <h3>${name}</h3>
              <p class="qualification">${qual}</p>
              <p class="experience">${exp}</p>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.querySelector('.faculty-modal-close').addEventListener('click', function() {
          document.body.removeChild(modal);
          document.body.style.overflow = '';
        });

        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          }
        });
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initGallery();
      initFacultyModals();
    });
  } else {
    initGallery();
    initFacultyModals();
  }

  // --- Trigger hero animations on page load ---
  setTimeout(function() {
    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.classList.add('visible');
    }
  }, 300);

})();

