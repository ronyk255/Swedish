// ui_nav.js - Tab navigation + prev/next module navigation
(function () {
  // ── Tab switching (module.html) ─────────────────────────────────────
  function initTabs() {
    var stepBtns = document.querySelectorAll('.stepBtn');
    if (!stepBtns.length) return;
    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.getAttribute('data-tab'));
      });
    });
    window.switchModuleTab = switchTab;
    // activate first tab
    switchTab('theory');
  }

  function switchTab(tabId) {
    document.querySelectorAll('.stepBtn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tabPanel').forEach(function (p) { p.classList.remove('active'); });
    var btn = document.querySelector('.stepBtn[data-tab="' + tabId + '"]');
    if (btn) btn.classList.add('active');
    var panelMap = { theory: 'tabTheory', vocabulary: 'tabVocabulary', practiceTab: 'tabPractice', quizTab: 'tabQuiz' };
    var panelId = panelMap[tabId];
    var panel = panelId ? document.getElementById(panelId) : null;
    if (panel) panel.classList.add('active');
  }

  // ── Prev/Next module ───────────────────────────────────────────────
  function getModuleOrder() {
    if (window.COURSE_MODULES && Array.isArray(window.COURSE_MODULES)) {
      return window.COURSE_MODULES.map(function (m) { return m.id; });
    }
    return ['alphabet', 'intro', 'wordorder', 'numbers', 'food', 'pronouns', 'colours', 'adjectives', 'verbTenses', 'time'];
  }

  function getCurrentModuleId() {
    return new URLSearchParams(window.location.search).get('module') || '';
  }

  window.ui_nav_prevModule = function () {
    var order = getModuleOrder(), idx = order.indexOf(getCurrentModuleId());
    if (idx > 0) window.location.href = 'module.html?module=' + order[idx - 1];
  };

  window.ui_nav_nextModule = function () {
    var order = getModuleOrder(), idx = order.indexOf(getCurrentModuleId());
    if (idx >= 0 && idx < order.length - 1) window.location.href = 'module.html?module=' + order[idx + 1];
  };

  function updateModuleNavButtons() {
    var order = getModuleOrder();
    var current = getCurrentModuleId();
    var idx = order.indexOf(current);
    var prevBtn = document.getElementById('prevModuleBtn');
    var nextBtn = document.getElementById('nextModuleBtn');
    if (prevBtn) {
      prevBtn.disabled = idx <= 0;
      if (idx > 0 && window.COURSE_MODULES) {
        var prev = window.COURSE_MODULES[idx - 1];
        if (prev) prevBtn.innerHTML = '&#8592; ' + prev.title;
      }
    }
    if (nextBtn) {
      nextBtn.disabled = idx < 0 || idx >= order.length - 1;
      if (idx >= 0 && idx < order.length - 1 && window.COURSE_MODULES) {
        var next = window.COURSE_MODULES[idx + 1];
        if (next) nextBtn.innerHTML = next.title + ' &#8594;';
      }
    }
  }

  // ── Sidebar active link (index.html) ──────────────────────────────
  function initSidebarHighlight() {
    var navLinks = document.querySelectorAll('.sideNav a[href^="#"]');
    if (!navLinks.length) return;
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ el: el, link: link });
    });
    function onScroll() {
      var best = null;
      sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top <= 120) best = s;
      });
      navLinks.forEach(function (l) { l.classList.remove('navActive'); });
      if (best) best.link.classList.add('navActive');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ───────────────────────────────────────────────────
  function initMobileMenu() {
    var toggle = document.getElementById('mobileMenuToggle');
    var sideNav = document.querySelector('.sideNav');
    if (!toggle || !sideNav) return;
    toggle.addEventListener('click', function () { sideNav.classList.toggle('navOpen'); });
    document.addEventListener('click', function (e) {
      if (sideNav.classList.contains('navOpen') && !sideNav.contains(e.target) && e.target !== toggle) {
        sideNav.classList.remove('navOpen');
      }
    });
  }

  // ── Init ────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initSidebarHighlight();
    initMobileMenu();
    setTimeout(updateModuleNavButtons, 200);
  });
})();
