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
    bounty: 1500000,
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
                background: radial-gradient(circle at 50% 50%, #1a0033 0%, #000000 90%);
                font-family: 'Outfit', sans-serif;
                height: 100vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--c-text-primary);
                cursor: default; 
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
                width: 1050px;
                height: 650px;
                /* DARK GLASS to match background */
                background: rgba(20, 5, 40, 0.75);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border: 1px solid rgba(188, 19, 254, 0.3);
                border-radius: 24px;
                display: flex;
                overflow: hidden;
                box-shadow: 
                    0 20px 80px rgba(0,0,0,0.8),
                    0 0 0 1px rgba(188, 19, 254, 0.1) inset,
                    0 0 30px rgba(139, 0, 255, 0.1); /* Subtle Haki Glow */
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
                transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                filter: saturate(1.1) contrast(1.1);
            }

            .divine-card:hover .hero-bg {
                transform: scale(1.03);
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
                transform: rotate(2deg);
                border: 1px solid #bdafa0;
                /* Paper Texture */
                background-image: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(0, 0, 0, 0.02) 2px,
                    rgba(0, 0, 0, 0.02) 3px
                );
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
                filter: sepia(0.5) contrast(1.2) brightness(0.9);
                transition: transform 0.3s;
            }
            
            .wanted-poster:hover .poster-img {
                transform: scale(1.05);
            }

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

            // --- SMOOTH PURPLE/RED PARTICLES ---
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2500;
            
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);
            const offsetArray = new Float32Array(particlesCount); // Random offsets for wave motion

            // Simple Palette: Purple & Dark Red
            const colorPurple = new THREE.Color(0x8b00ff); // Electric Purple
            const colorRed = new THREE.Color(0x8b0000);    // Dark Red
            const colorDeep = new THREE.Color(0x4b0082);   // Indigo

            for(let i = 0; i < particlesCount; i++) {
                // Spread particles across the screen depth
                posArray[i * 3] = (Math.random() - 0.5) * 150;
                posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
                posArray[i * 3 + 2] = (Math.random() - 0.5) * 100;

                const rand = Math.random();
                let mixedColor;
                
                if (rand > 0.6) mixedColor = colorPurple;
                else if (rand > 0.3) mixedColor = colorRed;
                else mixedColor = colorDeep;

                colorArray[i * 3] = mixedColor.r;
                colorArray[i * 3 + 1] = mixedColor.g;
                colorArray[i * 3 + 2] = mixedColor.b;
                
                offsetArray[i] = Math.random() * 100; // For sine wave randomness
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            particlesGeometry.setAttribute('offset', new THREE.BufferAttribute(offsetArray, 1));

            // Soft, glowing round particles
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.4,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });

            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // --- ANIMATION LOOP ---
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
            });

            const clock = new THREE.Clock();

            function animate() {
                const time = clock.getElapsedTime();

                const positions = particlesMesh.geometry.attributes.position.array;
                const offsets = particlesMesh.geometry.attributes.offset.array;

                for(let i = 0; i < particlesCount; i++) {
                    const i3 = i * 3;
                    
                    // Gentle Sine Wave Motion
                    // Move based on time + random offset
                    // Y-axis: drift up slowly
                    positions[i3 + 1] += 0.02; 
                    
                    // X-axis: mild sway
                    positions[i3] += Math.sin(time * 0.5 + offsets[i]) * 0.02;

                    // Reset if particles go too high
                    if(positions[i3 + 1] > 50) {
                        positions[i3 + 1] = -50;
                    }
                }
                particlesMesh.geometry.attributes.position.needsUpdate = true;

                // Whole system rotation
                particlesMesh.rotation.y = time * 0.05;
                particlesMesh.rotation.z = time * 0.02;

                // Slight Mouse Parallax
                particlesMesh.rotation.x += (mouseY * 0.05 - particlesMesh.rotation.x) * 0.05;
                particlesMesh.rotation.y += (mouseX * 0.05 - particlesMesh.rotation.y) * 0.05;

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
        </script>

    </body>
    </html>
    `;

    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`🏴‍☠️ Haki Theme running on port ${port}`);
});