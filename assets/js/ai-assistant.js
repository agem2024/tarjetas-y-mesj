/* ============================================
   AI ASSISTANT - Nelson, the Christmas Brain 🧔
   ============================================ */

class ChristmasAIAssistant {
    constructor() {
        this.name = 'Nelson';
        this.isOpen = false;
        this.isSpeaking = false;

        // Memoria de conversación persistente (historia corta)
        const savedHistory = localStorage.getItem('nelson_chat_history');
        this.chatHistory = savedHistory ? JSON.parse(savedHistory) : [];

        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.geminiKey = localStorage.getItem('gemini_api_key') || '';

        // Idioma inicial: Nelson saluda en Inglés por defecto si no hay preferencia guardada
        this.currentLang = localStorage.getItem('christmas_lang') || 'en';

        this.init();
    }

    init() {
        this.createUI();
        this.welcomeMessage();

        // Escuchar cambios de idioma globales
        window.addEventListener('languageChanged', (e) => {
            const oldLang = this.currentLang;
            this.currentLang = e.detail.lang;
            localStorage.setItem('christmas_lang', this.currentLang);
            // Si el idioma cambia y el chat está vacío o el último mensaje no es un saludo, saludar de nuevo
            if (oldLang !== this.currentLang && this.chatHistory.length === 0) {
                this.welcomeMessage(true); // Forzar saludo
            }
            // Actualizar textos de UI si es necesario (ej. placeholder)
            const input = document.getElementById('aiInput');
            if (input) {
                input.placeholder = this.currentLang === 'es' ? 'Pregúntale a Nelson...' : 'Ask Nelson...';
            }
            const headerSpan = document.querySelector('.ai-chat-header span');
            if (headerSpan) {
                headerSpan.innerHTML = this.currentLang === 'es'
                    ? `🎄 ${this.name}, tu Cerebro Navideño`
                    : `🎄 ${this.name}, your Christmas Brain`;
            }
        });

        // Forzar carga de voces para que Nelson hable desde el primer segundo
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
            }
        }
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'ai-assistant-container';
        const headerText = this.currentLang === 'es'
            ? `🎄 ${this.name}, tu Cerebro Navideño`
            : `🎄 ${this.name}, your Christmas Brain`;
        const placeholderText = this.currentLang === 'es'
            ? 'Pregúntale a Nelson...'
            : 'Ask Nelson...';

        container.innerHTML = `
            <div class="ai-chat-window" id="aiChatWindow">
                <div class="ai-chat-header">
                    <span>${headerText}</span>
                    <button onclick="window.aiAssistant.toggleChat()" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;">✖</button>
                </div>
                <div class="ai-messages" id="aiMessages"></div>
                <div class="ai-input-area">
                    <input type="text" class="ai-input" id="aiInput" placeholder="${placeholderText}" onkeypress="if(event.key==='Enter') window.aiAssistant.sendMessage()">
                    <button class="ai-send-btn" onclick="window.aiAssistant.sendMessage()">⬆️</button>
                </div>
            </div>
            <div class="ai-assistant-bubble" id="aiBubble" onclick="window.aiAssistant.toggleChat()">
                <div class="speaking-ring"></div>
                <img src="${this.getIconPath()}" alt="Nelson AI" onerror="this.src='https://cdn-icons-png.flaticon.com/512/325/325854.png'">
            </div>
        `;
        document.body.appendChild(container);

        // Cargar mensajes guardados en la UI
        this.chatHistory.forEach(msg => this.renderMessage(msg.role, msg.text, false)); // Don't speak old messages
    }

    toggleChat() {
        const win = document.getElementById('aiChatWindow');
        this.isOpen = !this.isOpen;
        win.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            document.getElementById('aiInput').focus();
            const container = document.getElementById('aiMessages');
            container.scrollTop = container.scrollHeight;
        }
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        input.value = '';

        // COMANDOS ESPECIALES
        if (text.toLowerCase() === '/tjnav') {
            const response = this.currentLang === 'es'
                ? `🚀 ¡Hola! Soy ${this.name}. Iniciando asistente de creación. Dime: ¿Para quién es la tarjeta?`
                : `🚀 Hello! I'm ${this.name}. Starting card assistant. Who's the card for?`;
            this.addMessage('ai', response);
            return;
        }

        if (text.startsWith('/api ')) {
            const key = text.split(' ')[1];
            if (key.startsWith('sk-')) {
                this.openaiKey = key;
                localStorage.setItem('openai_api_key', key);
                this.addMessage('ai', '✅ OpenAI key saved. Nelson is now wiser!');
            } else {
                this.geminiKey = key;
                localStorage.setItem('gemini_api_key', key);
                this.addMessage('ai', '✅ Gemini key saved.');
            }
            return;
        }

        this.getAIResponse(text);
    }

    addMessage(role, text, speak = true) {
        this.chatHistory.push({ role, text });
        if (this.chatHistory.length > 20) this.chatHistory.shift(); // Max 20 mensajes de memoria
        localStorage.setItem('nelson_chat_history', JSON.stringify(this.chatHistory));
        this.renderMessage(role, text, speak);
    }

    renderMessage(role, text, speak) {
        const container = document.getElementById('aiMessages');
        if (!container) return;
        const div = document.createElement('div');
        div.className = `message ${role}`;
        div.textContent = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;

        if (role === 'ai' && speak) this.speak(text);
    }

    async getAIResponse(userText) {
        // Add a placeholder message to the UI and memory
        this.addMessage('ai', this.currentLang === 'es' ? 'Pensando... 🕯️' : 'Thinking... 🕯️', false);
        const lastMsgDiv = document.getElementById('aiMessages').lastChild;

        try {
            let response;
            if (this.openaiKey) {
                response = await this.callOpenAI(userText);
            } else if (this.geminiKey) {
                response = await this.callGemini(userText);
            } else {
                response = this.currentLang === 'es'
                    ? `¡Hola! Soy ${this.name}. Necesito mi 'llave mágica' (API Key). Escribe: /api TU_LLAVE`
                    : `Hi! I'm ${this.name}. I need my 'magic key' (API Key). Type: /api YOUR_KEY`;
            }

            // Update the placeholder message in the UI
            lastMsgDiv.textContent = response;
            // Update the placeholder message in memory
            this.chatHistory[this.chatHistory.length - 1].text = response;
            localStorage.setItem('nelson_chat_history', JSON.stringify(this.chatHistory));

            this.speak(response);
        } catch (error) {
            lastMsgDiv.textContent = this.currentLang === 'es'
                ? 'Huy, tuve un pequeño corto navideño. Inténtalo de nuevo.'
                : 'Oops, Nelson had a little Christmas short-circuit. Try again!';
            // Update memory with error message
            this.chatHistory[this.chatHistory.length - 1].text = lastMsgDiv.textContent;
            localStorage.setItem('nelson_chat_history', JSON.stringify(this.chatHistory));
            console.error(error);
        }
    }

    async callOpenAI(text) {
        const pageContext = window.location.pathname;
        // Use a more concise history for the prompt to avoid exceeding token limits
        const historyForPrompt = this.chatHistory.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n');

        const messages = [
            {
                role: 'system', content: `You are Nelson, an affable, kind, and expert Christmas assistant from ORION Tech. 
            You are currently on the page: ${pageContext}. 
            You always introduce yourself as Nelson. 
            NEVER spell your name (N-E-L-S-O-N), say it naturally. 
            Tone: Male, professional, charismatic. 
            Current language preference: ${this.currentLang}. Respond in this language unless explicitly asked otherwise.
            Conversation history: ${historyForPrompt}`
            },
            { role: 'user', content: text }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messages
            })
        });
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('Invalid response from OpenAI API');
        }
    }

    async callGemini(text) {
        return this.currentLang === 'es'
            ? `¡Hola! Aquí Nelson usando mi cerebro de respaldo (Gemini). ¿En qué te ayudo?`
            : `Hello! Nelson here using my backup brain (Gemini). How can I help?`;
    }

    speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        // Limpieza para evitar deletreo (reemplazar puntos seguidos de letras)
        const cleanText = text.replace(/([A-Z])\.([A-Z])\./g, '$1$2');
        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Configuración Masculina
        utterance.pitch = 0.9;
        utterance.rate = 0.95;

        const lang = this.currentLang === 'es' ? 'es-MX' : 'en-US';
        utterance.lang = lang;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.lang.startsWith(lang.split('-')[0]) &&
            (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('guy'))
        ) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => document.getElementById('aiBubble').classList.add('speaking');
        utterance.onend = () => document.getElementById('aiBubble').classList.remove('speaking');

        window.speechSynthesis.speak(utterance);
    }

    // This method is no longer strictly needed if currentLang is managed by LangManager
    // but kept for robustness or if LangManager isn't present.
    isEnglish(text) {
        const enWords = ['hello', 'christmas', 'card', 'help', 'you', 'my', 'the', 'i am', 'hi', 'nelson'];
        return enWords.some(w => text.toLowerCase().includes(w));
    }

    welcomeMessage(force = false) {
        // Solo saludar si el chat está vacío o si se fuerza el saludo (ej. cambio de idioma)
        if (this.chatHistory.length > 0 && !force) return;

        const msg = this.currentLang === 'es'
            ? `¡Hola! Soy Nelson, tu Cerebro Navideño. He llegado para ayudarte en esta página. ¿Qué vamos a crear hoy?`
            : `Hello! I'm Nelson, your Christmas Brain. I've arrived to help you on this page. What shall we create today?`;

        setTimeout(() => this.addMessage('ai', msg), 2000);
    }

    getIconPath() {
        // Detectar si estamos en una subcarpeta (ej: /colombia/) o en la raíz
        const isSubfolder = window.location.pathname.includes('/colombia/') ||
            window.location.pathname.includes('/usa/') ||
            window.location.pathname.includes('/mexico/');
        const base = isSubfolder ? '../' : '';
        return `${base}assets/images/christmas/ai_helper_icon.png`;
    }
}

// Iniciar asistente
window.aiAssistant = new ChristmasAIAssistant();
