// ui_nav.js - Enhanced navigation, animations, collapsible sections, show-more tables
(function () {
  'use strict';

  /* ── Tab switching (module.html) ─────────────────────────────────── */
  function initTabs() {
    var stepBtns = document.querySelectorAll('.stepBtn');
    if (!stepBtns.length) return;
    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.getAttribute('data-tab')); });
    });
    window.switchModuleTab = switchTab;
    switchTab('theory');
  }

  function switchTab(tabId) {
    document.querySelectorAll('.stepBtn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tabPanel').forEach(function (p) { p.classList.remove('active'); });
    var btn = document.querySelector('.stepBtn[data-tab="' + tabId + '"]');
    if (btn) btn.classList.add('active');
    var map = { theory:'tabTheory', vocabulary:'tabVocabulary', practiceTab:'tabPractice', quizTab:'tabQuiz' };
    var panel = document.getElementById(map[tabId]);
    if (panel) panel.classList.add('active');
  }

  /* ── Prev/Next module (module.html) ──────────────────────────────── */
  function getModuleOrder() {
    return (window.COURSE_MODULES && Array.isArray(window.COURSE_MODULES))
      ? window.COURSE_MODULES.map(function (m) { return m.id; })
      : ['alphabet','intro','wordorder','numbers','food','pronouns','colours','adjectives','verbTenses','time'];
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
    var order = getModuleOrder(), current = getCurrentModuleId(), idx = order.indexOf(current);
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

  /* ── Sidebar active link highlight ──────────────────────────────── */
  function initSidebarHighlight() {
    var navLinks = document.querySelectorAll('.sideNav a[href^="#"]');
    if (!navLinks.length) return;
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ el:el, link:link });
    });
    function onScroll() {
      var best = null;
      sections.forEach(function (s) { if (s.el.getBoundingClientRect().top <= 120) best = s; });
      navLinks.forEach(function (l) { l.classList.remove('navActive'); });
      if (best) best.link.classList.add('navActive');
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  /* ── Mobile menu ─────────────────────────────────────────────────── */
  function initMobileMenu() {
    var toggle = document.getElementById('mobileMenuToggle');
    var sideNav = document.querySelector('.sideNav');
    if (!toggle || !sideNav) return;
    toggle.addEventListener('click', function () { sideNav.classList.toggle('navOpen'); });
    document.addEventListener('click', function (e) {
      if (sideNav.classList.contains('navOpen') && !sideNav.contains(e.target) && e.target !== toggle)
        sideNav.classList.remove('navOpen');
    });
  }

  /* ── Scroll-reveal animations ────────────────────────────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Add reveal class to section cards dynamically
    document.querySelectorAll('.section, .moduleCard, .phrase, .letterCard, .metricCard').forEach(function (el) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        observer.observe(el);
      }
    });
  }

  /* ── Collapsible long sections ───────────────────────────────────── */
  function initCollapsible() {
    // Add collapse toggle to sections marked data-collapsible
    document.querySelectorAll('[data-collapsible]').forEach(function (section) {
      var head = section.querySelector('.sectionHead');
      if (!head) return;
      // wrap content in collapseContent div
      var content = document.createElement('div');
      content.className = 'collapseContent';
      var children = Array.from(section.children).filter(function (c) { return c !== head; });
      children.forEach(function (c) { content.appendChild(c); });
      section.appendChild(content);
      // create toggle button
      var btn = document.createElement('button');
      btn.className = 'collapseToggle';
      btn.textContent = '\u25BC Collapse section';
      btn.type = 'button';
      section.appendChild(btn);
      var collapsed = false;
      btn.addEventListener('click', function () {
        collapsed = !collapsed;
        if (collapsed) {
          content.classList.add('collapsed');
          btn.textContent = '\u25B6 Expand section';
          btn.style.background = 'var(--sv-blue)';
          btn.style.color = 'white';
        } else {
          content.classList.remove('collapsed');
          btn.textContent = '\u25BC Collapse section';
          btn.style.background = '';
          btn.style.color = '';
        }
      });
    });
  }

  /* ── Show-more for big tables ────────────────────────────────────── */
  var SHOW_LIMIT = 10; // show first N rows, hide rest

  function initShowMore() {
    // Run after a short delay to let the app.js render the tables
    setTimeout(function () {
      applyShowMore('.verbTenseSheet', '.verbTenseRow', 'verb tenses');
      applyShowMore('.adjectiveSheet',  '.adjectiveRow',  'adjectives');
    }, 600);
  }

  function applyShowMore(sheetSelector, rowSelector, label) {
    var sheets = document.querySelectorAll(sheetSelector);
    sheets.forEach(function (sheet) {
      var rows = sheet.querySelectorAll(rowSelector);
      if (rows.length <= SHOW_LIMIT) return;
      // hide rows beyond limit
      var hidden = [];
      rows.forEach(function (row, i) {
        if (i >= SHOW_LIMIT) {
          row.style.display = 'none';
          hidden.push(row);
        }
      });
      // create show-more button
      var btn = document.createElement('button');
      btn.className = 'showMoreBtn';
      btn.type = 'button';
      var showing = false;
      btn.textContent = '\u25BC Show ' + hidden.length + ' more ' + label + '\u2026';
      btn.addEventListener('click', function () {
        showing = !showing;
        hidden.forEach(function (row) { row.style.display = showing ? '' : 'none'; });
        btn.textContent = showing
          ? '\u25B2 Show fewer ' + label
          : '\u25BC Show ' + hidden.length + ' more ' + label + '\u2026';
        if (showing) btn.style.cssText = 'background:var(--sv-blue);color:white;border-color:var(--sv-blue);border-style:solid;';
        else btn.style.cssText = '';
      });
      sheet.parentNode.insertBefore(btn, sheet.nextSibling);
    });
  }

  /* ── Audio button pulse on play ──────────────────────────────────── */
  function initAudioButtonFeedback() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var text = btn.textContent.trim().toLowerCase();
      if (text === 'listen' || text.includes('play') || text === '\uD83D\uDD0A') {
        btn.classList.add('anim-playing');
        setTimeout(function () { btn.classList.remove('anim-playing'); }, 1500);
      }
    });
  }

  /* ── Quiz answer feedback ────────────────────────────────────────── */
  function initQuizFeedback() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.quizOptions button');
      if (!btn) return;
      // The app.js adds .correct/.wrong classes — we just ensure animation fires
      setTimeout(function () {
        if (btn.classList.contains('correct')) {
          btn.classList.add('anim-correct');
          setTimeout(function () { btn.classList.remove('anim-correct'); }, 700);
        } else if (btn.classList.contains('wrong')) {
          btn.classList.add('anim-wrong');
          setTimeout(function () { btn.classList.remove('anim-wrong'); }, 600);
        }
      }, 50);
    });
  }

  /* ── Init ───────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initSidebarHighlight();
    initMobileMenu();
    initAudioButtonFeedback();
    initQuizFeedback();
    initCollapsible();
    // Delay scroll-reveal and show-more until app.js has rendered content
    setTimeout(function () {
      initScrollReveal();
      initShowMore();
      updateModuleNavButtons();
    }, 300);
  });
})();
