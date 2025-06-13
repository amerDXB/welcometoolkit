const translations = {
    en: {
        // Navigation
        home: "Home",
        resources: "Resources",
        about: "About",
        language: "Language",
        
        // Hero Section
        heroTitle: "Start your life in Canada with confidence",
        heroDescription: "Essential tools and resources to help you settle, understand your finances, and make smarter decisions in your first year in Canada.",
        exploreTools: "Explore Tools",
        learnMore: "Learn More",
        
        // Tools Section
        essentialTools: "Essential Tools for Newcomers",
        bonusTools: "Bonus Tools & Features",
        tryItNow: "Try it now",
        comingSoon: "Coming soon",
        
        // Footer
        contact: "Contact",
        quickLinks: "Quick Links",
        disclaimer: "🔹 This is an independent platform built to support newcomers to Canada. We are not affiliated with the Government of Canada. Information is provided for guidance only — please refer to official sources for the most accurate and up-to-date policies.",
        copyright: "© 2025 Welcome Toolkit Canada. All rights reserved.",
        privacyPolicy: "Privacy Policy"
    },
    fr: {
        // Navigation
        home: "Accueil",
        resources: "Ressources",
        about: "À propos",
        language: "Langue",
        
        // Hero Section
        heroTitle: "Commencez votre vie au Canada en toute confiance",
        heroDescription: "Outils et ressources essentiels pour vous aider à vous installer, comprendre vos finances et prendre des décisions éclairées lors de votre première année au Canada.",
        exploreTools: "Explorer les outils",
        learnMore: "En savoir plus",
        
        // Tools Section
        essentialTools: "Outils essentiels pour les nouveaux arrivants",
        bonusTools: "Outils et fonctionnalités supplémentaires",
        tryItNow: "Essayer maintenant",
        comingSoon: "Bientôt disponible",
        
        // Footer
        contact: "Contact",
        quickLinks: "Liens rapides",
        disclaimer: "🔹 Il s'agit d'une plateforme indépendante conçue pour soutenir les nouveaux arrivants au Canada. Nous ne sommes pas affiliés au gouvernement du Canada. Les informations sont fournies à titre indicatif uniquement — veuillez vous référer aux sources officielles pour les politiques les plus précises et à jour.",
        copyright: "© 2025 Welcome Toolkit Canada. Tous droits réservés.",
        privacyPolicy: "Politique de confidentialité"
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        resources: "الموارد",
        about: "من نحن",
        language: "اللغة",
        
        // Hero Section
        heroTitle: "ابدأ حياتك في كندا بثقة",
        heroDescription: "أدوات وموارد أساسية لمساعدتك على الاستقرار وفهم شؤونك المالية واتخاذ قرارات أكثر ذكاءً في عامك الأول في كندا.",
        exploreTools: "استكشف الأدوات",
        learnMore: "اعرف المزيد",
        
        // Tools Section
        essentialTools: "أدوات أساسية للمهاجرين الجدد",
        bonusTools: "أدوات وميزات إضافية",
        tryItNow: "جرب الآن",
        comingSoon: "قريباً",
        
        // Footer
        contact: "اتصل بنا",
        quickLinks: "روابط سريعة",
        disclaimer: "🔹 هذه منصة مستقلة مبنية لدعم المهاجرين الجدد إلى كندا. نحن لسنا تابعين لحكومة كندا. المعلومات مقدمة للإرشاد فقط — يرجى الرجوع إلى المصادر الرسمية للحصول على السياسات الأكثر دقة وتحديثاً.",
        copyright: "© 2025 Welcome Toolkit Canada. جميع الحقوق محفوظة.",
        privacyPolicy: "سياسة الخصوصية"
    },
    ru: {
        // Navigation
        home: "Главная",
        resources: "Ресурсы",
        about: "О нас",
        language: "Язык",
        
        // Hero Section
        heroTitle: "Начните свою жизнь в Канаде с уверенностью",
        heroDescription: "Основные инструменты и ресурсы, которые помогут вам обустроиться, понять свои финансы и принимать более обоснованные решения в первый год жизни в Канаде.",
        exploreTools: "Исследовать инструменты",
        learnMore: "Узнать больше",
        
        // Tools Section
        essentialTools: "Основные инструменты для новичков",
        bonusTools: "Дополнительные инструменты и функции",
        tryItNow: "Попробовать сейчас",
        comingSoon: "Скоро",
        
        // Footer
        contact: "Контакты",
        quickLinks: "Быстрые ссылки",
        disclaimer: "🔹 Это независимая платформа, созданная для поддержки новичков в Канаде. Мы не связаны с правительством Канады. Информация предоставляется только для справки — пожалуйста, обратитесь к официальным источникам для получения наиболее точной и актуальной информации о политике.",
        copyright: "© 2025 Welcome Toolkit Canada. Все права защищены.",
        privacyPolicy: "Политика конфиденциальности"
    }
};

// Function to get translation
function getTranslation(key, lang = 'en') {
    return translations[lang]?.[key] || translations['en'][key] || key;
}

// Function to update page content with selected language
function updatePageLanguage(lang) {
    // Update navigation
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key, lang);
    });

    // Update language switcher text
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        const span = languageSwitcher.querySelector('span');
        if (span) {
            span.textContent = getTranslation('language', lang);
        }
    }

    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
}

// Initialize language
document.addEventListener('DOMContentLoaded', function() {
    // Get saved language or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    updatePageLanguage(savedLanguage);

    // Set up language switcher
    const languageSwitcher = document.getElementById('languageSwitcher');
    const languageDropdown = document.getElementById('languageDropdown');

    if (languageSwitcher && languageDropdown) {
        languageSwitcher.addEventListener('click', () => {
            languageDropdown.classList.toggle('hidden');
        });

        // Handle language selection
        languageDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                if (lang) {
                    updatePageLanguage(lang);
                    languageDropdown.classList.add('hidden');
                }
            });
        });
    }
}); 