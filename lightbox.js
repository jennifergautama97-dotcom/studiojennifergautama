(function () {
  var dlg = document.querySelector('.lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return; // old browsers: links open the full image
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.iter-thumb'));
  var img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption'), i = 0, x0 = null;
  function show(n) {
    i = (n + thumbs.length) % thumbs.length;
    img.src = thumbs[i].getAttribute('href');
    img.alt = thumbs[i].querySelector('img').alt;
    cap.textContent = thumbs[i].dataset.caption + ' \u00b7 ' + (i + 1) + ' / ' + thumbs.length;
  }
  thumbs.forEach(function (t, n) {
    t.addEventListener('click', function (e) { e.preventDefault(); show(n); dlg.showModal(); });
  });
  dlg.querySelector('.lb-close').onclick = function () { dlg.close(); };
  dlg.querySelector('.lb-prev').onclick = function () { show(i - 1); };
  dlg.querySelector('.lb-next').onclick = function () { show(i + 1); };
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.tagName === 'FIGURE') dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
  });
})();
