class AITranslator {
    constructor() {
        this.targetLanguage = 'en';
        this.originalTexts = new Map();
        this.translationCache = new Map();
        this.supportedLanguages = {
            'en': 'English',
            'fr': 'Français',
            'ar': 'العربية',
            'ru': 'Русский',
            'es': 'Español',
            'de': 'Deutsch',
            'it': 'Italiano',
            'pt': 'Português',
            'zh': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'hi': 'हिन्दी'
        };

        // Basic translations for common phrases
        this.commonTranslations = {
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
            }
            // Add more languages as needed
        };
    }

    // Initialize the translator
    async init() {
        // Store original texts
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            this.originalTexts.set(key, element.textContent);
        });

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
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const lang = link.getAttribute('data-lang');
                    if (lang) {
                        await this.translatePage(lang);
                        languageDropdown.classList.add('hidden');
                    }
                });
            });
        }
    }

    // Get translation from cache or common translations
    getTranslation(text, targetLang) {
        const cacheKey = `${text}-${targetLang}`;
        
        // Check cache first
        if (this.translationCache.has(cacheKey)) {
            return this.translationCache.get(cacheKey);
        }

        // Check common translations
        if (this.commonTranslations[targetLang]) {
            for (const [key, translation] of Object.entries(this.commonTranslations[targetLang])) {
                if (text === this.commonTranslations['en'][key]) {
                    this.translationCache.set(cacheKey, translation);
                    return translation;
                }
            }
        }

        // If no translation found, return original text
        return text;
    }

    // Translate all elements on the page
    async translatePage(targetLang) {
        this.targetLanguage = targetLang;
        
        // Show loading state
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50';
        loadingIndicator.innerHTML = `
            <div class="bg-white p-4 rounded-lg">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p class="mt-2 text-gray-700">Translating...</p>
            </div>
        `;
        document.body.appendChild(loadingIndicator);

        try {
            // Translate all elements
            for (const [key, originalText] of this.originalTexts) {
                const element = document.querySelector(`[data-translate="${key}"]`);
                if (element) {
                    const translatedText = this.getTranslation(originalText, targetLang);
                    element.textContent = translatedText;
                }
            }
        } finally {
            // Remove loading indicator
            document.body.removeChild(loadingIndicator);
        }
    }
}

// Initialize translator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const translator = new AITranslator();
    translator.init();
}); 