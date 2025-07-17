document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollAnimations();
    console.log('🌱 Cesta k Poznaniu - Website loaded successfully');
});

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const sectionsToAnimate = document.querySelectorAll('.services-section, .about-section, .lectors-section, .testimonials-section, .contact-section');
    sectionsToAnimate.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
        const animationTypes = ['fade-in', 'slide-left', 'slide-right', 'scale-up'];
        const animationType = animationTypes[index % animationTypes.length];
        section.classList.add(animationType);
        const title = section.querySelector('h2');
        const description = section.querySelector('p');
        if (title) {
            title.classList.add('animate-on-scroll', 'fade-in');
            title.style.transitionDelay = '0.2s';
            observer.observe(title);
        }
        if (description) {
            description.classList.add('animate-on-scroll', 'fade-in');
            description.style.transitionDelay = '0.4s';
            observer.observe(description);
        }
    });
    const heroTitle = document.querySelector('.main-top h1');
    const heroDescription = document.querySelector('.main-top p');
    if (heroTitle) {
        heroTitle.classList.add('animate-on-scroll', 'scale-up');
        heroTitle.style.transitionDelay = '0.5s';
        observer.observe(heroTitle);
    }
    if (heroDescription) {
        heroDescription.classList.add('animate-on-scroll', 'fade-in');
        heroDescription.style.transitionDelay = '0.7s';
        observer.observe(heroDescription);
    }
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    let lastScrollY = window.scrollY;
    let ticking = false;
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; 
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], [id="home"]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

let scrollSpyTicking = false;

function requestScrollSpyUpdate() {
    if (!scrollSpyTicking) {
        requestAnimationFrame(updateActiveNavLink);
        scrollSpyTicking = true;
        setTimeout(() => {
            scrollSpyTicking = false;
        }, 100);
    }
}

window.addEventListener('scroll', requestScrollSpyUpdate, { passive: true });

function animateNavbarElements() {
    const navLogo = document.querySelector('.nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navLogo) {
        navLogo.style.opacity = '0';
        navLogo.style.transform = 'translateY(-20px)';
        navLogo.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            navLogo.style.opacity = '1';
            navLogo.style.transform = 'translateY(0)';
        }, 200);
    }
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        link.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    navButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-20px)';
        button.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateNavbarElements, 100);
});

function addNavHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navButtons = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addNavHoverEffects();
});

function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    button.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            addRippleEffect(this, e);
        });
    });
});
