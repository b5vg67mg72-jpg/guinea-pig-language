(() => {
  const translations = window.SITE_TRANSLATIONS || {};
  const select = document.querySelector('#display-language');
  if (!select) return;
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, #display-language')) continue;
    const key = node.textContent.trim();
    if (translations[key]) nodes.push({node, key, original: node.textContent});
  }
  const attributes = [];
  document.querySelectorAll('[placeholder], [aria-label]').forEach(element => {
    for (const attribute of ['placeholder', 'aria-label']) {
      const key = element.getAttribute(attribute);
      if (translations[key]) attributes.push({element, attribute, key});
    }
  });
  window.siteTranslate = key => translations[key]?.[document.documentElement.lang] || key;
  function apply(language) {
    if (!['en', 'zh-CN', 'ja', 'es'].includes(language)) language = 'en';
    document.documentElement.lang = language;
    select.value = language;
    for (const {node, key, original} of nodes) node.textContent = original.replace(key, translations[key][language] || key);
    for (const {element, attribute, key} of attributes) element.setAttribute(attribute, translations[key][language] || key);
    try { localStorage.setItem('gp-display-language', language); } catch {}
    document.dispatchEvent(new Event('displaylanguagechange'));
  }
  let language = 'en';
  try { language = localStorage.getItem('gp-display-language') || 'en'; } catch {}
  select.addEventListener('change', () => apply(select.value));
  apply(language);
})();
