/* ============================================
   TRANSLATIONS - Bilingual System (ES/EN)
   ============================================ */

const TRANSLATIONS = {
    es: {
        // Navigation
        backToHome: '← Volver al Inicio',

        // Hero
        heroTitle: {
            home: '¡Feliz Año Nuevo 2025!',
            colombia: '🇨🇴 Año Nuevo Colombiano',
            usa: '🇺🇸 Año Nuevo Americano',
            mexico: '🇲🇽 Año Nuevo Mexicano'
        },
        heroSubtitle: 'Crea y envía tarjetas personalizadas',
        orionPoweredBy: '🤖 Desarrollado por ORION',

        // Form
        createCardTitle: '🎆 Crea tu Tarjeta de Año Nuevo con IA',
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
        generateAIImage: '🎨 Generar imagen de Año Nuevo con IA (DALL-E)',
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
        musicPlaying: '🎵 Música de Año Nuevo activa',
        musicPaused: '🔇 Música pausada',
        linkCopied: '¡Link copiado! 📋',
        blessingsMsg: 'que este Año Nuevo llene tu vida de bendiciones',
        dear: 'Querido/a',
        friend: 'Amigo/a',
        personalize: '🎁 Personalizar',

        // Footer
        madeWithLove: 'Hecho con ❤️ y espíritu festivo 🎆',

        // Language switch
        switchTo: 'English'
    },

    en: {
        // Navigation
        backToHome: '← Back to Home',

        // Hero
        heroTitle: {
            home: 'Happy New Year 2025!',
            colombia: '🇨🇴 Colombian New Year',
            usa: '🇺🇸 American New Year',
            mexico: '🇲🇽 Mexican New Year'
        },
        heroSubtitle: 'Create and send personalized cards',
        orionPoweredBy: '🤖 Powered by ORION',

        // Form
        createCardTitle: '🎆 Create Your AI New Year Card',
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
        generateAIImage: '🎨 Generate AI New Year image (DALL-E)',
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
        musicPlaying: '🎵 New Year music playing',
        musicPaused: '🔇 Music paused',
        linkCopied: 'Link copied! 📋',
        blessingsMsg: 'may this New Year fill your life with blessings',
        dear: 'Dear',
        friend: 'Friend',
        personalize: '🎁 Personalize',

        // Footer
        madeWithLove: 'Made with ❤️ and festive spirit 🎆',

        // Language switch
        switchTo: 'Español'
    },

    pt: {
        // Navigation
        backToHome: '← Voltar ao Início',

        // Hero
        heroTitle: {
            home: 'Feliz Ano Novo 2025!',
            colombia: '🇨🇴 Ano Novo Colombiano',
            usa: '🇺🇸 Ano Novo Americano',
            mexico: '🇲🇽 Ano Novo Mexicano'
        },
        heroSubtitle: 'Crie e envie cartões personalizados',
        orionPoweredBy: '🤖 Desenvolvido por ORION',

        // Form
        createCardTitle: '🎆 Crie seu Cartão de Ano Novo com IA',
        aiEngine: '🤖 Motor de IA',
        recipientName: '👤 Nome do destinatário',
        recipientPlaceholder: 'Ex: Maria, João Carlos, Mãe...',
        senderLabel: '✍️ Seu nome (remetente)',
        senderPlaceholder: 'Ex: Sua família, Alex, Com carinho...',
        messageType: '🎭 Tipo de mensagem',
        forWhom: '👫 Para quem é?',
        additionalContext: '💭 Contexto adicional (opcional)',
        contextPlaceholder: 'Ex: É minha avó de 80 anos que mora em Medellín...',
        contextHint: 'A IA usará isso para tornar a mensagem mais pessoal',

        // Message types
        messageTypes: {
            familiar: '👨‍👩‍👧‍👦 Familiar - Caloroso e emotivo',
            comico: '😂 Cômico - Engraçado e alegre',
            amoroso: '❤️ Amoroso - Romântico e especial',
            motivacional: '💪 Motivacional - Inspirador e forte',
            espiritual: '🙏 Espiritual - Fé e bênçãos'
        },

        // Gender options
        genderOptions: {
            general: '🎄 Geral - Para qualquer pessoa',
            mujer: '👩 Para ela',
            hombre: '👨 Para ele'
        },

        // AI options
        generateAIMessage: '✨ Gerar mensagem única com IA',
        generateAIImage: '🎨 Gerar imagem de Ano Novo com IA (DALL-E)',
        attachFile: '📎 Anexar arquivo (opcional)',
        attachHint: 'Imagem ou vídeo para incluir no cartão',

        // Image gallery
        selectBackground: '🖼️ Imagem de fundo',

        // TTS
        voiceLabel: '🎤 Voz para ler a mensagem',
        voiceOptions: {
            alegre: '🎉 Alegre e Festiva',
            solemne: '🕯️ Solene e Espiritual',
            comico: '😂 Cômica e Divertida',
            romantico: '❤️ Romântica e Suave',
            motivacional: '💪 Motivacional e Energética'
        },
        testVoice: '🔊 Testar Voz',

        // Buttons
        createCard: '🎁 Criar Cartão com IA',
        shareWhatsApp: '📱 WhatsApp',
        shareTelegram: '✈️ Telegram',
        shareEmail: '📧 Email',
        copyLink: '📋 Copiar Link',

        // Card viewer
        openEnvelope: '✉️ Clique para abrir',
        loadingCard: 'Carregando seu cartão...',
        preparingSomething: 'Preparando algo especial para você ✨',
        cardNotFound: '😢 Cartão não encontrado',
        linkExpired: 'O link pode ter expirado ou estar incorreto.',
        createOwn: 'Criar meu próprio cartão',
        withLoveFrom: 'Com carinho',

        // Toasts
        imageSelected: '🖼️ Imagem selecionada',
        musicPlaying: '🎵 Música de Ano Novo ativa',
        musicPaused: '🔇 Música pausada',
        linkCopied: 'Link copiado! 📋',
        blessingsMsg: 'que este Ano Novo encha sua vida de bênçãos',
        dear: 'Querido/a',
        friend: 'Amigo/a',
        personalize: '🎁 Personalizar',

        // Footer
        madeWithLove: 'Feito com ❤️ e espírito festivo 🎆',

        // Language switch
        switchTo: 'Português'
    },

    fr: {
        // Navigation
        backToHome: '← Retour à l\'accueil',

        // Hero
        heroTitle: {
            home: 'Bonne Année 2025!',
            colombia: '🇨🇴 Nouvel An Colombien',
            usa: '🇺🇸 Nouvel An Américain',
            mexico: '🇲🇽 Nouvel An Mexicain'
        },
        heroSubtitle: 'Créez et envoyez des cartes personnalisées',
        orionPoweredBy: '🤖 Propulsé par ORION',

        // Form
        createCardTitle: '🎆 Créez votre Carte de Nouvel An IA',
        aiEngine: '🤖 Moteur IA',
        recipientName: '👤 Nom du destinataire',
        recipientPlaceholder: 'Ex: Marie, Jean Charles, Maman...',
        senderLabel: '✍️ Votre nom (expéditeur)',
        senderPlaceholder: 'Ex: Ta famille, Alex, Avec amour...',
        messageType: '🎭 Type de message',
        forWhom: '👫 Pour qui est-ce?',
        additionalContext: '💭 Contexte supplémentaire (optionnel)',
        contextPlaceholder: 'Ex: C\'est ma grand-mère de 80 ans qui vit à Medellín...',
        contextHint: 'L\'IA utilisera cela pour rendre le message plus personnel',

        // Message types
        messageTypes: {
            familiar: '👨‍👩‍👧‍👦 Familial - Chaleureux et émouvant',
            comico: '😂 Comique - Drôle et joyeux',
            amoroso: '❤️ Amoureux - Romantique et spécial',
            motivacional: '💪 Motivationnel - Inspirant et fort',
            espiritual: '🙏 Spirituel - Foi et bénédictions'
        },

        // Gender options
        genderOptions: {
            general: '🎄 Général - Pour tout le monde',
            mujer: '👩 Pour elle',
            hombre: '👨 Pour lui'
        },

        // AI options
        generateAIMessage: '✨ Générer un message unique avec IA',
        generateAIImage: '🎨 Générer une image de Nouvel An avec IA (DALL-E)',
        attachFile: '📎 Joindre un fichier (optionnel)',
        attachHint: 'Image ou vidéo à inclure dans la carte',

        // Image gallery
        selectBackground: '🖼️ Image de fond',

        // TTS
        voiceLabel: '🎤 Voix pour lire le message',
        voiceOptions: {
            alegre: '🎉 Joyeuse et Festive',
            solemne: '🕯️ Solennelle et Spirituelle',
            comico: '😂 Comique et Amusante',
            romantico: '❤️ Romantique et Douce',
            motivacional: '💪 Motivationnelle et Énergique'
        },
        testVoice: '🔊 Tester la Voix',

        // Buttons
        createCard: '🎁 Créer une Carte avec IA',
        shareWhatsApp: '📱 WhatsApp',
        shareTelegram: '✈️ Telegram',
        shareEmail: '📧 Email',
        copyLink: '📋 Copier le Lien',

        // Card viewer
        openEnvelope: '✉️ Cliquez pour ouvrir',
        loadingCard: 'Chargement de votre carte...',
        preparingSomething: 'Préparation de quelque chose de spécial pour vous ✨',
        cardNotFound: '😢 Carte non trouvée',
        linkExpired: 'Le lien peut avoir expiré ou être incorrect.',
        createOwn: 'Créer ma propre carte',
        withLoveFrom: 'Avec amour',

        // Toasts
        imageSelected: '🖼️ Image sélectionnée',
        musicPlaying: '🎵 Musique du Nouvel An active',
        musicPaused: '🔇 Musique en pause',
        linkCopied: 'Lien copié! 📋',
        blessingsMsg: 'que cette Nouvelle Année remplisse votre vie de bénédictions',
        dear: 'Cher/Chère',
        friend: 'Ami/e',
        personalize: '🎁 Personnaliser',

        // Footer
        madeWithLove: 'Fait avec ❤️ et esprit festif 🎆',

        // Language switch
        switchTo: 'Français'
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
        const nextLang = {
            'es': 'en',
            'en': 'pt',
            'pt': 'fr',
            'fr': 'es'
        };
        const newLang = nextLang[this.currentLang] || 'es';
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
            const labels = {
                'es': '🇺🇸 EN',
                'en': '🇵🇹 PT',
                'pt': '🇫🇷 FR',
                'fr': '🇪🇸 ES'
            };
            const nextLang = {
                'es': 'en',
                'en': 'pt',
                'pt': 'fr',
                'fr': 'es'
            };
            langBtn.textContent = labels[this.currentLang] || '🇺🇸 EN';
            // Store next lang for click handler to use indirectly or we rely on toggleLanguage logic
        }

        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    }

    // Render language toggle button
    renderToggle(containerId = null) {
        const btn = document.createElement('button');
        btn.id = 'langToggle';
        btn.className = 'lang-toggle';
        btn.textContent = '🌐'; // Initial placeholder, updated by updatePage
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
