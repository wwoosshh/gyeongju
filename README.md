# 경주 · 4인가족 캠페인 2026 — 발표 페이지

도시문화와 마케팅 기말발표용 웹 슬라이드 덱. Reveal.js + 커스텀 CSS.

## 실행

브라우저에서 `index.html`을 그대로 열면 됩니다. 빌드 단계 없음.
처음 실행 시 인터넷 연결 필요 (Pretendard 폰트 + Reveal.js CDN 로드).

**권장:** `F` 또는 `F11` 키로 풀스크린 진입 후 발표.

## 키보드

| 키 | 동작 |
|---|---|
| `→` `Space` `PageDown` | 다음 슬라이드 |
| `←` `PageUp` | 이전 슬라이드 |
| `Home` `End` | 처음 / 끝 |
| `F` | 풀스크린 토글 |
| `ESC` | 슬라이드 개요 모드 (Reveal.js) |
| `?` | Reveal.js 키 도움말 |

마우스/터치 — 좌우 영역 클릭 또는 스와이프로 이동.

## 슬라이드 구성 (33장)

- **ACT 1 · 인사이트** (S1–3) — 표지 / 인사이트 / 왜 경주
- **ACT 2 · 타겟** (S4–5) — 4인가족 페르소나 / 설계 조건
- **ACT 3 · 솔루션 2박3일**
  - DAY 1 (S6–15) — 황리단길에서 신라의 거리로
  - DAY 2 (S16–24) — 세계유산에서 야경까지
  - DAY 3 (S25–29) — 가족이 함께 즐기는 마무리
- **ACT 4 · 가치 & 클로징** (S30–33) — 비용 / 이동수단 / 캠페인 카피 / Q&A

## 사진 추가 방법

현재는 placeholder 박스로 자리만 잡혀 있습니다 (점선 사각형 + 영문 라벨).
실제 사진을 넣을 때:

1. `site/assets/photos/` 폴더 생성
2. 사진 파일 저장 (예: `bulguksa.jpg`)
3. `index.html`에서 해당 placeholder 찾기:
   ```html
   <div class="ph"><span class="ph-label">불국사 / 대웅전 · 다보탑</span></div>
   ```
4. `<img>` 태그로 교체:
   ```html
   <img src="assets/photos/bulguksa.jpg" alt="불국사" class="ph" style="object-fit:cover">
   ```

**우선순위 사진 (★★★ 필수):**
- S1 표지 히어로컷
- S18 불국사
- S24 동궁과 월지 야경

**우선순위 사진 (★★ 강력 권장):**
- S14 첨성대, S19 석굴암, S21 국립경주박물관, S26 경주타워, S28 경주월드

## 디자인 시스템

- 색상: `styles/tokens.css` (흰색 / 먹색 / 골드 / 강조 오렌지)
- 타이포: Pretendard (산세리프) + Noto Serif KR (점잖은 강조용)
- 레이아웃 패턴 8가지: fullbleed / data / matrix / persona / split / collection / day-profile / type
- **사용된 디자인 원칙: 카드화·라운드·과한 그라데이션 일체 금지** — 에디토리얼 매거진 톤

## 발표 시간

리허설 기준 약 **12–13분** (Q&A 제외). 슬라이드별 권장 머무름 시간은 `docs/specs/2026-06-01-gyeongju-presentation-design.md` 참조.

7–10분 안에 끝내야 하면:
- 옵션 A: 식당 슬라이드들에서 머무름 시간 단축
- 옵션 B: S17 (성덕왕릉), S23 (황룡사관) 제거 → 31장
- 옵션 C: Day 3 슬라이드를 3장으로 압축

## 동적 효과

슬라이드 진입 시 자동 entry animation:
- 헤드라인·거대 숫자: fade-up 720ms
- Day Profile 일정 항목: 좌측에서 stagger (80ms 간격)
- 매트릭스 셀: stagger fade-up
- 페르소나 4컬럼: 순차 등장
- 가로선(rule): 좌→우로 그어짐
- 현재 일차 인디케이터: 부드러운 펄스

`prefers-reduced-motion: reduce` 미디어 쿼리 지원 — 사용자가 모션 줄이기 설정 시 자동 비활성화.

## 문서

- `docs/specs/2026-06-01-gyeongju-presentation-design.md` — 디자인 설계서
- `docs/plans/2026-06-01-gyeongju-presentation-implementation.md` — 구현 계획서

## 파일 구조

```
site/
├── index.html                # 진입점
├── README.md                 # 이 문서
├── styles/
│   ├── reset.css             # CSS 리셋
│   ├── tokens.css            # 디자인 토큰 (color, type, space)
│   ├── typography.css        # Pretendard + Noto Serif + 유틸 클래스
│   ├── reveal-override.css   # Reveal 기본 스타일 무력화
│   ├── slide-shell.css       # 슬라이드 chrome (헤더·카운터)
│   ├── layouts.css           # 8가지 레이아웃 패턴
│   └── animations.css        # 진입 애니메이션
└── scripts/
    └── init.js               # Reveal.js 초기화 (1920×1080, fade transition)
```
