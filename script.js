document.addEventListener('DOMContentLoaded', () => {

    /* ========== Typing Animation ========== */
    const typedEl = document.getElementById('typed');
    const phrases = ['김해찬입니다.', 'Backend Developer입니다.', '보안을 생각하는 개발자입니다.'];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
            typedEl.textContent = current.slice(0, charIdx - 1);
            charIdx--;
        } else {
            typedEl.textContent = current.slice(0, charIdx + 1);
            charIdx++;
        }

        let delay = isDeleting ? 60 : 100;

        if (!isDeleting && charIdx === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delay = 400;
        }

        typingTimeout = setTimeout(type, delay);
    }

    type();


    /* ========== Scroll Reveal ========== */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay for sibling elements
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ========== Active Nav on Scroll ========== */
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], footer[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY;

        // Header shadow on scroll
        if (scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight active nav link
        let currentSection = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    /* ========== Mobile Hamburger Menu ========== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });


    /* ========== Smooth Scroll for all anchor links ========== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
