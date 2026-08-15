# Portfolio Website

A modern, high-performance portfolio website built with React and Vite.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

- Check Node version:
  ```bash
  node -v
  ```
- Check npm version:
  ```bash
  npm -v
  ```

---

### 2. Installation
Clone or navigate into the project directory and install the necessary dependencies:

```bash
cd g:\project\Portfolio
npm install
```

---

### 3. Development Server
To start the local development server with hot module replacement (HMR):

```bash
npm run dev
```

Once running, open your browser and go to:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

### 4. Build for Production
To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

---

### 5. Preview Production Build
To test the production build locally before deployment:

```bash
npm run preview
```

---

## 📁 Project Structure

```
Portfolio/
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── assets/          # Project-specific icons and graphics
│   ├── data/            # Content, project details, and data models
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global design tokens and styling
│   └── main.jsx         # Application entry point
├── scripts/             # Utility scripts
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── vercel.json          # Deployment configuration for Vercel
```

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 19
- **Build Tool / Bundler**: Vite 8
- **Styling**: Vanilla CSS (Tailored Design System)
- **Deployment**: Vercel ready
