<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanjava Recordings – Progressive House Label</title>
    <link href="https://fonts.googleapis.com/css2?family=Domaine+Display:wght@400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --sky-aqua: #00d4ff;
            --gunmetal: #393e41;
            --sage-green: #70ae6e;
            --atomic-tangerine: #ef7b45;
            --brick-ember: #ba2d0b;
            --bg-dark: #0f1011;
            --bg-surface: #191b1d;
            --text-primary: #f5f7f9;
            --text-secondary: #a9b3ba;
            --text-tertiary: #717a82;
            --border-subtle: #252a2f;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'IBM Plex Sans', sans-serif;
            background: var(--bg-dark);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
            font-size: 15px;
            font-weight: 300;
            letter-spacing: 0.3px;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        /* ===== NAVIGATION ===== */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(15, 16, 17, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-subtle);
            padding: 1.5rem 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Domaine Display', serif;
            font-size: 22px;
            font-weight: 400;
            letter-spacing: 2px;
            color: var(--text-primary);
        }

        nav ul {
            display: flex;
            gap: 3rem;
            list-style: none;
        }

        nav a {
            font-size: 13px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--text-secondary);
            transition: color 0.3s ease;
            font-weight: 400;
        }

        nav a:hover {
            color: var(--sky-aqua);
        }

        /* ===== HERO ===== */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            margin-top: 60px;
        }

        .hero-image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-dark) 100%);
            z-index: 0;
        }

        .hero-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(239, 123, 69, 0.06) 0%, transparent 50%);
        }

        .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 700px;
            animation: fadeIn 1s ease-out;
        }

        .hero-label {
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--sky-aqua);
            margin-bottom: 2rem;
            font-weight: 500;
        }

        .hero h1 {
            font-family: 'Domaine Display', serif;
            font-size: 72px;
            font-weight: 400;
            line-height: 1;
            margin-bottom: 1.5rem;
            letter-spacing: -1px;
        }

        .hero p {
            font-size: 18px;
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 2rem;
            font-weight: 300;
        }

        .scroll-indicator {
            position: absolute;
            bottom: 3rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 13px;
            color: var(--text-tertiary);
            letter-spacing: 1px;
            text-transform: uppercase;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {

            0%,
            100% {
                transform: translateX(-50%) translateY(0);
            }

            50% {
                transform: translateX(-50%) translateY(8px);
            }
        }

        /* ===== RELEASES SECTION ===== */
        .releases {
            padding: 6rem 3rem;
            background: var(--bg-dark);
        }

        .section-header {
            max-width: 900px;
            margin: 0 auto 5rem;
        }

        .section-header h2 {
            font-family: 'Domaine Display', serif;
            font-size: 48px;
            font-weight: 400;
            margin-bottom: 1rem;
            letter-spacing: -1px;
        }

        .section-header p {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.8;
            max-width: 600px;
        }

        /* Release Grid */
        .releases-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .release-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            overflow: hidden;
            transition: all 0.4s ease;
            cursor: pointer;
            aspect-ratio: 1;
            display: flex;
            flex-direction: column;
        }

        .release-image {
            flex: 1;
            background: linear-gradient(135deg, var(--gunmetal) 0%, var(--border-subtle) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            color: rgba(0, 212, 255, 0.1);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .release-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.15), transparent 60%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .release-card:hover .release-image::after {
            opacity: 1;
        }

        .release-info {
            padding: 1.5rem;
            border-top: 1px solid var(--border-subtle);
        }

        .release-artist {
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--atomic-tangerine);
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .release-title {
            font-family: 'Domaine Display', serif;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 0.5rem;
            line-height: 1.2;
        }

        .release-date {
            font-size: 12px;
            color: var(--text-tertiary);
            letter-spacing: 0.5px;
        }

        .release-card:hover {
            border-color: var(--sky-aqua);
            box-shadow: 0 20px 50px rgba(0, 212, 255, 0.1);
            transform: translateY(-4px);
        }

        /* ===== ABOUT SECTION ===== */
        .about {
            padding: 8rem 3rem;
            background: var(--bg-dark);
            border-top: 1px solid var(--border-subtle);
            border-bottom: 1px solid var(--border-subtle);
        }

        .about-content {
            max-width: 900px;
            margin: 0 auto;
        }

        .about-content h2 {
            font-family: 'Domaine Display', serif;
            font-size: 48px;
            font-weight: 400;
            margin-bottom: 2rem;
            letter-spacing: -1px;
        }

        .about-text {
            font-size: 16px;
            line-height: 1.9;
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }

        .about-text strong {
            color: var(--sky-aqua);
            font-weight: 500;
        }

        /* ===== CONTACT ===== */
        .contact {
            padding: 8rem 3rem;
            background: var(--bg-dark);
        }

        .contact-content {
            max-width: 600px;
            margin: 0 auto;
        }

        .contact h2 {
            font-family: 'Domaine Display', serif;
            font-size: 48px;
            font-weight: 400;
            margin-bottom: 2rem;
            letter-spacing: -1px;
        }

        .contact-links {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .contact-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            transition: all 0.3s ease;
        }

        .contact-link:hover {
            border-color: var(--sky-aqua);
            background: rgba(0, 212, 255, 0.05);
        }

        .contact-label {
            font-size: 14px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--text-secondary);
        }

        .contact-arrow {
            font-size: 18px;
            color: var(--sky-aqua);
            transition: transform 0.3s ease;
        }

        .contact-link:hover .contact-arrow {
            transform: translateX(4px);
        }

        /* ===== FOOTER ===== */
        footer {
            background: var(--bg-surface);
            border-top: 1px solid var(--border-subtle);
            padding: 3rem;
            text-align: center;
            color: var(--text-tertiary);
            font-size: 13px;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .footer-links a {
            color: var(--text-secondary);
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--sky-aqua);
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .release-card {
            animation: fadeIn 0.6s ease-out;
            animation-fill-mode: both;
        }

        .release-card:nth-child(1) {
            animation-delay: 0.1s;
        }

        .release-card:nth-child(2) {
            animation-delay: 0.15s;
        }

        .release-card:nth-child(3) {
            animation-delay: 0.2s;
        }

        .release-card:nth-child(4) {
            animation-delay: 0.25s;
        }

        .release-card:nth-child(5) {
            animation-delay: 0.3s;
        }

        .release-card:nth-child(6) {
            animation-delay: 0.35s;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            nav {
                padding: 1rem 1.5rem;
                flex-direction: column;
                gap: 1.5rem;
            }

            nav ul {
                gap: 1.5rem;
            }

            .hero {
                margin-top: 100px;
            }

            .hero h1 {
                font-size: 42px;
            }

            .releases,
            .about,
            .contact {
                padding: 4rem 1.5rem;
            }

            .section-header h2,
            .about h2,
            .contact h2 {
                font-size: 32px;
            }

            .releases-grid {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
            }
        }
    </style>
</head>

<body>
<!-- Navigation -->
<nav>
    <div class="logo">KANJAVA</div>
    <ul>
        <li><a href="#releases">Releases</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>

<!-- Hero -->
<section class="hero">
    <div class="hero-image"></div>
    <div class="hero-content">
        <div class="hero-label">Est. 2024</div>
        <h1>Kanjava<br>Recordings</h1>
        <p>A progressive house label dedicated to architectural sound design and precision production.</p>
    </div>
    <div class="scroll-indicator">Scroll Down</div>
</section>

<!-- Releases -->
<section class="releases" id="releases">
    <div class="section-header">
        <h2>Latest Releases</h2>
        <p>Our catalog features releases from Kanjava and affiliated artists, each representing a commitment to
            meticulously crafted progressive house music.</p>
    </div>

    <div class="releases-grid">
        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Resonance</div>
                <div class="release-date">2026.05.09</div>
            </div>
        </div>

        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Drift State</div>
                <div class="release-date">2026.04.15</div>
            </div>
        </div>

        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Apex</div>
                <div class="release-date">2026.03.22</div>
            </div>
        </div>

        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Luminescence</div>
                <div class="release-date">2026.02.10</div>
            </div>
        </div>

        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Temporal</div>
                <div class="release-date">2026.01.18</div>
            </div>
        </div>

        <div class="release-card">
            <div class="release-image">◆</div>
            <div class="release-info">
                <div class="release-artist">Kanjava</div>
                <div class="release-title">Beyond</div>
                <div class="release-date">2025.12.28</div>
            </div>
        </div>
    </div>
</section>

<!-- About -->
<section class="about" id="about">
    <div class="about-content">
        <h2>About</h2>
        <p class="about-text">
            <strong>Kanjava Recordings</strong> is a progressive house label built on the foundations of architectural
            sound design and meticulous production. Each release is a carefully constructed composition—designed for
            both the listening room and the dancefloor.
        </p>
        <p class="about-text">
            The label draws influence from the spatial clarity of Eric Prydz and the detailed precision of Jeremy
            Olander, prioritizing compositions that evolve through deliberate pacing and crystalline sound design. Every
            element serves the narrative of the track.
        </p>
        <p class="about-text">
            We believe in <strong>restraint as a compositional tool</strong>—minimal elements deployed with maximum
            impact, silence as design, and modulation that moves with purpose.
        </p>
    </div>
</section>

<!-- Contact -->
<section class="contact" id="contact">
    <div class="contact-content">
        <h2>Get In Touch</h2>

        <div class="contact-links">
            <a href="mailto:contact@kanjava.com" class="contact-link">
                <span class="contact-label">Email</span>
                <span class="contact-arrow">→</span>
            </a>
            <a href="https://spotify.com/kanjavamusic" class="contact-link">
                <span class="contact-label">Spotify</span>
                <span class="contact-arrow">→</span>
            </a>
            <a href="https://www.youtube.com/kanjavamusic" class="contact-link">
                <span class="contact-label">YouTube</span>
                <span class="contact-arrow">->  </span>

            </a>

        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <div class="footer-links">
        <a href="/">Home</a>
        <a href="#releases">Releases</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </div>
    <p>&copy; 2026 Kanjava Recordings. All rights reserved.</p>
</footer>

<script>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Release card interaction
    document.querySelectorAll('.release-card').forEach(card => {
        card.addEventListener('click', function () {
            console.log('Release clicked');
        });
    });
</script>

</body>
</html>