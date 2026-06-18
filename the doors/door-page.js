function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(function (el) {
    el.style.display = 'none';
  });
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  var target = document.getElementById('tab-' + id);
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
  var first = document.querySelector('.tab-content');
  if (first) first.style.display = 'block';
});
