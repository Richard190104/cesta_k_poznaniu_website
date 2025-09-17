// Lectors Slider Functionality
const lectors_description = {
  "Žanna Georgijivna Vaľo": "<b>Žanna Georgijivna Vaľo</b> má kvalitné vysokoškolské vzdelanie v oblasti <b>humanitnej pedagogiky a psychológie</b>. V roku 2008 ukončila štúdium na Mukačevskom humanitno-pedagogickom inštitúte, a v roku 2011 získala kvalifikáciu <b>praktickej psychologičky</b>. V roku 2020 získala kvalifikáciu <b>učiteľky-defektologičky a logopédičky</b> na Národnej pedagogickej univerzite M. P. Drahomanova v Kyjeve.\n\nSvoju profesionálnu dráhu začala v roku 2008 ako <b>učiteľka a psychologička</b>, neskôr pôsobila ako konzultantka v <b>sociálnych službách</b>. Od roku 2017 je <b>riaditeľkou Inkluzívno-resursného centra v Svaľave</b>, kde vedie proces <b>modernizácie inkluzívneho vzdelávania</b>.\n\nPreukazuje praktické zručnosti v práci s deťmi so ŠVVP vrátane:\n• <b>Poradenstva</b> pre pedagógov a rodičov\n• Zavádzania <b>inovatívnych metód</b>\n• <b>Diagnostiky a korekcie</b>\n• Vedenia školení a seminárov\n\nJe autorkou metodiky a <b>príručky o prevencii syndrómu vyhorenia</b>. Pravidelne vystupuje na konferenciách, vedie školenia a tvorí vzdelávacie programy. Jej prínos k inklúzii ocenila aj <b>Zakarpatská oblastná rada</b>.\n\n<b>Žanna Vaľo</b> je považovaná za <b>inšpiratívneho lídra</b>, mentorku a odborníčku s <b>tvorivým prístupom</b> a empatiou. Venuje sa aj písaniu kníh a metodík.",

  "Maria Lozovskaja": "<b>Maria Lozovskaja</b>\n• <b>Lekárka</b> s vysokoškolským medicínskym vzdelaním\n• Diplomovaná <b>špecialistka na naturopatiu a výživu</b>\n• <b>Pedagogička</b> ďalšieho odborného vzdelávania\n• Spoluzakladateľka <b>Akadémie praktickej naturopatie</b> a <b>Medzinárodnej asociácie praktickej naturopatie</b>\n• Autorka metodiky <b>„Vzorec zdravia“</b>\n• Organizátorka <b>osobných retreatov</b>\n\n<b>VZDELANIE:</b>\n• Diplomovaná lekárka s <b>12-ročnou praxou</b> v štátnom zdravotníctve\n• Diplomovaná špecialistka na <b>detoxikačnú výživu</b>\n• Certifikovaná na <b>toxikológiu</b> a <b>ergogénnu výživu</b> (zameranú na športový výkon)\n• Certifikovaná v systéme <b>Reiki 1. stupeň</b> – <i>japonská forma energetického liečenia</i>\n\n<b>Maria Lozovskaja</b> reprezentuje <b>celostný prístup k zdraviu</b>, spája medicínske vedomosti s prírodnou liečbou a edukáciou.",

  "Mgr. Naďa Udutová": "<b>Mgr. Naďa Udutová</b> sa narodila <b>25. novembra 1970</b>. Má dlhoročné skúsenosti v oblasti <b>predškolskej pedagogiky</b> a študovala <b>hudobnú a filologickú pedagogiku</b>. Pôsobila ako <b>učiteľka hudby</b> a <b>metodička</b> s najvyššou kvalifikačnou kategóriou. Od roku 2024 vedie <b>kurzy ďalšieho vzdelávania</b> hudobných vedúcich.\n\nPracuje aj s <b>deťmi s osobitnými výchovno-vzdelávacími potrebami</b>. Špecializuje sa na <b>hudobno-rytmické a krížové pohybové cvičenia</b>, ktoré podporujú reč, pohyb, emocionálnu rovnováhu a vývin."
};

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
    // Remove previous event listeners if any
    if (nextBtn) {
        nextBtn.onclick = null;
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            nextSlide();
            setTimeout(startAutoPlay, 2000);
        });
    }
    if (prevBtn) {
        prevBtn.onclick = null;
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            prevSlide();
            setTimeout(startAutoPlay, 2000);
        });
    }
    dots.forEach((dot, index) => {
        dot.onclick = null;
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

document.addEventListener('DOMContentLoaded', initializeLectorsSlider);

const lectors = document.querySelectorAll('.lector-item');
lectors.forEach(lector => {
    lector.addEventListener('click', function() {
        const lectorName = this.querySelector('h3').textContent;
        const description = lectors_description[lectorName] ? lectors_description[lectorName] : 'No description available.';
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
