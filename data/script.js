// Shared data (e.g., lectors_description) and any global initialization
const lectors_description = {
  "Žanna Georgijivna Vaľo": "<b>Žanna Georgijivna Vaľo</b> má kvalitné vysokoškolské vzdelanie v oblasti <b>humanitnej pedagogiky a psychológie</b>. V roku 2008 ukončila štúdium na Mukačevskom humanitno-pedagogickom inštitúte, a v roku 2011 získala kvalifikáciu <b>praktickej psychologičky</b>. V roku 2020 získala kvalifikáciu <b>učiteľky-defektologičky a logopédičky</b> na Národnej pedagogickej univerzite M. P. Drahomanova v Kyjeve.\n\nSvoju profesionálnu dráhu začala v roku 2008 ako <b>učiteľka a psychologička</b>, neskôr pôsobila ako konzultantka v <b>sociálnych službách</b>. Od roku 2017 je <b>riaditeľkou Inkluzívno-resursného centra v Svaľave</b>, kde vedie proces <b>modernizácie inkluzívneho vzdelávania</b>.\n\nPreukazuje praktické zručnosti v práci s deťmi so ŠVVP vrátane:\n• <b>Poradenstva</b> pre pedagógov a rodičov\n• Zavádzania <b>inovatívnych metód</b>\n• <b>Diagnostiky a korekcie</b>\n• Vedenia školení a seminárov\n\nJe autorkou metodiky a <b>príručky o prevencii syndrómu vyhorenia</b>. Pravidelne vystupuje na konferenciách, vedie školenia a tvorí vzdelávacie programy. Jej prínos k inklúzii ocenila aj <b>Zakarpatská oblastná rada</b>.\n\n<b>Žanna Vaľo</b> je považovaná za <b>inšpiratívneho lídra</b>, mentorku a odborníčku s <b>tvorivým prístupom</b> a empatiou. Venuje sa aj písaniu kníh a metodík.",

  "Maria Lozovskaja": "<b>Maria Lozovskaja</b>\n• <b>Lekárka</b> s vysokoškolským medicínskym vzdelaním\n• Diplomovaná <b>špecialistka na naturopatiu a výživu</b>\n• <b>Pedagogička</b> ďalšieho odborného vzdelávania\n• Spoluzakladateľka <b>Akadémie praktickej naturopatie</b> a <b>Medzinárodnej asociácie praktickej naturopatie</b>\n• Autorka metodiky <b>„Vzorec zdravia“</b>\n• Organizátorka <b>osobných retreatov</b>\n\n<b>VZDELANIE:</b>\n• Diplomovaná lekárka s <b>12-ročnou praxou</b> v štátnom zdravotníctve\n• Diplomovaná špecialistka na <b>detoxikačnú výživu</b>\n• Certifikovaná na <b>toxikológiu</b> a <b>ergogénnu výživu</b> (zameranú na športový výkon)\n• Certifikovaná v systéme <b>Reiki 1. stupeň</b> – <i>japonská forma energetického liečenia</i>\n\n<b>Maria Lozovskaja</b> reprezentuje <b>celostný prístup k zdraviu</b>, spája medicínske vedomosti s prírodnou liečbou a edukáciou.",

  "Mgr. Naďa Udutová": "<b>Mgr. Naďa Udutová</b> sa narodila <b>25. novembra 1970</b>. Má dlhoročné skúsenosti v oblasti <b>predškolskej pedagogiky</b> a študovala <b>hudobnú a filologickú pedagogiku</b>. Pôsobila ako <b>učiteľka hudby</b> a <b>metodička</b> s najvyššou kvalifikačnou kategóriou. Od roku 2024 vedie <b>kurzy ďalšieho vzdelávania</b> hudobných vedúcich.\n\nPracuje aj s <b>deťmi s osobitnými výchovno-vzdelávacími potrebami</b>. Špecializuje sa na <b>hudobno-rytmické a krížové pohybové cvičenia</b>, ktoré podporujú reč, pohyb, emocionálnu rovnováhu a vývin."
};

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
