/* ============================================
   ASSET CATALOG - Christmas Images, Audio & TTS
   ============================================ */

// Detectar base URL del sitio
const SITE_BASE_URL = window.location.hostname.includes('github.io')
    ? '/tarjetas-y-mesj'
    : '';

const CHRISTMAS_ASSETS = {
    // ==========================================
    // IMAGES BY CATEGORY (rutas absolutas)
    // ==========================================
    images: {
        backgrounds: [
            { id: 'bg_tree', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_christmas_tree_01_1766610977463.png`, name: 'Árbol Navideño' },
            { id: 'bg_landscape', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_snowy_landscape_01_1766610989803.png`, name: 'Paisaje Nevado' },
            { id: 'bg_fireplace', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_fireplace_cozy_01_1766611001968.png`, name: 'Chimenea Acogedora' },
            { id: 'bg_ornaments', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_ornaments_gold_01_1766611088630.png`, name: 'Ornamentos Dorados' },
            { id: 'bg_presents', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_presents_wrapped_01_1766611101981.png`, name: 'Regalos Envueltos' },
            { id: 'bg_cabin', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_winter_cabin_01_1766611115996.png`, name: 'Cabaña Invernal' },
            { id: 'bg_snowflakes', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_snowflakes_02_1766619937817.png`, name: 'Copos de Nieve' },
            { id: 'bg_candles', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_candles_festive_01_1766619949758.png`, name: 'Velas Festivas' },
            { id: 'bg_northpole', url: `${SITE_BASE_URL}/assets/images/christmas/backgrounds/bg_north_pole_01_1766619963317.png`, name: 'Polo Norte' }
        ],
        characters: [
            { id: 'char_santa', url: `${SITE_BASE_URL}/assets/images/christmas/characters/char_santa_claus_01_1766611024221.png`, name: 'Santa Claus' },
            { id: 'char_reindeer', url: `${SITE_BASE_URL}/assets/images/christmas/characters/char_reindeer_01_1766611127191.png`, name: 'Reno Rudolph' }
        ],
        cultural: [
            { id: 'col_christmas', url: `${SITE_BASE_URL}/assets/images/christmas/cultural/cultural_colombia_01_1766611038179.png`, name: 'Navidad Colombiana', country: 'colombia' },
            { id: 'mex_christmas', url: `${SITE_BASE_URL}/assets/images/christmas/cultural/cultural_mexico_01_1766611051018.png`, name: 'Navidad Mexicana', country: 'mexico' },
            { id: 'usa_christmas', url: `${SITE_BASE_URL}/assets/images/christmas/cultural/cultural_usa_01_1766611065384.png`, name: 'Navidad Americana', country: 'usa' }
        ],
        decorations: [
            { id: 'deco_wreath', url: `${SITE_BASE_URL}/assets/images/christmas/decorations/deco_wreath_01_1766620057833.png`, name: 'Corona Navideña' },
            { id: 'deco_bells', url: `${SITE_BASE_URL}/assets/images/christmas/decorations/deco_bells_01_1766620069720.png`, name: 'Campanas Doradas' }
        ]
    },

    // ==========================================
    // AUDIO CATALOG
    // ==========================================
    audio: {
        music: {
            colombia: [
                { id: 'col_villancicos', url: 'https://www.youtube.com/embed/gKqfHen-K_4', name: 'Villancicos Colombianos', type: 'youtube' }
            ],
            usa: [
                { id: 'usa_classics', url: 'https://www.youtube.com/embed/aAkMkVFwAoo', name: 'American Christmas Classics', type: 'youtube' }
            ],
            mexico: [
                { id: 'mex_posadas', url: 'https://www.youtube.com/embed/8yQGqXvuHrM', name: 'Villancicos Mexicanos', type: 'youtube' }
            ]
        },
        effects: [
            { id: 'sfx_bells', name: 'Campanas', emoji: '🔔' },
            { id: 'sfx_snow', name: 'Viento/Nieve', emoji: '❄️' },
            { id: 'sfx_fire', name: 'Fuego Chimenea', emoji: '🔥' },
            { id: 'sfx_sleigh', name: 'Trineo', emoji: '🛷' }
        ]
    },

    // ==========================================
    // TTS (Text-to-Speech) CONFIGURATION
    // ==========================================
    tts: {
        voices: {
            alegre: { pitch: 1.2, rate: 1.1, name: 'Alegre y Festiva' },
            solemne: { pitch: 0.9, rate: 0.9, name: 'Solemne y Espiritual' },
            comico: { pitch: 1.3, rate: 1.2, name: 'Cómica y Divertida' },
            romantico: { pitch: 0.8, rate: 0.85, name: 'Romántica y Suave' },
            motivacional: { pitch: 1.1, rate: 1.05, name: 'Motivacional y Energética' }
        },
        defaultVoice: 'alegre',
        languages: {
            es: ['es-ES', 'es-MX', 'es-CO'],
            en: ['en-US', 'en-GB']
        }
    }
};

// ============================================
// ASSET MANAGER CLASS
// ============================================
class ChristmasAssetManager {
    constructor() {
        this.assets = CHRISTMAS_ASSETS;
        this.currentImage = null;
        this.currentMusic = null;
        this.isTTSEnabled = 'speechSynthesis' in window;
    }

    // -----------------------------------------
    // IMAGE METHODS
    // -----------------------------------------
    getAllImages() {
        const all = [];
        Object.values(this.assets.images).forEach(category => {
            all.push(...category);
        });
        return all;
    }

    getImagesByCategory(category) {
        return this.assets.images[category] || [];
    }

    getRandomImage(category = null) {
        const images = category ? this.getImagesByCategory(category) : this.getAllImages();
        return images[Math.floor(Math.random() * images.length)];
    }

    getImageByCountry(country) {
        return this.assets.images.cultural.find(img => img.country === country);
    }

    // -----------------------------------------
    // AUDIO METHODS
    // -----------------------------------------
    getMusicByCountry(country) {
        return this.assets.audio.music[country] || this.assets.audio.music.usa;
    }

    // -----------------------------------------
    // TTS METHODS (Web Speech API)
    // -----------------------------------------
    speak(text, personality = 'alegre') {
        if (!this.isTTSEnabled) {
            console.warn('TTS not supported in this browser');
            return false;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voiceConfig = this.assets.tts.voices[personality] || this.assets.tts.voices.alegre;

        // Configure voice
        utterance.pitch = voiceConfig.pitch;
        utterance.rate = voiceConfig.rate;
        utterance.lang = 'es-ES'; // Spanish by default

        // Try to get a Spanish voice
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang.startsWith('es'));
        if (spanishVoice) {
            utterance.voice = spanishVoice;
        }

        window.speechSynthesis.speak(utterance);
        return true;
    }

    stopSpeaking() {
        if (this.isTTSEnabled) {
            window.speechSynthesis.cancel();
        }
    }

    getVoiceOptions() {
        return Object.entries(this.assets.tts.voices).map(([key, config]) => ({
            id: key,
            name: config.name
        }));
    }

    // -----------------------------------------
    // RENDER IMAGE GALLERY
    // -----------------------------------------
    renderImageGallery(containerId, onSelect = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const images = this.getAllImages();
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;">
                ${images.map(img => `
                    <div class="gallery-item" data-img-id="${img.id}" style="
                        cursor: pointer;
                        border-radius: 10px;
                        overflow: hidden;
                        border: 3px solid transparent;
                        transition: all 0.3s ease;
                    " onclick="window.assetManager.selectImage('${img.id}', this${onSelect ? `, ${onSelect}` : ''})">
                        <img src="${img.url}" alt="${img.name}" style="
                            width: 100%;
                            height: 100px;
                            object-fit: cover;
                        ">
                        <div style="
                            padding: 8px;
                            font-size: 0.75rem;
                            text-align: center;
                            background: rgba(0,0,0,0.7);
                            color: #fff;
                        ">${img.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    selectImage(imageId, element, callback = null) {
        // Remove previous selection
        document.querySelectorAll('.gallery-item').forEach(el => {
            el.style.borderColor = 'transparent';
        });

        // Mark selected
        if (element) {
            element.style.borderColor = '#FFD700';
        }

        this.currentImage = this.getAllImages().find(img => img.id === imageId);

        if (callback && typeof callback === 'function') {
            callback(this.currentImage);
        }

        console.log('🖼️ Selected image:', this.currentImage);
        return this.currentImage;
    }

    // -----------------------------------------
    // RENDER VOICE SELECTOR
    // -----------------------------------------
    renderVoiceSelector(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const voices = this.getVoiceOptions();
        container.innerHTML = `
            <label style="color: #fff; margin-bottom: 10px; display: block;">🎤 Personalidad de Voz</label>
            <select id="voiceSelect" style="
                width: 100%;
                padding: 12px;
                border-radius: 10px;
                background: rgba(0,0,0,0.5);
                color: #fff;
                border: 2px solid rgba(255,255,255,0.2);
            ">
                ${voices.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
            </select>
            <button onclick="window.assetManager.testVoice()" style="
                margin-top: 10px;
                padding: 10px 20px;
                background: linear-gradient(45deg, #FFD700, #ff6b6b);
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
            ">🔊 Probar Voz</button>
        `;
    }

    testVoice() {
        const select = document.getElementById('voiceSelect');
        const personality = select ? select.value : 'alegre';
        this.speak('¡Feliz Navidad! Este es un ejemplo de cómo sonará tu mensaje.', personality);
    }
}

// Create global instance
window.assetManager = new ChristmasAssetManager();

console.log('🎄 Christmas Asset Manager loaded. Use window.assetManager');
console.log(`   📸 ${window.assetManager.getAllImages().length} images available`);
console.log(`   🎤 TTS ${window.assetManager.isTTSEnabled ? 'available' : 'not available'}`);
