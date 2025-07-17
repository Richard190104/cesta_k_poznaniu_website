// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simple fade-in animation for text paragraphs
    const textElements = document.querySelectorAll('.main-text');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    textElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Observe the element
        observer.observe(el);
    });

    // Simple logo animation
    const logo = document.querySelector('.plant-icon');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 300);
    }

    // Simple plant illustration animation
    const plantIllustration = document.querySelector('.plant-illustration svg');
    if (plantIllustration) {
        plantIllustration.style.opacity = '0';
        plantIllustration.style.transform = 'translateX(20px)';
        plantIllustration.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            plantIllustration.style.opacity = '1';
            plantIllustration.style.transform = 'translateX(0)';
        }, 600);
    }

    // Console message
    console.log('🌱 Cesta k Poznaniu - Pomáhame rodinám výnimočných detí');
});