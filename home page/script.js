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

    var quickSearch = document.getElementById('quick-search');
    var searchResults = document.getElementById('quick-search-results');
    var quickSearchStatus = document.getElementById('quick-search-status');
    if (quickSearch && searchResults) {
        var catalog = [
            { title: 'شرح العقيدة الطحاوية', type: 'lesson', id: 'tahawiyya', keywords: 'العقيدة الطحاوية عقيدة شرح الحلقة 1 الحلقة 2 الحلقة 3 الحلقة 4 الحلقة 5' },
            { title: 'شرح مختصر كتاب التوحيد', type: 'lesson', id: 'tawhid', keywords: 'التوحيد شرح توحيد الحلقة 1 الحلقة 2 الحلقة 3' },
            { title: 'المطالب الإلهية بين النظريات الفلسفية والأدلة الكلامية', type: 'lesson', id: 'matalib', keywords: 'المطالب الالهية فلسفة الكلام الدرس 1 الحلقة 2 الحلقة 3 الحلقة 4 الحلقة 5 الحلقة 6' },
            { title: 'العقيدة الطحاوية', type: 'book', id: 'tahawiyya', keywords: 'متن الطحاوي عقيدة' },
            { title: 'كتاب التوحيد', type: 'book', id: 'tawhid', keywords: 'محمد بن عبد الوهاب توحيد' },
            { title: 'الرحيق المختوم', type: 'book', id: 'raheeq', keywords: 'السيرة النبوية' },
            { title: 'القول المفيد على كتاب التوحيد', type: 'book', id: 'qawl-mufid', keywords: 'ابن عثيمين التوحيد' },
            { title: 'العقيدة الواسطية', type: 'book', id: 'wasitiyya', keywords: 'ابن تيمية عقيدة' },
            { title: 'التحفة السنية بشرح المقدمة الآجرومية', type: 'book', id: 'tuhfa', keywords: 'النحو الآجرومية' },
            { title: 'التعليق على مواضع من شرح العقيدة الطحاوية', type: 'book', id: 'taaleeq', keywords: 'a1635n العقيدة الطحاوية' }
        ];
        var normalize = function (value) {
            return value.toLocaleLowerCase('ar')
                .normalize('NFD')
                .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
                .replace(/[أإآ]/g, 'ا')
                .replace(/ى/g, 'ي');
        };
        var renderSearchResults = function () {
            var query = normalize(quickSearch.value.trim());
            searchResults.replaceChildren();
            searchResults.hidden = !query;
            quickSearch.setAttribute('aria-expanded', String(Boolean(query)));
            if (quickSearchStatus) quickSearchStatus.hidden = true;
            if (!query) return;

            var matches = catalog.filter(function (item) {
                return normalize(item.title + ' ' + item.keywords).includes(query);
            }).slice(0, 8);

            if (!matches.length) {
                searchResults.hidden = true;
                quickSearch.setAttribute('aria-expanded', 'false');
                if (quickSearchStatus) {
                    quickSearchStatus.textContent = 'لا توجد نتائج مطابقة. جرّب اسم كتاب أو درس آخر.';
                    quickSearchStatus.hidden = false;
                }
                return;
            }

            matches.forEach(function (item) {
                var link = document.createElement('a');
                var url = new URL('../courses/index.html', window.location.href);
                url.searchParams.set('type', item.type);
                url.searchParams.set('q', item.title);
                link.href = url.href;
                link.className = 'search-result';
                link.setAttribute('role', 'option');
                var title = document.createElement('span');
                title.className = 'search-result-title';
                title.textContent = item.title;
                var type = document.createElement('span');
                type.className = 'search-result-type';
                type.textContent = item.type === 'book' ? 'كتاب' : 'سلسلة دروس';
                link.append(title, type);
                searchResults.appendChild(link);
            });
        };

        quickSearch.addEventListener('input', renderSearchResults);
        quickSearch.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                quickSearch.value = '';
                renderSearchResults();
            } else if (event.key === 'Enter') {
                var firstResult = searchResults.querySelector('a');
                if (firstResult) window.location.href = firstResult.href;
            }
        });
        document.addEventListener('click', function (event) {
            if (!searchResults.contains(event.target) && event.target !== quickSearch) {
                searchResults.hidden = true;
                quickSearch.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
