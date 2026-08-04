/* ABS Sandblasting & Spray Painting Ltd — site behaviour */
(function () {
  "use strict";

  // ---- Loader ----
  window.addEventListener("load", function () {
    var l = document.getElementById("loader");
    if (l) setTimeout(function () { l.classList.add("done"); }, 650);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // ---- Nav scroll state ----
    var nav = document.querySelector(".nav");
    var onScroll = function () {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Mobile menu ----
    var burger = document.querySelector(".hamburger");
    var body = document.body;
    if (burger) {
      burger.addEventListener("click", function () {
        var open = body.classList.toggle("nav-menu-open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.querySelectorAll(".nav-links a, .nav-links + .nav-phone").forEach(function (a) {
        a.addEventListener("click", function () {
          body.classList.remove("nav-menu-open");
          burger.classList.remove("open");
        });
      });
    }

    // ---- Hero rotator ----
    var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
    if (slides.length > 1) {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // lazy-load the non-first slides
      slides.forEach(function (s, i) {
        if (i > 0 && s.dataset.bg) s.style.backgroundImage = "url('" + s.dataset.bg + "')";
      });
      if (!reduce) {
        var idx = 0;
        setInterval(function () {
          slides[idx].classList.remove("active");
          idx = (idx + 1) % slides.length;
          slides[idx].classList.add("active");
        }, 5500);
      }
    }

    // ---- Gmail compose links (built from split parts so Cloudflare can't obfuscate) ----
    document.querySelectorAll("a[data-gmail]").forEach(function (a) {
      var to = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
      a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) +
        "&su=" + (a.getAttribute("data-su") || "") +
        "&body=" + (a.getAttribute("data-body") || "");
      a.target = "_blank";
      a.rel = "noopener";
    });

    // ---- Reveal on scroll ----
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.14 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    // ---- Footer year ----
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
