/* =============================================
   THEME TOGGLE
   ============================================= */
const themeToggle = document.getElementById("themeToggle");
const iconMoon = document.getElementById("iconMoon");
const iconSun  = document.getElementById("iconSun");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    iconMoon.style.display = "block";
    iconSun.style.display  = "none";
  } else {
    iconMoon.style.display = "none";
    iconSun.style.display  = "block";
  }
}

/* =============================================
   NAVBAR: SCROLL & ACTIVE LINK
   ============================================= */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Back to top
  backToTopHandler();

  // Reveal elements
  revealOnScroll();
});

/* =============================================
   HAMBURGER MENU
   ============================================= */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const svgBars = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

hamburger.innerHTML = svgBars;

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.innerHTML = mobileMenu.classList.contains("open") ? svgX : svgBars;
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.innerHTML = svgBars;
  });
});

/* =============================================
   BACK TO TOP
   ============================================= */
const backToTopBtn = document.getElementById("backToTop");

function backToTopHandler() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =============================================
   COUNTER ANIMATION
   ============================================= */
const statNums = document.querySelectorAll(".stat-num");
let counterStarted = false;

function startCounters() {
  if (counterStarted) return;
  const heroSection = document.getElementById("home");
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom < window.innerHeight * 1.2) {
    counterStarted = true;
    statNums.forEach((num) => {
      const target = parseInt(num.getAttribute("data-target"));
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        num.textContent = Math.floor(current);
      }, 16);
    });
  }
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* =============================================
   FILTER TABS
   ============================================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealElements = document.querySelectorAll(
  ".project-card, .service-card, .info-item, .section-header, .about-text, .contact-form"
);

revealElements.forEach((el) => el.classList.add("reveal"));

function revealOnScroll() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("load", revealOnScroll);

/* =============================================
   CONTACT FORM
   ============================================= */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector("button[type='submit']");
  const spinnerSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  const sendSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  btn.innerHTML = spinnerSVG + ' Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = sendSVG + ' Send Message';
    btn.disabled = false;
    formSuccess.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 4000);
  }, 1500);
});

/* =============================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* =============================================
   TYPING EFFECT ON HERO TITLE
   ============================================= */
const heroTitle = document.querySelector(".hero-title");
const roles = [
  "Front End Developer",
  "UI Developer",
  "Web Designer",
  "JavaScript Enthusiast",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    heroTitle.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    heroTitle.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

setTimeout(typeEffect, 1000);

/* =============================================
   CURSOR GLOW EFFECT
   ============================================= */
const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

if (!isTouchDevice) {
  const cursor = document.createElement("div");
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0,229,255,0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  const cursorDot = document.createElement("div");
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #00e5ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.05s ease;
  `;
  document.body.appendChild(cursorDot);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .project-card, .service-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.borderColor = "rgba(0,229,255,1)";
      cursor.style.background = "rgba(0,229,255,0.08)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderColor = "rgba(0,229,255,0.6)";
      cursor.style.background = "transparent";
    });
  });
}

/* =============================================
    MOBILE MENU POSITION ADJUSTMENT
   ============================================= */

function updateMobileMenuTop() {
  const navbar = document.querySelector('nav'); // أو الـ selector بتاع الـ navbar
  const menu = document.getElementById('mobileMenu');
  menu.style.top = navbar.offsetHeight + 'px';
}

// شغّله أول ما الصفحة تفتح وكمان لما الـ navbar يتغير
window.addEventListener('scroll', updateMobileMenuTop);
window.addEventListener('resize', updateMobileMenuTop);
updateMobileMenuTop(); // مرة أول ما الصفحة تحمّل