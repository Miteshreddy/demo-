import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { PROJECTS, PROJECT_CATEGORIES } from './data/projects';
import { SKILL_CATEGORIES } from './data/skills';

/* ===================================================
   PROFESSIONAL CUSTOM CURSOR
   High-craft smooth trailing ring + precision dot
   =================================================== */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isVisible = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const handlePointerEnter = () => {
      isHovered.current = true;
      if (ringRef.current) ringRef.current.classList.add('cursor--hover');
      if (dotRef.current) dotRef.current.classList.add('cursor--hover');
    };

    const handlePointerLeave = () => {
      isHovered.current = false;
      if (ringRef.current) ringRef.current.classList.remove('cursor--hover');
      if (dotRef.current) dotRef.current.classList.remove('cursor--hover');
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], .project-item, .work-filter-btn, .contact-card, .tool-item');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handlePointerEnter);
        el.addEventListener('mouseleave', handlePointerLeave);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    attachHoverListeners();
    // Periodic refresh for dynamically added elements
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // 60fps / 120fps smooth lerp loop
    const animate = () => {
      // Ring follows smoothly with 0.15 interpolation factor
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="custom-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

/* ===================================================
   NAVBAR — Reference Design Floating Pill & Brand
   =================================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        {/* Brand */}
        <a href="#hero" className="navbar__brand" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} aria-label="G. Mitesh Reddy - Home">
          <div className="navbar__avatar" aria-hidden="true">MR</div>
          <div className="navbar__brand-text">
            <span className="navbar__logo">G. Mitesh Reddy</span>
            <span className="navbar__brand-role">AI &amp; ML · UI/UX</span>
          </div>
        </a>

        {/* Centered Pill Nav — Reference Style */}
        <nav className="navbar__nav" role="navigation" aria-label="Main menu">
          <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Work</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
        </nav>

        {/* Right CTA — Reference Style Hire me button */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
          className="navbar__cta"
          aria-label="Hire me - scroll to contact section"
        >
          <span className="navbar__cta-dot" aria-hidden="true" />
          <span>Hire me</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation drawer">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>HOME</a>
        <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>WORK</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>ABOUT</a>
        <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>SKILLS</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>CONTACT</a>
        
        <div className="mobile-menu__contact">
          <a href="mailto:miteshguduru@gmail.com">miteshguduru@gmail.com</a>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Hyderabad, India</span>
        </div>
      </div>
    </>
  );
}

/* ===================================================
   HERO — Subtle Atmospheric Lighting (No Extreme White Circle)
   =================================================== */
function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      {/* Soft Ambient Atmospheric Glow (Replaced extreme white circle) */}
      <div className="hero__ambient-wrap" aria-hidden="true">
        <div className="hero__ambient-glow-primary" />
        <div className="hero__ambient-glow-secondary" />
        <div className="hero__ambient-ring" />
      </div>

      <div className="hero__content">
        {/* Pill Badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          <span>AI &amp; ML Developer &bull; UI/UX Designer</span>
        </div>

        {/* Headline — High Contrast Crisp Typography (Reference Style) */}
        <h1 className="hero__headline">
          <span className="hero__headline-top">Creative <strong>AI &amp; ML</strong></span>
          <span className="hero__headline-bottom">development wizard</span>
        </h1>

        {/* Subtitle */}
        <p className="hero__sub">
          Helping teams and companies build high-accuracy machine learning pipelines,
          real-time computer vision models, and pixel-perfect, human-centric digital interfaces.
        </p>

        {/* Actions — Professional Clean Pill Buttons (Phone button removed) */}
        <div className="hero__actions">
          <a
            href="#work"
            className="btn btn--work-with-me"
            onClick={(e) => { e.preventDefault(); scrollTo('work'); }}
          >
            <span>Explore Work</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="#contact"
            className="btn btn--contact-quick"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
          >
            <span>Get in touch</span>
          </a>
        </div>

        {/* Social Proof Stack below Hero */}
        <div className="hero__social-proof">
          <div className="hero__avatar-stack" aria-hidden="true">
            <div className="hero__avatar-item">AI</div>
            <div className="hero__avatar-item">CV</div>
            <div className="hero__avatar-item">UX</div>
          </div>
          <div className="hero__proof-text">
            <strong>08+ production &amp; research projects built</strong> &bull; Based in Hyderabad, India
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================
   MARQUEE DOMAIN STRIP
   =================================================== */
function MarqueeStrip() {
  const items = [
    'MACHINE LEARNING', 'COMPUTER VISION', 'DEEP LEARNING', 'PYTORCH',
    'YOLO & OPENCV', 'RAG & EMBEDDINGS', 'UI/UX DESIGN', 'REACT & FASTAPI',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section" aria-label="Technical specialties marquee">
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
   ABOUT SECTION — Clean, Executive Profile
   =================================================== */
function About() {
  return (
    <section id="about" className="section about" aria-label="About G. Mitesh Reddy">
      <div className="about__grid">
        {/* Left Column: Identity & Professional Credentials */}
        <div className="about__left reveal">
          <div className="eyebrow">ABOUT ME</div>
          <h2 className="about__title">ENGINEERING &amp;<br />DESIGN CRAFT</h2>

          <div className="about__identity-card">
            <div>
              <div className="about__identity-name">G. Mitesh Reddy</div>
              <div className="about__identity-role">AI &amp; ML Developer &bull; UI/UX Designer</div>
            </div>

            <div className="about__quick-contacts">
              <a href="mailto:miteshguduru@gmail.com" className="about__contact-chip">
                <span>✉</span>
                <span>miteshguduru@gmail.com</span>
              </a>
              <div className="about__contact-chip">
                <span>📍</span>
                <span>Hyderabad, India</span>
              </div>
              <div className="about__contact-chip">
                <span>💼</span>
                <span>Open for Engineering &amp; Design Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative & Pillars */}
        <div className="about__right">
          <p className="about__lead reveal reveal-delay-1">
            I am an engineer from Hyderabad passionate about turning complex machine learning research into intuitive, production-grade applications.
          </p>
          <p className="about__text reveal reveal-delay-1">
            Most of what I know comes from building directly — training deep learning models, fine-tuning transformers, resolving video stream inference bottlenecks with OpenCV and YOLO, and wiring everything into clean APIs with FastAPI.
          </p>
          <p className="about__text reveal reveal-delay-2">
            Simultaneously, I bring a high level of craft to UI/UX design and frontend development. I don't believe powerful algorithms should be hidden behind confusing interfaces. Whether it's the StudentTribe platform or executive dashboards like NEXA, I design software that feels sleek, effortless, and refined.
          </p>

          <div className="about__pillars reveal reveal-delay-2">
            <div className="about__pillar">
              <div className="about__pillar-num">01 / FOCUS</div>
              <div className="about__pillar-title">Machine Learning &amp; Vision</div>
              <div className="about__pillar-desc">
                From crop prediction models (XGBoost) and biometric recognition (DeepFace/FaceNet512) to object tracking (YOLOv8 + ByteTrack).
              </div>
            </div>
            <div className="about__pillar">
              <div className="about__pillar-num">02 / FOCUS</div>
              <div className="about__pillar-title">Modern UI/UX &amp; Frontend</div>
              <div className="about__pillar-desc">
                Designing cohesive component systems, typography hierarchies, and dark-mode dashboards with React and modern CSS.
              </div>
            </div>
          </div>

          <div className="about__tags reveal reveal-delay-3" role="list" aria-label="Core Competencies">
            {['Machine Learning', 'Computer Vision', 'PyTorch', 'Transformers', 'FastAPI', 'UI/UX Design', 'React', 'Figma', 'Video Production'].map((tag) => (
              <span key={tag} className="about__tag" role="listitem">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
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
            <span className="modal__cat">{project.category}</span>
            <h2 className="modal__title">{project.title}</h2>
            {project.subtitle && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '0.3rem' }}>
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
            alt={`${project.title} preview`}
          />
        </div>

        <div className="modal__body">
          {project.description && (
            <div>
              <div className="modal__label">OVERVIEW</div>
              <p className="modal__text">{project.description}</p>
            </div>
          )}

          {project.problem && (
            <div>
              <div className="modal__label">PROBLEM STATEMENT</div>
              <p className="modal__text">{project.problem}</p>
            </div>
          )}

          {project.whatIBuilt && (
            <div>
              <div className="modal__label">WHAT I BUILT</div>
              <p className="modal__text">{project.whatIBuilt}</p>
            </div>
          )}

          {project.architecture && (
            <div>
              <div className="modal__label">ARCHITECTURE &amp; PIPELINE</div>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', borderRadius: '10px' }}>
                <code>{project.architecture}</code>
              </div>
            </div>
          )}

          <div>
            <div className="modal__label">TECHNOLOGIES &amp; TOOLS</div>
            <div className="modal__tools">
              {(project.technologies || []).map((t) => (
                <span key={t} className="modal__tool-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="modal__actions">
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn--modal-github">
                <span>VIEW LIVE DEMO ↗</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn--modal-demo">
                <span>GITHUB REPOSITORY ↗</span>
              </a>
            )}
            {project.driveLink && project.driveLink !== project.liveDemo && (
              <a href={project.driveLink} target="_blank" rel="noopener noreferrer" className="btn--modal-demo">
                <span>PROJECT DEMO DRIVE ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   WORK — SPLIT INTO AI&ML AND UI/UX SECTIONS
   =================================================== */
function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const aimlProjects = PROJECTS.filter((p) => p.domain === 'AI & ML');
  const uiuxProjects = PROJECTS.filter((p) => p.domain === 'UI/UX');

  const showAI = activeCategory === 'All' || activeCategory === 'AI & ML';
  const showUI = activeCategory === 'All' || activeCategory === 'UI/UX';

  const renderProjectCard = (project) => (
    <article
      key={project.id}
      className="project-item"
      role="listitem"
      onClick={() => setActiveProject(project)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProject(project); }}
      aria-label={`Project: ${project.title}. ${project.category}`}
    >
      <div className="project-item__num" aria-hidden="true">{project.num}</div>

      <div className="project-item__info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span className="project-item__cat">{project.category}</span>
          <span className={`status-badge status-badge--${(project.status || 'completed').toLowerCase().replace(/\s+/g, '-')}`}>
            {project.status}
          </span>
        </div>

        <h3 className="project-item__title">{project.title}</h3>
        <p className="project-item__desc">{project.shortDescription || project.description}</p>

        <div className="project-item__tags">
          {(project.technologies || []).slice(0, 5).map((t) => (
            <span key={t} className="project-item__tag">{t}</span>
          ))}
        </div>

        <div className="project-item__links">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="project-link-btn project-link-btn--demo"
            >
              Live Demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="project-link-btn project-link-btn--gh"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      <div className="project-item__visual">
        <div className="project-item__visual-inner">
          <img
            src={project.image || (project.screenshots && project.screenshots[0]?.src)}
            alt={`${project.title} interface preview`}
            className="project-item__img"
            loading="lazy"
          />
          <div className="project-item__arrow" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#0c0d0f" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section id="work" className="section work-section" aria-label="Projects and portfolio">
      <div className="work-header">
        <div>
          <div className="eyebrow reveal">SELECTED WORK</div>
          <h2 className="work-header__title reveal">PROJECTS</h2>
        </div>
        <p className="work-header__sub reveal reveal-delay-1">
          Machine learning pipelines, real-time computer vision systems, UI/UX designs, and full-stack AI applications.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="work-filters reveal reveal-delay-1" role="tablist" aria-label="Filter projects">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`work-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI & ML Section */}
      {showAI && aimlProjects.length > 0 && (
        <div className="domain-section">
          <div className="domain-header">
            <div className="domain-header__icon" aria-hidden="true">🧠</div>
            <div className="domain-header__text">
              <h3>AI &amp; Machine Learning Projects</h3>
              <span>{aimlProjects.length} PROJECTS</span>
            </div>
          </div>
          <div className="project-list" role="list">
            {aimlProjects.map(renderProjectCard)}
          </div>
        </div>
      )}

      {/* UI/UX Section */}
      {showUI && uiuxProjects.length > 0 && (
        <div className="domain-section" style={{ marginTop: showAI ? '2.5rem' : '0' }}>
          <div className="domain-header">
            <div className="domain-header__icon" aria-hidden="true">🎨</div>
            <div className="domain-header__text">
              <h3>UI/UX Design Projects</h3>
              <span>{uiuxProjects.length} PROJECTS</span>
            </div>
          </div>
          <div className="project-list" role="list">
            {uiuxProjects.map(renderProjectCard)}
          </div>
        </div>
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

/* ===================================================
   STATS
   =================================================== */
function Stats() {
  const stats = [
    { num: '08+', label: 'DEPLOYED PROJECTS\n& PIPELINES' },
    { num: '09+', label: 'TECHNICAL\nDOMAINS' },
    { num: '06+', label: 'AI & ML\nMODELS EVALUATED' },
    { num: '100%', label: 'COMMITTED TO\nENGINEERING CRAFT' },
  ];

  return (
    <section className="stats-section" aria-label="Track record in perspective">
      <div className="stats-grid" role="list">
        {stats.map((s, i) => (
          <div key={i} className={`stat-item reveal reveal-delay-${i + 1}`} role="listitem">
            <div className="stat-item__num">{s.num}</div>
            <div className="stat-item__label">
              {s.label.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>{line}{idx === 0 ? <br /> : null}</React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================================================
   SKILLS & CAPABILITIES
   =================================================== */
function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-label="Technical skills and tools">
      <div className="eyebrow reveal">CAPABILITIES</div>
      <h2 className="skills-title reveal">TECHNICAL SKILLS</h2>
      <p className="skills-subtitle reveal reveal-delay-1">
        Tools, frameworks, and technologies I use to build scalable machine learning and software systems.
      </p>

      <div className="skills-grid" role="list">
        {SKILL_CATEGORIES.map((group, i) => (
          <div key={group.title} className={`skill-group reveal reveal-delay-${(i % 3) + 1}`} role="listitem">
            <div className="skill-group__title">{group.title}</div>
            <ul className="skill-group__items" aria-label={`${group.title} tools`}>
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
   CONTACT SECTION — Executive & Professional Details
   =================================================== */
function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('miteshguduru@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact G. Mitesh Reddy">
      <div className="contact-header">
        <div className="eyebrow reveal">GET IN TOUCH</div>
        <h2 className="contact-title reveal">
          HAVE AN OPPORTUNITY?<br />
          LET'S CONNECT.
        </h2>
        <p className="contact-sub reveal reveal-delay-1">
          Open to AI/ML engineering roles, internships, technical discussions, and select UI/UX collaborations.
        </p>
      </div>

      <div className="contact-cards-grid reveal reveal-delay-2">
        {/* Primary Email Card */}
        <div className="contact-card">
          <div>
            <div className="contact-card__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="contact-card__label">PRIMARY CONTACT</div>
            <div className="contact-card__val">miteshguduru@gmail.com</div>
          </div>
          <div className="contact-card__actions">
            <a href="mailto:miteshguduru@gmail.com" className="contact-btn contact-btn--primary">
              <span>Compose Email &rarr;</span>
            </a>
            <button onClick={copyEmail} className="contact-btn contact-btn--secondary">
              <span>{copied ? '✓ Copied!' : 'Copy Address'}</span>
            </button>
          </div>
        </div>

        {/* Direct Inquiries & Scheduling Card */}
        <div className="contact-card">
          <div>
            <div className="contact-card__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div className="contact-card__label">DIRECT INQUIRIES &amp; SCHEDULING</div>
            <div className="contact-card__val" style={{ fontSize: '1.1rem' }}>
              +91 86397 47095
              <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontWeight: 400, marginTop: '0.3rem' }}>
                Available for scheduled calls &amp; technical interviews
              </div>
            </div>
          </div>
          <div className="contact-card__actions">
            <a
              href="https://wa.me/918639747095?text=Hi%20Mitesh,%20I%20would%20like%20to%20connect%20regarding%20an%20opportunity"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn contact-btn--secondary"
            >
              <span>Message on WhatsApp ↗</span>
            </a>
          </div>
        </div>

        {/* Professional Profiles Card */}
        <div className="contact-card">
          <div>
            <div className="contact-card__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div className="contact-card__label">LOCATION &amp; PROFILES</div>
            <div className="contact-card__val" style={{ fontSize: '1.1rem' }}>
              Hyderabad, India
              <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontWeight: 400, marginTop: '0.3rem' }}>
                Open to remote &amp; worldwide relocation
              </div>
            </div>
          </div>
          <div className="contact-card__actions">
            <a href="https://github.com/Miteshreddy" target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn--secondary">
              <span>GitHub ↗</span>
            </a>
            <a href="https://www.linkedin.com/in/mitesh-reddy-57291335/" target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn--secondary">
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </div>
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
      <div className="footer__inner">
        <div>
          <div className="footer__brand-title">G. Mitesh Reddy</div>
          <div className="footer__brand-desc">AI &amp; ML Developer &bull; UI/UX Designer &bull; Hyderabad, India</div>
        </div>

        <div className="footer__contact-info">
          <a href="mailto:miteshguduru@gmail.com">miteshguduru@gmail.com</a>
          <span>&bull;</span>
          <a href="https://github.com/Miteshreddy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>&bull;</span>
          <a href="https://www.linkedin.com/in/mitesh-reddy-57291335/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <div className="footer__copy">
          &copy; 2026 G. Mitesh Reddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ===================================================
   SCROLL REVEAL OBSERVER HOOK
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
   ROOT APPLICATION
   =================================================== */
export default function App() {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      <a href="#hero" className="sr-only" style={{
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
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
