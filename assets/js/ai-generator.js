/* ============================================
   AI CARD GENERATOR - Frontend Integration
   Switch entre Gemini y OpenAI + Generación de imágenes
   ============================================ */

class AICardGenerator {
    constructor() {
        // Detectar API URL (local vs producción)
        this.apiUrl = this.detectApiUrl();
        this.provider = 'gemini'; // 'gemini' o 'openai'
        this.isGenerating = false;
    }

    detectApiUrl() {
        // Si estamos en GitHub Pages, usar Railway/Render
        if (window.location.hostname.includes('github.io')) {
            return 'https://christmas-cards-api.railway.app'; // Cambiar después del deploy
        }
        // Local development
        return 'http://localhost:3001';
    }

    setProvider(provider) {
        this.provider = provider;
        console.log(`🤖 AI Provider switched to: ${provider}`);
    }

    async checkHealth() {
        try {
            const response = await fetch(`${this.apiUrl}/api/health`);
            const data = await response.json();
            console.log('🏥 API Health:', data);
            return data;
        } catch (error) {
            console.error('❌ API not reachable:', error);
            return null;
        }
    }

    async generateMessage(params) {
        const { nombre, pais, tema, genero, contexto } = params;

        if (this.isGenerating) {
            console.warn('⏳ Already generating...');
            return null;
        }

        this.isGenerating = true;
        this.showLoadingState('Generando mensaje con IA...');

        try {
            const response = await fetch(`${this.apiUrl}/api/generate-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    pais,
                    tema,
                    genero,
                    contexto,
                    provider: this.provider
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Message generated:', data);
                return data.message;
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('❌ Error generating message:', error);
            // Fallback a mensaje local
            return this.getFallbackMessage(nombre, tema);
        } finally {
            this.isGenerating = false;
            this.hideLoadingState();
        }
    }

    async generateImage(params) {
        const { pais, nombre, customPrompt } = params;

        this.showLoadingState('Generando imagen navideña con IA...');

        try {
            const response = await fetch(`${this.apiUrl}/api/generate-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pais,
                    nombre,
                    customPrompt,
                    provider: 'openai' // Solo OpenAI tiene DALL-E
                })
            });

            const data = await response.json();

            if (data.success && data.imageUrl) {
                console.log('✅ Image generated:', data.imageUrl);
                return data.imageUrl;
            } else {
                // Usar fallback
                return data.fallbackUrl || this.getFallbackImage(pais);
            }
        } catch (error) {
            console.error('❌ Error generating image:', error);
            return this.getFallbackImage(pais);
        } finally {
            this.hideLoadingState();
        }
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${this.apiUrl}/api/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            return data.success ? data.url : null;
        } catch (error) {
            console.error('❌ Error uploading file:', error);
            return null;
        }
    }

    async saveCard(cardData) {
        try {
            const response = await fetch(`${this.apiUrl}/api/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cardData)
            });

            const data = await response.json();
            return data.success ? data : null;
        } catch (error) {
            console.error('❌ Error saving card:', error);
            // Fallback a localStorage
            return this.saveCardLocal(cardData);
        }
    }

    async getCard(id) {
        try {
            const response = await fetch(`${this.apiUrl}/api/cards/${id}`);
            const data = await response.json();
            return data.success ? data.card : null;
        } catch (error) {
            // Intentar desde localStorage
            return this.getCardLocal(id);
        }
    }

    // ============================================
    // FALLBACKS LOCALES
    // ============================================
    getFallbackMessage(nombre, tema) {
        const messages = {
            comico: `¡Ey ${nombre}! 🎅 Que Santa te traiga todo lo que pediste... y perdón si no le llegó tu carta porque la usé para envolver regalos 😂 ¡Feliz Navidad y próspero 2025!`,
            familiar: `Querido/a ${nombre}, en esta Navidad quiero que sepas lo especial que eres. Que la magia de estas fiestas llene tu hogar de amor y bendiciones. ¡Feliz Navidad y un 2025 lleno de éxitos!`,
            amoroso: `Mi amor ${nombre}, eres el regalo más hermoso que la vida me ha dado. Que esta Navidad sea solo el comienzo de muchas más juntos. Te amo hoy, mañana y siempre. ¡Feliz Navidad! ❤️`,
            motivacional: `¡${nombre}, eres increíble! 💪 Este 2024 lo diste todo, y el 2025 será TU año. Que esta Navidad te llene de energía para conquistar todos tus sueños. ¡Arriba siempre!`,
            espiritual: `${nombre}, que el niño Jesús nazca en tu corazón esta Nochebuena. Que Dios bendiga cada paso que des el próximo año. ¡Paz, amor y fe! 🙏✨`
        };
        return messages[tema] || messages.familiar;
    }

    getFallbackImage(pais) {
        const images = {
            colombia: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800',
            usa: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800',
            mexico: 'https://images.unsplash.com/photo-1545622783-b3e021430fee?w=800'
        };
        return images[pais] || images.colombia;
    }

    saveCardLocal(cardData) {
        const id = Math.random().toString(36).substr(2, 8);
        const card = { ...cardData, id, createdAt: new Date().toISOString() };
        const cards = JSON.parse(localStorage.getItem('christmasCards') || '{}');
        cards[id] = card;
        localStorage.setItem('christmasCards', JSON.stringify(cards));
        return { success: true, card, shareUrl: `${window.location.origin}/card-viewer.html?id=${id}` };
    }

    getCardLocal(id) {
        const cards = JSON.parse(localStorage.getItem('christmasCards') || '{}');
        return cards[id] || null;
    }

    // ============================================
    // UI HELPERS
    // ============================================
    showLoadingState(message) {
        let loader = document.getElementById('aiLoader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'aiLoader';
            loader.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: #FFD700;
                padding: 30px 50px;
                border-radius: 20px;
                border: 2px solid #FFD700;
                z-index: 10000;
                text-align: center;
                font-size: 1.1rem;
                backdrop-filter: blur(10px);
            `;
            document.body.appendChild(loader);
        }
        loader.innerHTML = `
            <div style="font-size: 3rem; animation: pulse 1s infinite;">🎄</div>
            <p style="margin-top: 15px;">${message}</p>
            <div style="margin-top: 10px;">
                <span style="animation: blink 0.5s infinite;">•</span>
                <span style="animation: blink 0.5s infinite 0.2s;">•</span>
                <span style="animation: blink 0.5s infinite 0.4s;">•</span>
            </div>
        `;
        loader.style.display = 'block';
    }

    hideLoadingState() {
        const loader = document.getElementById('aiLoader');
        if (loader) loader.style.display = 'none';
    }
}

// Crear instancia global
window.aiCardGenerator = new AICardGenerator();

// Estilos de animación
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
</style>
`);

console.log('🎄 AI Card Generator loaded. Use window.aiCardGenerator');
