function placeholderPolyfill(e) {
  e.target.classList.toggle('placeholder-shown', e.target.value === '');
}

window.addEventListener('load', () => {
  document.querySelectorAll('[placeholder]').forEach(el => {
    el.addEventListener('change', placeholderPolyfill);
    el.addEventListener('keyup', placeholderPolyfill);
    placeholderPolyfill({ target: el });
  });
});

