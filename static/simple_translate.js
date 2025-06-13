class SimpleTranslator {
    constructor() {
        this.targetLanguage = 'en';
        this.translations = {
            'en': {
                'home': 'Home',
                'resources': 'Resources',
                'about': 'About',
                'language': 'Language',
                'heroTitle': 'Start your life in Canada with confidence',
                'heroDescription': 'Essential tools and resources to help you settle, understand your finances, and make smarter decisions in your first year in Canada.',
                'exploreTools': 'Explore Tools',
                'learnMore': 'Learn More',
                'essentialTools': 'Essential Tools for Newcomers',
                'contact': 'Contact',
                'quickLinks': 'Quick Links',
                'disclaimer': '🔹 This is an independent platform built to support newcomers to Canada. We are not affiliated with the Government of Canada. Information is provided for guidance only — please refer to official sources for the most accurate and up-to-date policies.',
                'copyright': '© 2025 Welcome Toolkit Canada. All rights reserved.',
                'privacyPolicy': 'Privacy Policy'
            },
            'fr': {
                'home': 'Accueil',
                'resources': 'Ressources',
                'about': 'À propos',
                'language': 'Langue',
                'heroTitle': 'Commencez votre vie au Canada en toute confiance',
                'heroDescription': 'Outils et ressources essentiels pour vous aider à vous installer, comprendre vos finances et prendre des décisions éclairées lors de votre première année au Canada.',
                'exploreTools': 'Explorer les outils',
                'learnMore': 'En savoir plus',
                'essentialTools': 'Outils essentiels pour les nouveaux arrivants',
                'contact': 'Contact',
                'quickLinks': 'Liens rapides',
                'disclaimer': '🔹 Il s\'agit d\'une plateforme indépendante conçue pour soutenir les nouveaux arrivants au Canada. Nous ne sommes pas affiliés au gouvernement du Canada. Les informations sont fournies à titre indicatif uniquement — veuillez vous référer aux sources officielles pour les politiques les plus précises et à jour.',
                'copyright': '© 2025 Welcome Toolkit Canada. Tous droits réservés.',
                'privacyPolicy': 'Politique de confidentialité'
            },
            'ar': {
                'home': 'الرئيسية',
                'resources': 'الموارد',
                'about': 'من نحن',
                'language': 'اللغة',
                'heroTitle': 'ابدأ حياتك في كندا بثقة',
                'heroDescription': 'أدوات وموارد أساسية لمساعدتك على الاستقرار وفهم شؤونك المالية واتخاذ قرارات أكثر ذكاءً في عامك الأول في كندا.',
                'exploreTools': 'استكشف الأدوات',
                'learnMore': 'اعرف المزيد',
                'essentialTools': 'أدوات أساسية للمهاجرين الجدد',
                'contact': 'اتصل بنا',
                'quickLinks': 'روابط سريعة',
                'disclaimer': '🔹 هذه منصة مستقلة مبنية لدعم المهاجرين الجدد إلى كندا. نحن لسنا تابعين لحكومة كندا. المعلومات مقدمة للإرشاد فقط — يرجى الرجوع إلى المصادر الرسمية للحصول على السياسات الأكثر دقة وتحديثاً.',
                'copyright': '© 2025 Welcome Toolkit Canada. جميع الحقوق محفوظة.',
                'privacyPolicy': 'سياسة الخصوصية'
            }
        };
    }

    // Initialize the translator
    init() {
        // Set up language switcher
        const languageSwitcher = document.getElementById('languageSwitcher');
        const languageDropdown = document.getElementById('languageDropdown');

        if (languageSwitcher && languageDropdown) {
            // Toggle dropdown visibility
            languageSwitcher.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageSwitcher.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageDropdown.classList.add('hidden');
                }
            });

            // Handle language selection
            languageDropdown.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = link.getAttribute('data-lang');
                    if (lang) {
                        this.translatePage(lang);
                        languageDropdown.classList.add('hidden');
                    }
                });
            });
        }
    }

    // Translate the page
    translatePage(targetLang) {
        this.targetLanguage = targetLang;
        const translations = this.translations[targetLang] || this.translations['en'];

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Update language switcher text
        const languageSwitcher = document.getElementById('languageSwitcher');
        if (languageSwitcher) {
            const span = languageSwitcher.querySelector('span');
            if (span) {
                span.textContent = translations['language'] || 'Language';
            }
        }
    }
}

// Initialize translator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const translator = new SimpleTranslator();
    translator.init();
}); 