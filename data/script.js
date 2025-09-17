// Shared data (e.g., lectors_description) and any global initialization


document.addEventListener('DOMContentLoaded', function() {
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
    const sectionsToAnimate = document.querySelectorAll('.services-section, .about-section, .lectors-section, .book-section, .testimonials-section, .contact-section');
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
