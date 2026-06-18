function toggleMenu(btn) {
  var m = document.getElementById('mobileNav');
  if (!m) return;
  var open = m.style.display === 'block';
  m.style.display = open ? 'none' : 'block';
  if (btn) btn.setAttribute('aria-expanded', String(!open));
}

document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('menuToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      toggleMenu(this);
    });
  }
});
