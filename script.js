/* ============================================================
   script.js — Rushikesh Bade Portfolio
   All JavaScript logic:
   1. Scroll reveal animation
   2. Navbar active link highlight
   3. Navbar shadow on scroll
   4. Contact form handler
============================================================ */


/* ============================================================
   1. SCROLL REVEAL ANIMATION
   -------------------------------------------------------
   How it works:
   - All elements with class .reveal start hidden (opacity:0, translateY)
   - IntersectionObserver watches them
   - When an element enters the viewport, we add .visible class
   - CSS transition in style.css handles the smooth fade-up effect
   - observer.unobserve() ensures each element only animates once
============================================================ */
var revealElements = document.querySelectorAll('.reveal');

var scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Element is visible in viewport — add .visible to trigger CSS animation
      entry.target.classList.add('visible');
      // Stop watching this element (animate only once)
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12  // Trigger when 12% of element is visible
});

// Attach observer to every .reveal element on the page
revealElements.forEach(function(el) {
  scrollObserver.observe(el);
});


/* ============================================================
   2. NAVBAR SHADOW ON SCROLL
   -------------------------------------------------------
   When the user scrolls more than 50px down,
   add a visible box-shadow to the navbar so it
   visually lifts above the page content
============================================================ */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');

  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


/* ============================================================
   3. ACTIVE NAV LINK HIGHLIGHT
   -------------------------------------------------------
   As the user scrolls through sections, the corresponding
   nav link gets highlighted in cyan color.

   Logic:
   - Get all sections that have an id attribute
   - On each scroll, check which section is currently at the top
   - Match it to the nav link with the same href (#id)
   - Apply cyan color to that link, reset others
============================================================ */
var allSections = document.querySelectorAll('section[id]');
var allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
  var currentSection = '';

  // Loop through sections and find which one is currently visible
  allSections.forEach(function(section) {
    // If the top of section is above 120px from top of viewport, it's "current"
    if (window.scrollY >= section.offsetTop - 120) {
      currentSection = section.getAttribute('id');
    }
  });

  // Update nav link colors based on current section
  allNavLinks.forEach(function(link) {
    link.style.color = '';  // Reset to default (muted gray from CSS)

    // If this link points to the current section, highlight it
    if (link.getAttribute('href') === '#' + currentSection) {
      link.style.color = '#00F5FF';  // var(--cyan)
    }
  });
});


/* ============================================================
   4. CONTACT FORM HANDLER
   -------------------------------------------------------
   Prevents the browser from reloading the page on submit.
   Replaces the form HTML with a success message card.
   This simulates a form submission without a backend.
============================================================ */
function handleForm(event) {
  // Stop default browser form submit (which would reload the page)
  event.preventDefault();

  // Replace the form with a styled success message
  event.target.innerHTML =
    '<div style="text-align:center; padding:36px 20px; color:#10B981;">' +
      '<i class="bi bi-check-circle-fill" style="font-size:3rem;"></i>' +
      '<p style="margin-top:16px; font-weight:700; font-size:1.1rem; color:#F1F5F9;">Message Sent!</p>' +
      '<p style="color:#64748B; font-size:0.88rem; margin-top:6px;">Thank you for reaching out. I\'ll get back to you soon.</p>' +
    '</div>';
}


/* ============================================================
   5. SMOOTH SCROLL FOR NAV LINKS (Enhancement)
   -------------------------------------------------------
   Bootstrap handles smooth scroll via CSS (scroll-behavior: smooth)
   but this ensures any link click also closes the mobile navbar
============================================================ */
allNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    // Close the Bootstrap mobile nav collapse if it's open
    var navCollapse = document.getElementById('navMenu');
    if (navCollapse && navCollapse.classList.contains('show')) {
      // Use Bootstrap's collapse API to close it
      var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
});