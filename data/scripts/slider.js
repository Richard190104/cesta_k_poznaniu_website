// Lectors Slider Functionality
function initializeLectorsSlider() {
    const slider = document.querySelector('.lectors-list');
    const slides = document.querySelectorAll('.lector-item');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slider || slides.length === 0) {
        console.log('Slider elements not found');
        return;
    }
    let currentSlide = 0;
    let slidesToShow = getSlidesToShow();
    let maxSlide = slides.length - slidesToShow;
    let autoPlayInterval;
    function getSlidesToShow() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    function updateSlider() {
        const slideWidth = 100 / slidesToShow;
        const translateX = -(currentSlide * slideWidth);
        slider.style.transform = `translateX(${translateX}%)`;
        const activeDotIndex = Math.floor(currentSlide / Math.max(1, Math.floor(slides.length / dots.length)));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        if (prevBtn) {
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
            nextBtn.disabled = currentSlide >= maxSlide;
        }
    }
    function goToSlide(slideIndex) {
        currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        updateSlider();
    }
    function nextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = maxSlide;
        }
        updateSlider();
    }
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 10000);
    }
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            nextSlide();
            setTimeout(startAutoPlay, 2000);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            prevSlide();
            setTimeout(startAutoPlay, 2000);
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            const targetSlide = index * Math.ceil(slides.length / dots.length);
            goToSlide(Math.min(targetSlide, maxSlide));
            setTimeout(startAutoPlay, 2000);
        });
    });
    let startX = 0;
    let isDragging = false;
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        isDragging = false;
        setTimeout(startAutoPlay, 2000);
    });
    function handleResize() {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            maxSlide = slides.length - slidesToShow;
            currentSlide = Math.min(currentSlide, maxSlide);
            updateSlider();
        }
    }
    window.addEventListener('resize', handleResize);
    const sliderContainer = document.querySelector('.lectors-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    updateSlider();
    startAutoPlay();
}

const lectors = document.querySelectorAll('.lector-item');
lectors.forEach(lector => {
    lector.addEventListener('click', function() {
        const lectorName = this.querySelector('h3').textContent;
        const description = window.lectors_description ? window.lectors_description[lectorName] : 'No description available.';
        const overlay = document.createElement('div');
        overlay.className = 'lector-popup-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        const popup = document.createElement('div');
        popup.className = 'lector-popup-box';
        popup.style.background = '#fff';
        popup.style.padding = '2rem';
        popup.style.borderRadius = '12px';
        popup.style.maxWidth = '600px';
        popup.style.maxHeight = '80vh';
        popup.style.overflowY = 'auto';
        popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)';
        popup.style.position = 'relative';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '12px';
        closeBtn.style.right = '16px';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        const title = document.createElement('h2');
        title.textContent = lectorName;
        title.style.marginTop = '0';
        const desc = document.createElement('p');
        desc.innerHTML = description;
        desc.style.whiteSpace = 'pre-line';
        popup.appendChild(closeBtn);
        popup.appendChild(title);
        popup.appendChild(desc);
        overlay.appendChild(popup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        document.body.appendChild(overlay);
    });
});
