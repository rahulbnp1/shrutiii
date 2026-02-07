// Rose Day Special - Ultra Premium Interactive JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initFloatingPetals();
    initNavigation();
    initRoseGarden();
    initMessageForm();
    initCountdown();
    initModal();
    initScrollAnimations();
    initParallaxEffects();
    initMagicCursor();
    initBouquetBuilder();

});

// ============================================
// FLOATING PETALS - ENHANCED WITH VARIETY
// ============================================
function initFloatingPetals() {
    const container = document.getElementById('petals-container');
    const petalColors = [
        'linear-gradient(135deg, #e63950 0%, #c41e3a 50%, #8b1538 100%)',
        'linear-gradient(135deg, #ff6b9d 0%, #e63950 50%, #c41e3a 100%)',
        'linear-gradient(135deg, #ffb3cc 0%, #ff6b9d 50%, #e63950 100%)',
        'linear-gradient(135deg, #c41e3a 0%, #8b1538 50%, #6a1025 100%)',
        'linear-gradient(135deg, #b76e79 0%, #c41e3a 50%, #8b1538 100%)'
    ];

    const petalShapes = [
        '50% 0 50% 50%',
        '0 50% 50% 50%',
        '50% 50% 0 50%',
        '50% 50% 50% 0'
    ];

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'floating-petal';

        const size = Math.random() * 18 + 12;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 12;
        const delay = Math.random() * 3;
        const rotateSpeed = Math.random() * 720 + 360;
        const swayAmount = (Math.random() - 0.5) * 100;

        petal.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size * 1.2}px;
            background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
            border-radius: ${petalShapes[Math.floor(Math.random() * petalShapes.length)]};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.4 + 0.4};
            --sway: ${swayAmount}px;
            --rotate: ${rotateSpeed}deg;
        `;

        container.appendChild(petal);
        setTimeout(() => petal.remove(), (duration + delay) * 1000);
    }

    // Create initial burst of petals
    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 150);
    }

    // Continuous petal generation
    setInterval(createPetal, 600);
}

// ============================================
// MAGIC CURSOR TRAIL & CUSTOM CURSOR
// ============================================
function initMagicCursor() {
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    let timeout;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move Custom Cursor
        if (cursor) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }

        // Handle Hover State
        const target = e.target;
        const isInteractive =
            target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.closest('a') ||
            target.closest('button') ||
            target.classList.contains('rose-option') ||
            target.classList.contains('rose') ||
            getComputedStyle(target).cursor === 'pointer';

        if (isInteractive) {
            document.body.classList.add('hovering');
        } else {
            document.body.classList.remove('hovering');
        }

        if (!isMoving) {
            isMoving = true;
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            isMoving = false;
        }, 100);

        // Occasionally create a sparkle at cursor position
        if (Math.random() > 0.92) {
            createCursorSparkle(mouseX, mouseY);
        }
    });
}

function createCursorSparkle(x, y) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const hue = Math.random() > 0.5 ? '340' : '350';

    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, hsla(${hue}, 80%, 70%, 1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: cursorSparkle 0.8s ease-out forwards;
    `;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

// Add cursor sparkle animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorSparkle {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Update active section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Navbar background opacity on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 10, 14, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 10, 14, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// SCROLL TO SECTION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// ROSE GARDEN INTERACTIVITY
// ============================================
function initRoseGarden() {
    const roseCards = document.querySelectorAll('.rose-card');

    roseCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle bloom state
            const wasBloomed = card.classList.contains('bloomed');
            card.classList.toggle('bloomed');

            if (!wasBloomed) {
                // Create sparkle explosion
                createSparkles(card, 20);

                // Create floating hearts
                createFloatingHearts(card);

                // Play bloom sound
                playBloomSound();

                // Create petal burst
                createPetalBurst(card);
            }
        });

        // Hover glow effect
        card.addEventListener('mouseenter', () => {
            createHoverGlow(card);
        });

        // Touch feedback for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.97)';
        });

        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// SPARKLE EFFECTS - ENHANCED
// ============================================
function createSparkles(element, count = 15) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        const angle = (i / count) * Math.PI * 2;
        const distance = 60 + Math.random() * 80;
        const size = Math.random() * 10 + 5;
        const duration = 0.6 + Math.random() * 0.4;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        // Alternate between gold and rose sparkles
        const isGold = Math.random() > 0.5;
        const gradient = isGold
            ? 'radial-gradient(circle, #ffd700 0%, #f4e4bc 30%, transparent 70%)'
            : 'radial-gradient(circle, #ff6b9d 0%, #c41e3a 30%, transparent 70%)';

        sparkle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${gradient};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${centerX}px;
            top: ${centerY}px;
            box-shadow: 0 0 ${size}px ${isGold ? '#ffd700' : '#ff6b9d'};
            animation: sparkleExplode ${duration}s ease-out forwards;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), duration * 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleExplode {
        0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 1; 
        }
        50% {
            opacity: 1;
        }
        100% { 
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.3); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// FLOATING HEARTS EFFECT
// ============================================
function createFloatingHearts(element) {
    const rect = element.getBoundingClientRect();
    // Using colored roses instead of hearts
    const roseColors = [
        { color: 'rose-red', glow: 'rgba(196, 30, 58, 0.8)' },
        { color: 'rose-pink', glow: 'rgba(255, 107, 157, 0.8)' },
        { color: 'rose-yellow', glow: 'rgba(255, 215, 0, 0.8)' },
        { color: 'rose-lavender', glow: 'rgba(186, 85, 211, 0.8)' },
        { color: 'rose-orange', glow: 'rgba(255, 165, 0, 0.8)' }
    ];

    for (let i = 0; i < 5; i++) {
        const rose = document.createElement('div');
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + rect.height * 0.3;
        const size = 16 + Math.random() * 16;
        const delay = i * 0.1;
        const tx = (Math.random() - 0.5) * 100;
        const roseStyle = roseColors[Math.floor(Math.random() * roseColors.length)];

        rose.textContent = '🌹';
        rose.style.cssText = `
            position: fixed;
            font-size: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            animation: floatHeart 1.5s ease-out ${delay}s forwards;
            --tx: ${tx}px;
            filter: drop-shadow(0 0 8px ${roseStyle.glow});
        `;

        document.body.appendChild(rose);
        setTimeout(() => rose.remove(), 1700);
    }
}

// Add heart animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatHeart {
        0% { 
            transform: translateY(0) translateX(0) scale(0); 
            opacity: 0; 
        }
        20% {
            transform: translateY(-30px) translateX(calc(var(--tx) * 0.2)) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateY(-120px) translateX(var(--tx)) scale(0.5); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(heartStyle);

// ============================================
// PETAL BURST EFFECT
// ============================================
function createPetalBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    for (let i = 0; i < 8; i++) {
        const petal = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
        const distance = 100 + Math.random() * 60;
        const size = 15 + Math.random() * 10;
        const rotation = Math.random() * 360;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        petal.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size * 1.3}px;
            background: linear-gradient(135deg, #e63950 0%, #c41e3a 50%, #8b1538 100%);
            border-radius: 50% 0 50% 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${centerX}px;
            top: ${centerY}px;
            box-shadow: inset 2px 2px 6px rgba(255, 107, 157, 0.4);
            animation: petalBurst 1.2s ease-out forwards;
            --tx: ${tx}px;
            --ty: ${ty}px;
            --rotate: ${rotation}deg;
        `;

        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 1200);
    }
}

// Add petal burst animation
const petalBurstStyle = document.createElement('style');
petalBurstStyle.textContent = `
    @keyframes petalBurst {
        0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg); 
            opacity: 1; 
        }
        30% {
            transform: translate(calc(-50% + var(--tx) * 0.3), calc(-50% + var(--ty) * 0.3)) scale(1) rotate(calc(var(--rotate) * 0.3));
        }
        100% { 
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) + 100px)) scale(0.3) rotate(var(--rotate)); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(petalBurstStyle);

// ============================================
// HOVER GLOW EFFECT
// ============================================
function createHoverGlow(element) {
    const glowExists = element.querySelector('.hover-glow-effect');
    if (glowExists) return;

    const glow = document.createElement('div');
    glow.className = 'hover-glow-effect';
    glow.style.cssText = `
        position: absolute;
        inset: -20%;
        background: radial-gradient(circle, rgba(196, 30, 58, 0.3) 0%, transparent 70%);
        pointer-events: none;
        animation: glowPulse 2s ease-in-out infinite;
        z-index: 0;
    `;

    element.style.position = 'relative';
    element.appendChild(glow);

    element.addEventListener('mouseleave', () => {
        glow.remove();
    }, { once: true });
}

// ============================================
// BLOOM SOUND - ENHANCED
// ============================================
function playBloomSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a more melodic bloom sound
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 chord

        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + index * 0.05;
            const duration = 0.4 - index * 0.08;

            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    } catch (e) {
        // Audio not supported
    }
}

// ============================================
// MESSAGE FORM
// ============================================
function initMessageForm() {
    const form = document.getElementById('rose-form');
    const recipientInput = document.getElementById('recipient-name');
    const senderInput = document.getElementById('sender-name');
    const messageInput = document.getElementById('love-message');
    const roseOptions = document.querySelectorAll('.rose-option');

    const previewName = document.getElementById('preview-name');
    const previewMessage = document.getElementById('preview-message');
    const previewSender = document.getElementById('preview-sender');
    const previewRose = document.getElementById('preview-rose');

    let selectedRose = 'red';
    // All roses use the same emoji with different color styling
    const roseColors = {
        red: { class: 'rose-red', glow: 'rgba(196, 30, 58, 0.8)' },
        pink: { class: 'rose-pink', glow: 'rgba(255, 107, 157, 0.8)' },
        white: { class: 'rose-white', glow: 'rgba(255, 255, 255, 0.8)' },
        yellow: { class: 'rose-yellow', glow: 'rgba(255, 215, 0, 0.8)' }
    };

    // Rose selection with animation
    roseOptions.forEach(option => {
        option.addEventListener('click', () => {
            roseOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedRose = option.dataset.rose;

            // Animate preview rose change
            previewRose.style.transform = 'scale(0) rotate(180deg)';
            setTimeout(() => {
                const colorInfo = roseColors[selectedRose];
                previewRose.innerHTML = `<span class="colored-rose ${colorInfo.class}">🌹</span>`;
                previewRose.style.transform = 'scale(1) rotate(0deg)';
            }, 200);

            // Create mini sparkles around the selected option
            createSparkles(option, 8);
        });
    });

    // Live preview updates with smooth transitions
    recipientInput.addEventListener('input', (e) => {
        previewName.textContent = e.target.value || 'Someone Special';
        previewName.style.animation = 'none';
        setTimeout(() => previewName.style.animation = '', 10);
    });

    senderInput.addEventListener('input', (e) => {
        previewSender.textContent = e.target.value || 'You';
    });

    messageInput.addEventListener('input', (e) => {
        previewMessage.textContent = e.target.value || 'Your beautiful message will appear here...';
    });

    // Form submission with celebration
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const recipient = recipientInput.value.trim();
        const sender = senderInput.value.trim();
        const message = messageInput.value.trim();

        if (recipient && sender && message) {
            // Create celebration effect before showing modal
            createCelebration();

            setTimeout(() => {
                showRoseCardModal(recipient, sender, message, selectedRose);
            }, 500);
        }
    });
}

// ============================================
// CELEBRATION EFFECT
// ============================================
function createCelebration() {
    // Using colored roses with different glow effects
    const roseGlows = [
        'rgba(196, 30, 58, 0.8)',    // red
        'rgba(255, 107, 157, 0.8)',  // pink
        'rgba(255, 215, 0, 0.8)',    // yellow
        'rgba(186, 85, 211, 0.8)',   // lavender
        'rgba(255, 165, 0, 0.8)',    // orange
        'rgba(255, 255, 255, 0.6)'   // white
    ];
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const size = 20 + Math.random() * 20;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const glowColor = roseGlows[Math.floor(Math.random() * roseGlows.length)];

        particle.textContent = '🌹';
        particle.style.cssText = `
            position: fixed;
            font-size: ${size}px;
            left: ${x}px;
            top: 100%;
            pointer-events: none;
            z-index: 9999;
            animation: celebrationRise ${duration}s ease-out ${delay}s forwards;
            filter: drop-shadow(0 0 10px ${glowColor});
        `;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
}

// Add celebration animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationRise {
        0% { 
            transform: translateY(0) rotate(0deg) scale(0); 
            opacity: 0; 
        }
        10% {
            transform: translateY(-50px) rotate(20deg) scale(1);
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% { 
            transform: translateY(-100vh) rotate(360deg) scale(0.5); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(celebrationStyle);

// ============================================
// MODAL
// ============================================
function initModal() {
    const modal = document.getElementById('rose-modal');
    const closeBtn = document.getElementById('modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.animation = '';
        }, 300);
    });

    overlay.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.animation = '';
        }, 300);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.style.animation = 'modalFadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.classList.remove('active');
                modal.style.animation = '';
            }, 300);
        }
    });
}

// Add modal fade out animation
const modalFadeStyle = document.createElement('style');
modalFadeStyle.textContent = `
    @keyframes modalFadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(modalFadeStyle);

function showRoseCardModal(recipient, sender, message, rose) {
    const modal = document.getElementById('rose-modal');
    const finalCard = document.getElementById('final-card');
    // Colored rose styling with glow colors
    const roseStyles = {
        red: { class: 'rose-red', glow: 'rgba(196, 30, 58, 0.4)' },
        pink: { class: 'rose-pink', glow: 'rgba(255, 107, 157, 0.4)' },
        white: { class: 'rose-white', glow: 'rgba(255, 255, 255, 0.4)' },
        yellow: { class: 'rose-yellow', glow: 'rgba(255, 215, 0, 0.4)' }
    };
    const style = roseStyles[rose] || roseStyles.red;

    finalCard.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 1.5rem; animation: floatRose 3s ease-in-out infinite;">
            <span class="colored-rose ${style.class}" style="filter: drop-shadow(0 10px 30px ${style.glow});">🌹</span>
        </div>
        <h3 style="font-family: 'Dancing Script', cursive; font-size: 2.2rem; color: #ffb3cc; margin-bottom: 1.5rem; text-shadow: 0 0 20px rgba(255, 179, 204, 0.3);">Dear ${recipient}</h3>
        <p style="font-style: italic; color: rgba(255,255,255,0.85); line-height: 2; margin-bottom: 2rem; font-size: 1.1rem;">${message}</p>
        <div style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.6);">
            With love,<br>
            <span style="font-size: 1.8rem; color: #ff6b9d; text-shadow: 0 0 15px rgba(255, 107, 157, 0.3);">${sender}</span>
        </div>
        <div style="margin-top: 1.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.4);">
            <span class="colored-rose rose-red">🌹</span> Rose Day ${new Date().getFullYear()} <span class="colored-rose rose-red">🌹</span>
        </div>
    `;

    modal.classList.add('active');

    // Create sparkles around the card
    setTimeout(() => {
        const card = modal.querySelector('.rose-card-final');
        if (card) createSparkles(card, 12);
    }, 400);

    // Setup download functionality
    document.getElementById('download-card').onclick = () => downloadCard(recipient, sender, message, rose);
    document.getElementById('share-card').onclick = () => shareCard(recipient, message);
}

function downloadCard(recipient, sender, message, rose) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 900;

    // Create beautiful gradient background
    const gradient = ctx.createLinearGradient(0, 0, 600, 900);
    gradient.addColorStop(0, '#2d1418');
    gradient.addColorStop(0.3, '#1a0a0e');
    gradient.addColorStop(0.7, '#2d1418');
    gradient.addColorStop(1, '#3d1f24');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 900);

    // Add decorative elements
    ctx.strokeStyle = '#b76e79';
    ctx.lineWidth = 3;
    ctx.strokeRect(25, 25, 550, 850);

    // Inner decorative border
    ctx.strokeStyle = 'rgba(255, 107, 157, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 520, 820);

    // Rose emoji
    ctx.font = '100px serif';
    ctx.textAlign = 'center';
    ctx.fillText(rose === 'red' ? '🌹' : rose === 'pink' ? '🌸' : rose === 'white' ? '🤍' : '💛', 300, 180);

    // Recipient name
    ctx.font = 'italic 42px serif';
    ctx.fillStyle = '#ffb3cc';
    ctx.fillText(`Dear ${recipient}`, 300, 280);

    // Message with word wrap
    ctx.font = '22px serif';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    const words = message.split(' ');
    let line = '';
    let y = 380;
    const maxWidth = 480;

    words.forEach(word => {
        const testLine = line + word + ' ';
        if (ctx.measureText(testLine).width > maxWidth) {
            ctx.fillText(line.trim(), 300, y);
            line = word + ' ';
            y += 38;
        } else {
            line = testLine;
        }
    });
    ctx.fillText(line.trim(), 300, y);

    // Sender section
    ctx.font = 'italic 26px serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('With love,', 300, y + 90);

    ctx.font = '38px serif';
    ctx.fillStyle = '#ff6b9d';
    ctx.fillText(sender, 300, y + 140);

    // Footer
    ctx.font = '18px serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(`🌹 Rose Day ${new Date().getFullYear()} 🌹`, 300, 850);

    // Download
    const link = document.createElement('a');
    link.download = `rose-day-card-for-${recipient.toLowerCase().replace(/\s/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function shareCard(recipient, message) {
    const shareData = {
        title: '🌹 Rose Day Card',
        text: `Dear ${recipient}, ${message} - Happy Rose Day! 🌹`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => { });
    } else {
        navigator.clipboard.writeText(shareData.text).then(() => {
            showToast('Message copied to clipboard! 🌹');
        });
    }
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #c41e3a 0%, #ff6b9d 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        box-shadow: 0 10px 40px rgba(196, 30, 58, 0.4);
        z-index: 10000;
        animation: toastSlide 3s ease forwards;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add toast animation
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes toastSlide {
        0% { transform: translateX(-50%) translateY(100px); opacity: 0; }
        15% { transform: translateX(-50%) translateY(0); opacity: 1; }
        85% { transform: translateX(-50%) translateY(0); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    const roseDayDate = new Date('February 7, 2026 00:00:00').getTime();
    const countdownTitle = document.querySelector('.countdown-title');
    const countdownMessage = document.querySelector('.countdown-message');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = roseDayDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            countdownTitle.textContent = '🌹 Happy Rose Day! 🌹';
            countdownMessage.textContent = 'Spread the love today! 💕';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Animate number changes
        animateNumber('days', days);
        animateNumber('hours', hours);
        animateNumber('minutes', minutes);
        animateNumber('seconds', seconds);
    }

    function animateNumber(id, value) {
        const element = document.getElementById(id);
        const newValue = String(value).padStart(2, '0');

        if (element.textContent !== newValue) {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'countdownPop 0.3s ease';
            element.textContent = newValue;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Add countdown pop animation
const countdownStyle = document.createElement('style');
countdownStyle.textContent = `
    @keyframes countdownPop {
        0% { transform: scale(1.2); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(countdownStyle);

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add stagger effect to children
                const children = entry.target.querySelectorAll('.rose-card, .meaning-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .garden-section, .meanings-section').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    const heroRose = document.getElementById('hero-rose');
    const ambientGlow = document.querySelector('.ambient-glow');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        // Hero rose parallax
        if (heroRose && scrolled < windowHeight) {
            const parallaxY = scrolled * 0.4;
            const parallaxRotate = scrolled * 0.03;
            const opacity = 1 - (scrolled / windowHeight) * 0.5;

            heroRose.style.transform = `translateY(${parallaxY}px) rotate(${parallaxRotate}deg)`;
            heroRose.style.opacity = Math.max(opacity, 0.3);
        }

        // Ambient glow movement
        if (ambientGlow) {
            const moveX = (scrolled * 0.02) % 50;
            const moveY = (scrolled * 0.01) % 30;
            ambientGlow.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        }
    });

    // Mouse parallax for hero section
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY > 500) return;

        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        if (heroRose) {
            const baseTransform = heroRose.style.transform || '';
            const rotateX = mouseY * -5;
            const rotateY = mouseX * 5;

            heroRose.style.setProperty('--mouse-rotate-x', `${rotateX}deg`);
            heroRose.style.setProperty('--mouse-rotate-y', `${rotateY}deg`);
        }
    });
}

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================
window.scrollToSection = scrollToSection;



// ============================================
// BOUQUET BUILDER
// ============================================
// ============================================
// BOUQUET BUILDER
// ============================================
// ============================================
// BOUQUET BUILDER
// ============================================
function initBouquetBuilder() {
    const roseBtns = document.querySelectorAll('.bouquet-rose-btn');
    const container = document.getElementById('bouquet-roses');
    const clearBtn = document.getElementById('clear-bouquet');
    const hint = document.querySelector('.bouquet-hint');
    const roseColors = {
        red: 'rose-red',
        pink: 'rose-pink',
        white: 'rose-white',
        yellow: 'rose-yellow',
        lavender: 'rose-lavender',
        orange: 'rose-orange'
    };

    // Store rose objects
    let bouquetState = [];

    roseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.rose;
            addRoseToBouquet(color);

            // Hide hint
            if (hint) hint.style.display = 'none';

            // Animation
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = '', 100);

            createSparkles(btn, 5);
        });
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const roses = container.querySelectorAll('.placed-rose');
            roses.forEach((rose, index) => {
                setTimeout(() => {
                    rose.style.transform = 'scale(0)';
                    setTimeout(() => rose.remove(), 300);
                }, index * 30);
            });

            bouquetState = [];

            // Show hint again
            setTimeout(() => {
                if (hint) hint.style.display = 'block';
            }, 500);
        });
    }

    function addRoseToBouquet(color) {


        const rose = document.createElement('div');
        rose.className = 'placed-rose';

        // MOUND DISTRIBUTION LOGIC - WIDER & FULLER
        const count = bouquetState.length;

        // Elliptical distribution
        const radiusX = 150; // Wider
        const radiusY = 100;

        const r = Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI;

        // Calculated positions
        let x = r * Math.cos(theta) * radiusX;
        let y = r * Math.sin(theta) * radiusY;

        // Smart Filling:
        // First 10 roses: Fill the bottom wide base
        if (count < 10) {
            y = Math.random() * 50;
            x = (Math.random() - 0.5) * 280; // Very wide spread
        }
        // Next 10 roses: Fill the middle layer
        else if (count < 20) {
            y = 40 + Math.random() * 60;
            x = (Math.random() - 0.5) * 220;
        }

        // Layering
        const zIndex = 100 - Math.floor(y);
        const scale = 0.85 + Math.random() * 0.3; // Generally slightly larger
        const rotation = (Math.random() - 0.5) * 40;

        rose.innerHTML = `
            <div class="rose-head">
                <span class="colored-rose ${roseColors[color]}">&#127801;</span>
            </div>
            <div class="rose-leaf-visual left"></div>
            <div class="rose-leaf-visual right"></div>
        `;

        rose.style.left = `calc(50% + ${x}px)`;
        rose.style.bottom = `${y}px`;
        rose.style.zIndex = zIndex;
        rose.style.transform = `translateX(-50%) rotate(${rotation}deg) scale(${scale})`;

        container.appendChild(rose);
        bouquetState.push({ element: rose });

        createSparkles(rose, 5);
    }
}

