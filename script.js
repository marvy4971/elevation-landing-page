document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinksContainer.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu on link click
        const navLinks = document.querySelectorAll('#nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }

    // 2. Header Scroll Effect & Active Highlight
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('#nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Active highlighted nav item
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Add a higher offset here to detect active section easier
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-link');
            if (item.getAttribute('href') && item.getAttribute('href').substring(1) === current) {
                item.classList.add('active-link');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.feature-card, .section-title, .section-subtitle, .cta-content, #hero h1, #hero p, .hero-buttons');
    
    // initially add reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
