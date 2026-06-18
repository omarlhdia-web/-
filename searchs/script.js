function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('tab-' + id);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('active');
}

function setView(v) {
  var grid = document.getElementById('view-grid');
  var list = document.getElementById('view-list');
  var btnG = document.getElementById('vt-grid');
  var btnL = document.getElementById('vt-list');
  if (v === 'grid') {
    if (grid) grid.style.display = 'grid';
    if (list) list.style.display = 'none';
    if (btnG) btnG.classList.add('on');
    if (btnL) btnL.classList.remove('on');
  } else {
    if (grid) grid.style.display = 'none';
    if (list) list.style.display = 'flex';
    if (btnL) btnL.classList.add('on');
    if (btnG) btnG.classList.remove('on');
  }
}

function filterChip(el, val) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('on'));
  if (el) el.classList.add('on');
  // وضع فلترة مستقبلية هنا حسب القيمة val
}

function toggleMenu(btn) {
  var m = document.getElementById('mobileNav');
  if (!m) return;
  var open = m.style.display === 'block';
  m.style.display = open ? 'none' : 'block';
  if (btn) btn.setAttribute('aria-expanded', String(!open));
}

// تأكيد الحالة الابتدائية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  // عرض تبويب "الكل" افتراضياً إذا كان مخفياً
  if (document.getElementById('tab-all')) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById('tab-all').style.display = 'block';
  }
  // عرض الشبكة افتراضياً
  var grid = document.getElementById('view-grid');
  var list = document.getElementById('view-list');
  if (grid) grid.style.display = 'grid';
  if (list) list.style.display = 'none';
});