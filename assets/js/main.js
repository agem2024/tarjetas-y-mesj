/* ============================================
   FESTIVIDADES NAVIDEÑAS - JAVASCRIPT v2
   Sistema de tarjetas compartibles con URL
   Menú de temáticas y música por país
   ============================================ */

// ============================================
// CONFIGURACIÓN DE MENSAJES POR TEMÁTICA
// ============================================
const christmasMessages = {
    colombia: {
        comico: [
            "¡Que los buñuelos te queden redonditos y no como los míos! 🤣",
            "Si la natilla se te quema, ¡al menos la intención cuenta! 😂",
            "Que el Niño Dios te traiga paciencia para la familia política 🙏😅",
            "¡Feliz Navidad! Y si te regalan medias, sonríe con amor... o disimula bien 🧦😂",
            "Que la rumba de diciembre no te deje más enguayabado que bendecido 🎉🤪"
        ],
        familiar: [
            "Para mi familia querida: ustedes son el mejor regalo de Navidad 🎁❤️",
            "Que esta Navidad nos una más como familia, con amor y paz en el hogar",
            "Gracias por ser mi familia. Son mi mayor bendición en esta y todas las navidades",
            "Cada velita que encendemos ilumina el amor que nos tenemos. Feliz Navidad, familia",
            "La Novena es especial porque la rezamos juntos. ¡Los amo, familia!"
        ],
        amoroso: [
            "Eres mi mejor regalo de Navidad, hoy y siempre ❤️🎄",
            "Contigo cada Navidad es mágica. Te amo más que a los buñuelos 😍",
            "Que nuestra primera/próxima Navidad juntos sea solo el comienzo 💕",
            "Eres la luz más brillante de mi Día de las Velitas ✨💖",
            "Mi corazón late al ritmo de los villancicos cuando estás cerca 🎶❤️"
        ],
        motivacional: [
            "¡Este 2025 será TU año! La Navidad marca el inicio de algo grande 🚀",
            "Que el Niño Jesús bendiga tus proyectos y los haga realidad 🙌",
            "Eres un guerrero/a. Esta Navidad recarga tu energía para conquistar el mundo 💪",
            "Los sueños se cumplen. Que esta Navidad te acerque más a los tuyos ⭐",
            "¡Pa'lante siempre! Que la Navidad te llene de fuerza y esperanza 🎄"
        ],
        espiritual: [
            "Que el Niño Jesús nazca en tu corazón esta Nochebuena 🙏✨",
            "Bendiciones infinitas para ti y los tuyos en esta Santa Navidad",
            "Que la estrella de Belén guíe tu camino hacia la paz y el amor eterno",
            "En esta Navidad, que tu fe se renueve y tu espíritu se llene de gracia",
            "Que el verdadero significado de la Navidad ilumine tu vida 🌟"
        ]
    },
    usa: {
        comico: [
            "May your Christmas be merry and your eggnog be strong! 🥛😂",
            "Hope Santa doesn't check your browser history this year 🎅🤫",
            "Wishing you a Christmas free of awkward family questions! 😅",
            "May your ugly sweater be the ugliest at the party! 🧶🏆",
            "Here's to surviving another holiday dinner with relatives! 🍷😂"
        ],
        familiar: [
            "To my beloved family: You are my greatest blessing 🎁❤️",
            "Home is wherever we're together. Merry Christmas, family!",
            "Thank you for being my family. I cherish every moment with you",
            "Our family traditions make Christmas magical. Love you all! 🎄",
            "Grateful for another Christmas surrounded by the ones I love most"
        ],
        amoroso: [
            "You're the only gift I need under my tree ❤️🎄",
            "Every Christmas with you feels like a fairy tale 💕",
            "You make my heart feel like it's Christmas every day ✨",
            "All I want for Christmas is you... literally 🎶❤️",
            "Thank you for being my forever Christmas miracle 💖"
        ],
        motivacional: [
            "2025 is YOUR year! Christmas marks the beginning of greatness 🚀",
            "You've got this! May Christmas recharge your spirit for success 💪",
            "Dream big, work hard, and believe. The best is yet to come! ⭐",
            "This Christmas, celebrate how far you've come. You're amazing! 🎉",
            "New year, new you, same unstoppable spirit! Go get 'em! 🔥"
        ],
        espiritual: [
            "May the true meaning of Christmas fill your heart with peace 🙏",
            "Wishing you blessings abundant this holy Christmas season ✨",
            "May the light of Christ guide you through the new year 🌟",
            "In this season of giving, may you receive God's infinite love",
            "Peace on Earth begins in our hearts. Merry Christmas 🕊️"
        ]
    },
    mexico: {
        comico: [
            "¡Que los tamales no te dejen en la ruina del gas! 😂",
            "Si te toca el muñequito en la Rosca, ¡corre, compadre! 🏃😅",
            "Que la piñata esté tan llena como tu panza en Nochebuena 🍬🤣",
            "¡Feliz Navidad! Y recuerda: las posadas son para rezar... y botanear 🙏🌮",
            "Que no te toque lavar los trastes de la cena. ¡Ese sí es un milagro! ✨😂"
        ],
        familiar: [
            "Para mi familia: ustedes son mi mayor tesoro 🎁❤️",
            "Que Las Posadas nos recuerden lo bendecidos que somos de tenernos",
            "La familia es el mejor regalo. Gracias por ser la mía 🙏",
            "Cada tamal que hacemos juntos tiene sabor a amor familiar",
            "Unidos en la fe y el amor. ¡Feliz Navidad, familia querida!"
        ],
        amoroso: [
            "Eres mi estrella de Belén, me guías hacia la felicidad ⭐❤️",
            "Contigo cada Posada es una fiesta y cada noche es Nochebuena 💕",
            "Eres más dulce que el ponche y más caliente que el champurrado 😍",
            "Mi corazón te pide posada para siempre 🎶❤️",
            "Eres el regalo que no sabía que necesitaba. Te amo 💖"
        ],
        motivacional: [
            "¡Arriba, México! Y arriba tú también. 2025 es tuyo 🚀",
            "Eres más fuerte que un tequila en ayunas. ¡Tú puedes! 💪",
            "Que la Virgencita bendiga tus proyectos y los haga florecer 🙌",
            "Los mexicanos no nos rajamos. Este año vas con todo 🔥",
            "Échale ganas, mijo/a. El éxito te espera el próximo año ⭐"
        ],
        espiritual: [
            "Que la Virgen de Guadalupe te cubra con su manto sagrado 🙏",
            "En esta Navidad, que tu fe en Dios se fortalezca cada día",
            "Bendiciones del cielo para ti y toda tu familia 🌟",
            "Que el Niño Jesús traiga paz a tu hogar y amor a tu corazón",
            "Con fe todo es posible. ¡Feliz y bendecida Navidad! ✨"
        ]
    }
};

// ============================================
// URLs de música navideña por país (YouTube embeds)
// ============================================
const christmasMusic = {
    colombia: {
        title: "Villancicos Colombianos",
        // Tutaina, villancicos tradicionales colombianos
        embedUrl: "https://www.youtube.com/embed/gKqfHen-K_4?autoplay=1&loop=1"
    },
    usa: {
        title: "Classic American Christmas",
        // All I Want for Christmas, Jingle Bells mix
        embedUrl: "https://www.youtube.com/embed/aAkMkVFwAoo?autoplay=1&loop=1"
    },
    mexico: {
        title: "Villancicos Mexicanos",
        // Posadas, Los Peces en el Río, tradicionales
        embedUrl: "https://www.youtube.com/embed/8yQGqXvuHrM?autoplay=1&loop=1"
    }
};

// ============================================
// SISTEMA DE URL COMPARTIBLE
// ============================================
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nombre: params.get('nombre') || params.get('name') || '',
        tema: params.get('tema') || params.get('theme') || 'familiar',
        genero: params.get('genero') || params.get('gender') || 'general',
        pais: params.get('pais') || params.get('country') || detectCountryFromPath()
    };
}

function detectCountryFromPath() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('colombia')) return 'colombia';
    if (path.includes('usa')) return 'usa';
    if (path.includes('mexico')) return 'mexico';
    return 'colombia'; // Default
}

function generateShareableURL(nombre, tema, genero) {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('nombre', nombre);
    params.set('tema', tema);
    params.set('genero', genero);
    return baseURL + '?' + params.toString();
}

// ============================================
// OBTENER MENSAJE SEGÚN PARÁMETROS
// ============================================
function getMessageForParams(pais, tema, genero) {
    const countryMessages = christmasMessages[pais] || christmasMessages.colombia;
    const themeMessages = countryMessages[tema] || countryMessages.familiar;

    // Usar índice basado en el nombre para consistencia
    const nombre = getURLParams().nombre;
    let index = 0;
    if (nombre) {
        for (let i = 0; i < nombre.length; i++) {
            index += nombre.charCodeAt(i);
        }
    }
    index = index % themeMessages.length;

    return themeMessages[index];
}

// ============================================
// INICIALIZAR TARJETA COMPARTIDA
// ============================================
function initShareableCard() {
    const params = getURLParams();
    const nameDisplay = document.getElementById('recipientNameDisplay');
    const messageDisplay = document.getElementById('christmasMessage');
    const creatorSection = document.getElementById('creatorSection');
    const receiverSection = document.getElementById('receiverSection');

    // Si hay nombre en URL, mostrar modo receptor (tarjeta personalizada)
    if (params.nombre) {
        // Ocultar sección de creador, mostrar tarjeta personalizada
        if (creatorSection) creatorSection.style.display = 'none';
        if (receiverSection) receiverSection.style.display = 'block';

        if (nameDisplay) {
            nameDisplay.textContent = params.nombre;
        }

        if (messageDisplay) {
            const message = getMessageForParams(params.pais, params.tema, params.genero);
            messageDisplay.innerHTML = messageDisplay.innerHTML.replace(
                /(<span[^>]*id="recipientNameDisplay"[^>]*>)[^<]*(<\/span>)/,
                `$1${params.nombre}$2`
            );
            // Actualizar el texto del mensaje
            const messageText = messageDisplay.querySelector('.message-content') || messageDisplay;
            if (messageText && !messageText.querySelector('#recipientNameDisplay')) {
                messageText.textContent = message;
            }
        }

        // Auto-reproducir música
        initCountryMusic(params.pais);
    } else {
        // Modo creador: mostrar formulario para crear tarjeta
        if (creatorSection) creatorSection.style.display = 'block';
        if (receiverSection) receiverSection.style.display = 'none';
    }
}

// ============================================
// CREAR TARJETA Y GENERAR LINK
// ============================================
function createCard() {
    const nombre = document.getElementById('cardName')?.value?.trim();
    const tema = document.getElementById('cardTheme')?.value || 'familiar';
    const genero = document.getElementById('cardGender')?.value || 'general';

    if (!nombre) {
        alert('¡Por favor escribe un nombre para la tarjeta!');
        return;
    }

    const shareURL = generateShareableURL(nombre, tema, genero);

    // Mostrar URL generada
    const urlDisplay = document.getElementById('generatedURL');
    if (urlDisplay) {
        urlDisplay.value = shareURL;
        urlDisplay.style.display = 'block';
    }

    // Mostrar botones de compartir
    const shareButtons = document.getElementById('shareButtons');
    if (shareButtons) {
        shareButtons.style.display = 'flex';
    }

    // Previsualizar mensaje
    const preview = document.getElementById('messagePreview');
    if (preview) {
        const pais = detectCountryFromPath();
        const message = getMessageForParams(pais, tema, genero);
        preview.innerHTML = `<strong>Para ${nombre}:</strong><br>${message}`;
        preview.style.display = 'block';
    }
}

// ============================================
// FUNCIONES DE COMPARTIR
// ============================================
function copyCardLink() {
    const urlDisplay = document.getElementById('generatedURL');
    if (urlDisplay) {
        urlDisplay.select();
        navigator.clipboard.writeText(urlDisplay.value).then(() => {
            showToast('¡Link copiado! Ahora puedes enviarlo 📋');
        });
    }
}

function shareWhatsApp() {
    const url = document.getElementById('generatedURL')?.value;
    const nombre = document.getElementById('cardName')?.value || 'amigo/a';
    if (url) {
        const text = `🎄 ¡Hola ${nombre}! Te envié una tarjeta navideña especial. Ábrela aquí: ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
}

function shareTelegram() {
    const url = document.getElementById('generatedURL')?.value;
    const nombre = document.getElementById('cardName')?.value || 'amigo/a';
    if (url) {
        const text = `🎄 ¡Hola ${nombre}! Te envié una tarjeta navideña especial. Ábrela aquí:`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    }
}

function shareEmail() {
    const url = document.getElementById('generatedURL')?.value;
    const nombre = document.getElementById('cardName')?.value || 'amigo/a';
    if (url) {
        const subject = `🎄 ¡Feliz Navidad, ${nombre}!`;
        const body = `¡Hola ${nombre}!\n\nTe envié una tarjeta navideña especial para ti.\n\nÁbrela aquí: ${url}\n\n¡Que tengas una feliz Navidad! 🎄`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #39FF14, #bc13fe);
        color: #000;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInOut 3s ease forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// MÚSICA POR PAÍS
// ============================================
function initCountryMusic(pais) {
    const musicConfig = christmasMusic[pais] || christmasMusic.colombia;
    const musicContainer = document.getElementById('musicPlayer');

    if (musicContainer) {
        musicContainer.innerHTML = `
            <iframe 
                width="0" 
                height="0" 
                src="${musicConfig.embedUrl}" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                style="display:none;"
                id="youtubePlayer">
            </iframe>
        `;
    }
}

function toggleMusic() {
    const player = document.getElementById('youtubePlayer');
    const toggle = document.getElementById('audioToggle');

    if (player) {
        if (player.style.display === 'none') {
            player.style.display = 'block';
            if (toggle) toggle.innerHTML = '🎵';
        } else {
            player.style.display = 'none';
            if (toggle) toggle.innerHTML = '🔇';
        }
    }
}

// ============================================
// CREAR LUCES NAVIDEÑAS
// ============================================
function createChristmasLights() {
    const lightsContainer = document.querySelector('.christmas-lights');
    if (!lightsContainer) return;

    for (let i = 0; i < 15; i++) {
        const bulb = document.createElement('div');
        bulb.className = 'light-bulb';
        lightsContainer.appendChild(bulb);
    }
}

// ============================================
// CREAR EFECTO DE NIEVE
// ============================================
function createSnowflakes() {
    const snowContainer = document.querySelector('.snowflakes');
    if (!snowContainer) return;

    const snowflakeTypes = ['❄', '❅', '❆', '✻', '✼', '❋'];

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (5 + Math.random() * 10) + 's';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        snowflake.style.opacity = 0.4 + Math.random() * 0.6;
        snowContainer.appendChild(snowflake);
    }
}

// ============================================
// ANIMACIONES
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.country-card, .tradition-card, .message-banner, .card-creator').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Estilos dinámicos
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            20% { opacity: 1; transform: translate(-50%, 0); }
            80% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    </style>
`);

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createChristmasLights();
    createSnowflakes();
    initScrollAnimations();
    initShareableCard();

    // Si hay nombre en URL, reproducir música automáticamente
    const params = getURLParams();
    if (params.nombre) {
        setTimeout(() => initCountryMusic(params.pais), 1000);
    }
});

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.createCard = createCard;
window.copyCardLink = copyCardLink;
window.shareWhatsApp = shareWhatsApp;
window.shareTelegram = shareTelegram;
window.shareEmail = shareEmail;
window.toggleMusic = toggleMusic;
