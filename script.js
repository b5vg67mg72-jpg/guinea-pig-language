document.querySelectorAll('[data-tabs]').forEach((tabSet) => {
  const tabs = tabSet.querySelectorAll('[role="tab"]');
  const cards = tabSet.querySelectorAll('[role="tabpanel"]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.setAttribute('aria-selected', 'false'));
      cards.forEach((card) => card.classList.remove('active'));
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.getAttribute('aria-controls')).classList.add('active');
    });
  });
});

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});
