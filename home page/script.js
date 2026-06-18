// ...existing code...
// بسيط: تبديل قائمة الجوال
function toggleMenu(btn){
    var menu = document.getElementById('mobileNav');
    var opened = menu.style.display === 'block';
    menu.style.display = opened ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!opened));
}

// عدّاد بسيط عند التحميل (count-up)
document.addEventListener('DOMContentLoaded', function(){
    var counters = document.querySelectorAll('.num');
    counters.forEach(function(el){
        var target = +el.getAttribute('data-target') || 0;
        if (!target) { el.textContent = '0'; return; }
        var duration = 900;
        var start = 0;
        var stepTime = Math.max(Math.floor(duration / target), 12);
        var timer = setInterval(function(){
            start += Math.max(1, Math.floor(target / (duration / stepTime)));
            if(start >= target){
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = start;
            }
        }, stepTime);
    });
});