// Enhanced JavaScript for Cesta k Poznaniu website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar functionality
    initializeNavbar();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    console.log('🌱 Cesta k Poznaniu - Website loaded successfully');
});

// Initialize scroll animations for elements
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and their content with different animation types
    const sectionsToAnimate = document.querySelectorAll('.services-section, .about-section, .lectors-section, .testimonials-section, .contact-section');
    
    sectionsToAnimate.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
        
        // Add different animation types based on section index
        const animationTypes = ['fade-in', 'slide-left', 'slide-right', 'scale-up'];
        const animationType = animationTypes[index % animationTypes.length];
        section.classList.add(animationType);
        
        // Animate section content
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
    
    // Add special animations for main hero section
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
    
    // Add continuous scroll effects (optional parallax-like effects)
}

// Add continuous scroll effects for enhanced experience
function addContinuousScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for sections
        const parallaxElements = document.querySelectorAll('.services-section, .lectors-section, .contact-section');
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Fade effect for hero section
        const heroSection = document.querySelector('.main-top');
        if (heroSection) {
            const opacity = Math.max(0, 1 - scrolled / 600);
            heroSection.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Initialize navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect - optimized for performance
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Optional: Hide/show navbar on scroll (commented out for smoother experience)
        // if (currentScrollY > lastScrollY && currentScrollY > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
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

const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-btn {
        position: relative;
        overflow: hidden;
    }
    
    /* Scroll animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Different animation types */
    .animate-on-scroll.fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.fade-in.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-on-scroll.slide-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    
    .animate-on-scroll.slide-left.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .animate-on-scroll.slide-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    
    .animate-on-scroll.slide-right.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .animate-on-scroll.scale-up {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.scale-up.animate-in {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Stagger animations for multiple elements */
    .animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
    .animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
    .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
    .animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }
    .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
`;
document.head.appendChild(style);