// Copper trace: start the line at the first heading's via and end it at the last one.
const board = document.querySelector('.board');
const titles = document.querySelectorAll('.board .section__title');

function fitTrace() {
  if (!board || titles.length === 0) return;
  const boardBox = board.getBoundingClientRect();
  const viaY = (title) => {
    const box = title.getBoundingClientRect();
    const em = parseFloat(getComputedStyle(title).fontSize);
    return box.top + em * 0.55 + 1 - boardBox.top; // matches the via position in CSS
  };
  board.style.setProperty('--trace-start', `${viaY(titles[0])}px`);
  board.style.setProperty('--trace-end', `${boardBox.height - viaY(titles[titles.length - 1])}px`);
}

fitTrace();
window.addEventListener('resize', fitTrace);
window.addEventListener('load', fitTrace);
if (document.fonts) document.fonts.ready.then(fitTrace);

// Mobile menu: open/close the nav links and keep aria-expanded in sync.
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

if (toggle && links) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close the menu after choosing a section or pressing Escape.
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
