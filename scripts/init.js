(function () {
  'use strict';

  Reveal.initialize({
    width: 1920,
    height: 1080,
    margin: 0,
    minScale: 0.2,
    maxScale: 2.0,
    controls: false,
    progress: false,
    slideNumber: false,
    hash: true,
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: false,
    embedded: false,
    keyboard: true,
    touch: true,
    overview: true,
    autoSlide: 0,
    pdfMaxPagesPerSlide: 1,
    fragmentInURL: false,
  }).then(updateCounter);

  function pad2(n) { return String(n).padStart(2, '0'); }

  function updateCounter() {
    const counterEl = document.querySelector('.deck-counter');
    if (!counterEl) return;
    const indices = Reveal.getIndices();
    const total = Reveal.getTotalSlides();
    if (total === 0) { counterEl.textContent = ''; return; }
    counterEl.textContent = pad2(indices.h + 1) + ' / ' + pad2(total);
  }

  Reveal.on('slidechanged', updateCounter);
  Reveal.on('ready', updateCounter);
})();
