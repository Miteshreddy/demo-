import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920, height=1080, initial-scale=1.0">
  <title>NEXA - Business Intelligence & Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1920px;
      height: 1080px;
      background-color: #09090b;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 160px 160px;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Subtle ambient dark gradient glow */
    body::before {
      content: '';
      position: absolute;
      top: -20%;
      left: 10%;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Top Navbar */
    .navbar {
      height: 90px;
      padding: 0 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      z-index: 10;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      text-decoration: none;
      color: #ffffff;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-logo svg {
      width: 28px;
      height: 28px;
    }

    .brand-name {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #ffffff;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
      font-weight: 500;
      color: #a1a1aa;
      cursor: pointer;
      transition: color 0.2s;
    }

    .nav-item svg {
      width: 12px;
      height: 12px;
      opacity: 0.6;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .nav-signin {
      font-size: 15px;
      font-weight: 500;
      color: #a1a1aa;
      text-decoration: none;
    }

    .btn-nav-started {
      background: #ffffff;
      color: #09090b;
      font-size: 15px;
      font-weight: 700;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
    }

    /* Hero Section */
    .hero-container {
      flex: 1;
      padding: 70px 100px 60px 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1400px;
      position: relative;
      z-index: 5;
    }

    .tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #71717a;
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    .green-dot {
      width: 8px;
      height: 8px;
      background-color: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.7);
    }

    .main-headline {
      font-size: 106px;
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.04em;
      margin-bottom: 36px;
    }

    .headline-bright {
      color: #ffffff;
      display: block;
    }

    .headline-dimmed {
      color: #3f3f46;
      display: block;
    }

    .hero-desc {
      font-size: 22px;
      font-weight: 400;
      line-height: 1.55;
      color: #71717a;
      max-width: 680px;
      margin-bottom: 44px;
    }

    .hero-buttons {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 48px;
    }

    .btn-hero-primary {
      background: #ffffff;
      color: #09090b;
      font-size: 17px;
      font-weight: 700;
      padding: 16px 36px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
    }

    .btn-hero-secondary {
      background: #18181b;
      color: #f4f4f5;
      font-size: 17px;
      font-weight: 600;
      padding: 16px 36px;
      border-radius: 9999px;
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .feature-checklist {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .check-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #71717a;
    }

    .check-icon {
      width: 16px;
      height: 16px;
      border: 1.5px solid #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #22c55e;
    }

    .check-icon svg {
      width: 10px;
      height: 10px;
      stroke-width: 3;
    }
  </style>
</head>
<body>
  <!-- Top Navigation Bar -->
  <nav class="navbar">
    <a href="#" class="brand">
      <div class="brand-logo">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L11 12V20L4 12V4Z" fill="#FFFFFF"/>
          <path d="M20 4L13 12V20L20 12V4Z" fill="#A1A1AA"/>
          <path d="M11 12L20 4H14L7 12H11Z" fill="#FFFFFF"/>
        </svg>
      </div>
      <span class="brand-name">NEXA</span>
    </a>

    <ul class="nav-menu">
      <li class="nav-item">
        <span>Product</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="nav-item">
        <span>Solutions</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="nav-item">
        <span>Resources</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="nav-item">
        <span>Pricing</span>
      </li>
    </ul>

    <div class="nav-right">
      <a href="#" class="nav-signin">Sign in</a>
      <a href="#" class="btn-nav-started">Get started</a>
    </div>
  </nav>

  <!-- Hero Content -->
  <div class="hero-container">
    <div class="tag-badge">
      <span class="green-dot"></span>
      <span>BUSINESS INTELLIGENCE & OPERATIONS</span>
    </div>

    <h1 class="main-headline">
      <span class="headline-bright">See what's</span>
      <span class="headline-bright">happening</span>
      <span class="headline-dimmed">across your</span>
      <span class="headline-dimmed">business.</span>
    </h1>

    <p class="hero-desc">
      Track performance, investigate activity, and turn operational data into clear decisions.
    </p>

    <div class="hero-buttons">
      <a href="#" class="btn-hero-primary">Get started</a>
      <a href="#" class="btn-hero-secondary">See how it works</a>
    </div>

    <div class="feature-checklist">
      <div class="check-item">
        <div class="check-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span>No setup required</span>
      </div>

      <div class="check-item">
        <div class="check-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span>Demo data included</span>
      </div>

      <div class="check-item">
        <div class="check-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span>Portfolio demo project</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

const tempHtmlPath = path.join(__dirname, 'nexa_preview.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

const outputPngPublic = path.join(__dirname, '..', 'public', 'projects', 'nexa', 'screenshot.png');
const outputPngDist = path.join(__dirname, '..', 'dist', 'projects', 'nexa', 'screenshot.png');

console.log('Rendering high-res screenshot of NEXA using headless browser...');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserExe = fs.existsSync(edgePath) ? `"${edgePath}"` : `"${chromePath}"`;

const cmd = `${browserExe} --headless --disable-gpu --window-size=1920,1080 --hide-scrollbars --screenshot="${outputPngPublic}" "file://${tempHtmlPath.replace(/\\\\/g, '/')}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('Successfully created:', outputPngPublic);
  if (fs.existsSync(path.join(__dirname, '..', 'dist', 'projects', 'nexa'))) {
    fs.copyFileSync(outputPngPublic, outputPngDist);
    console.log('Successfully copied to dist:', outputPngDist);
  }
} catch (err) {
  console.error('Error taking screenshot:', err);
}
