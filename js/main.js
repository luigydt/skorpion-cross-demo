document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const mobileNav = document.getElementById('mobileNav');

  const openNav = () => mobileNav.classList.add('open');
  const closeNav = () => mobileNav.classList.remove('open');

  navToggle?.addEventListener('click', openNav);
  navClose?.addEventListener('click', closeNav);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });
  document.querySelectorAll('.mobile-nav-panel a').forEach(a => {
    a.addEventListener('click', closeNav);
  });

  // ---- Theme toggle (claro / oscuro) ----
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  const currentTheme = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const syncButtons = (theme) => {
    toggleButtons.forEach(btn => {
      btn.textContent = theme === 'dark' ? 'Claro' : 'Oscuro';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncButtons(theme);
  };

  syncButtons(currentTheme());

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
    });
  });
});
