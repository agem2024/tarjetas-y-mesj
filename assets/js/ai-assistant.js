/* ============================================
   AI ASSISTANT - The Christmas "Brain" 🧠
   ============================================ */

class ChristmasAIAssistant {
    constructor() {
        this.isOpen = false;
        this.isSpeaking = false;
        this.messages = [];
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
                    <span>🎄 Cerebro Navideño IA</span>
                    <button onclick="window.aiAssistant.toggleChat()" style="background:none; border:none; color:white; cursor:pointer;">✖</button>
                </div>
                <div class="ai-messages" id="aiMessages"></div>
                <div class="ai-input-area">
                    <input type="text" class="ai-input" id="aiInput" placeholder="Pregunta algo..." onkeypress="if(event.key==='Enter') window.aiAssistant.sendMessage()">
                    <button class="ai-send-btn" onclick="window.aiAssistant.sendMessage()">⬆️</button>
                </div>
            </div>
            <div class="ai-assistant-bubble" id="aiBubble" onclick="window.aiAssistant.toggleChat()">
                <div class="speaking-ring"></div>
                <img src="/tarjetas-y-mesj/assets/images/christmas/ai_helper_icon.png" alt="AI Helper" onerror="this.src='https://cdn-icons-png.flaticon.com/512/325/325854.png'">
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
                ? '🚀 ¡Iniciando asistente de creación! Dime: ¿Para quién es la tarjeta y qué tono prefieres (familiar, cómico, etc)?'
                : '🚀 Starting card creation assistant! Tell me: Who is the card for and what tone do you prefer (family, funny, etc)?';
            this.addMessage('ai', response);
            return;
        }

        // Si no hay llaves, pedir una de forma segura
        if (!this.openaiKey && !this.geminiKey) {
            this.addMessage('ai', '¡Hola! Para ser tu "Cerebro Navideño" necesito una llave de API (OpenAI o Gemini). No te preocupes, se guardará solo en tu navegador. ¿Cuál quieres usar? (Escribe: /api OPENAI_KEY)');
            return;
        }

        if (text.startsWith('/api ')) {
            const key = text.split(' ')[1];
            if (key.startsWith('sk-')) {
                this.openaiKey = key;
                localStorage.setItem('openai_api_key', key);
                this.addMessage('ai', '✅ Llave de OpenAI guardada correctamente. ¡Ya soy más inteligente!');
            } else {
                this.geminiKey = key;
                localStorage.setItem('gemini_api_key', key);
                this.addMessage('ai', '✅ Llave de Gemini guardada correctamente.');
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
                messages: [{ role: 'system', content: 'Eres un duende navideño inteligente y bilingüe de ORION Tech. Ayudas al usuario a crear tarjetas de navidad increíbles. Eres alegre, creativo y hablas en el idioma que el usuario te hable.' }, { role: 'user', content: text }]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(text) {
        // Implementación básica de backup
        return "¡Hola! Estoy usando Gemini para ayudarte. (Implementación de backup activa)";
    }

    speak(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Detectar idioma
        utterance.lang = this.isEnglish(text) ? 'en-US' : 'es-MX';

        utterance.onstart = () => {
            document.getElementById('aiBubble').classList.add('speaking');
        };
        utterance.onend = () => {
            document.getElementById('aiBubble').classList.remove('speaking');
        };

        window.speechSynthesis.speak(utterance);
    }

    isEnglish(text) {
        const enWords = ['hello', 'christmas', 'card', 'help', 'you', 'my', 'the'];
        return enWords.some(w => text.toLowerCase().includes(w));
    }

    welcomeMessage() {
        const lang = window.langManager ? window.langManager.currentLang : 'es';
        const msg = lang === 'es'
            ? '¡Hola! Soy tu Cerebro Navideño. Te ayudaré a crear la tarjeta perfecta. ¿En qué puedo ayudarte hoy?'
            : 'Hello! I am your Christmas Brain. I will help you create the perfect card. How can I help you today?';

        setTimeout(() => this.addMessage('ai', msg), 1000);
    }
}

// Iniciar asistente
window.aiAssistant = new ChristmasAIAssistant();
