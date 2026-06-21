document.addEventListener("DOMContentLoaded", function () {
  // Robust mobile navigation toggle and tab system.

  const menuToggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const body = document.body;

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove("is-open");
    }
    if (body) {
      body.classList.remove("nav-open");
    }
  }

  // close on outside click
  document.addEventListener("click", function (e) {
    if (!mobileNav || !mobileNav.classList.contains("is-open")) return;
    if (mobileNav.contains(e.target) || (menuToggleBtn && menuToggleBtn.contains(e.target))) return;
    closeMobileNav();
  });

  // close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  // === tab system (graceful: data-tab attribute expected on buttons) ===
  const tabButtons = document.querySelectorAll(".tab-btn[data-tab]");
  const tabContents = document.querySelectorAll(".tab-content");

  function showTabById(id) {
    tabContents.forEach(c => c.style.display = 'none');
    const t = document.getElementById('tab-' + id);
    if (t) t.style.display = 'block';
    tabButtons.forEach(b => b.classList.remove('active'));
    const btn = Array.from(tabButtons).find(b => b.getAttribute('data-tab') === id);
    if (btn) btn.classList.add('active');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const id = this.getAttribute('data-tab');
      if (id) showTabById(id);
    });
  });

  // initial tab state: show first tab-content if none visible
  if (tabContents.length) {
    const anyVisible = Array.from(tabContents).some(c => c.style.display === 'block' || c.classList.contains('visible'));
    if (!anyVisible) {
      // prefer a tab button with data-tab="all" else first button
      const defaultBtn = Array.from(tabButtons).find(b => b.getAttribute('data-tab') === 'all') || tabButtons[0];
      if (defaultBtn) defaultBtn.click();
      else tabContents[0].style.display = 'block';
    }
  }
});

(function () {
  const menuBtn = document.getElementById('menuToggleBtn');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;
  if (!menuBtn || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('is-open');
    body.classList.add('mobile-nav-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
  }

  function closeNav() {
    mobileNav.classList.remove('is-open');
    body.classList.remove('mobile-nav-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileNav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close when clicking outside the mobile nav
  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains('is-open')) return;
    if (mobileNav.contains(e.target) || menuBtn.contains(e.target)) return;
    closeNav();
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close when selecting a link inside the mobile nav
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });
})();