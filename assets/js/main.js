const NAV = [
  {
    label: "About Us",
    path: "/youngji_about-us/",
    children: [
      { label: "Mission and Vision", path: "/youngji_about-us/vision-and-mission/" },
      { label: "Founder’s message", path: "/youngji_about-us/principals-message/" },
      { label: "President Message", path: "/youngji_about-us/school-counseling/" },
      { label: "Faculty and staff", path: "/youngji_about-us/faculty-and-staff/" },
      { label: "History", path: "/youngji_about-us/history/" },
      { label: "School Calendar", path: "/youngji_about-us/school-administrator/" },
    ],
  },
  {
    label: "Admission",
    path: "/admission/",
    children: [
      { label: "Scholarship", path: "/admission/sub1/" },
      { label: "Admission Procedure", path: "/admission/sub2/" },
      { label: "Tuition Fees", path: "/admission/sub3/" },
      { label: "Application form", path: "/admission/sub4/" },
      { label: "Admissions Requirements", path: "/admission/sub5/" },
    ],
  },
  {
    label: "Basic Education",
    path: "/basic-education/",
    children: [
      { label: "Principal’s Message", path: "/basic-education/principals-message/" },
      { label: "Preschool", path: "/basic-education/preschool/" },
      { label: "Elementary", path: "/basic-education/elementary/" },
      { label: "Middle/Junior", path: "/basic-education/middle-junior/" },
      { label: "High/Senior", path: "/basic-education/high-senior/" },
    ],
  },
  {
    label: "e-Education",
    path: "/e-education/",
    children: [
      { label: "Director’s message", path: "/e-education/online-school/" },
      { label: "Extension YJIS", path: "/e-education/online-school-k-12/" },
      { label: "Accreditation", path: "/e-education/online-college/" },
      { label: "Extension Class Coordinator", path: "/new-page-1/" },
      { label: "Extension Class Teacher", path: "/new-page-2/" },
      { label: "Online School(LMS)", path: "/e-education/online-examination/" },
    ],
  },
  {
    label: "Community",
    path: "/community/",
    children: [
      { label: "SCHOOL LIFE", path: "/community/news-2/" },
      { label: "News / Notification", path: "/community/notification/" },
      { label: "Contact Info", path: "/community/campus-life/" },
      { label: "Branch school of YJIS", path: "/community/extension-class-center/" },
      { label: "Contact Info & Search for student", path: "/community/search-for-student/" },
    ],
  },
];

function getBase(depth) {
  const safeDepth = Number.isFinite(depth) && depth > 0 ? depth : 0;
  return safeDepth === 0 ? "" : "../".repeat(safeDepth);
}

function toRelative(base, path) {
  if (!path || path === "/") {
    return base === "" ? "./" : base;
  }
  return `${base}${path.replace(/^\//, "")}`;
}

function findCurrentNav(path) {
  for (const section of NAV) {
    if (section.path === path) {
      return { section, page: section };
    }
    for (const child of section.children || []) {
      if (child.path === path) {
        return { section, page: child };
      }
    }
  }
  return { section: null, page: null };
}

function highlightActiveLink(link, isActive, variant) {
  if (!link) return;
  if (isActive) {
    link.classList.add("text-[#A51C30]");
    link.setAttribute("aria-current", "page");
    if (variant === "desktop") {
      link.classList.add("border-b-[#A51C30]", "font-semibold");
    }
    if (variant === "sidebar") {
      link.classList.add(
        "border-[#A51C30]",
        "bg-white",
        "font-semibold",
        "text-[#A51C30]",
        "shadow-sm"
      );
    }
  } else {
    link.classList.remove("text-[#A51C30]", "font-semibold", "border-b-[#A51C30]", "border-[#A51C30]", "bg-white", "shadow-sm");
    link.removeAttribute("aria-current");
  }
}

function buildTopNavigation(base, currentPath, activeSection) {
  const topNav = document.getElementById("top-nav");
  const mobileNav = document.getElementById("mobile-nav");
  if (!topNav || !mobileNav) return;

  topNav.innerHTML = "";
  mobileNav.innerHTML = "";

  NAV.forEach((item) => {
    const relative = toRelative(base, item.path);
    const anchor = document.createElement("a");
    anchor.href = relative;
    anchor.textContent = item.label;
    anchor.className =
      "border-b-2 border-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1F2933] transition hover:text-[#A51C30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51C30] whitespace-nowrap";
    highlightActiveLink(anchor, activeSection && activeSection.path === item.path, "desktop");
    topNav.appendChild(anchor);

    const group = document.createElement("div");
    group.className = "border-b border-slate-200 pb-4 last:border-none last:pb-0";

    const mobileLink = document.createElement("a");
    mobileLink.href = relative;
    mobileLink.textContent = item.label;
    mobileLink.className =
      "flex items-center justify-between py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1F2B] transition hover:text-[#A51C30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51C30]";
    highlightActiveLink(mobileLink, activeSection && activeSection.path === item.path, "mobile");
    group.appendChild(mobileLink);

    if (item.children && item.children.length > 0) {
      const childList = document.createElement("ul");
      childList.className = "mt-2 space-y-1 border-l border-slate-200 pl-4";
      item.children.forEach((child) => {
        const li = document.createElement("li");
        const childLink = document.createElement("a");
        childLink.href = toRelative(base, child.path);
        childLink.textContent = child.label;
        childLink.className =
          "block rounded-md px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-[#374151] transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51C30]";
        highlightActiveLink(childLink, currentPath === child.path, "mobile");
        li.appendChild(childLink);
        childList.appendChild(li);
      });
      group.appendChild(childList);
    }

    mobileNav.appendChild(group);
  });
}

function buildSidebar(base, section, currentPath) {
  const sidebar = document.getElementById("sidebar-nav");
  const sidebarContainer = document.getElementById("sidebar");
  const sidebarMobile = document.getElementById("sidebar-nav-mobile");
  const sidebarMobileContainer = document.getElementById("sidebar-mobile");
  if (!sidebar || !sidebarContainer) return;

  if (!section || !section.children || section.children.length === 0) {
    sidebarContainer.classList.add("hidden");
    if (sidebarMobileContainer) {
      sidebarMobileContainer.classList.add("hidden");
    }
    return;
  }

  sidebarContainer.classList.remove("hidden");
  sidebar.innerHTML = "";
  if (sidebarMobile) {
    sidebarMobile.innerHTML = "";
  }
  if (sidebarMobileContainer) {
    sidebarMobileContainer.classList.remove("hidden");
  }
  section.children.forEach((child) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = toRelative(base, child.path);
    link.textContent = child.label;
    link.className =
      "group flex items-center justify-between rounded-md border border-transparent px-4 py-3 text-[0.85rem] font-medium uppercase tracking-[0.14em] text-[#374151] transition hover:border-[#A51C30]/30 hover:text-[#A51C30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51C30]";
    highlightActiveLink(link, currentPath === child.path, "sidebar");
    li.appendChild(link);
    sidebar.appendChild(li);

    if (sidebarMobile) {
      const mobileLi = li.cloneNode(true);
      const mobileLink = mobileLi.querySelector("a");
      highlightActiveLink(mobileLink, currentPath === child.path, "sidebar");
      sidebarMobile.appendChild(mobileLi);
    }
  });
}

function buildBreadcrumbs(base, section, page) {
  const breadcrumbNav = document.getElementById("breadcrumbs");
  if (!breadcrumbNav) return;

  const list = document.createElement("ol");
  list.className = "flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500";

  const crumbs = [];
  crumbs.push({ label: "Home", path: "/" });
  if (section) {
    crumbs.push({ label: section.label, path: section.path });
    if (page && page.path !== section.path) {
      crumbs.push({ label: page.label, path: page.path });
    }
  }

  crumbs.forEach((crumb, index) => {
    const li = document.createElement("li");
    const isLast = index === crumbs.length - 1;
    if (isLast) {
      const span = document.createElement("span");
      span.textContent = crumb.label;
      span.className = "text-[#1F2933]";
      span.setAttribute("aria-current", "page");
      li.appendChild(span);
    } else {
      const link = document.createElement("a");
      link.href = toRelative(base, crumb.path);
      link.textContent = crumb.label;
      link.className = "text-[#A51C30] transition hover:text-[#7F1524] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51C30]";
      li.appendChild(link);
      const separator = document.createElement("span");
      separator.textContent = "›";
      separator.className = "text-slate-300";
      separator.setAttribute("aria-hidden", "true");
      li.appendChild(separator);
    }
    list.appendChild(li);
  });

  breadcrumbNav.innerHTML = "";
  breadcrumbNav.appendChild(list);
}

function initHeroSlider() {
  const slider = document.getElementById("hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll("[data-hero-slide]"));
  if (slides.length <= 1) return;

  let currentIndex = slides.findIndex((slide) => slide.dataset.active === "true");
  if (currentIndex < 0) {
    currentIndex = 0;
  }

  const prevButton = slider.querySelector("[data-hero-prev]");
  const nextButton = slider.querySelector("[data-hero-next]");
  const indicatorsContainer = slider.querySelector("[data-hero-indicators]");
  const statusEl = slider.querySelector("[data-hero-status]");

  let autoTimer;
  let indicators = [];

  function setSlideVisibility() {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.dataset.active = isActive ? "true" : "false";
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      if (isActive) {
        indicator.classList.add("bg-white", "opacity-100");
        indicator.classList.remove("bg-white/40", "opacity-70");
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.classList.remove("bg-white", "opacity-100");
        indicator.classList.add("bg-white/40", "opacity-70");
        indicator.removeAttribute("aria-current");
      }
    });

    if (statusEl) {
      statusEl.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
    }
  }

  function goToSlide(index) {
    const total = slides.length;
    currentIndex = ((index % total) + total) % total;
    setSlideVisibility();
  }

  function showNextSlide() {
    goToSlide(currentIndex + 1);
  }

  function showPreviousSlide() {
    goToSlide(currentIndex - 1);
  }

  const AUTO_INTERVAL = 7000;

  function stopAutoPlay() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = undefined;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = window.setInterval(showNextSlide, AUTO_INTERVAL);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = "";
    indicators = slides.map((_, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.className =
        "h-2.5 w-2.5 rounded-full bg-white/40 opacity-70 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white";
      indicator.setAttribute("aria-label", `Show slide ${index + 1} of ${slides.length}`);
      indicator.addEventListener("click", () => {
        goToSlide(index);
        restartAutoPlay();
      });
      indicatorsContainer.appendChild(indicator);
      return indicator;
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showPreviousSlide();
      restartAutoPlay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showNextSlide();
      restartAutoPlay();
    });
  }

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousSlide();
      restartAutoPlay();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextSlide();
      restartAutoPlay();
    }
  });

  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);
  slider.addEventListener("focusin", stopAutoPlay);
  slider.addEventListener("focusout", (event) => {
    if (!slider.contains(event.relatedTarget)) {
      startAutoPlay();
    }
  });

  setSlideVisibility();
  startAutoPlay();
}

function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }

  const quickLinks = document.getElementById("footer-quick-links");
  const baseFromBody = getBase(Number(document.body.dataset.depth || "0"));
  if (quickLinks) {
    quickLinks.innerHTML = "";
    const items = [
      { label: "About Youngji", path: "/youngji_about-us/" },
      { label: "Admissions", path: "/admission/" },
      { label: "Academic Programs", path: "/basic-education/" },
      { label: "e-Education", path: "/e-education/" },
      { label: "Community", path: "/community/" },
    ];
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = toRelative(baseFromBody, item.path);
      link.textContent = item.label;
      link.className = "inline-flex items-center gap-2 text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white";
      const icon = document.createElement("span");
      icon.textContent = "→";
      icon.className = "text-[#A51C30]";
      icon.setAttribute("aria-hidden", "true");
      link.appendChild(icon);
      li.appendChild(link);
      quickLinks.appendChild(li);
    });
  }

  const footerCta = document.getElementById("footer-cta");
  if (footerCta) {
    footerCta.href = toRelative(baseFromBody, "/admission/sub2/");
  }
}

function initMobileToggle() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const overlay = document.getElementById("mobile-menu-overlay");
  const drawer = document.getElementById("mobile-menu-drawer");
  const closeButton = document.getElementById("mobile-menu-close");
  if (!toggle || !overlay || !drawer || !closeButton) return;

  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }
  overlay.style.zIndex = "1000";

  let previousFocus = null;
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  const getFocusableItems = () =>
    Array.from(drawer.querySelectorAll(focusableSelector)).filter((element) => {
      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    });

  const openMenu = () => {
    if (!overlay.classList.contains("hidden")) return;
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    overlay.classList.remove("hidden");
    overlay.removeAttribute("aria-hidden");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden", "mobile-menu-open");
    const focusableItems = getFocusableItems();
    (focusableItems[0] || drawer).focus();
  };

  const closeMenu = (restoreFocus = true) => {
    if (overlay.classList.contains("hidden")) return;
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden", "mobile-menu-open");
    if (restoreFocus) {
      (previousFocus || toggle).focus();
    }
  };

  toggle.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);

  overlay.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.drawerClose === "true") {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay && !overlay.classList.contains("hidden")) {
      closeMenu();
      return;
    }
    if (event.key !== "Tab" || overlay.classList.contains("hidden")) {
      return;
    }

    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) {
      event.preventDefault();
      drawer.focus();
      return;
    }

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];
    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  drawer.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeMenu(false);
    }
  });
}

function initMobileContactBar(base) {
  if (document.querySelector(".mobile-contact-bar")) return;

  const bar = document.createElement("nav");
  bar.className = "mobile-contact-bar";
  bar.setAttribute("aria-label", "Quick contact");
  bar.innerHTML = `
    <a href="tel:+63464021779">Call</a>
    <a href="${toRelative(base, "/admission/sub2/")}">Apply</a>
    <a href="https://www.facebook.com/myyoungjiofficialpage" target="_blank" rel="noopener noreferrer">FB</a>
  `;
  document.body.appendChild(bar);
}

function buildGlobalCta(base) {
  const container = document.getElementById("global-cta");
  if (!container) return;

  container.innerHTML = `
    <div class="rounded-3xl border border-[#A51C30]/20 bg-[#A51C30] px-6 py-10 text-white shadow-lg">
      <div class="mx-auto flex max-w-4xl flex-col items-start gap-6 text-left md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Take the next step</p>
          <h2 class="text-3xl font-semibold tracking-tight text-white md:text-4xl">Begin your Youngji journey today</h2>
          <p class="max-w-xl text-base text-white/90">Connect with our admissions counselors to explore scholarships, application timelines, and personalized campus visits for your family.</p>
        </div>
        <div class="flex flex-col items-stretch gap-3 sm:flex-row">
          <a href="${toRelative(base, "/admission/sub2/")}" class="inline-flex items-center justify-center rounded-full border border-white/30 bg-[#A51C30] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-[#8F1727] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">Application Guide</a>
          <a href="${toRelative(base, "/community/campus-life/")}" class="inline-flex items-center justify-center rounded-full border border-white/30 bg-[#A51C30] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-[#8F1727] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">Contact Admissions</a>
        </div>
      </div>
    </div>
  `;
}

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "zh-CN", label: "Chinese" },
  { value: "tl", label: "Filipino" },
  { value: "vi", label: "Vietnamese" },
  { value: "th", label: "Thai" },
  { value: "es", label: "Spanish" },
];

function getStoredTranslateLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const language = decodeURIComponent(match[1]).split("/").filter(Boolean).pop();
  return LANGUAGE_OPTIONS.some((option) => option.value === language) ? language : "en";
}

function setTranslateCookie(language) {
  const value = `/en/${language}`;
  const hostnameParts = window.location.hostname.split(".");
  const rootDomain = hostnameParts.length > 1 ? `.${hostnameParts.slice(-2).join(".")}` : "";
  document.cookie = `googtrans=${value};path=/;max-age=31536000`;
  if (rootDomain) {
    document.cookie = `googtrans=${value};path=/;domain=${rootDomain};max-age=31536000`;
  }
}

function syncLanguageControls(language) {
  document.querySelectorAll("[data-translate-select]").forEach((select) => {
    select.value = language;
  });
}

function applyGoogleLanguage(language) {
  setTranslateCookie(language);
  syncLanguageControls(language);

  const googleSelects = document.querySelectorAll(".goog-te-combo");
  let applied = false;
  googleSelects.forEach((select) => {
    if (select.value !== language) {
      select.value = language;
    }
    select.dispatchEvent(new Event("change"));
    applied = true;
  });

  if (!applied && language !== "en") {
    window.setTimeout(() => window.location.reload(), 80);
  }
}

function initTranslateControls() {
  const controls = document.querySelectorAll("[data-translate-select]");
  if (!controls.length) return;

  const currentLanguage = getStoredTranslateLanguage();
  controls.forEach((select) => {
    if (select.dataset.ready === "true") return;
    select.dataset.ready = "true";
    select.innerHTML = LANGUAGE_OPTIONS.map(
      (option) => `<option value="${option.value}">${option.label}</option>`,
    ).join("");
    select.value = currentLanguage;
    select.addEventListener("change", () => applyGoogleLanguage(select.value));
  });
}

function initGoogleTranslateWidget() {
  const desktopContainer = document.getElementById("google_translate_element");
  const mobileContainer = document.getElementById("google_translate_element_mobile");
  if (!desktopContainer && !mobileContainer) {
    return;
  }
  initTranslateControls();

  const instantiate = () => {
    const config = {
      pageLanguage: "en",
      includedLanguages: LANGUAGE_OPTIONS.map((option) => option.value).join(","),
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    };

    if (desktopContainer) {
      desktopContainer.innerHTML = "";
      // eslint-disable-next-line no-new
      new google.translate.TranslateElement(config, "google_translate_element");
    }
    if (mobileContainer) {
      mobileContainer.innerHTML = "";
      // eslint-disable-next-line no-new
      new google.translate.TranslateElement(config, "google_translate_element_mobile");
    }

    window.setTimeout(() => syncLanguageControls(getStoredTranslateLanguage()), 150);
  };

  if (window.google && window.google.translate && window.google.translate.TranslateElement) {
    instantiate();
    return;
  }

  window.googleTranslateElementInit = () => {
    instantiate();
  };

  if (!document.querySelector("script[data-google-translate]")) {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.dataset.googleTranslate = "true";
    document.head.appendChild(script);
  }
}
const STUDENT_RECORDS = [
  {
    studentNumber: "2024-001",
    studentName: "Hana Kim",
    enrolledCourse: "STEM",
    gender: "Female",
    lrn: "LRN-9051-3321",
    curriculum: "K-12",
    enrolledMonth: "August 2024",
    status: "Enrolled",
  },
  {
    studentNumber: "2024-014",
    studentName: "Jinwoo Park",
    enrolledCourse: "Humanities",
    gender: "Male",
    lrn: "LRN-9051-3378",
    curriculum: "K-12",
    enrolledMonth: "August 2024",
    status: "Enrolled",
  },
  {
    studentNumber: "2024-027",
    studentName: "Soyeon Choi",
    enrolledCourse: "IB Diploma",
    gender: "Female",
    lrn: "LRN-9051-3412",
    curriculum: "IB",
    enrolledMonth: "July 2024",
    status: "Pending",
  },
  {
    studentNumber: "2024-033",
    studentName: "Minho Lee",
    enrolledCourse: "Arts & Design",
    gender: "Male",
    lrn: "LRN-9051-3435",
    curriculum: "K-12",
    enrolledMonth: "June 2024",
    status: "Enrolled",
  },
  {
    studentNumber: "2024-042",
    studentName: "Eunji Han",
    enrolledCourse: "STEM",
    gender: "Female",
    lrn: "LRN-9051-3490",
    curriculum: "K-12",
    enrolledMonth: "May 2024",
    status: "Withdrawn",
  },
];

function initStudentSearch() {
  const searchInput = document.getElementById("student-search");
  const resultBody = document.getElementById("student-results");
  const resultCount = document.getElementById("student-count");

  if (!searchInput || !resultBody || !resultCount) return;

  const renderRows = (records) => {
    resultBody.innerHTML = "";
    if (records.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 8;
      cell.textContent = "No matching students found.";
      cell.className = "px-4 py-3 text-center text-sm text-slate-500";
      row.appendChild(cell);
      resultBody.appendChild(row);
      return;
    }

    records.forEach((record) => {
      const row = document.createElement("tr");
      [
        record.studentNumber,
        record.studentName,
        record.enrolledCourse,
        record.gender,
        record.lrn,
        record.curriculum,
        record.enrolledMonth,
        record.status,
      ].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        cell.className = "px-4 py-3 text-sm text-slate-700";
        row.appendChild(cell);
      });
      resultBody.appendChild(row);
    });
  };

  const filterRecords = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") {
      resultBody.innerHTML = "";
      resultCount.textContent = "0 results";
      return;
    }

    const filtered = STUDENT_RECORDS.filter((record) =>
      record.studentNumber.toLowerCase().includes(query),
    );
    resultCount.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
    renderRows(filtered);
  };

  searchInput.addEventListener("input", filterRecords);
}

async function initPage() {
  const body = document.body;
  const depth = Number.parseInt(body.dataset.depth || "0", 10);
  const currentPath = body.dataset.currentPath || "/";
  const base = getBase(depth);

  const applyFavicon = (rel) => {
    const head = document.head;
    if (!head) return;
    const faviconUrl = `${base}images/gtcc_logo.png`;
    const existing = head.querySelector(`link[rel="${rel}"]`);
    const link = existing || document.createElement("link");
    link.rel = rel;
    link.href = faviconUrl;
    link.type = "image/png";
    if (!existing) {
      head.appendChild(link);
    }
  };

  applyFavicon("icon");
  applyFavicon("shortcut icon");

  const headerPath = `${base}partials/header.html`;
  const footerPath = `${base}partials/footer.html`;

  await Promise.all([
    fetch(headerPath)
      .then((response) => response.text())
      .then((html) => {
        const headerContainer = document.getElementById("site-header");
        if (headerContainer) {
          headerContainer.innerHTML = html;
        }
      }),
    fetch(footerPath)
      .then((response) => response.text())
      .then((html) => {
        const footerContainer = document.getElementById("site-footer");
        if (footerContainer) {
          footerContainer.innerHTML = html;
        }
      }),
  ]);

  const logoLink = document.getElementById("site-logo-link");
  if (logoLink) {
    logoLink.href = toRelative(base, "/");
  }

  const logoImage = logoLink ? logoLink.querySelector("img") : null;
  if (logoImage) {
    logoImage.src = toRelative(base, "/images/gtcc_logo.png");
  }

  const headerShortcut = document.getElementById("header-cta-shortcut");
  if (headerShortcut) {
    headerShortcut.href = "https://www.facebook.com/myyoungjiofficialpage";
    headerShortcut.target = "_blank";
    headerShortcut.rel = "noopener noreferrer";
  }

  const { section, page } = findCurrentNav(currentPath);
  buildTopNavigation(base, currentPath, section);
  buildSidebar(base, section, currentPath);
  buildBreadcrumbs(base, section, page);
  buildGlobalCta(base);
  initFooterYear();
  initMobileToggle();
  initMobileContactBar(base);
  initGoogleTranslateWidget();
  initHeroSlider();

  if (currentPath === "/community/search-for-student/") {
    initStudentSearch();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPage().catch((error) => {
    console.error("Failed to initialise page", error);
  });
});
