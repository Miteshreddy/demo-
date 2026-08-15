import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { PROJECTS, PROJECT_STATUSES } from './data/projects';
import { SKILL_CATEGORIES } from './data/skills';

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
    document.querySelectorAll('a, button, [role="button"], .project-item, .tool-item, .gallery-item, .work-filter-btn').forEach((el) => {
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
          MITESH<sup>&reg;</sup>
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
          OPEN TO OPPORTUNITIES
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
        <span className="mobile-menu__avail">Open to opportunities</span>
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
      {/* Workspace image */}
      <div className="hero__img-wrap" aria-hidden="true">
        <img
          ref={imgRef}
          src="/images/hero_trend.jpg"
          alt="3D electric blue fluid wave mesh background"
          className="hero__img"
          loading="eager"
        />
        <div className="hero__img-overlay" />
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow" aria-label="Location">
          BASED IN HYDERABAD&nbsp;&bull;&nbsp;INDIA
        </div>

        <h1 className="hero__headline" aria-label="Creative Meets Technology">
          <span className="line"><span className="line-inner l1">CREATIVE</span></span>
          <span className="line"><span className="line-inner l2">MEETS</span></span>
          <span className="line"><span className="line-inner l3">TECHNOLOGY.</span></span>
        </h1>

        <p className="hero__sub">
          I'm a B.Tech student building machine learning pipelines, computer vision systems,
          and practical full-stack AI applications — with a strong foundation in visual production.
        </p>

        <div className="hero__actions">
          <a
            href="#work"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            EXPLORE PROJECTS
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="https://github.com/Miteshreddy" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            GITHUB PROFILE ↗
          </a>
        </div>

        <div className="hero__ticker" aria-label="Technical focus areas">
          <div className="hero__ticker-label">CORE FOCUS</div>
          <div className="hero__ticker-items" role="list">
            {['Machine Learning', 'PyTorch', 'Computer Vision', 'Generative AI', 'React', 'Adobe Suite'].map((item) => (
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
    'MACHINE LEARNING', 'COMPUTER VISION', 'DEEP LEARNING', 'PYTORCH',
    'GENERATIVE AI', 'FULL-STACK AI', 'VIDEO EDITING', 'MOTION DESIGN',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section" aria-label="Technical domains" role="region">
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
              alt="Workstation — laptop, code terminal, and editing notes"
              className="about__img"
              loading="lazy"
            />
            <div className="about__img-label">DEVELOPMENT &amp; EDITING DESK</div>
          </div>
        </div>

        <div className="about__right">
          <p className="about__text reveal reveal-delay-1">
            I'm a B.Tech student from Hyderabad interested in machine learning, computer vision
            and AI applications. Most of what I learn comes from building things — training models,
            breaking them, fixing them and then trying to turn them into something usable. I enjoy
            working on both the ML side and the engineering needed to turn a model into a real application.
          </p>
          <p className="about__text reveal reveal-delay-2">
            Outside pure ML work, I spend a lot of time with Adobe tools and video production,
            so I also enjoy projects where technology and visual creativity overlap.
          </p>

          <div className="about__identity reveal reveal-delay-2">
            <div className="about__identity-name">G. MITESH</div>
            <div className="about__identity-role">B.Tech Student &bull; AI &amp; ML Developer</div>
            <div className="about__identity-tags">
              Machine Learning&nbsp;&bull;&nbsp;Computer Vision&nbsp;&bull;&nbsp;Deep Learning&nbsp;&bull;&nbsp;Video Production
            </div>
          </div>

          <div className="about__tags reveal reveal-delay-3" role="list" aria-label="Competencies">
            {['Machine Learning', 'Computer Vision', 'PyTorch', 'Generative AI', 'Full-Stack', 'Video Production'].map((tag) => (
              <span key={tag} className="about__tag" role="listitem">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   PROJECT VISUAL
   =================================================== */
function ProjectVisual({ type, title, imageSrc }) {
  return (
    <div className="project-item__visual-inner">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${title} project preview screenshot`}
          className="project-item__img"
          loading="lazy"
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#111' }} />
      )}

      {/* Subtle hover overlay */}
      <div className="project-item__img-overlay" />

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
   PROJECT STATUS BADGE
   =================================================== */
function StatusBadge({ status }) {
  const normalized = (status || 'Completed').toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge status-badge--${normalized}`}>
      {status}
    </span>
  );
}

/* ===================================================
   PROJECT MODAL (DETAIL VIEW)
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

  if (!project) return null;

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span className="modal__cat">{project.category}</span>
              <StatusBadge status={project.status} />
              <span className="modal__year" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--clr-light)', letterSpacing: '0.1em' }}>{project.year}</span>
            </div>
            <h2 className="modal__title">{project.title}</h2>
            {project.subtitle && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--clr-mid)', letterSpacing: '0.08em', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                {project.subtitle}
              </p>
            )}
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal__visual">
          <img
            src={project.image || (project.screenshots && project.screenshots[0]?.src)}
            alt={`${project.title} interface preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>

        <div className="modal__img-note">
          Verified Technical Artifact &bull; Live System Interface
        </div>

        <div className="modal__body">
          {/* Overview */}
          {project.description && (
            <div>
              <div className="modal__label">OVERVIEW</div>
              <p className="modal__text">{project.description}</p>
            </div>
          )}

          {/* Problem */}
          {project.problem && (
            <div>
              <div className="modal__label">PROBLEM</div>
              <p className="modal__text">{project.problem}</p>
            </div>
          )}

          {/* What I Built */}
          {project.whatIBuilt && (
            <div className="modal__body-full">
              <div className="modal__label">WHAT I BUILT</div>
              <p className="modal__text">{project.whatIBuilt}</p>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div className="modal__body-full">
              <div className="modal__label">ARCHITECTURE &amp; PIPELINE</div>
              <div style={{ background: 'rgba(10, 10, 10, 0.04)', border: '1px solid rgba(10, 10, 10, 0.1)', padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--clr-dark)', lineHeight: '1.6' }}>
                <code>{project.architecture}</code>
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && (
            <div>
              <div className="modal__label">KEY FEATURES</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--clr-charcoal)', lineHeight: '1.5', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--clr-accent)', fontWeight: 'bold' }}>&bull;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <div className="modal__label">TECHNOLOGIES</div>
            <div className="modal__tools">
              {(project.technologies || []).map((t) => (
                <span key={t} className="modal__tool-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* How It Works Pipeline */}
          {project.howItWorks && (
            <div className="modal__body-full">
              <div className="modal__label">EXECUTION PIPELINE</div>
              <div className="modal__workflow">
                {project.howItWorks.map((step, idx) => (
                  <div key={idx} className="modal__workflow-step">
                    <span className="modal__workflow-step-num">0{idx + 1}</span>
                    <span className="modal__workflow-step-name">{step.step}</span>
                    <span className="modal__workflow-step-desc">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What I Worked On */}
          {project.whatIWorkedOn && (
            <div>
              <div className="modal__label">WHAT I WORKED ON</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
                {project.whatIWorkedOn.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--clr-charcoal)', lineHeight: '1.55', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--clr-accent)', fontWeight: 'bold' }}>&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What I Learned */}
          {project.whatILearned && (
            <div>
              <div className="modal__label">WHAT I LEARNED</div>
              <p className="modal__text">{project.whatILearned}</p>
            </div>
          )}

          {/* Project Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal__body-full">
              <div className="modal__label">PROJECT SCREENSHOTS</div>
              <div className="modal__screenshots">
                {project.screenshots.map((s, idx) => (
                  <div key={idx} className="modal__screenshot-card">
                    <img src={s.src} alt={s.title} className="modal__screenshot-img" loading="lazy" />
                    <div className="modal__screenshot-info">
                      <div className="modal__screenshot-title">{s.title}</div>
                      {s.desc && <div className="modal__screenshot-desc">{s.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          {(project.github || project.liveDemo) && (
            <div className="modal__body-full">
              <div className="modal__actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn--modal-github"
                  >
                    VIEW ON GITHUB ↗
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn--modal-demo"
                  >
                    LIVE DEMO ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   SELECTED WORK (CENTRAL SYSTEM)
   =================================================== */
function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredProjects = selectedStatus === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.status.toLowerCase() === selectedStatus.toLowerCase());

  useEffect(() => {
    const items = document.querySelectorAll('.work-section .reveal');
    items.forEach((item) => item.classList.add('visible'));
  }, [selectedStatus]);

  return (
    <section id="work" className="section work-section" aria-label="Selected work">
      <div className="work-header">
        <div>
          <h2 className="work-header__title reveal">SELECTED<br />PROJECTS</h2>
          <div className="work-filters reveal reveal-delay-1" role="tablist" aria-label="Filter projects by status">
            {PROJECT_STATUSES.map((status) => (
              <button
                key={status}
                className={`work-filter-btn ${selectedStatus === status ? 'active' : ''}`}
                onClick={() => setSelectedStatus(status)}
                role="tab"
                aria-selected={selectedStatus === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <p className="work-header__sub reveal reveal-delay-1">
          Machine learning pipelines, computer vision systems, and practical AI applications I'm building and experimenting with.
        </p>
      </div>

      <div className="project-list" role="list">
        {filteredProjects.map((project) => (
          <article
            key={project.id || project.num}
            className="project-item reveal"
            role="listitem"
            onClick={() => setActiveProject(project)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProject(project); }}
            aria-label={`Project: ${project.title}. ${project.category}`}
          >
            <div className="project-item__num" aria-hidden="true">{project.num}</div>
            <div className="project-item__info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <div className="project-item__cat" style={{ marginBottom: 0 }}>{project.category}</div>
                <StatusBadge status={project.status} />
              </div>
              <h3 className="project-item__title">{project.title}</h3>
              <p className="project-item__desc">{project.shortDescription || project.description}</p>
              <div className="project-item__tags" role="list" aria-label="Technologies">
                {(project.technologies || []).slice(0, 5).map((t) => (
                  <span key={t} className="project-item__tag" role="listitem">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-item__visual">
              <ProjectVisual
                type={project.visualType}
                title={project.title}
                imageSrc={project.image || (project.screenshots && project.screenshots[0]?.src)}
              />
            </div>
          </article>
        ))}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

/* ===================================================
   STATISTICS / SCOPE
   =================================================== */
function Stats() {
  const stats = [
    { num: '06', label: 'PROJECTS BUILT\n& IN PROGRESS' },
    { num: '09+', label: 'TECHNICAL\nDOMAINS' },
    { num: '05+', label: 'ADOBE &\nCREATIVE TOOLS' },
    { num: '∞', label: 'MODELS &\nEXPERIMENTS' },
  ];

  return (
    <section className="stats-section" aria-label="Personal project scope">
      <div className="container">
        <div className="eyebrow eyebrow--light reveal" style={{ paddingBottom: '1.5rem' }}>WORK IN PERSPECTIVE</div>
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
  { name: 'PREMIERE PRO', use: 'Timeline editing • pacing • multicam sync', color: '#4FC3F7', abbr: 'Pr' },
  { name: 'AFTER EFFECTS', use: 'Motion graphics • kinetic typography • VFX', color: '#9FA8DA', abbr: 'Ae' },
  { name: 'PHOTOSHOP', use: 'Asset design • thumbnails • compositing', color: '#31A8FF', abbr: 'Ps' },
  { name: 'ILLUSTRATOR', use: 'Vector graphics • icons • layout elements', color: '#FF9A00', abbr: 'Ai' },
  { name: 'AUDITION', use: 'Noise reduction • dynamic leveling • audio polish', color: '#00E4BB', abbr: 'Au' },
  { name: 'CANVA', use: 'Fast social layouts • decks • presentations', color: '#00C4CC', abbr: 'Cv' },
];

function Toolkit() {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);

  return (
    <section className="section toolkit-section" aria-label="Creative production toolkit">
      <div className="toolkit-header reveal">
        <div className="eyebrow">CREATIVE PRODUCTION</div>
        <h2 className="toolkit-title">ADOBE</h2>
        <div className="toolkit-subtitle">+ CREATIVE TOOLSET</div>
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
   AI & ENGINEERING SECTION
   =================================================== */
function AISection() {
  const items = [
    {
      num: '01',
      title: 'COMPUTER VISION PIPELINES',
      desc: 'Building frame-by-frame video processing loops with OpenCV and PyTorch YOLO models, handling bounding boxes, non-maximum suppression, and confidence filtering.',
    },
    {
      num: '02',
      title: 'RETRIEVAL & EMBEDDINGS',
      desc: 'Structuring document chunking and vector similarity retrieval pipelines with LangChain and FastAPI to supply accurate grounding context for LLM queries.',
    },
    {
      num: '03',
      title: 'FULL-STACK ML INTEGRATION',
      desc: 'Connecting trained models (XGBoost, Decision Trees, Transformers, YOLO) to REST endpoints and clean React interfaces so anyone can test predictions directly.',
    },
  ];

  return (
    <section className="ai-section" aria-label="AI and engineering focus">
      <div className="ai-section__bg-orb" aria-hidden="true" />

      <div className="container">
        <div className="ai-section__eyebrow reveal">AI &amp; ENGINEERING FOCUS</div>
        <h2 className="ai-section__title reveal">PRACTICAL<br />AI SYSTEMS</h2>
        <p className="ai-section__quote reveal reveal-delay-1">
          "I build ML projects in Python and then connect the model to a usable application."
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

        {/* SVG Pipeline Visualization */}
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
            <text x="0" y="60" fill="rgba(26,74,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">DATA / INGEST</text>
            <text x="250" y="60" fill="rgba(26,74,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">INFERENCE</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   PROCESS SECTION
   =================================================== */
function Process() {
  const steps = [
    { num: '01', title: 'PROBLEM & DATA', desc: 'Identify the task, clean raw inputs, handle missing values, and prepare structured feature tensors.' },
    { num: '02', title: 'MODEL & TRAIN', desc: 'Select model architectures, tune hyperparameters, run cross-validation, and evaluate loss curves.' },
    { num: '03', title: 'BUILD PIPELINE', desc: 'Wrap inference inside FastAPI/Flask endpoints and write video or vector search processing logic.' },
    { num: '04', title: 'FRONTEND & TEST', desc: 'Connect endpoints to an interactive React interface, verify edge cases, and ensure smooth response times.' },
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
        <div className="eyebrow eyebrow--light reveal">ENGINEERING WORKFLOW</div>
        <h2 className="process-title reveal">HOW I BUILD</h2>
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
   PROJECTS GATEWAY / REDIRECT SECTION
   =================================================== */
function ProjectsGateway() {
  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section project-gateway" aria-label="Projects overview and quick access">
      <div className="project-gateway__card reveal">
        <div className="project-gateway__left">
          <div className="eyebrow eyebrow--light" style={{ marginBottom: '0.8rem' }}>FEATURED CODEBASE &amp; PIPELINES</div>
          <h2 className="project-gateway__title">EXPLORE ALL<br />PROJECTS</h2>
          <p className="project-gateway__sub">
            Detailed technical breakdowns of 6 ML pipelines, real-time computer vision models,
            RAG vector search, and interactive full-stack AI applications.
          </p>
          <div className="project-gateway__pills">
            {PROJECTS.map((p) => (
              <a
                key={p.id}
                href="#work"
                onClick={scrollToWork}
                className="gateway-pill"
              >
                <span className="gateway-pill__num">{p.num}</span>
                <span className="gateway-pill__title">{p.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="project-gateway__right">
          <a href="#work" onClick={scrollToWork} className="btn--gateway-primary">
            <span>VIEW PROJECT SECTION</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
          <a
            href="https://github.com/Miteshreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn--gateway-outline"
          >
            <span>GITHUB PROFILE ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   SKILLS (CENTRAL SYSTEM)
   =================================================== */
function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-label="Skills and tools">
      <div className="eyebrow reveal">CAPABILITIES</div>
      <h2 className="skills-title reveal">TECHNICAL<br />SKILLS</h2>
      <p className="skills-subtitle reveal reveal-delay-1">Defensible tools, libraries, and frameworks I actively build with.</p>

      <div className="skills-grid" role="list">
        {SKILL_CATEGORIES.map((group, i) => (
          <div key={group.title} className={`skill-group reveal reveal-delay-${(i % 4) + 1}`} role="listitem">
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
   GALLERY — Visual Work & Project Artifacts
   =================================================== */
const GALLERY_ITEMS = [
  {
    id: 'g1',
    src: '/projects/agroxai/screenshot.png',
    title: 'AGROXAI DASHBOARD',
    category: 'Crop Recommendation & ML',
    ratio: 'landscape',
  },
  {
    id: 'g2',
    src: '/projects/vision-attendance/screenshot.png',
    title: 'VISIONATTENDANCE',
    category: 'Face Biometrics & Attendance',
    ratio: 'landscape',
  },
  {
    id: 'g3',
    src: '/projects/visiontrack/screenshot.png',
    title: 'VISIONTRACK PLATFORM',
    category: 'YOLO Object Tracking & Telemetry',
    ratio: 'landscape',
  },
  {
    id: 'g4',
    src: '/projects/docmind/screenshot.png',
    title: 'DOCMIND RESEARCH',
    category: 'Document Intelligence & RAG',
    ratio: 'landscape',
  },
  {
    id: 'g5',
    src: '/projects/jobshieldxai/screenshot.png',
    title: 'JOBSHIELDXAI',
    category: 'AI Job Scam & Fraud Detection',
    ratio: 'landscape',
  },
  {
    id: 'g6',
    src: '/projects/aivoicestudio/screenshot.png',
    title: 'AIVOICESTUDIO',
    category: 'AI Voice & Speech Synthesis',
    ratio: 'landscape',
  },
];

function Gallery() {
  return (
    <section className="gallery-section" aria-label="Technical artifacts gallery">
      <div className="gallery-header reveal">
        <div className="eyebrow eyebrow--light">ARTIFACTS &amp; INTERFACES</div>
        <h2 className="gallery-title">PROJECT<br />GALLERY</h2>
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
        LET'S TALK.
      </h2>
      <p className="contact-sub reveal reveal-delay-1">
        Open to internships, AI/ML engineering collaborations, and creative production projects.
      </p>

      <div className="contact-actions reveal reveal-delay-2">
        <a href="mailto:miteshguduru@gmail.com" className="btn--contact primary">
          EMAIL ME
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M1 12L12 1M12 1H4M12 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
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
        <a
          href="https://www.linkedin.com/in/mitesh-reddy-57291335/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn--contact ghost"
          aria-label="LinkedIn profile (opens in new tab)"
        >
          LINKEDIN ↗
        </a>
      </div>

      <div className="contact-email reveal reveal-delay-3">
        <div className="contact-email__label">DIRECT EMAIL</div>
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
        <div className="footer__logo">MITESH<sup>&reg;</sup></div>
        <div className="footer__tagline">B.Tech &bull; Machine Learning &amp; AI Developer</div>
      </div>
      <div className="footer__tagline" style={{ textAlign: 'center' }}>
        "Learning by building."
      </div>
      <div className="footer__copy">
        &copy; 2026 G. Mitesh
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
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        <Process />
        <ProjectsGateway />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
