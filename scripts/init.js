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
  }).then(() => { updateCounter(); updateTimeBar(); });

  function pad2(n) { return String(n).padStart(2, '0'); }

  function updateCounter() {
    const counterEl = document.querySelector('.deck-counter');
    if (!counterEl) return;
    const indices = Reveal.getIndices();
    const total = Reveal.getTotalSlides();
    if (total === 0) { counterEl.textContent = ''; return; }
    counterEl.textContent = pad2(indices.h + 1) + ' / ' + pad2(total);
  }

  // 씬별 시간 진행률 매핑 (0-based 인덱스)
  // null = 인트로/클로징 등 일정 외 씬 (bar 숨김)
  // {day, progress} = 해당 일차의 시간상 위치 (0~1)
  const SCENE_TIME_MAP = [
    null,                         // S1 표지
    null,                         // S2 왜 경주
    null,                         // S3 페르소나
    null,                         // S4 설계 조건
    { day: 1, progress: 0.00 },   // S5 DAY 1 프로필
    { day: 1, progress: 0.05 },   // S6 서울→경주
    { day: 1, progress: 0.35 },   // S7 반듯이 13:00
    { day: 1, progress: 0.45 },   // S8 황리단길 산책 14:00
    { day: 1, progress: 0.60 },   // S9 호텔 16:00
    { day: 1, progress: 0.70 },   // S10 길거리박물관 16:30
    { day: 1, progress: 0.78 },   // S11 내물왕릉 17:00
    { day: 1, progress: 0.82 },   // S12 계림 17:15
    { day: 1, progress: 0.88 },   // S13 첨성대 17:30
    { day: 1, progress: 1.00 },   // S14 여미온 18:00
    { day: 2, progress: 0.00 },   // S15 DAY 2 프로필
    { day: 2, progress: 0.02 },   // S16 성덕왕릉 09:00
    { day: 2, progress: 0.10 },   // S17 불국사 09:30
    { day: 2, progress: 0.22 },   // S18 석굴암 11:00
    { day: 2, progress: 0.35 },   // S19 난식당 12:30
    { day: 2, progress: 0.50 },   // S20 박물관 14:00
    { day: 2, progress: 0.78 },   // S21 월지향 18:00
    { day: 2, progress: 0.88 },   // S22 황룡사 19:00
    { day: 2, progress: 1.00 },   // S23 동궁과 월지 20:00
    { day: 3, progress: 0.00 },   // S24 DAY 3 프로필
    { day: 3, progress: 0.10 },   // S25 엑스포 10:00
    { day: 3, progress: 0.40 },   // S26 보문갈비 12:00
    { day: 3, progress: 0.60 },   // S27 경주월드 13:00
    { day: 3, progress: 1.00 },   // S28 서울 복귀 16:00
    null,                         // S29 비용 가치
    null,                         // S30 캠페인 카피
    null,                         // S31 Q&A
  ];

  function updateTimeBar() {
    const bar = document.querySelector('.time-bar');
    if (!bar) return;
    const idx = Reveal.getIndices().h;
    const mapping = SCENE_TIME_MAP[idx];

    if (!mapping) {
      bar.classList.remove('is-visible');
      return;
    }

    bar.classList.add('is-visible');
    bar.classList.remove('is-on-day-1', 'is-on-day-2', 'is-on-day-3');
    bar.classList.add('is-on-day-' + mapping.day);

    for (let d = 1; d <= 3; d++) {
      const fill = bar.querySelector('.time-segment[data-day="' + d + '"] .time-segment-fill');
      if (!fill) continue;
      let pct;
      if (d < mapping.day) pct = 100;
      else if (d > mapping.day) pct = 0;
      else pct = Math.round(mapping.progress * 100);
      fill.style.width = pct + '%';
    }
  }

  // === Photo Slider ===
  function initPhotoSliders() {
    const sliders = document.querySelectorAll('.photo-slider');
    sliders.forEach((slider) => {
      const track = slider.querySelector('.photo-slider-track');
      const slides = slider.querySelectorAll('.photo-slider-track > .photo');
      const dots = slider.querySelectorAll('.photo-slider-dot');
      const prev = slider.querySelector('.photo-slider-prev');
      const next = slider.querySelector('.photo-slider-next');
      const count = slides.length;
      slider.setAttribute('data-count', count);
      if (count === 0) return;

      let current = 0;
      function update() {
        track.style.transform = 'translateX(' + (-current * 100) + '%)';
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
      }
      function go(dir) {
        current = (current + dir + count) % count;
        update();
      }
      if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); go(-1); });
      if (next) next.addEventListener('click', (e) => { e.stopPropagation(); go(1); });
      dots.forEach((d, i) =>
        d.addEventListener('click', (e) => { e.stopPropagation(); current = i; update(); })
      );
      update();
    });
  }

  Reveal.on('slidechanged', () => { updateCounter(); updateTimeBar(); });
  Reveal.on('ready', () => { updateCounter(); updateTimeBar(); initPhotoSliders(); });
})();
