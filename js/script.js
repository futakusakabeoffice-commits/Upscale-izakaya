(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mobileNav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    nav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    if (nav.hidden) openMenu();
    else closeMenu();
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !nav.hidden) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && !nav.hidden) closeMenu();
  });
})();

// GA4 conversion event: phone tap. No-op until gtag.js is installed with a real measurement ID.
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link || typeof gtag !== "function") return;
  gtag("event", "phone_click", { phone_number: link.getAttribute("href").slice(4) });
});
