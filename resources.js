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
      card.hidden = !((!query || card.dataset.search.includes(query)) && (!category.value || category.value === card.dataset.category));
      if (!card.hidden) visible++;
    }
    count.textContent = `${visible} resource${visible === 1 ? '' : 's'}`;
    empty.hidden = visible !== 0;
  }
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
})();
