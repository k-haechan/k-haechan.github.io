/* ═══════════════════════════════════════════════════
   포트폴리오 앱 로직
═══════════════════════════════════════════════════ */

/* ── Console Easter Egg ─────────────────────────── */
(function consoleEgg() {
  console.log('%c김해찬 포트폴리오', 'font-size:20px;font-weight:800;color:#0066FF;letter-spacing:-0.03em;');
  console.log('%c개발자시군요 👋  여기까지 오셨다니 반갑습니다.', 'font-size:13px;color:#4E5968;');
  console.log('%c채용 문의는 언제든 환영합니다.', 'font-size:13px;color:#4E5968;');
  console.log('%c→ gibbm1127@naver.com', 'font-size:13px;font-weight:600;color:#0066FF;');
  console.log('%c→ github.com/k-haechan', 'font-size:13px;font-weight:600;color:#0066FF;');
})();

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

    /* 3-D tilt */
    let tiltTimer;
    card.addEventListener('mouseenter', () => {
      clearTimeout(tiltTimer);
      card.style.transition = 'box-shadow 0.28s, border-color 0.28s';
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${((y - 0.5) * -8).toFixed(2)}deg) rotateY(${((x - 0.5) * 8).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.28s';
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
      tiltTimer = setTimeout(() => { card.style.transition = ''; card.style.transform = ''; }, 500);
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

/* ── Scroll progress bar ─────────────────────────── */
(function scrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
})();

/* ── Terminal Easter Egg ─────────────────────────── */
(function terminal() {
  const overlay = document.getElementById('terminalOverlay');
  const body    = document.getElementById('terminalBody');
  const input   = document.getElementById('terminalInput');

  function print(cls, text) {
    const line = document.createElement('div');
    line.className = 'terminal-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function openTerm() {
    if (overlay.classList.contains('open')) return;
    body.innerHTML = '';
    print('dim', '╔════════════════════════════════════════════╗');
    print('dim', '║   haechan@portfolio  —  v1.0.0             ║');
    print('dim', '╚════════════════════════════════════════════╝');
    print('', '');
    print('ok', '  환영합니다! 백엔드 개발자 김해찬의 터미널입니다.');
    print('', '  도움말: help  |  닫기: esc 또는 exit');
    print('', '');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 60);
  }

  function closeTerm() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  const CMDS = {
    help() {
      print('', '');
      [
        ['whoami',         '개발자 소개'],
        ['ls',             '섹션 목록'],
        ['cat <file>',      '내용 출력 (about|skills|projects|contact)'],
        ['projects',       '프로젝트 목록'],
        ['skills',         '기술 스택'],
        ['cd <section>',   '섹션 이동 (about|skills|projects|career|contact)'],
        ['clear',          '화면 지우기'],
        ['exit',           '터미널 닫기'],
      ].forEach(([c, d]) => print('', `  ${c.padEnd(18)} ${d}`));
      print('', '');
    },
    whoami() {
      print('', '');
      print('ok', '  김해찬 (Kim Haechan)');
      print('', '  Role    : Java Backend Developer');
      print('', '  Major   : 국민대 정보보안암호수학과');
      print('', '  Location: Suwon, Korea');
      print('', '  Email   : gibbm1127@naver.com');
      print('', '  GitHub  : github.com/k-haechan');
      print('', '');
    },
    ls() {
      print('', '');
      print('cmd', '  about/  skills/  projects/  career/  contact/');
      print('', '');
    },
    projects() {
      print('', '');
      PROJECTS.forEach(p => {
        print('cmd', `  [${p.index}] ${p.name}`);
        print('dim', `         ${p.sub}`);
      });
      print('', '');
    },
    skills() {
      print('', '');
      SKILLS.forEach(([cat, items]) => {
        print('cmd', `  ${cat}`);
        print('',    `    └ ${items.join(', ')}`);
      });
      print('', '');
    },
    'cat about'() {
      print('', '');
      print('ok', '  문제의 본질을 분석하고, 시스템으로 구조화하는 백엔드 개발자.');
      print('', '  SSE·STOMP 실시간, AI 파이프라인, Terraform IaC까지.');
      print('', '  기획부터 배포까지 직접 책임집니다.');
      print('', '');
    },
    'cat skills'() {
      print('', '');
      SKILLS.forEach(([cat, items]) => {
        print('cmd', `  ${cat}`);
        print('',    `    └ ${items.join(', ')}`);
      });
      print('', '');
    },
    'cat projects'() {
      print('', '');
      PROJECTS.forEach(p => {
        print('cmd', `  [${p.index}] ${p.name}`);
        print('dim', `         ${p.sub}`);
      });
      print('', '');
    },
    'cat contact'() {
      print('', '');
      print('ok',  '  gibbm1127@naver.com');
      print('cmd', '  github.com/k-haechan');
      print('', '');
    },
    clear() { body.innerHTML = ''; },
    exit()  { closeTerm(); },
    quit()  { closeTerm(); },
  };

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    print('cmd', `haechan@portfolio:~$ ${raw}`);

    if (cmd === 'hire me' || cmd === 'sudo hire me') {
      print('', '');
      print('ok', '  ✓ Access granted. 함께 일해봐요!');
      print('ok', '  → gibbm1127@naver.com');
      print('', '');
    } else if (cmd.startsWith('cd ')) {
      const id = cmd.slice(3).trim();
      const el = document.getElementById(id);
      if (el) { closeTerm(); el.scrollIntoView({ behavior: 'smooth' }); }
      else {
        print('err', `  섹션 '${id}'을 찾을 수 없습니다.`);
        print('dim', '  사용: cd about | skills | projects | career | contact');
      }
    } else if (cmd.startsWith('cat ')) {
      const target = cmd.slice(4).replace(/\.txt$/, '').trim();
      const key = `cat ${target}`;
      if (CMDS[key]) CMDS[key]();
      else {
        print('err', `  cat: ${target}: No such file`);
        print('dim', '  사용: cat about | skills | projects | contact');
      }
    } else if (CMDS[cmd]) {
      CMDS[cmd]();
    } else if (cmd !== '') {
      print('err', `  command not found: ${raw}`);
      print('dim', '  "help" 를 입력해보세요.');
    }
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { run(input.value); input.value = ''; }
    if (e.key === 'Escape') closeTerm();
    e.stopPropagation();
  });
  overlay.addEventListener('click', e => { if (e.target === overlay) closeTerm(); });

  /* Konami code (↑↑↓↓←→←→BA) or backtick to open */
  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', e => {
    if (overlay.classList.contains('open')) return;
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key === '`') { openTerm(); idx = 0; return; }
    idx = e.key === SEQ[idx] ? idx + 1 : (e.key === SEQ[0] ? 1 : 0);
    if (idx === SEQ.length) { openTerm(); idx = 0; }
  });
})();
