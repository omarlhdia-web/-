document.addEventListener("DOMContentLoaded", function () {
  
  // === نظام التبديل بين التبويبات (Tabs System) ===
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // إخفاء جميع محتويات التبويبات
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // إزالة الحالة النشطة من الأزرار
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // إظهار التبويب المحدد وإضافة الحالة النشطة للزر
      const targetTab = document.getElementById("tab-" + tabId);
      if (targetTab) {
        targetTab.style.display = "block";
      }
      this.classList.add("active");
    });
  });

  // === القائمة المستجيبة للهواتف (Responsive Mobile Menu) ===
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggleBtn && mobileNav) {
    menuToggleBtn.addEventListener("click", function () {
      const isOpen = mobileNav.style.display === "block";
      
      mobileNav.style.display = isOpen ? "none" : "block";
      this.setAttribute("aria-expanded", String(!isOpen));
    });
  }
});