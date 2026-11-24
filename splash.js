(() => {
  const splash = document.querySelector('.splash');
  if (!splash) return;
  function dismiss() {
    const hadFocus = splash.contains(document.activeElement);
    splash.remove();
    if (hadFocus) document.querySelector('#display-language')?.focus();
  }
  splash.querySelector('button').addEventListener('click', dismiss);
  splash.addEventListener('animationend', event => {
    if (event.animationName === 'splash-exit') dismiss();
  });
})();
