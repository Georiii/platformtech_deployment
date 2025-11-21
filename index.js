import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname)));

// --- USER DATA ---
const userData = {
    name: "Francis Andrei Anciado",
    role: "Warrior of Liberation",
    section: "BSIT SM4102",
    bounty: 5000000000,
    quote: "As long as I live, there are infinite chances!",
    author: "Sun God Nika"
};

// --- IMAGES ---
const myImage = "/franciss.jpg";
const gear5Image = "/luffy5.jpg";

app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Haki Theme: ${userData.name}</title>
        
        <!-- LIBRARIES -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        
        <!-- FONTS -->
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Outfit:wght@300;500;700&family=Permanent+Marker&family=Playfair+Display:wght@900&family=Rye&display=swap" rel="stylesheet">
        
        <style>
            :root {
                /* HAKI DARK PALETTE */
                --c-void-dark: #0a0015;
                --c-void-light: #200535;
                
                --c-accent-gold: #ffd700; 
                --c-accent-violet: #bc13fe;
                --c-accent-red: #ff0040;
                
                --c-text-primary: #ffffff;
                --c-text-secondary: #b39ddb;
                
                /* POSTER PALETTE */
                --c-paper: #f4e4bc;
                --c-paper-dark: #d3c090;
                --c-ink: #2a1a10;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
                /* Deep Void Haki Background */
                background: radial-gradient(circle at 50% 50%, #120021 0%, #000000 95%);
                font-family: 'Outfit', sans-serif;
                min-height: 100vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--c-text-primary);
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            /* --- BACKGROUND CANVAS --- */
            #webgl-canvas {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                z-index: 0;
            }

            /* --- THE MAIN CARD --- */
            .card-wrapper {
                position: relative;
                z-index: 10;
            }
            .divine-card {
                width: min(1000px, 94vw);
                max-width: 1050px;
                height: auto;
                min-height: 520px;
                /* DARK GLASS to match background */
                background: linear-gradient(180deg, rgba(22,6,45,0.78), rgba(12,4,28,0.65));
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border: 1px solid rgba(188, 19, 254, 0.18);
                border-radius: 18px;
                display: flex;
                gap: 0;
                overflow: visible;
                box-shadow:
                    0 18px 48px rgba(0,0,0,0.7),
                    0 0 0 1px rgba(188, 19, 254, 0.06) inset;
                transform-origin: center;
                opacity: 0;
                transform: translateY(12px) scale(0.995);
                animation: cardIn 700ms cubic-bezier(.2,.9,.3,1) forwards;
            }

            @keyframes cardIn {
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            /* --- LEFT: VISUALS (Gear 5) --- */
            .visual-side {
                flex: 1;
                position: relative;
                overflow: hidden;
                border-right: 1px solid rgba(255,255,255,0.05);
            }

            .hero-bg {
                width: 100%;
                height: 100%;
                object-fit: cover;
                /* Mask to blend image into dark card */
                mask-image: linear-gradient(to right, black 80%, transparent 100%);
                -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
                transition: transform 900ms cubic-bezier(0.2, 0.9, 0.2, 1), filter 600ms;
                filter: saturate(1.05) contrast(1.05) brightness(0.95);
            }

            .divine-card:hover .hero-bg {
                transform: scale(1.04) translateX(-6px);
            }

            /* Quote Bubble - Dark Theme */
            .quote-bubble {
                position: absolute;
                bottom: 40px;
                left: 40px;
                background: rgba(0, 0, 0, 0.8);
                color: var(--c-text-primary);
                padding: 16px 24px;
                border-radius: 4px;
                border-left: 4px solid var(--c-accent-violet);
                font-weight: 500;
                font-style: italic;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                max-width: 320px;
                font-size: 1rem;
                z-index: 5;
                backdrop-filter: blur(10px);
            }

            /* --- RIGHT: INFO & POSTER --- */
            .info-side {
                flex: 1;
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                /* Dark gradient for right side */
                background: linear-gradient(135deg, rgba(30, 10, 50, 0.4) 0%, rgba(10, 5, 20, 0.6) 100%);
            }

            /* Make inner content flow nicely on smaller heights */
            .info-side .wanted-poster-wrapper { margin-top: 6px; }

            .header-badge {
                font-family: 'Cinzel', serif;
                font-weight: 700;
                color: var(--c-accent-violet);
                letter-spacing: 4px;
                text-transform: uppercase;
                font-size: 0.8rem;
                margin-bottom: 25px;
                display: flex;
                align-items: center;
                gap: 15px;
                text-shadow: 0 0 10px rgba(188, 19, 254, 0.4);
            }
            .header-badge::before, .header-badge::after {
                content: '';
                width: 30px;
                height: 1px;
                background: var(--c-accent-violet);
                box-shadow: 0 0 5px var(--c-accent-violet);
            }

            /* --- IMPROVED WANTED POSTER --- */
            .wanted-poster-wrapper {
                perspective: 1000px;
            }

            .wanted-poster {
                background-color: var(--c-paper);
                width: 320px;
                padding: 15px 20px 25px 20px; /* Top, Right, Bottom, Left */
                box-shadow: 
                    0 15px 35px rgba(0,0,0,0.5),
                    inset 0 0 40px rgba(0,0,0,0.1);
                text-align: center;
                position: relative;
                transform: rotate(1deg);
                border: 1px solid #c1b19a;
                transition: transform 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms;
                transform-origin: center center;
                will-change: transform;
                /* Paper Texture */
                background-image: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(0, 0, 0, 0.02) 2px,
                    rgba(0, 0, 0, 0.02) 3px
                );
            }

            /* Subtle 3D tilt interaction */
            .wanted-poster-wrapper { display: inline-block; }

            .wanted-poster.tilt {
                box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            }

            /* Ripped Paper / Worn Effect overlay */
            .wanted-poster::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(circle, transparent 60%, rgba(160, 140, 100, 0.2) 100%);
                pointer-events: none;
                z-index: 1;
            }

            /* Top & Bottom border lines of One Piece poster */
            .poster-lines-top {
                border-bottom: 2px solid var(--c-ink);
                margin-bottom: 5px;
                width: 85%;
                margin-left: auto;
                margin-right: auto;
            }
            .poster-lines-bottom {
                border-top: 2px solid var(--c-ink);
                margin-top: 5px;
                width: 95%;
                margin-left: auto;
                margin-right: auto;
            }

            .poster-title {
                font-family: 'Rye', serif; /* Western/Poster font */
                font-size: 3.8rem;
                color: var(--c-ink);
                line-height: 0.8;
                letter-spacing: 2px;
                margin-top: 5px;
                margin-bottom: 5px;
                text-transform: uppercase;
                text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
                transform: scaleY(1.3); /* Stretch vertically like the anime */
            }

            .poster-subtitle {
                font-family: 'Rye', serif;
                font-size: 0.9rem;
                color: var(--c-ink);
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .poster-image-container {
                width: 100%;
                height: 210px;
                background: #333;
                margin-bottom: 15px;
                border: 3px solid var(--c-ink);
                overflow: hidden;
                position: relative;
            }

            .poster-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: sepia(0.45) contrast(1.05) brightness(0.95);
                transition: transform 520ms cubic-bezier(.2,.9,.2,1);
                transform-origin: center center;
            }
            
            .wanted-poster:hover .poster-img {
                transform: scale(1.06) rotate(-0.6deg);
            }

            /* Small circular avatar overlay */
            .avatar-overlay {
                position: absolute;
                top: -34px;
                left: 50%;
                transform: translateX(-50%);
                width: 72px;
                height: 72px;
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid rgba(255,255,255,0.9);
                box-shadow: 0 8px 24px rgba(0,0,0,0.45);
                background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.06));
            }

            .avatar-overlay img { width: 100%; height: 100%; object-fit: cover; }

            .poster-name {
                font-family: 'Playfair Display', serif;
                font-size: 1.8rem;
                color: var(--c-ink);
                text-transform: uppercase;
                line-height: 1;
                margin-bottom: 15px;
                font-weight: 900;
                word-break: break-word;
                letter-spacing: -0.5px;
            }

            .poster-meta { color: #6b5846; font-size: 0.85rem; margin-bottom: 8px; }

            .poster-bounty-row {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                color: var(--c-ink);
                font-family: 'Rye', serif;
                font-size: 1.8rem;
                border-top: 2px solid var(--c-ink);
                padding-top: 8px;
                width: 90%;
                margin: 0 auto;
            }
            
            .berry-symbol { 
                font-family: 'Times New Roman', serif;
                font-style: italic; 
                font-weight: bold;
                font-size: 1.6rem;
            }

            .marine-logo {
                position: absolute;
                bottom: 15px;
                right: 15px;
                font-size: 0.6rem;
                color: var(--c-ink);
                font-family: sans-serif;
                font-weight: bold;
                opacity: 0.7;
                border: 1px solid var(--c-ink);
                padding: 2px 4px;
                transform: rotate(-10deg);
            }

            /* Mobile */
            @media (max-width: 1100px) {
                .divine-card {
                    flex-direction: column;
                    width: 95%;
                    height: auto;
                    padding-bottom: 30px;
                }
                .visual-side {
                    height: 350px;
                    width: 100%;
                    border-right: none;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                .info-side { padding: 30px 10px; }
                .wanted-poster { transform: rotate(0deg); width: 100%; max-width: 320px; }
            }
        </style>
    </head>
    <body>

        <!-- Three.js Background -->
        <canvas id="webgl-canvas"></canvas>

        <!-- Main Content -->
        <div class="card-wrapper">
            <div class="divine-card">
                
                <!-- Left: Gear 5 Visual -->
                <div class="visual-side">
                    <img src="${gear5Image}" class="hero-bg" alt="Sun God Nika" onerror="this.src='https://wallpapers.com/images/hd/gear-5-luffy-white-hair-smiling-m3h9b3f7a3a3x8c4.jpg'">
                    <div class="quote-bubble">"${userData.quote}"</div>
                </div>

                <!-- Right: Wanted Poster Info -->
                <div class="info-side">
                    <div class="header-badge">
                        ${userData.section}
                    </div>

                    <!-- THE IMPROVED WANTED POSTER -->
                    <div class="wanted-poster-wrapper">
                        <div class="wanted-poster">
                            <div class="poster-lines-top"></div>
                            <div class="poster-title">WANTED</div>
                            <div class="poster-subtitle">DEAD OR ALIVE</div>
                            
                            <div class="poster-image-container">
                                <img src="${myImage}" class="poster-img" alt="Bounty Target" onerror="this.src='https://via.placeholder.com/300x400?text=NO+IMAGE'">
                            </div>

                            <div class="poster-name">FRANCIS ANDREI<br>ANCIADO</div>
                            
                            <div class="poster-bounty-row">
                                <span class="berry-symbol">B</span>
                                <span>1,500,000</span>
                                <span>-</span>
                            </div>
                            <div class="marine-logo">MARINE</div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

        <script>
            // --- SMOOTH BACKGROUND ---
            const canvas = document.getElementById('webgl-canvas');
            const scene = new THREE.Scene();
            
            // Camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            // Renderer
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // --- EFFICIENT, SMOOTH PARTICLES ---
            const particlesGeometry = new THREE.BufferGeometry();
            // reduced count gives smoother performance and cleaner look
            const particlesCount = 1200;
            
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);
            const offsetArray = new Float32Array(particlesCount); // Random offsets for motion

            // Palette: Purple & Dark Red
            const colorPurple = new THREE.Color(0x8b00ff);
            const colorRed = new THREE.Color(0x8b0000);
            const colorDeep = new THREE.Color(0x4b0082);

            for(let i = 0; i < particlesCount; i++) {
                posArray[i * 3] = (Math.random() - 0.5) * 140; // x
                posArray[i * 3 + 1] = (Math.random() - 0.5) * 90; // y
                posArray[i * 3 + 2] = (Math.random() - 0.5) * 110; // z

                const rand = Math.random();
                let mixedColor = colorDeep;
                if (rand > 0.66) mixedColor = colorPurple;
                else if (rand > 0.33) mixedColor = colorRed;

                colorArray[i * 3] = mixedColor.r;
                colorArray[i * 3 + 1] = mixedColor.g;
                colorArray[i * 3 + 2] = mixedColor.b;

                offsetArray[i] = Math.random() * Math.PI * 2;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            particlesGeometry.setAttribute('offset', new THREE.BufferAttribute(offsetArray, 1));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.6,
                vertexColors: true,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });

            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // Keep a stable copy of initial positions to avoid cumulative drift
            const initialPositions = new Float32Array(posArray);

            // --- ANIMATION LOOP ---
            let mouseX = 0;
            let mouseY = 0;

            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
            }, { passive: true });

            const clock = new THREE.Clock();

            function animate() {
                const time = clock.getElapsedTime();

                const positions = particlesMesh.geometry.attributes.position.array;
                const offsets = particlesMesh.geometry.attributes.offset.array;

                // compute positions fresh from base, using smooth sin-based motion
                for(let i = 0; i < particlesCount; i++) {
                    const i3 = i * 3;
                    const baseX = initialPositions[i3];
                    const baseY = initialPositions[i3 + 1];
                    const baseZ = initialPositions[i3 + 2];

                    const off = offsets[i];
                    const sway = Math.sin(time * 0.35 + off) * 2.5;
                    const bob = Math.sin(time * 0.7 + off * 0.5) * 1.6;

                    positions[i3] = baseX + sway + mouseX * 8;
                    positions[i3 + 1] = baseY + bob + Math.sin(off * 0.25 + time * 0.15) * 0.8;
                    positions[i3 + 2] = baseZ + Math.cos(time * 0.12 + off) * 1.5 + mouseY * 10;
                }
                particlesMesh.geometry.attributes.position.needsUpdate = true;

                // Gentle rotation for depth
                particlesMesh.rotation.y = Math.sin(time * 0.03) * 0.08;
                particlesMesh.rotation.z = Math.sin(time * 0.02) * 0.03;

                // Slight Mouse Parallax (smoothed)
                particlesMesh.rotation.x += (mouseY * 0.02 - particlesMesh.rotation.x) * 0.06;
                particlesMesh.rotation.y += (mouseX * 0.02 - particlesMesh.rotation.y) * 0.06;

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }

            animate();

            // Resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            // Poster 3D tilt interaction
            (function posterTilt() {
                const wrapper = document.querySelector('.wanted-poster-wrapper');
                const poster = document.querySelector('.wanted-poster');
                if(!wrapper || !poster) return;

                wrapper.addEventListener('mousemove', (e) => {
                    const rect = wrapper.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    const rx = (y * 8).toFixed(2);
                    const ry = (x * -10).toFixed(2);
                    poster.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(1deg)';
                    poster.classList.add('tilt');
                }, { passive: true });

                wrapper.addEventListener('mouseleave', () => {
                    poster.style.transform = 'rotate(1deg)';
                    poster.classList.remove('tilt');
                });
            })();
        </script>

    </body>
    </html>
    `;

    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`🏴‍☠️ Haki Theme running on port ${port}`);
});