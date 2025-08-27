document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollAnimations();
    initializeLectorsSlider();
    console.log('🌱 Cesta k Poznaniu - Website loaded successfully');
});

const lectors_description = {
  "Žanna Georgijivna Vaľo": "<b>Žanna Georgijivna Vaľo</b> má kvalitné vysokoškolské vzdelanie v oblasti <b>humanitnej pedagogiky a psychológie</b>. V roku 2008 ukončila štúdium na Mukačevskom humanitno-pedagogickom inštitúte, a v roku 2011 získala kvalifikáciu <b>praktickej psychologičky</b>. V roku 2020 získala kvalifikáciu <b>učiteľky-defektologičky a logopédičky</b> na Národnej pedagogickej univerzite M. P. Drahomanova v Kyjeve.\n\nSvoju profesionálnu dráhu začala v roku 2008 ako <b>učiteľka a psychologička</b>, neskôr pôsobila ako konzultantka v <b>sociálnych službách</b>. Od roku 2017 je <b>riaditeľkou Inkluzívno-resursného centra v Svaľave</b>, kde vedie proces <b>modernizácie inkluzívneho vzdelávania</b>.\n\nPreukazuje praktické zručnosti v práci s deťmi so ŠVVP vrátane:\n• <b>Poradenstva</b> pre pedagógov a rodičov\n• Zavádzania <b>inovatívnych metód</b>\n• <b>Diagnostiky a korekcie</b>\n• Vedenia školení a seminárov\n\nJe autorkou metodiky a <b>príručky o prevencii syndrómu vyhorenia</b>. Pravidelne vystupuje na konferenciách, vedie školenia a tvorí vzdelávacie programy. Jej prínos k inklúzii ocenila aj <b>Zakarpatská oblastná rada</b>.\n\n<b>Žanna Vaľo</b> je považovaná za <b>inšpiratívneho lídra</b>, mentorku a odborníčku s <b>tvorivým prístupom</b> a empatiou. Venuje sa aj písaniu kníh a metodík.",

  "Maria Lozovskaja": "<b>Maria Lozovskaja</b>\n• <b>Lekárka</b> s vysokoškolským medicínskym vzdelaním\n• Diplomovaná <b>špecialistka na naturopatiu a výživu</b>\n• <b>Pedagogička</b> ďalšieho odborného vzdelávania\n• Spoluzakladateľka <b>Akadémie praktickej naturopatie</b> a <b>Medzinárodnej asociácie praktickej naturopatie</b>\n• Autorka metodiky <b>„Vzorec zdravia“</b>\n• Organizátorka <b>osobných retreatov</b>\n\n<b>VZDELANIE:</b>\n• Diplomovaná lekárka s <b>12-ročnou praxou</b> v štátnom zdravotníctve\n• Diplomovaná špecialistka na <b>detoxikačnú výživu</b>\n• Certifikovaná na <b>toxikológiu</b> a <b>ergogénnu výživu</b> (zameranú na športový výkon)\n• Certifikovaná v systéme <b>Reiki 1. stupeň</b> – <i>japonská forma energetického liečenia</i>\n\n<b>Maria Lozovskaja</b> reprezentuje <b>celostný prístup k zdraviu</b>, spája medicínske vedomosti s prírodnou liečbou a edukáciou.",

  "Mgr. Naďa Udutová": "<b>Mgr. Naďa Udutová</b> sa narodila <b>25. novembra 1970</b>. Má dlhoročné skúsenosti v oblasti <b>predškolskej pedagogiky</b> a študovala <b>hudobnú a filologickú pedagogiku</b>. Pôsobila ako <b>učiteľka hudby</b> a <b>metodička</b> s najvyššou kvalifikačnou kategóriou. Od roku 2024 vedie <b>kurzy ďalšieho vzdelávania</b> hudobných vedúcich.\n\nPracuje aj s <b>deťmi s osobitnými výchovno-vzdelávacími potrebami</b>. Špecializuje sa na <b>hudobno-rytmické a krížové pohybové cvičenia</b>, ktoré podporujú reč, pohyb, emocionálnu rovnováhu a vývin."
};


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
    
    console.log('Lectors slider initialized with', slides.length, 'slides');
    
    // Get number of slides to show based on screen size
    function getSlidesToShow() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Update slider position
    function updateSlider() {
        const slideWidth = 100 / slidesToShow;
        const translateX = -(currentSlide * slideWidth);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        const activeDotIndex = Math.floor(currentSlide / Math.max(1, Math.floor(slides.length / dots.length)));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
            nextBtn.disabled = currentSlide >= maxSlide;
        }
        
        console.log('Slider updated - currentSlide:', currentSlide, 'translateX:', translateX + '%');
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to start
        }
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = maxSlide; // Loop to end
        }
        updateSlider();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 10000); // Change slide every 4 seconds
        console.log('Auto-play started');
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            console.log('Auto-play stopped');
        }
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            nextSlide();
            setTimeout(startAutoPlay, 2000); // Resume auto-play after 2 seconds
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            prevSlide();
            setTimeout(startAutoPlay, 2000); // Resume auto-play after 2 seconds
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            const targetSlide = index * Math.ceil(slides.length / dots.length);
            goToSlide(Math.min(targetSlide, maxSlide));
            setTimeout(startAutoPlay, 2000); // Resume auto-play after 2 seconds
        });
    });
    
    // Touch/swipe support
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
    
    // Handle window resize
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
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.lectors-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize slider
    updateSlider();
    startAutoPlay();
}

const lectors = document.querySelectorAll('.lector-item');
lectors.forEach(lector => {
    lector.addEventListener('click', function() {
        const lectorName = this.querySelector('h3').textContent;
        const description = lectors_description[lectorName] || 'No description available.';

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

        // Close button
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

        // Title
        const title = document.createElement('h2');
        title.textContent = lectorName;
        title.style.marginTop = '0';

        // Description
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
})

// Contact Description Toggle
function toggleDescription(descriptionId) {
    const description = document.getElementById(descriptionId);
    const button = event.target.closest('button');
    
    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
        button.querySelector('span').textContent = 'Skryť informácie';
    } else {
        description.style.display = 'none';
        button.querySelector('span').textContent = 'Viac informácií';
    }
}

// Poem Popup Functions
function openPoemPopup(poemId) {
    const poemData = document.getElementById(poemId);
    if (!poemData) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'poem-popup-overlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'poem-popup';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => document.body.removeChild(overlay);
    
    // Get poem content
    const title = poemData.querySelector('h4').outerHTML;
    const content = poemData.querySelector('.full-poem').outerHTML;
    
    // Build popup content
    popup.innerHTML = title + content;
    popup.appendChild(closeBtn);
    overlay.appendChild(popup);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    document.body.appendChild(overlay);
}

// Legacy functions (kept for compatibility)
function togglePoets() {
    // Legacy function - no longer used but kept for compatibility
    console.log('togglePoets is deprecated - using glimpse view instead');
}

function togglePoems() {
    // Legacy function - no longer used but kept for compatibility
    console.log('togglePoems is deprecated - using glimpse view instead');
}

// Chatbot Skeleton Logic
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.querySelector('.chatbot-messages');

// Close chatbot window
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}

// Send message
if (chatbotSend && chatbotInput && chatbotMessages) {
    chatbotSend.addEventListener('click', sendChatbotMessage);
    chatbotInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
}

function sendChatbotMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    addChatbotMessage('user', text);
    chatbotInput.value = '';
    // Show loading indicator
    showChatbotLoading();
    setTimeout(() => {
        fetch('https://chatbot-api-5d9u.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text })
        }).then(response => response.json())
        .then(data => {
            hideChatbotLoading();
            if(data.similarity < 0.4) {
                addChatbotMessage('bot', "Prepáčte, nerozumela som vám. Možete to prosím zopakovať?");
            } else {
                addChatbotMessage('bot', data.answer);
            }
        })
    }, 700);
}

function showChatbotLoading() {
    hideChatbotLoading();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chatbot-msg bot chatbot-loading';
    loadingDiv.innerHTML = '<span><svg width="24" height="24" viewBox="0 0 24 24" style="vertical-align:middle;"><circle cx="12" cy="12" r="10" stroke="#ff8c42" stroke-width="4" fill="none" opacity="0.3"/><circle cx="12" cy="12" r="6" stroke="#ff8c42" stroke-width="4" fill="none" stroke-dasharray="18" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></circle></svg> ...</span>';
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideChatbotLoading() {
    const loadingDiv = chatbotMessages.querySelector('.chatbot-loading');
    if (loadingDiv) loadingDiv.remove();
}

function addChatbotMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg ' + sender;
    msgDiv.innerHTML = `<span>${text}</span>`;
    if (sender === 'user') {
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.background = 'linear-gradient(90deg, #ff8c42 0%, #ff6b35 100%)';
        msgDiv.style.color = '#fff';
        msgDiv.style.borderRadius = '16px 16px 4px 16px';
        msgDiv.style.margin = '6px 0 6px auto';
        msgDiv.style.padding = '10px 16px';
        msgDiv.style.maxWidth = '80%';
        msgDiv.style.boxShadow = '0 2px 8px rgba(255,108,66,0.08)';
    } else {
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.background = '#f3f3f3';
        msgDiv.style.color = '#22304a';
        msgDiv.style.borderRadius = '16px 16px 16px 4px';
        msgDiv.style.margin = '6px auto 6px 0';
        msgDiv.style.padding = '10px 16px';
        msgDiv.style.maxWidth = '80%';
        msgDiv.style.boxShadow = '0 2px 8px rgba(34,48,74,0.07)';
    }
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

const chatbotToggle = document.getElementById('chatbot-toggle');
function showChatbotWindow() {
    chatbotWindow.style.display = 'flex';
    chatbotToggle.classList.add('hide');
}
function hideChatbotWindow() {
    chatbotWindow.style.display = 'none';
    chatbotToggle.classList.remove('hide');
}
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', showChatbotWindow);
}
if (chatbotClose) {
    chatbotClose.addEventListener('click', hideChatbotWindow);
}
if (chatbotWindow) {
    chatbotWindow.style.display = 'none';
    chatbotToggle.classList.remove('hide');
}

    fetch('https://chatbot-api-5d9u.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: "" })
        }).then(response => response.json())
        .then(data => {
            hideChatbotLoading();
            addChatbotMessage('bot', "Ahoj! 😊 Ako vám môžem pomôcť?");

        })