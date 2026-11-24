(() => {
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  const cards = [...document.querySelectorAll('article')];
  const count = document.querySelector('#count');
  const empty = document.querySelector('#empty');
  function filter() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const text = `${card.dataset.search} ${card.textContent}`.toLowerCase();
      card.hidden = !((!query || text.includes(query)) && (!category.value || category.value === card.dataset.category));
      if (!card.hidden) visible++;
    }
    const labels = {
      en: `${visible} resource${visible === 1 ? '' : 's'}`,
      'zh-CN': `${visible} 项资源`,
      ja: `${visible} 件のリソース`,
      es: `${visible} recurso${visible === 1 ? '' : 's'}`
    };
    count.textContent = labels[document.documentElement.lang] || labels.en;
    empty.hidden = visible !== 0;
  }
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
  document.addEventListener('displaylanguagechange', filter);
})();
