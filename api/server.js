require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', process.env.FRONTEND_URL, 'https://agem2024.github.io'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Crear carpeta uploads si no existe
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('./cards')) fs.mkdirSync('./cards');

// Multer para subir archivos
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB max

// ============================================
// API KEYS ROTATION SYSTEM (Copiado de ORION)
// ============================================
const GEMINI_KEYS = [
    process.env.GEMINI_KEY,
    process.env.GEMINI_KEY_BACKUP
].filter(Boolean);

const OPENAI_KEY = process.env.OPENAI_API_KEY;

let currentGeminiKeyIndex = 0;
console.log(`🔑 Loaded ${GEMINI_KEYS.length} Gemini Keys + ${OPENAI_KEY ? '1 OpenAI Key' : 'No OpenAI'}`);

function getGeminiAI() {
    const key = GEMINI_KEYS[currentGeminiKeyIndex];
    return new GoogleGenerativeAI(key);
}

function rotateGeminiKey() {
    currentGeminiKeyIndex = (currentGeminiKeyIndex + 1) % GEMINI_KEYS.length;
    console.log(`🔄 Rotating to Gemini Key ${currentGeminiKeyIndex}`);
}

const openai = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

// ============================================
// STORAGE DE TARJETAS
// ============================================
const cardsDB = {};

function saveCard(card) {
    cardsDB[card.id] = card;
    // Persistir en archivo
    fs.writeFileSync(`./cards/${card.id}.json`, JSON.stringify(card, null, 2));
    return card;
}

function getCard(id) {
    if (cardsDB[id]) return cardsDB[id];
    const filePath = `./cards/${id}.json`;
    if (fs.existsSync(filePath)) {
        cardsDB[id] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return cardsDB[id];
    }
    return null;
}

// ============================================
// PROMPTS NAVIDEÑOS
// ============================================
const CHRISTMAS_PROMPTS = {
    colombia: {
        system: `Eres un experto en tradiciones navideñas colombianas. Escribe mensajes cálidos y emotivos que incluyan referencias a:
- Día de las Velitas (7 de diciembre)
- Novena de Aguinaldos
- Buñuelos, natilla, hojuelas
- Villancicos colombianos
- El calor familiar típico colombiano
Usa español colombiano natural (paisa/rolo/costeño según el tono).`,

        imagePrompts: [
            "Colombian Christmas scene with velitas candles, family gathering, warm tropical night, buñuelos and natilla on table",
            "Medellin Christmas lights alumbrado navideño, colorful illumination, festive atmosphere",
            "Traditional Colombian novena scene, family praying together, Christmas tree, villancicos"
        ]
    },
    usa: {
        system: `You are an expert in American Christmas traditions. Write warm, heartfelt messages that include references to:
- Christmas trees with ornaments
- Santa Claus and reindeer
- Snow and winter wonderland
- Eggnog and gingerbread
- Family gatherings and gift exchange
Use natural American English (California accent preferred).`,

        imagePrompts: [
            "American Christmas scene with decorated tree, snow outside window, cozy fireplace, presents underneath",
            "Classic Santa Claus with reindeer, snowy night, magical Christmas atmosphere",
            "Gingerbread house with candy decorations, eggnog cups, festive cookies"
        ]
    },
    mexico: {
        system: `Eres un experto en tradiciones navideñas mexicanas. Escribe mensajes cálidos que incluyan referencias a:
- Las Posadas (16-24 de diciembre)
- Piñatas navideñas
- Ponche caliente y champurrado
- Tamales y romeritos
- La Virgen de Guadalupe
Usa español mexicano natural y cálido.`,

        imagePrompts: [
            "Mexican posada celebration, colorful piñata, farolitos, traditional songs",
            "Mexican Christmas dinner with tamales, ponche caliente, romeritos, family together",
            "Nacimiento scene with Virgin of Guadalupe, poinsettias flores de nochebuena"
        ]
    }
};

const THEME_MODIFIERS = {
    comico: "Hazlo divertido y ligero, con humor sano. Incluye uno o dos chistes relacionados con las tradiciones.",
    familiar: "Enfócate en el amor familiar, la unión, y los recuerdos compartidos. Emotivo pero no cursi.",
    amoroso: "Escribe con romance y ternura. Para parejas que celebran su amor en Navidad.",
    motivacional: "Inspira para el nuevo año. Enfócate en logros, metas, y fuerza para superar retos.",
    espiritual: "Enfócate en la fe, bendiciones, y el significado espiritual de la Navidad."
};

// ============================================
// ENDPOINTS
// ============================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        geminiKeys: GEMINI_KEYS.length,
        openaiAvailable: !!OPENAI_KEY,
        timestamp: new Date().toISOString()
    });
});

// Generar mensaje con IA
app.post('/api/generate-message', async (req, res) => {
    try {
        const {
            nombre,
            pais = 'colombia',
            tema = 'familiar',
            genero = 'general',
            contexto = '',
            provider = 'gemini' // 'gemini' o 'openai'
        } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'Nombre es requerido' });
        }

        const countryConfig = CHRISTMAS_PROMPTS[pais] || CHRISTMAS_PROMPTS.colombia;
        const themeModifier = THEME_MODIFIERS[tema] || THEME_MODIFIERS.familiar;

        const fullPrompt = `${countryConfig.system}

TONO ESPECÍFICO: ${themeModifier}

DESTINATARIO: ${nombre}
GÉNERO: ${genero === 'mujer' ? 'Mujer' : genero === 'hombre' ? 'Hombre' : 'No especificado'}
CONTEXTO ADICIONAL DEL REMITENTE: ${contexto || 'Ninguno'}

Escribe un mensaje navideño personalizado de 3-5 oraciones. Incluye el nombre "${nombre}" naturalmente en el mensaje. 
NO uses frases genéricas como "Querido/a". Sé creativo y único.
Termina con un deseo específico para el 2025.`;

        let message = '';

        // Intentar con el provider solicitado primero
        if (provider === 'openai' && openai) {
            try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: fullPrompt }],
                    max_tokens: 300,
                    temperature: 0.8
                });
                message = completion.choices[0].message.content;
                console.log('✅ OpenAI message generated');
            } catch (error) {
                console.error('❌ OpenAI error:', error.message);
            }
        }

        // Fallback a Gemini o usar Gemini como primario
        if (!message && GEMINI_KEYS.length > 0) {
            let attempts = 0;
            while (attempts < GEMINI_KEYS.length && !message) {
                try {
                    const genAI = getGeminiAI();
                    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
                    const result = await model.generateContent(fullPrompt);
                    message = result.response.text();
                    console.log('✅ Gemini message generated');
                } catch (error) {
                    console.error(`❌ Gemini error (key ${currentGeminiKeyIndex}):`, error.message);
                    rotateGeminiKey();
                    attempts++;
                }
            }
        }

        // Si ninguna IA funcionó, mensaje de fallback
        if (!message) {
            message = `¡Feliz Navidad, ${nombre}! 🎄 Que esta temporada llene tu vida de alegría, amor y bendiciones. Que el 2025 traiga todo lo que tu corazón desea. ¡Un abrazo navideño! ✨`;
        }

        res.json({
            success: true,
            message: message.trim(),
            provider: message.includes('OpenAI') ? 'openai' : 'gemini'
        });

    } catch (error) {
        console.error('Error generating message:', error);
        res.status(500).json({ error: 'Error generando mensaje', details: error.message });
    }
});

// Generar imagen con IA
app.post('/api/generate-image', async (req, res) => {
    try {
        const {
            pais = 'colombia',
            nombre = '',
            customPrompt = '',
            provider = 'openai' // Solo OpenAI tiene DALL-E
        } = req.body;

        const countryConfig = CHRISTMAS_PROMPTS[pais] || CHRISTMAS_PROMPTS.colombia;
        const basePrompt = countryConfig.imagePrompts[Math.floor(Math.random() * countryConfig.imagePrompts.length)];

        const finalPrompt = customPrompt || `${basePrompt}, festive Christmas card style, warm lighting, vibrant colors, professional quality, 4K`;

        if (!openai) {
            return res.json({
                success: false,
                error: 'OpenAI no configurado para generación de imágenes',
                fallbackUrl: `https://picsum.photos/seed/${Date.now()}/800/600`
            });
        }

        try {
            const response = await openai.images.generate({
                model: 'dall-e-3',
                prompt: finalPrompt,
                n: 1,
                size: '1024x1024',
                quality: 'standard'
            });

            res.json({
                success: true,
                imageUrl: response.data[0].url,
                revisedPrompt: response.data[0].revised_prompt
            });
        } catch (dalleError) {
            console.error('DALL-E error:', dalleError.message);
            res.json({
                success: false,
                error: dalleError.message,
                fallbackUrl: `https://picsum.photos/seed/${Date.now()}/800/600`
            });
        }

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generando imagen' });
    }
});

// Subir archivo (imagen/video)
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({
        success: true,
        filename: req.file.filename,
        url: fileUrl,
        mimetype: req.file.mimetype
    });
});

// Crear tarjeta completa
app.post('/api/cards', async (req, res) => {
    try {
        const {
            nombre,
            pais,
            tema,
            genero,
            mensaje,
            imageUrl,
            attachments = [],
            remitente = 'Un ser querido'
        } = req.body;

        const card = {
            id: uuidv4().slice(0, 8),
            nombre,
            pais,
            tema,
            genero,
            mensaje,
            imageUrl,
            attachments,
            remitente,
            createdAt: new Date().toISOString(),
            views: 0
        };

        saveCard(card);

        res.json({
            success: true,
            card,
            shareUrl: `${process.env.FRONTEND_URL || 'http://localhost:5500'}/card-viewer.html?id=${card.id}`
        });

    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Error creating card' });
    }
});

// Obtener tarjeta por ID
app.get('/api/cards/:id', (req, res) => {
    const card = getCard(req.params.id);
    if (!card) {
        return res.status(404).json({ error: 'Tarjeta no encontrada' });
    }

    // Incrementar vistas
    card.views++;
    saveCard(card);

    res.json({ success: true, card });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🎄 Christmas Cards API running on port ${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/api/health`);
});
