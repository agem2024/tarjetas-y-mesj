/* ============================================
   TRANSLATIONS - Bilingual System (ES/EN)
   ============================================ */

const TRANSLATIONS = {
    es: {
        // Navigation
        backToHome: '← Volver al Inicio',

        // Hero
        heroTitle: {
            colombia: '🇨🇴 Navidad Colombiana',
            usa: '🇺🇸 Navidad Americana',
            mexico: '🇲🇽 Navidad Mexicana'
        },
        heroSubtitle: 'Crea y envía tarjetas personalizadas',

        // Form
        createCardTitle: '🎄 Crea tu Tarjeta Navideña con IA',
        aiEngine: '🤖 Motor de IA',
        recipientName: '👤 Nombre del destinatario',
        recipientPlaceholder: 'Ej: María, Juan Carlos, Mamá...',
        senderLabel: '✍️ Tu nombre (remitente)',
        senderPlaceholder: 'Ej: Tu familia, Alex, Con cariño...',
        messageType: '🎭 Tipo de mensaje',
        forWhom: '👫 ¿Para quién es?',
        additionalContext: '💭 Contexto adicional (opcional)',
        contextPlaceholder: 'Ej: Es mi abuela de 80 años que vive en Medellín...',
        contextHint: 'La IA usará esto para hacer el mensaje más personal',

        // Message types
        messageTypes: {
            familiar: '👨‍👩‍👧‍👦 Familiar - Cálido y emotivo',
            comico: '😂 Cómico - Divertido y alegre',
            amoroso: '❤️ Amoroso - Romántico y especial',
            motivacional: '💪 Motivacional - Inspirador y fuerte',
            espiritual: '🙏 Espiritual - Fe y bendiciones'
        },

        // Gender options
        genderOptions: {
            general: '🎄 General - Para cualquier persona',
            mujer: '👩 Para ella',
            hombre: '👨 Para él'
        },

        // AI options
        generateAIMessage: '✨ Generar mensaje único con IA',
        generateAIImage: '🎨 Generar imagen navideña con IA (DALL-E)',
        attachFile: '📎 Adjuntar archivo (opcional)',
        attachHint: 'Imagen o video para incluir en la tarjeta',

        // Image gallery
        selectBackground: '🖼️ Imagen de fondo',

        // TTS
        voiceLabel: '🎤 Voz para leer el mensaje',
        voiceOptions: {
            alegre: '🎉 Alegre y Festiva',
            solemne: '🕯️ Solemne y Espiritual',
            comico: '😂 Cómica y Divertida',
            romantico: '❤️ Romántica y Suave',
            motivacional: '💪 Motivacional y Energética'
        },
        testVoice: '🔊 Probar Voz',

        // Buttons
        createCard: '🎁 Crear Tarjeta con IA',
        shareWhatsApp: '📱 WhatsApp',
        shareTelegram: '✈️ Telegram',
        shareEmail: '📧 Email',
        copyLink: '📋 Copiar Link',

        // Card viewer
        openEnvelope: '✉️ Haz clic para abrir',
        loadingCard: 'Cargando tu tarjeta...',
        preparingSomething: 'Preparando algo especial para ti ✨',
        cardNotFound: '😢 Tarjeta no encontrada',
        linkExpired: 'El enlace puede haber expirado o ser incorrecto.',
        createOwn: 'Crear mi propia tarjeta',
        withLoveFrom: 'Con cariño',

        // Toasts
        imageSelected: '🖼️ Imagen seleccionada',
        musicPlaying: '🎵 Música navideña activa',
        musicPaused: '🔇 Música pausada',
        linkCopied: '¡Link copiado! 📋',

        // Footer
        madeWithLove: 'Hecho con amor desde',

        // Language switch
        switchTo: 'English'
    },

    en: {
        // Navigation
        backToHome: '← Back to Home',

        // Hero
        heroTitle: {
            colombia: '🇨🇴 Colombian Christmas',
            usa: '🇺🇸 American Christmas',
            mexico: '🇲🇽 Mexican Christmas'
        },
        heroSubtitle: 'Create and send personalized cards',

        // Form
        createCardTitle: '🎄 Create Your AI Christmas Card',
        aiEngine: '🤖 AI Engine',
        recipientName: '👤 Recipient\'s name',
        recipientPlaceholder: 'E.g: Mary, John, Mom...',
        senderLabel: '✍️ Your name (sender)',
        senderPlaceholder: 'E.g: Your family, Alex, With love...',
        messageType: '🎭 Message style',
        forWhom: '👫 Who is this for?',
        additionalContext: '💭 Additional context (optional)',
        contextPlaceholder: 'E.g: She is my 80-year-old grandma who loves baking...',
        contextHint: 'AI will use this to personalize the message',

        // Message types
        messageTypes: {
            familiar: '👨‍👩‍👧‍👦 Family - Warm & heartfelt',
            comico: '😂 Funny - Light & humorous',
            amoroso: '❤️ Romantic - Sweet & loving',
            motivacional: '💪 Motivational - Inspiring',
            espiritual: '🙏 Spiritual - Faith & blessings'
        },

        // Gender options
        genderOptions: {
            general: '🎄 Anyone',
            mujer: '👩 For Her',
            hombre: '👨 For Him'
        },

        // AI options
        generateAIMessage: '✨ Generate unique AI message',
        generateAIImage: '🎨 Generate AI Christmas image (DALL-E)',
        attachFile: '📎 Attach file (optional)',
        attachHint: 'Image or video to include in the card',

        // Image gallery
        selectBackground: '🖼️ Background image',

        // TTS
        voiceLabel: '🎤 Voice to read message',
        voiceOptions: {
            alegre: '🎉 Cheerful & Festive',
            solemne: '🕯️ Solemn & Spiritual',
            comico: '😂 Comic & Fun',
            romantico: '❤️ Romantic & Soft',
            motivacional: '💪 Motivational & Energetic'
        },
        testVoice: '🔊 Test Voice',

        // Buttons
        createCard: '🎁 Create AI Card',
        shareWhatsApp: '📱 WhatsApp',
        shareTelegram: '✈️ Telegram',
        shareEmail: '📧 Email',
        copyLink: '📋 Copy Link',

        // Card viewer
        openEnvelope: '✉️ Click to open',
        loadingCard: 'Loading your card...',
        preparingSomething: 'Preparing something special for you ✨',
        cardNotFound: '😢 Card not found',
        linkExpired: 'The link may have expired or is incorrect.',
        createOwn: 'Create my own card',
        withLoveFrom: 'With love',

        // Toasts
        imageSelected: '🖼️ Image selected',
        musicPlaying: '🎵 Christmas music playing',
        musicPaused: '🔇 Music paused',
        linkCopied: 'Link copied! 📋',

        // Footer
        madeWithLove: 'Made with love from',

        // Language switch
        switchTo: 'Español'
    }
};

// ============================================
// LANGUAGE MANAGER CLASS
// ============================================
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('christmas_lang') || 'es';
        this.translations = TRANSLATIONS;
    }

    get(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to Spanish
                value = this.translations.es;
                for (const k2 of keys) {
                    value = value?.[k2];
                }
                break;
            }
        }
        return value || key;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('christmas_lang', lang);
            this.updatePage();
            return true;
        }
        return false;
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
    }

    getCurrentLang() {
        return this.currentLang;
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation && typeof translation !== 'object') {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update select options
        document.querySelectorAll('[data-i18n-options]').forEach(select => {
            const optionsKey = select.getAttribute('data-i18n-options');
            const options = this.get(optionsKey);
            if (options && typeof options === 'object') {
                Array.from(select.options).forEach(opt => {
                    if (options[opt.value]) {
                        opt.textContent = options[opt.value];
                    }
                });
            }
        });

        // Update language toggle button
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.textContent = this.currentLang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
            langBtn.title = this.get('switchTo');
        }

        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    }

    // Render language toggle button
    renderToggle(containerId = null) {
        const btn = document.createElement('button');
        btn.id = 'langToggle';
        btn.className = 'lang-toggle';
        btn.textContent = this.currentLang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
        btn.title = this.get('switchTo');
        btn.onclick = () => this.toggleLanguage();
        btn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 10px 15px;
            background: rgba(0,0,0,0.8);
            color: #FFD700;
            border: 2px solid #FFD700;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            z-index: 10000;
            transition: all 0.3s ease;
        `;

        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) container.appendChild(btn);
        } else {
            document.body.appendChild(btn);
        }
    }
}

// Create global instance
window.langManager = new LanguageManager();

// Auto-render toggle on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.langManager.renderToggle();
    window.langManager.updatePage();
});

console.log('🌐 Language Manager loaded. Current: ' + window.langManager.getCurrentLang());
