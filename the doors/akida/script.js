function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('tab-' + id);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('active');
}

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
    toggleBtn.addEventListener('click', function () { toggleMenu(this); });
  }
  // Show first tab by default
  var first = document.querySelector('.tab-content');
  if (first) first.style.display = 'block';
});
