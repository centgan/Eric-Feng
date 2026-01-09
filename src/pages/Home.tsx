import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import { projectsData } from "../data/projectData";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('home');
  const [gridRevealed, setGridRevealed] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Breaking things at the nano-scale, building things at scale",
    "If it can be optimized, I will optimize it",
    "Turning 'what if' into 'watch this' since day one"
  ];

  const letters = ['C', 'L', 'I', 'C', 'K', ' ', 'M', 'E'];
  const columns = 15;
  const rows = 8;

  interface GridCell {
    id: string;
    revealed: boolean;
    letter: string;
    isLetter: boolean;
    col: number;
    row: number;
    moving?: boolean;
  }

  const [gridState, setGridState] = useState<GridCell[][]>(() => {
    let board: GridCell[][] = [];
    for (let i = 0; i < columns; i++) {
      let row: GridCell[] = [];
      for (let j = 0; j < rows; j++) {
        let topLetter = '';
        if (j === 0 && i < 8) {
          topLetter = letters[i];
        }
        row.push({
          id: `${i}-${j}`,
          revealed: false,
          letter: topLetter,
          isLetter: false,
          col: i,
          row: j
        });
      }
      board.push(row);
    }
    return board;
  });

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'education', 'passions', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const animateGrid = async () => {
    if (gridRevealed) return;
    setGridRevealed(true);

    const message = ['H', 'I', ' ', 'I', 'M', ' ', 'E', 'R', 'I', 'C', ' ', 'F', 'E', 'N', 'G'];

    const letterPositions: [number, number][] = [];
    for (let i = 0; i < columns; i++) {
      letterPositions.push([i, Math.floor(Math.random() * rows)]);
    }

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setGridState(prev => {
          const newGrid = prev.map(col => col.map(cell => ({ ...cell })));
          const isLetterTile = letterPositions[i][1] === j;
          newGrid[i][j] = {
            ...newGrid[i][j],
            revealed: true,
            isLetter: isLetterTile,
            letter: isLetterTile ? message[i] : ''
          };
          return newGrid;
        });
      }
    }

    await new Promise(resolve => setTimeout(resolve, 400));

    for (let i = 0; i < columns; i++) {
      const [col, oldRow] = letterPositions[i];
      const newRow = 3;

      await new Promise(resolve => setTimeout(resolve, 80));

      setGridState(prev => {
        const newGrid = prev.map(col => col.map(cell => ({ ...cell })));
        newGrid[col][oldRow] = { ...newGrid[col][oldRow], isLetter: false, letter: '' };
        newGrid[col][newRow] = { ...newGrid[col][newRow], isLetter: true, letter: message[i], moving: true };
        return newGrid;
      });
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    setGridState(prev => {
      return prev.map(col => col.map(cell => ({ ...cell, moving: false })));
    });
  };

  const projects = projectsData.map(project => ({
    id: project.id,
    title: project.title,
    tech: project.tech,
    desc: project.desc,
    emoji: project.emoji,
    emojiClass: project.emojiClass
  }));

  const passions = [
    { icon: "💻", title: "Software Engineering", desc: "Building solutions to complex problems", fact: "Started coding at 12, and still continuing" },
    { icon: "🔬", title: "Nanotechnology", desc: "Exploring the quantum realm and semiconductor fab", fact: "Yes, I know my way around atoms and anecdotes" },
    { icon: "🤖", title: "AI & Machine Learning", desc: "Creating AI systems that learn and adapt", fact: "Turning data into insights through AI and hands-on experimentation" },
    { icon: "📊", title: "Financial Markets", desc: "Analyzing trends and algorithmic trading strategies", fact: "Numbers don't lie, but they do tell stories" },
    { icon: "🏋️", title: "Fitness", desc: "Maintaining discipline and pushing physical limits", fact: "Strength training keeps my mind and body sharp" },
    { icon: "🏊", title: "Swimming", desc: "Finding flow and focus in the water", fact: "Best ideas come during the 400m freestyle" }
  ];

  return (
    <div className="portfolio-container">
      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo">
            Eric Feng
          </div>
          <div className="nav-links">
            {['Home', 'About', 'Projects', 'Education', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="hero-content">
          {!gridRevealed ? (
            <div>
              <h1 className="hero-title">
                Welcome to my <span className="hero-gradient-text">Portfolio</span>
              </h1>
              <p className="hero-subtitle">
                But first, try clicking below...
              </p>
              <div className="grid-container">
                <div className="grid-columns">
                  {gridState.map((column, colIdx) => (
                    <div key={colIdx} className="grid-column">
                      {column.map((cell) => (
                        <button
                          key={cell.id}
                          onClick={animateGrid}
                          className="grid-tile"
                        >
                          <span>{cell.letter}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <p className="grid-prompt">Click any tile to reveal my name</p>
            </div>
          ) : (
            <>
              <div className="grid-container">
                <div className="grid-columns">
                  {gridState.map((column, colIdx) => (
                    <div key={colIdx} className="grid-column">
                      {column.map((cell) => (
                        <div
                          key={cell.id}
                          className={`grid-tile grid-tile-revealed ${cell.isLetter ? 'grid-tile-letter' : ''} ${cell.moving ? 'grid-tile-moving' : ''}`}
                        >
                          {cell.letter}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-revealed">
                <h1 className="hero-title">
                  <span className="wave-emoji">👋</span> Hey there! I'm{' '}
                  <span className="hero-gradient-text">Eric Feng</span>
                </h1>
                <div className="hero-tags">
                  <span className="hero-tag hero-tag-3">AI Enthusiast</span>
                  <span className="hero-tag hero-tag-1">Nano Engineer</span>
                  <span className="hero-tag hero-tag-2">Embedded System</span>
                </div>
                <p className="hero-description">
                  Trying to build intelligent machines by combining algorithms, sensing, and control, with a focus on systems that operate reliably outside the lab.
                </p>
                <div className="hero-quote-container">
                  <p className="hero-quote">"{quotes[currentQuote]}"</p>
                </div>
                <button onClick={() => scrollToSection('about')} className="hero-cta">
                  Let's dive in <span className="hero-cta-arrow">→</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="scroll-indicator">
          <div className="scroll-indicator-border">
            <div className="scroll-indicator-dot"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" data-animate="">
        <div className={`section-content ${isVisible.about ? 'visible' : 'hidden'}`}>
          <h2 className="section-title">Who Am I? 🤔</h2>
          <div className="about-grid">
            <div className="about-cards">
              <div className="card card-emerald">
                <div className="card-header">
                  <h3 className="card-title">The Short Version</h3>
                </div>
                <p className="card-text">
                  Currently studying <span className="text-highlight-teal">Nanotechnology Engineering</span> at the University of Waterloo,
                  but at the same time I'm equally interested in software. I'm a person who is always curious and wants to learn new things
                  and I'll read countless research papers and datasheets to learn more about a technology in any domain. After learning about it
                  I try to first implement it myself and then find a real world application for it.
                </p>
              </div>

              <div className="card card-teal">
                <div className="card-header">
                  <h3 className="card-title card-title-teal">The Skillset</h3>
                </div>
                <p className="card-text-small">Multidisciplinary. Adaptable.</p>
                <div className="skill-tags">
                  {['ML/AI', 'IoT Devices', 'Embedded C/C++', 'Algorithm Design', 'Databases', 'CAD', 'Data Science',
                      'Full Stack Dev', 'Quantitative Trading'].map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <div className="card card-gradient">
                <div className="card-header">
                  <h3 className="card-title">The Full Story</h3>
                </div>
                <div className="card-story">
                  <p>
                    Nanotech wasn't exactly my first choice,
                    but now I'm glad to be in this industry. From semiconductor fab processes to the design of
                    materials enabled by nano-scale effects, the work is both fascinating and interesting  to say the least.
                  </p>
                  <p>
                    I tend to dive deep into a wide variety of technical topics <span className="text-highlight-teal">Embedded systems?</span> Check.
                    <span className="text-highlight-teal"> System integration?</span> Yup. <span className="text-highlight-teal">Machine learning?</span> Obviously.
                    I started with LEGO robotics at a young age, then began getting interested in Arduino and RPi, and eventually ended up working on full scale robotics, covering everything from constructing the robot to autonomous programming.
                  </p>
                  <p>
                    I also have experience in <span className="text-highlight-green">capital markets</span>{' '}
                    spanning from quantitative trading systems and strategies to manual trade execution strategies.
                  </p>
                  <p className="quote-box">
                    Core values: Work ethic that borders on obsessive, critical thinking that questions everything,
                    and discipline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section section-bg" data-animate="">
        <div className={`section-content ${isVisible.projects ? 'visible' : 'hidden'}`}>
          <h2 className="section-title">Things I've Built </h2>
          <p className="section-subtitle">From ideas to impact...</p>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="project-card"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="project-header">
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p className="project-tech">{project.tech}</p>
                  </div>
                  <div className={`project-emoji ${project.emojiClass}`}>
                    {project.emoji}
                  </div>
                </div>
                <p className="project-description">{project.desc}</p>
                <div className="project-card-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="education-section" data-animate="">
        <div className={`section-content ${isVisible.education ? 'visible' : 'hidden'}`} style={{ width: '100%' }}>
          <h2 className="section-title">Where I'm Learning</h2>

          <div className="education-card">
            <div className="education-bg-blob"></div>
            <div className="education-content">
              <div className="education-center">
                <div className="education-icon">🎓</div>
                <h3 className="education-university">University of Waterloo</h3>
                <p className="education-program">Nanotechnology Engineering</p>
                <p className="education-description">
                  Diving deep into the the world where particles start to tunnel and throw surprise parties and materials do unimaginable things.
                  From semiconductor physics to materials research, I'm looking to build the technologies of tomorrow. Also
                  learning that "nano" means that the challenges are small.
                </p>
              </div>

              <div className="education-term">
                <div className="education-badge">
                  <span>Currently finished my 3B Term!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passions */}
      <section id="passions" className="section section-bg" data-animate="">
        <div className={`section-content ${isVisible.passions ? 'visible' : 'hidden'}`}>
          <h2 className="section-title">What Motivates Me Everyday</h2>
          <p className="section-subtitle">Beyond the code and the lab</p>

          <div className="passions-grid">
            {passions.map((passion, idx) => (
              <div key={idx} className="passion-card">
                <div className="passion-icon">{passion.icon}</div>
                <h3 className="passion-title">{passion.title}</h3>
                <p className="passion-description">{passion.desc}</p>
                <p className="passion-fact">"{passion.fact}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section" data-animate="s">
        <div className={`section-content ${isVisible.contact ? 'visible' : 'hidden'}`} style={{ width: '100%' }}>
          <h2 className="section-title">Let's Connect!</h2>

          <div className="contact-grid">
            <a href="https://www.linkedin.com/in/eric-feng-57a862259" target="_blank" rel="noopener noreferrer" className="contact-card contact-card-emerald">
              <div className="contact-icon">💼</div>
              <h3 className="contact-title contact-title-emerald">LinkedIn</h3>
              <p className="contact-text">Let's network and swap ideas!</p>
              <div className="contact-button contact-button-emerald">Let's Connect →</div>
            </a>

            <a href="https://github.com/centgan" target="_blank" rel="noopener noreferrer" className="contact-card contact-card-teal">
              <div className="contact-icon">💻</div>
              <h3 className="contact-title contact-title-teal">GitHub</h3>
              <p className="contact-text">Where my code lives (and occasionally compiles and works)</p>
              <div className="contact-button contact-button-teal">Check it Out →</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-title">Crafted by Eric Feng</p>
          <p className="footer-copyright">© 2025 - Still figuring it all out</p>
          <div className="footer-credits">
            <p>Shoutouts & Credits:</p>
            <div className="footer-links">
              <span>Leverage Edu</span>
              <span>Wallhere</span>
              <span>Wallpaper Access</span>
              <span>LinkedIn</span>
              <span>GitHub</span>
              <span>Swimming.org</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
