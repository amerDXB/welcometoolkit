class DeepSeekTranslator {
    constructor() {
        this.targetLanguage = 'en';
        this.originalTexts = new Map();
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

    // Translate text using DeepSeek AI
    async translateText(text, targetLang) {
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    targetLang: targetLang
                })
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            return data.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        }
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
            // Translate elements in batches
            const elements = Array.from(this.originalTexts.entries());
            const batchSize = 3;
            
            for (let i = 0; i < elements.length; i += batchSize) {
                const batch = elements.slice(i, i + batchSize);
                await Promise.all(batch.map(async ([key, originalText]) => {
                    const element = document.querySelector(`[data-translate="${key}"]`);
                    if (element) {
                        const translatedText = await this.translateText(originalText, targetLang);
                        element.textContent = translatedText;
                    }
                }));
            }
        } finally {
            // Remove loading indicator
            document.body.removeChild(loadingIndicator);
        }
    }
}

// Initialize translator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const translator = new DeepSeekTranslator();
    translator.init();
}); 