/* ═══════════════════════════════════════════════════
   포트폴리오 앱 로직
═══════════════════════════════════════════════════ */

/* ── Render skills ─────────────────────────────── */
// 프로젝트를 index 순 (/ 01 → / 02 → / 03) 으로 정렬
PROJECTS.sort((a, b) => a.index.localeCompare(b.index));
(function renderSkills() {
  const el = document.getElementById('skillsList');
  el.innerHTML = SKILLS.map(([cat, items, keys]) => `
    <div class="skill-row reveal">
      <div class="skill-cat">${cat}</div>
      <div class="skill-items">
        ${items.map(i => `<span class="skill-chip${keys.includes(i) ? ' key' : ''}">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');
})();

/* ── Render project cards ──────────────────────── */
(function renderProjects() {
  const el = document.getElementById('projList');
  el.innerHTML = PROJECTS.map(p => `
    <article class="proj-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name} 상세 보기">
      <div class="proj-cover">${p.cover}</div>
      <div class="proj-info">
        <div class="proj-top">
          <span class="proj-index">${p.index}</span>
          <span class="proj-type">${p.type}</span>
          <span class="proj-period">${p.period}</span>
        </div>
        <h3 class="proj-name">${p.name}</h3>
        <p class="proj-sub">${p.sub}</p>
        <p class="proj-tagline">${p.tagline}</p>
        <div class="proj-metrics">
          ${p.metrics.map(m => `
            <div class="proj-metric">
              <div class="m-val">${m.val}</div>
              <div class="m-lab">${m.lab}</div>
            </div>`).join('')}
        </div>
        <div class="proj-foot">
          <span class="proj-stack-mini">${p.stackMini}</span>
          <span class="proj-open">
            케이스 스터디
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  el.querySelectorAll('.proj-card').forEach(card => {
    const open = () => openModal(card.dataset.id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
})();

/* ── Modal ─────────────────────────────────────── */
const backdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');

function buildModal(p) {
  return `
    <div class="modal-cover">${p.cover}</div>
    <div class="modal-pad">
      <div class="m-top">
        <span class="m-index">${p.index}</span>
        <span class="m-type">${p.type}</span>
        <span class="m-period">${p.period}</span>
      </div>
      <h2 class="m-name">${p.name}</h2>
      <p class="m-sub">${p.sub}</p>
      <div class="m-links">
        ${p.links.map(l => `
          <a class="m-link" href="${l.url}" target="_blank" rel="noopener">
            ${l.label}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
          </a>`).join('')}
      </div>
      <div class="m-metrics">
        ${p.metrics.map(m => `
          <div class="m-metric">
            <div class="mm-val">${m.val}</div>
            <div class="mm-lab">${m.lab}</div>
          </div>`).join('')}
      </div>

      <div class="m-block">
        <div class="m-block-head"><span class="m-block-num">①</span><h3 class="m-block-title">개요 · 목적</h3></div>
        <p class="m-overview">${p.overview}</p>
      </div>

      <div class="m-block">
        <div class="m-block-head"><span class="m-block-num">②</span><h3 class="m-block-title">직면한 문제와 해결</h3></div>
        ${p.problems.map(pr => `
          <div class="m-problem">
            <span class="m-problem-tag">${pr.tag}</span>
            <p class="m-problem-title">${pr.title}</p>
            <div class="m-pq problem">
              <span class="pq-label">PROBLEM</span>
              <span class="pq-text">${pr.problem}</span>
            </div>
            <div class="m-pq solution">
              <span class="pq-label">SOLUTION</span>
              <span class="pq-text">${pr.solution}</span>
            </div>
            ${pr.code ? `<pre class="m-codeblock">${pr.code}</pre>` : ''}
          </div>`).join('')}
      </div>

      <div class="m-block">
        <div class="m-block-head"><span class="m-block-num">③</span><h3 class="m-block-title">기술 선택 근거</h3></div>
        <div class="m-rationale">
          ${p.rationale.map(r => `
            <div class="m-rat-item">
              <div class="m-rat-tech">${r.tech}</div>
              <div class="m-rat-reason">${r.reason}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="m-block">
        <div class="m-block-head"><span class="m-block-num">·</span><h3 class="m-block-title">Tech Stack</h3></div>
        <div class="m-stack">
          ${p.stack.map(s => `<span class="m-stack-chip">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  modalContent.innerHTML = buildModal(p);
  backdrop.scrollTop = 0;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Reveal on scroll ──────────────────────────── */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));

  // Fallback: instantly reveal anything already in view on load (no transition flash)
  requestAnimationFrame(() => {
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && !el.classList.contains('in')) {
        el.style.transition = 'none';
        el.classList.add('in');
        el.offsetHeight;
        el.style.transition = '';
      }
    });
  });
})();

/* ── Nav scroll state + active link ────────────── */
const nav = document.getElementById('nav');
const sections = [...document.querySelectorAll('section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a:not(.nav-cta)')];

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);

  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ── Mobile menu ───────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(force) {
  const open = force !== undefined ? force : !burger.classList.contains('open');
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu());
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
