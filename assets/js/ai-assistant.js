/* ============================================
   AI ASSISTANT - Nelson, the Christmas Brain 🧠
   ============================================ */

class ChristmasAIAssistant {
    constructor() {
        this.name = 'Nelson';
        this.isOpen = false;
        this.isSpeaking = false;
        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.geminiKey = localStorage.getItem('gemini_api_key') || '';
        this.init();
    }

    init() {
        this.createUI();
        this.welcomeMessage();
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'ai-assistant-container';
        container.innerHTML = `
            <div class="ai-chat-window" id="aiChatWindow">
                <div class="ai-chat-header">
                    <span>🎄 ${this.name}, tu Cerebro Navideño</span>
                    <button onclick="window.aiAssistant.toggleChat()" style="background:none; border:none; color:white; cursor:pointer;">✖</button>
                </div>
                <div class="ai-messages" id="aiMessages"></div>
                <div class="ai-input-area">
                    <input type="text" class="ai-input" id="aiInput" placeholder="Pregúntale a Nelson..." onkeypress="if(event.key==='Enter') window.aiAssistant.sendMessage()">
                    <button class="ai-send-btn" onclick="window.aiAssistant.sendMessage()">⬆️</button>
                </div>
            </div>
            <div class="ai-assistant-bubble" id="aiBubble" onclick="window.aiAssistant.toggleChat()">
                <div class="speaking-ring"></div>
                <img src="/tarjetas-y-mesj/assets/images/christmas/ai_helper_icon.png" alt="Nelson AI" onerror="this.src='https://cdn-icons-png.flaticon.com/512/325/325854.png'">
            </div>
        `;
        document.body.appendChild(container);
    }

    toggleChat() {
        const win = document.getElementById('aiChatWindow');
        this.isOpen = !this.isOpen;
        win.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) document.getElementById('aiInput').focus();
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        input.value = '';

        // COMANDO ESPECIAL /tjnav
        if (text.toLowerCase() === '/tjnav') {
            const lang = window.langManager ? window.langManager.currentLang : 'es';
            const response = lang === 'es'
                ? `🚀 ¡Hola! Soy ${this.name}. Iniciando asistente de creación. Dime: ¿Para quién es la tarjeta y qué tono prefieres?`
                : `🚀 Hello! I'm ${this.name}. Starting card creation! Tell me: Who's the card for and what tone do you prefer?`;
            this.addMessage('ai', response);
            return;
        }

        // Si no hay llaves, pedir una de forma segura
        if (!this.openaiKey && !this.geminiKey) {
            this.addMessage('ai', '¡Hola! Para ser tu "Cerebro Navideño" necesito una llave de API (OpenAI o Gemini). No te preocupes, se guardará solo en tu navegador. ¿Cuál quieres usar? (Escribe: /api TU_LLAVE)');
            return;
        }

        // COMANDO /api
        if (text.startsWith('/api ')) {
            const key = text.split(' ')[1];
            if (key.startsWith('sk-')) {
                this.openaiKey = key;
                localStorage.setItem('openai_api_key', key);
                this.addMessage('ai', '✅ Llave de OpenAI guardada. ¡Nelson es ahora más inteligente!');
            } else {
                this.geminiKey = key;
                localStorage.setItem('gemini_api_key', key);
                this.addMessage('ai', '✅ Llave de Gemini guardada.');
            }
            return;
        }

        this.getAIResponse(text);
    }

    addMessage(role, text) {
        const container = document.getElementById('aiMessages');
        const div = document.createElement('div');
        div.className = `message ${role}`;
        div.textContent = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;

        if (role === 'ai') this.speak(text);
    }

    async getAIResponse(userText) {
        this.addMessage('ai', 'Pensando... 🕯️');
        const lastMsg = document.getElementById('aiMessages').lastChild;

        try {
            let response;
            if (this.openaiKey) {
                response = await this.callOpenAI(userText);
            } else if (this.geminiKey) {
                response = await this.callGemini(userText);
            } else {
                response = "¡Hola! Soy Nelson. Para ayudarte mejor, necesito mi 'llave mágica' (API Key). Escribe: /api TU_LLAVE";
            }

            lastMsg.textContent = response;
            this.speak(response);
        } catch (error) {
            lastMsg.textContent = 'Huy, tuve un pequeño corto navideño. Inténtalo de nuevo.';
            console.error(error);
        }
    }

    async callOpenAI(text) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: `Eres Nelson, un asistente navideño afable, amable y experto de ORION Tech. Siempre te presentas como Nelson. No deletrees nombres. Ayudas a crear tarjetas increíbles. Tono masculino, profesional y muy cálido.` },
                    { role: 'user', content: text }
                ]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(text) {
        return `¡Hola! Aquí Nelson usando mi cerebro de respaldo (Gemini). ¿En qué te ayudo?`;
    }

    speak(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        // Limpiar texto para evitar deletreos si hay puntos extra o formatos raros
        const cleanText = text.replace(/([A-Z])\.([A-Z])\./g, '$1$2').replace(/\s+/g, ' ');

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Configuración de voz masculina y afable (fallback local)
        utterance.pitch = 0.9; // Un poco más grave para que suene masculino
        utterance.rate = 0.95; // Un poco más pausado para ser amable

        // Detectar idioma
        const lang = this.isEnglish(cleanText) ? 'en-US' : 'es-MX';
        utterance.lang = lang;

        // Intentar encontrar una voz masculina
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.lang.startsWith(lang.split('-')[0]) &&
            (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('man'))
        ) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => {
            document.getElementById('aiBubble').classList.add('speaking');
        };
        utterance.onend = () => {
            document.getElementById('aiBubble').classList.remove('speaking');
        };

        window.speechSynthesis.speak(utterance);
    }

    isEnglish(text) {
        const enWords = ['hello', 'christmas', 'card', 'help', 'you', 'my', 'the', 'i am', 'how'];
        return enWords.some(w => text.toLowerCase().includes(w));
    }

    welcomeMessage() {
        const lang = window.langManager ? window.langManager.currentLang : 'es';
        const msg = lang === 'es'
            ? `¡Hola! Soy Nelson, tu Cerebro Navideño. Estoy aquí para que tus tarjetas sean espectaculares. ¿Qué vamos a crear hoy?`
            : `Hello! I'm Nelson, your Christmas Brain. I'm here to make your cards spectacular. What shall we create today?`;

        setTimeout(() => this.addMessage('ai', msg), 1500);
    }
}

// Iniciar asistente
window.aiAssistant = new ChristmasAIAssistant();
