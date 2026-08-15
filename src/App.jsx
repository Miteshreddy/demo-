import React, { useState, useEffect, useRef } from 'react';
import './index.css';

/* ===================================================
   CUSTOM CURSOR
   =================================================== */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => { if (ringRef.current) ringRef.current.classList.add('expand'); };
    const onLeave = () => { if (ringRef.current) ringRef.current.classList.remove('expand'); };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px';
        dotRef.current.style.top = pos.current.y + 'px';
      }
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"], .project-item, .tool-item, .gallery-item').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} aria-hidden="true" />
      <div className="cursor--ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

/* ===================================================
   NAVBAR
   =================================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a href="#hero" className="navbar__logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          MITESH<sup>®</sup>
        </a>
        <ul className="navbar__nav">
          {['work', 'about', 'skills', 'contact'].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                {id.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:miteshguduru@gmail.com" className="navbar__availability">
          AVAILABLE FOR OPPORTUNITIES
        </a>
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        {['work', 'about', 'skills', 'contact'].map((id) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
            {id.toUpperCase()}
          </a>
        ))}
        <span className="mobile-menu__avail">Available for opportunities</span>
      </div>
    </>
  );
}

/* ===================================================
   HERO
   =================================================== */
function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.06) translate(${xPct * 0.3}px, ${yPct * 0.3}px)`;
      }
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', onMove);
    return () => { if (el) el.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef} aria-label="Hero section">
      {/* Cinematic hero image */}
      <div className="hero__img-wrap" aria-hidden="true">
        <img
          ref={imgRef}
          src="/images/hero_workspace.jpg"
          alt="Creative editing workstation"
          className="hero__img"
          loading="eager"
        />
        <div className="hero__img-overlay" />
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow" aria-label="Location">
          BASED IN HYDERABAD&nbsp;•&nbsp;INDIA
        </div>

        <h1 className="hero__headline" aria-label="Creative Meets Technology">
          <span className="line"><span className="line-inner l1">CREATIVE</span></span>
          <span className="line"><span className="line-inner l2">MEETS</span></span>
          <span className="line"><span className="line-inner l3">TECHNOLOGY.</span></span>
        </h1>

        <p className="hero__sub">
          I build visual experiences, edit stories, design interfaces and
          explore AI-powered creative workflows.
        </p>

        <div className="hero__actions">
          <a
            href="#work"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            VIEW MY WORK
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="mailto:miteshguduru@gmail.com" className="btn btn--outline">
            LET'S TALK
          </a>
        </div>

        <div className="hero__ticker" aria-label="Expertise areas">
          <div className="hero__ticker-label">EXPERTISE</div>
          <div className="hero__ticker-items" role="list">
            {['Adobe', 'Canva', 'AI', 'Web', 'Motion'].map((item) => (
              <span key={item} className="ticker-pill" role="listitem">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative number */}
      <div className="hero__deco" aria-hidden="true">
        <div className="hero__deco-number">01</div>
      </div>
    </section>
  );
}

/* ===================================================
   MARQUEE STRIP
   =================================================== */
function MarqueeStrip() {
  const items = [
    'VIDEO EDITING', 'MOTION DESIGN', 'UI/UX', 'AI',
    'WEB DEVELOPMENT', 'WORDPRESS', 'CREATIVE TECHNOLOGY',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section" aria-label="Services offered" role="region">
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===================================================
   ABOUT
   =================================================== */
function About() {
  return (
    <section id="about" className="section about" aria-label="About Mitesh">
      <div className="about__grid">
        <div className="about__left reveal">
          <div className="eyebrow">THE PERSON</div>
          <h2 className="about__label">ABOUT<br />ME</h2>

          {/* Workspace image */}
          <div className="about__img-wrap">
            <img
              src="/images/about_workspace.jpg"
              alt="Creative workspace — laptop, drawing tablet and notebook"
              className="about__img"
              loading="lazy"
            />
            <div className="about__img-label">CREATIVE WORKSPACE</div>
          </div>
        </div>

        <div className="about__right">
          <p className="about__text reveal reveal-delay-1">
            I'm Mitesh. I enjoy working where creativity and technology meet.
            My strongest area is visual content creation — especially video editing
            and motion graphics — but I also enjoy building websites and experimenting
            with AI and machine learning.
          </p>
          <p className="about__text reveal reveal-delay-2">
            I like learning by building things. That has taken me from editing videos
            and creating graphics to developing web applications and experimenting
            with AI-assisted tools. Every project teaches me something new about the
            space where design and technology overlap.
          </p>

          <div className="about__identity reveal reveal-delay-2">
            <div className="about__identity-name">G. MITESH</div>
            <div className="about__identity-role">Creative Technologist</div>
            <div className="about__identity-tags">
              Video Editor&nbsp;•&nbsp;Designer&nbsp;•&nbsp;AI Enthusiast&nbsp;•&nbsp;Web Developer
            </div>
          </div>

          <div className="about__tags reveal reveal-delay-3" role="list" aria-label="Roles">
            {['Video Editor', 'UI/UX Designer', 'AI Enthusiast', 'Web Developer', 'Motion Designer'].map((tag) => (
              <span key={tag} className="about__tag" role="listitem">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   PROJECT VISUAL — now uses real images with SVG overlay
   =================================================== */
function ProjectVisual({ type, title, imageSrc }) {
  const accentColors = {
    1: 'rgba(26,74,255,0.45)',
    2: 'rgba(0,180,120,0.4)',
    3: 'rgba(200,80,80,0.4)',
    4: 'rgba(255,140,0,0.4)',
  };
  const accent = accentColors[type] || accentColors[1];

  return (
    <div className="project-item__visual-inner">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${title} project visual`}
          className="project-item__img"
          loading="lazy"
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#0A0A0A' }} />
      )}

      {/* Overlay tint */}
      <div
        className="project-item__img-overlay"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, rgba(0,0,0,0.55) 100%)` }}
      />

      {/* SVG grid decoration */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${type}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,240,232,1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${type})`} />
      </svg>

      {/* Arrow */}
      <div className="project-item__arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

/* ===================================================
   PROJECT MODAL
   =================================================== */
function ProjectModal({ project, onClose }) {
  const isOpen = !!project;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return (
    <div className="modal-overlay" aria-hidden="true">
      <div className="modal" role="dialog" />
    </div>
  );

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div className="modal">
        <div className="modal__header">
          <div>
            <div className="modal__cat">{project.category}</div>
            <h2 className="modal__title">{project.title}</h2>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal__visual">
          {project.imageSrc ? (
            <img
              src={project.imageSrc}
              alt={`${project.title} — concept visual`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <ProjectVisual type={project.visualType} title={project.title} />
          )}
        </div>

        {project.imageSrc && (
          <div className="modal__img-note">
            Visual concept representation — not a production screenshot.
          </div>
        )}

        <div className="modal__body">
          <div>
            <div className="modal__label">DESCRIPTION</div>
            <p className="modal__text">{project.description}</p>
          </div>
          <div>
            <div className="modal__label">ROLE</div>
            <p className="modal__text">{project.role}</p>
          </div>
          <div>
            <div className="modal__label">TOOLS & TECHNOLOGIES</div>
            <div className="modal__tools">
              {project.tools.map((t) => (
                <span key={t} className="modal__tool-tag">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="modal__label">OUTCOME</div>
            <p className="modal__text">{project.outcome}</p>
          </div>
          <div className="modal__body-full">
            <div className="modal__label">PROCESS</div>
            <p className="modal__text">{project.process}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   SELECTED WORK
   =================================================== */
const PROJECTS = [
  {
    num: '01',
    title: 'KAIZ STUDIO',
    category: 'AI / VIDEO / CREATIVE TECHNOLOGY',
    description: 'An AI-assisted video editing workflow exploring how repetitive editing tasks can be made faster and more creative without losing human judgment.',
    role: 'Creative Lead / Video Editor / Workflow Designer',
    tools: ['Premiere Pro', 'After Effects', 'AI Tools', 'Automation Scripts'],
    process: 'Started by identifying the most time-consuming parts of video editing — sync, color grading, and cut selection. Built a workflow that layers AI suggestions on top of manual creative decisions, keeping human judgment at the center.',
    outcome: 'A personal workflow system that significantly reduces turnaround time on video projects while maintaining a high creative standard.',
    visualType: 1,
    imageSrc: '/images/kaiz_studio.jpg',
  },
  {
    num: '02',
    title: 'AGROXAI',
    category: 'MACHINE LEARNING / WEB',
    description: 'An AI-powered crop recommendation application combining machine learning with a full web interface. Trained on agricultural datasets to suggest optimal crops based on environmental inputs.',
    role: 'ML Developer / Full Stack Developer',
    tools: ['Python', 'XGBoost', 'Scikit-learn', 'React', 'MongoDB'],
    process: 'Trained a machine learning model on agricultural datasets to recommend optimal crops based on soil, climate, and environmental inputs. Connected the model to a React-based web interface for ease of use.',
    outcome: 'A working full-stack ML application demonstrating end-to-end model deployment from data to UI.',
    visualType: 2,
    imageSrc: '/images/agroxai.jpg',
  },
  {
    num: '03',
    title: 'COMPUTER VISION LAB',
    category: 'AI / COMPUTER VISION',
    description: 'Experiments with image processing, OpenCV and computer vision workflows — exploring what machines can learn to see through edge detection, object segmentation and feature matching.',
    role: 'Research / Developer',
    tools: ['Python', 'OpenCV', 'NumPy', 'Scikit-learn'],
    process: 'Explored classic and modern computer vision techniques: edge detection, object segmentation, feature matching and basic classification. Used Python and OpenCV as primary tools.',
    outcome: 'A collection of working vision experiments that deepened understanding of how machine perception works at a fundamental level.',
    visualType: 3,
    imageSrc: '/images/cv_lab.jpg',
  },
  {
    num: '04',
    title: 'CREATIVE EDITING',
    category: 'ADOBE / MOTION / VIDEO',
    description: 'Video edits, motion graphics, visual storytelling and content experiments created using Adobe Creative Cloud. An ongoing practice of editing stories and refining visual instincts.',
    role: 'Video Editor / Motion Designer / Visual Artist',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Audition', 'Canva'],
    process: 'An ongoing personal practice of editing video stories, creating motion graphics, designing thumbnails and experimenting with visual effects. Each project refines editing instincts and visual taste.',
    outcome: 'A growing body of creative work that demonstrates strong command of the Adobe ecosystem and a distinct visual style.',
    visualType: 4,
    imageSrc: '/images/creative_editing.jpg',
  },
];

function Work() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="section work-section" aria-label="Selected work">
      <div className="work-header">
        <h2 className="work-header__title reveal">SELECTED<br />WORK</h2>
        <p className="work-header__sub reveal reveal-delay-1">
          A few things I've built, edited and experimented with.
        </p>
      </div>

      <div className="project-list" role="list">
        {PROJECTS.map((project) => (
          <article
            key={project.num}
            className="project-item reveal"
            role="listitem"
            onClick={() => setActiveProject(project)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProject(project); }}
            aria-label={`Project: ${project.title}. ${project.category}`}
          >
            <div className="project-item__num" aria-hidden="true">{project.num}</div>
            <div className="project-item__info">
              <div className="project-item__cat">{project.category}</div>
              <h3 className="project-item__title">{project.title}</h3>
              <p className="project-item__desc">{project.description}</p>
              <div className="project-item__tags" role="list" aria-label="Technologies">
                {project.tools.map((t) => (
                  <span key={t} className="project-item__tag" role="listitem">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-item__visual">
              <ProjectVisual type={project.visualType} title={project.title} imageSrc={project.imageSrc} />
            </div>
          </article>
        ))}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

/* ===================================================
   STATISTICS
   =================================================== */
function Stats() {
  const stats = [
    { num: '01', label: 'MAIN CREATIVE\nFOCUS' },
    { num: '05+', label: 'ADOBE /\nCREATIVE TOOLS' },
    { num: '04+', label: 'TECHNICAL\nDOMAINS' },
    { num: '∞', label: 'IDEAS\nTO BUILD' },
  ];

  return (
    <section className="stats-section" aria-label="Personal metrics">
      <div className="container">
        <div className="eyebrow eyebrow--light reveal" style={{ paddingBottom: '1.5rem' }}>BY THE NUMBERS</div>
      </div>
      <div className="stats-grid" role="list">
        {stats.map((s, i) => (
          <div key={i} className={`stat-item reveal reveal-delay-${i + 1}`} role="listitem">
            <div className="stat-item__num" aria-label={s.num}>{s.num}</div>
            <div className="stat-item__label">{s.label.split('\n').map((l, j) => (
              <React.Fragment key={j}>{l}{j === 0 ? <br /> : null}</React.Fragment>
            ))}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================================================
   CREATIVE TOOLKIT (ADOBE + TOOLS)
   =================================================== */
const TOOLS = [
  { name: 'PREMIERE PRO', use: 'Video editing • storytelling • pacing', color: '#4FC3F7', abbr: 'Pr' },
  { name: 'AFTER EFFECTS', use: 'Motion graphics • animation • visual effects', color: '#9FA8DA', abbr: 'Ae' },
  { name: 'PHOTOSHOP', use: 'Thumbnails • image editing • compositing', color: '#31A8FF', abbr: 'Ps' },
  { name: 'ILLUSTRATOR', use: 'Graphic design • vector artwork • branding', color: '#FF9A00', abbr: 'Ai' },
  { name: 'AUDITION', use: 'Audio cleanup • sound design • mixing', color: '#00E4BB', abbr: 'Au' },
  { name: 'CANVA', use: 'Fast layouts • social graphics • presentations', color: '#00C4CC', abbr: 'Cv' },
];

function Toolkit() {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);

  return (
    <section className="section toolkit-section" aria-label="Creative toolkit">
      <div className="toolkit-header reveal">
        <div className="eyebrow">THE CREATIVE TOOLKIT</div>
        <h2 className="toolkit-title">ADOBE</h2>
        <div className="toolkit-subtitle">+ CANVA + MORE</div>
      </div>

      <div className="toolkit-grid">
        <ul className="tool-list" role="list" aria-label="Creative tools">
          {TOOLS.map((tool) => (
            <li
              key={tool.name}
              className={`tool-item ${activeTool.name === tool.name ? 'tool-item--active' : ''}`}
              role="listitem"
              onMouseEnter={() => setActiveTool(tool)}
              tabIndex={0}
              onFocus={() => setActiveTool(tool)}
              aria-label={`${tool.name}: ${tool.use}`}
            >
              <div className="tool-item__abbr" style={{ color: tool.color }}>{tool.abbr}</div>
              <span className="tool-item__name">{tool.name}</span>
              <span className="tool-item__use" aria-hidden="true">{tool.use}</span>
            </li>
          ))}
        </ul>

        <div className="tool-preview reveal reveal-delay-2" aria-live="polite" aria-label={`Preview: ${activeTool.name}`}>
          <div className="tool-preview__content">
            <div
              className="tool-preview__abbr"
              style={{ color: activeTool.color, textShadow: `0 0 60px ${activeTool.color}55` }}
              aria-hidden="true"
            >
              {activeTool.abbr}
            </div>
            <div className="tool-preview__name" style={{ color: activeTool.color }}>
              {activeTool.name}
            </div>
            <div className="tool-preview__desc">
              {activeTool.use}
            </div>
          </div>

          {/* Animated rings */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
            aria-hidden="true"
          >
            <circle cx="50%" cy="50%" r="70" fill="none" stroke={activeTool.color} strokeWidth="1" className="ai-svg-ring"/>
            <circle cx="50%" cy="50%" r="110" fill="none" stroke={activeTool.color} strokeWidth="0.5" className="ai-svg-ring-2"/>
            <circle cx="50%" cy="50%" r="8" fill={activeTool.color} opacity="0.3" className="ai-svg-dot"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   AI SECTION
   =================================================== */
function AISection() {
  const items = [
    {
      num: '01',
      title: 'AI ASSISTED EDITING',
      desc: 'Using AI to handle the repetitive parts of video editing — auto-sync, scene selection assistance, color grade suggestions — freeing up time for actual creative decisions.',
    },
    {
      num: '02',
      title: 'CONTENT GENERATION',
      desc: 'Combining AI tools with design thinking to generate visual assets, copy variants and creative starting points that I then refine manually into finished work.',
    },
    {
      num: '03',
      title: 'WORKFLOW AUTOMATION',
      desc: 'Building scripts and tool-chains that connect AI outputs with creative applications, creating hybrid workflows that are both faster and more consistent.',
    },
  ];

  return (
    <section className="ai-section" aria-label="AI and creative workflows">
      <div className="ai-section__bg-orb" aria-hidden="true" />

      <div className="container">
        <div className="ai-section__eyebrow reveal">AI + CREATIVITY</div>
        <h2 className="ai-section__title reveal">CREATIVE<br />+ AI</h2>
        <p className="ai-section__quote reveal reveal-delay-1">
          "I use AI as a creative tool, not as a replacement for creativity."
        </p>

        <div className="ai-items" role="list">
          {items.map((item) => (
            <div key={item.num} className="ai-item reveal" role="listitem">
              <div className="ai-item__num">{item.num}</div>
              <h3 className="ai-item__title">{item.title}</h3>
              <p className="ai-item__desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* SVG AI Visualization */}
        <div className="ai-viz reveal" aria-hidden="true">
          <svg width="320" height="140" viewBox="0 0 320 140" fill="none" role="presentation">
            <circle cx="160" cy="70" r="50" stroke="rgba(26,74,255,0.35)" strokeWidth="1" className="ai-svg-ring"/>
            <circle cx="160" cy="70" r="32" stroke="rgba(26,74,255,0.2)" strokeWidth="1" className="ai-svg-ring-2"/>
            <circle cx="160" cy="70" r="7" fill="rgba(26,74,255,0.6)" className="ai-svg-dot"/>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 160 + 50 * Math.cos(rad);
              const y = 70 + 50 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="3" fill="rgba(26,74,255,0.5)" />;
            })}
            <line x1="0" y1="70" x2="108" y2="70" stroke="rgba(26,74,255,0.15)" strokeWidth="0.5"/>
            <line x1="212" y1="70" x2="320" y2="70" stroke="rgba(26,74,255,0.15)" strokeWidth="0.5"/>
            {/* Labels */}
            <text x="0" y="60" fill="rgba(26,74,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">AI</text>
            <text x="270" y="60" fill="rgba(26,74,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">CREATE</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   UI/UX SECTION
   =================================================== */
function UXSection() {
  const concepts = [
    { num: '01', name: 'MEDIA DASHBOARD', desc: 'Desktop interface concept for a media management platform', type: 'dashboard' },
    { num: '02', name: 'AI CREATIVE TOOL', desc: 'Interface concept for an AI-powered design assistant', type: 'ai-tool' },
    { num: '03', name: 'CONTENT WORKSPACE', desc: 'Layout concept for a collaborative content creation space', type: 'workspace' },
  ];

  const MockScreen = ({ type }) => {
    if (type === 'dashboard') return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="mock-nav">
          <div className="mock-dot" />
          <div className="mock-dot" />
          <div className="mock-dot" />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '8px', gap: '6px' }}>
            {['Dashboard', 'Analytics', 'Media', 'Settings'].map(t => (
              <div key={t} style={{ fontSize: '5px', color: 'rgba(245,240,232,0.3)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div className="mock-sidebar">
            <div className="mock-sidebar-item active" />
            <div className="mock-sidebar-item" />
            <div className="mock-sidebar-item" />
            <div className="mock-sidebar-item" />
          </div>
          <div className="mock-body">
            <div style={{ fontSize: '6px', color: 'rgba(245,240,232,0.5)', fontFamily: 'monospace', marginBottom: '8px', letterSpacing: '0.1em' }}>OVERVIEW</div>
            <div className="mock-row">
              <div className="mock-card"><div className="mock-bar accent" /><div className="mock-bar thin" /></div>
              <div className="mock-card"><div className="mock-bar accent" style={{ width: '40%' }} /><div className="mock-bar thin" /></div>
              <div className="mock-card"><div className="mock-bar accent" style={{ width: '80%' }} /><div className="mock-bar thin" /></div>
            </div>
            <div className="mock-card">
              <div style={{ fontSize: '5px', color: 'rgba(245,240,232,0.3)', fontFamily: 'monospace', marginBottom: '6px' }}>PERFORMANCE</div>
              <div className="mock-chart">
                {[45, 70, 55, 80, 60, 90, 65].map((h, i) => (
                  <div key={i} className="mock-chart-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (type === 'ai-tool') return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(26,74,255,0.6)' }} />
          <div style={{ fontSize: '6px', color: 'rgba(26,74,255,0.8)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>AI CREATIVE ASSISTANT</div>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: 'Generate', color: 'rgba(26,74,255,0.4)' },
            { label: 'Refine', color: 'rgba(100,200,100,0.3)' },
            { label: 'Export', color: 'rgba(255,160,0,0.3)' },
            { label: 'History', color: 'rgba(200,80,200,0.3)' },
          ].map((item, i) => (
            <div key={i} className="mock-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ height: '4px', background: item.color, borderRadius: '2px', width: '40%' }} />
              <div style={{ fontSize: '5px', color: 'rgba(245,240,232,0.4)', fontFamily: 'monospace' }}>{item.label}</div>
              <div className="mock-bar thin" />
              <div className="mock-bar thin" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px', height: '28px', background: 'rgba(26,74,255,0.25)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '5px', color: 'rgba(26,74,255,0.9)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>GENERATE →</div>
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="mock-nav">
          <div className="mock-dot" />
          <div className="mock-dot" />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
            {[1, 2, 3].map((i) => <div key={i} className="mock-dot" style={{ width: '20px', borderRadius: '2px' }} />)}
          </div>
        </div>
        <div className="mock-body">
          <div style={{ fontSize: '6px', color: 'rgba(245,240,232,0.5)', fontFamily: 'monospace', marginBottom: '8px', letterSpacing: '0.1em' }}>CONTENT WORKSPACE</div>
          <div className="mock-bar accent" style={{ height: '10px', width: '65%', marginBottom: '4px' }} />
          <div className="mock-bar thin" style={{ marginBottom: '12px' }} />
          <div className="mock-row">
            {[
              { h: '50%', opacity: 0.12 },
              { h: '50%', opacity: 0.18 },
              { h: '50%', opacity: 0.24 },
            ].map((item, i) => (
              <div key={i} className="mock-card" style={{ aspectRatio: '1' }}>
                <div style={{ width: '100%', height: item.h, background: `rgba(26,74,255,${item.opacity})`, borderRadius: '2px', marginBottom: '8px' }} />
                <div className="mock-bar thin" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section ux-section" aria-label="UI/UX interface concepts">
      <div className="ux-header reveal">
        <div className="eyebrow">INTERFACE THINKING</div>
        <h2 className="ux-title">DESIGN<br />CONCEPTS</h2>
        <p className="ux-sub">Concept explorations in UI/UX — not claimed client work.</p>
      </div>

      <div className="ux-concepts" role="list">
        {concepts.map((c, i) => (
          <div key={c.num} className={`ux-concept reveal reveal-delay-${i + 1}`} role="listitem">
            <div className="ux-concept__screen" aria-label={`UI mockup for ${c.name}`}>
              <MockScreen type={c.type} />
            </div>
            <div className="ux-concept__label">{c.num} — CONCEPT</div>
            <div className="ux-concept__name">{c.name}</div>
            <div className="ux-concept__desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================================================
   PROCESS SECTION
   =================================================== */
function Process() {
  const steps = [
    { num: '01', title: 'IDEA', desc: 'Starting with a clear problem or creative brief. Understanding what needs to be made and why it matters.' },
    { num: '02', title: 'EXPLORE', desc: 'Research, references, sketches and experimentation. Finding the right direction before committing to execution.' },
    { num: '03', title: 'BUILD', desc: 'Hands-on execution — editing, coding, designing. Iterating quickly and making decisions directly in the work.' },
    { num: '04', title: 'REFINE', desc: 'Polishing the details. Improving pacing, spacing, performance and overall quality until the result feels right.' },
  ];

  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const timer = setInterval(() => {
            setActiveStep(i);
            i++;
            if (i >= steps.length) clearInterval(timer);
          }, 300);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section" ref={sectionRef} aria-label="How I work">
      <div className="container">
        <div className="eyebrow eyebrow--light reveal">MY PROCESS</div>
        <h2 className="process-title reveal">HOW I WORK</h2>
        <div className="process-steps" role="list">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-step ${i <= activeStep ? 'active' : ''}`}
              role="listitem"
              aria-label={`Step ${step.num}: ${step.title}`}
            >
              <div className="process-step__num" aria-hidden="true">{step.num}</div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   SKILLS
   =================================================== */
function Skills() {
  const groups = [
    {
      title: 'CREATIVE',
      items: ['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Audition', 'Canva'],
    },
    {
      title: 'DEVELOPMENT',
      items: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Python'],
    },
    {
      title: 'AI / ML',
      items: ['Python', 'Scikit-learn', 'XGBoost', 'OpenCV', 'ML Workflows', 'AI APIs'],
    },
    {
      title: 'WEB',
      items: ['React', 'WordPress', 'MongoDB', 'REST APIs'],
    },
  ];

  return (
    <section id="skills" className="section skills-section" aria-label="Skills">
      <div className="eyebrow reveal">CAPABILITIES</div>
      <h2 className="skills-title reveal">SKILL<br />ECOSYSTEM</h2>
      <p className="skills-subtitle reveal reveal-delay-1">Tools and domains I work across.</p>

      <div className="skills-grid" role="list">
        {groups.map((group, i) => (
          <div key={group.title} className={`skill-group reveal reveal-delay-${i + 1}`} role="listitem">
            <div className="skill-group__title">{group.title}</div>
            <ul className="skill-group__items" aria-label={`${group.title} skills`}>
              {group.items.map((item) => (
                <li key={item} className="skill-group__item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================================================
   GALLERY — Visual work showcase
   =================================================== */
const GALLERY_ITEMS = [
  {
    id: 'g1',
    src: '/images/kaiz_studio.jpg',
    title: 'VIDEO EDITING',
    category: 'AI / Creative Workflow',
    ratio: 'landscape',
  },
  {
    id: 'g2',
    src: '/images/gallery_design.jpg',
    title: 'GRAPHIC DESIGN',
    category: 'Vector / Typography',
    ratio: 'portrait',
  },
  {
    id: 'g3',
    src: '/images/gallery_motion.jpg',
    title: 'MOTION GRAPHICS',
    category: 'Animation / VFX',
    ratio: 'landscape',
  },
  {
    id: 'g4',
    src: '/images/gallery_ui.jpg',
    title: 'UI DESIGN',
    category: 'Dashboard / SaaS',
    ratio: 'square',
  },
  {
    id: 'g5',
    src: '/images/agroxai.jpg',
    title: 'AI DEVELOPMENT',
    category: 'Machine Learning / Web',
    ratio: 'landscape',
  },
  {
    id: 'g6',
    src: '/images/gallery_web.jpg',
    title: 'WEB DEVELOPMENT',
    category: 'React / Full Stack',
    ratio: 'square',
  },
];

function Gallery() {
  return (
    <section className="gallery-section" aria-label="Visual work gallery">
      <div className="gallery-header reveal">
        <div className="eyebrow eyebrow--light">VISUAL WORK</div>
        <h2 className="gallery-title">CREATIVE<br />GALLERY</h2>
      </div>

      <div className="gallery-grid" role="list">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`gallery-item gallery-item--${item.ratio} reveal`}
            role="listitem"
            aria-label={`${item.title} — ${item.category}`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="gallery-item__img"
              loading="lazy"
            />
            <div className="gallery-item__overlay" aria-hidden="true">
              <div className="gallery-item__cat">{item.category}</div>
              <div className="gallery-item__title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================================================
   CONTACT
   =================================================== */
function Contact() {
  return (
    <section id="contact" className="contact-section" aria-label="Contact Mitesh">
      <div className="contact-eyebrow reveal">GET IN TOUCH</div>
      <h2 className="contact-title reveal">
        HAVE AN IDEA?<br />
        LET'S BUILD IT.
      </h2>
      <p className="contact-sub reveal reveal-delay-1">
        Open to internships, creative opportunities and interesting projects.
      </p>

      <div className="contact-actions reveal reveal-delay-2">
        <a href="mailto:miteshguduru@gmail.com" className="btn--contact primary">
          EMAIL ME
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 12L12 1M12 1H4M12 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/mitesh-reddy-57291335/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn--contact ghost"
          aria-label="LinkedIn profile (opens in new tab)"
        >
          LINKEDIN ↗
        </a>
        <a
          href="https://github.com/Miteshreddy"
          target="_blank"
          rel="noopener noreferrer"
          className="btn--contact ghost"
          aria-label="GitHub profile (opens in new tab)"
        >
          GITHUB ↗
        </a>
      </div>

      <div className="contact-email reveal reveal-delay-3">
        <div className="contact-email__label">OR WRITE DIRECTLY</div>
        <a href="mailto:miteshguduru@gmail.com" className="contact-email__addr">
          miteshguduru@gmail.com
        </a>
      </div>
    </section>
  );
}

/* ===================================================
   FOOTER
   =================================================== */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div>
        <div className="footer__logo">MITESH<sup>®</sup></div>
        <div className="footer__tagline">Creative Technologist</div>
      </div>
      <div className="footer__tagline" style={{ textAlign: 'center' }}>
        "Built with curiosity."
      </div>
      <div className="footer__copy">
        © 2026 G. Mitesh
      </div>
    </footer>
  );
}

/* ===================================================
   SCROLL REVEAL HOOK
   =================================================== */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

/* ===================================================
   APP ROOT
   =================================================== */
export default function App() {
  useScrollReveal();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      {!prefersReducedMotion && <CustomCursor />}
      <a href="#main-content" className="sr-only" style={{
        position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden',
      }}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeStrip />
        <About />
        <Work />
        <Stats />
        <Toolkit />
        <AISection />
        <UXSection />
        <Process />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
