# 🎄 Generador de Tarjetas Navideñas con IA

Crea y envía tarjetas navideñas personalizadas con inteligencia artificial (Gemini/OpenAI).

## ✨ Características

- 🤖 **Switch Gemini/OpenAI** - Elige qué IA genera tu mensaje
- 🎨 **Generación de imágenes** - DALL-E crea imágenes navideñas únicas
- 📱 **URLs compartibles** - Cada tarjeta tiene su link único
- 🇨🇴🇺🇸🇲🇽 **Múltiples países** - Colombia, USA, México
- 📎 **Adjuntar archivos** - Incluye fotos y videos
- ✉️ **Efecto sobre animado** - Experiencia premium al abrir

## 🚀 Deploy

### Frontend (GitHub Pages)
```bash
git push origin main
# Activar GitHub Pages en Settings > Pages
```

### Backend (Railway/Render)
1. Conecta el repo a Railway/Render
2. Set root directory: `api/`
3. Configura variables de entorno:
   - `GEMINI_KEY`
   - `GEMINI_KEY_BACKUP`
   - `OPENAI_API_KEY`
   - `FRONTEND_URL`

## 🛠️ Desarrollo Local

```bash
# Backend
cd api
npm install
npm run dev

# Frontend
# Abre con Live Server o cualquier servidor HTTP
```

## 📁 Estructura

```
festividades-navidenas/
├── api/
│   ├── server.js      # Backend Express
│   ├── package.json
│   └── .env
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── ai-generator.js  # Cliente IA
│   └── images/
├── colombia/
├── usa/
├── mexico/
├── card-viewer.html   # Visor de tarjetas
└── index.html
```

---
Powered by **ORION Tech** 🚀
