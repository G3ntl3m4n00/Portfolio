/* ========================================
   Portfolio - Main JavaScript
   ======================================== */

// Loading Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    loader.classList.add('active');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Enable scroll after loader
            document.body.style.overflow = '';
        }, 1200);
    });
}

// Header scroll effect
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScroll = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe stagger items
    document.querySelectorAll('.stagger-item').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Active nav link
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for background orbs
function initParallax() {
    const orbs = document.querySelectorAll('.bg-orb');
    if (!orbs.length) return;

    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 15;
                    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Page transition
function initPageTransition() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('http') || href.startsWith('mailto')) return;

            e.preventDefault();

            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll during loader
    document.body.style.overflow = 'hidden';

    initLoader();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initActiveNavLink();
    initSmoothScroll();
    initParallax();
    // initPageTransition(); // Uncomment for page transitions
});

// Fade in page on load
window.addEventListener('pageshow', () => {
    document.body.style.opacity = '1';
});