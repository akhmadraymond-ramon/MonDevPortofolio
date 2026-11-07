
import { useState, useEffect } from 'react';
import './About.css';
import LogoLoop from '../components/LogoLoop';

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiPython,
  SiGit
} from 'react-icons/si';

const techLogos = [
  { node: <SiHtml5 style={{ color: '#E34F26' }} />, title: 'HTML5' },
  { node: <SiCss style={{ color: '#1572B6' }} />, title: 'CSS3' },
  { node: <SiJavascript style={{ color: '#F7DF1E' }} />, title: 'JavaScript' },
  { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React' },
  { node: <SiPython style={{ color: '#3776AB' }} />, title: 'Python' },
  { node: <SiGit style={{ color: '#F05032' }} />, title: 'Git' },
];

const isDesktop = () =>
  window.matchMedia('(min-width: 1025px)').matches;

const handleCardMouseMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = event.clientX - rect.left + 16;
  const y = event.clientY - rect.top + 18;

  card.style.setProperty('--cursor-x', `${x}px`);
  card.style.setProperty('--cursor-y', `${y}px`);
};

function AboutContent({ isPopup = false, onClose }) {
  return (
    <>
      <div className="about-window-header">
        <div className="window-dots">
          {isPopup ? (
            <button
              type="button"
              className="dot red popup-close-dot"
              onClick={onClose}
              aria-label="Close About popup"
              title="Close"
            />
          ) : (
            <span className="dot red" />
          )}

          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        <span className="about-done">Done</span>
      </div>

      <div className="about-introduction">
        <span className="about-date">Today, 11:56 PM</span>

        <h2>Hi! I'm ramon.</h2>

        <p>
          I'm a <strong>tech enthusiast</strong> who loves building clean
          <strong> web experiences</strong> and exploring new ideas through code.
        </p>

        <p>
          I enjoy creating <strong>web apps, interactive interfaces, and
          digital experiences</strong> that are useful, intuitive, and
          thoughtfully designed.
        </p>

        <p className="about-availability">
          <em>Currently open to</em>{' '}
          <strong>internships & freelance opportunities.</strong>
        </p>
      </div>

      <div className="about-tech">
        <div className="about-divider" />

        <h3>TECH STACK</h3>

        <div className="tech-logo-loop">
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="right"
            logoHeight={32}
            gap={35}
            pauseOnHover={false}
            scaleOnHover
            ariaLabel="Technology stack"
            labels="below"
          />
        </div>
      </div>
    </>
  );
}

function ExperienceContent({ isPopup = false, onClose }) {
  return (
    <>
      <div className="experience-window-header">
        {isPopup ? (
          <button
            type="button"
            className="experience-back popup-back-button"
            onClick={onClose}
            aria-label="Close Experience popup"
            title="Close"
          >
            ‹
          </button>
        ) : (
          <span className="experience-back">‹</span>
        )}

        <span className="experience-done">Done</span>
      </div>

      <div className="experience-content">
        <h2>Experience.</h2>

        <div className="experience-item">
          <div className="experience-info">
            <h3>LIBMI Education</h3>
            <span>Digital Marketing</span>
            <p>
              Managed digital promotional content and supported online
              marketing activities to improve audience engagement and
              brand awareness across social media platforms.
            </p>
          </div>

          <span className="experience-year">MAY 2026</span>
        </div>

        <div className="experience-divider" />

        <div className="experience-item">
          <div className="experience-info">
            <h3>PT. Garuda Lintas Nusa</h3>
            <span>Network Support Technician</span>
            <p>
              Provided technical support for internet and WiFi
              installations, including router configuration, cable
              management, and network troubleshooting to maintain
              stable connectivity.
            </p>
          </div>

          <span className="experience-year">
            JAN 2025 - MAY 2025
          </span>
        </div>
      </div>
    </>
  );
}

function About() {
  const [activeCard, setActiveCard] = useState(null);
  const [magnifierPosition, setMagnifierPosition] = useState(null);

  useEffect(() => {
    if (!activeCard) {
      setMagnifierPosition(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveCard(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeCard]);

  const openCard = (cardName) => {
    if (!isDesktop()) return;

    setMagnifierPosition(null);
    setActiveCard(cardName);
  };

  const closeCard = () => {
    setActiveCard(null);
    setMagnifierPosition(null);
  };

  const handleMagnifierMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const lensWidth = 260;
    const lensHeight = 180;

    const maxLeft = Math.max(0, rect.width - lensWidth);
    const maxTop = Math.max(0, rect.height - lensHeight);

    const left = Math.max(
      0,
      Math.min(
        event.clientX - rect.left - lensWidth / 2,
        maxLeft
      )
    );

    const top = Math.max(
      0,
      Math.min(
        event.clientY - rect.top - lensHeight / 2,
        maxTop
      )
    );

    setMagnifierPosition({ left, top });
  };

  const handleCardKeyDown = (event, cardName) => {
    if (
      isDesktop() &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      openCard(cardName);
    }
  };

  const PopupContent =
    activeCard === 'about'
      ? AboutContent
      : ExperienceContent;

  const lensWidth = 260;
  const lensHeight = 180;

  const lensClip = magnifierPosition
    ? `inset(
        ${magnifierPosition.top}px
        calc(100% - ${magnifierPosition.left + lensWidth}px)
        calc(100% - ${magnifierPosition.top + lensHeight}px)
        ${magnifierPosition.left}px
        round 22px
      )`
    : 'inset(0 100% 100% 0 round 22px)';

  const lensTransformOrigin = magnifierPosition
    ? `${magnifierPosition.left + lensWidth / 2}px ${
        magnifierPosition.top + lensHeight / 2
      }px`
    : 'center center';

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="mobile-background-text">
          <div className="mobile-page-label">
            <span>02</span>
            <span className="home-divider">/</span>
            <span>ABOUT</span>
          </div>

          <p>A little more about me, my experience, and skills.</p>
        </div>

        <div
          className="about-left"
          role="button"
          tabIndex={0}
          aria-label="Explore About"
          onClick={() => openCard('about')}
          onKeyDown={(event) => handleCardKeyDown(event, 'about')}
          onMouseMove={handleCardMouseMove}
        >
          <span className="card-hover-label">
            CLICK TO EXPLORE
          </span>

          <AboutContent />
        </div>

        <div className="about-right">
          <div
            className="experience-card"
            role="button"
            tabIndex={0}
            aria-label="Explore Experience"
            onClick={() => openCard('experience')}
            onKeyDown={(event) =>
              handleCardKeyDown(event, 'experience')
            }
            onMouseMove={handleCardMouseMove}
          >
            <span className="card-hover-label">
              CLICK TO EXPLORE
            </span>

            <ExperienceContent />
          </div>
        </div>
      </div>

      {activeCard && (
        <div
          className="about-modal-backdrop"
          onClick={closeCard}
        >
          <div
            className={`about-modal about-modal-${activeCard}`}
            role="dialog"
            aria-modal="true"
            aria-label={
              activeCard === 'about'
                ? 'About me'
                : 'Experience'
            }
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="magnifier-stage"
              onMouseMove={handleMagnifierMove}
              onMouseLeave={() => setMagnifierPosition(null)}
            >
              <div
                className={`magnifier-base magnifier-base-${activeCard} ${
                  magnifierPosition ? 'has-magnifier' : ''
                }`}
              >
                <PopupContent
                  isPopup
                  onClose={closeCard}
                />
              </div>

              {magnifierPosition && (
                <div
                  className="magnifier-lens"
                  style={{ clipPath: lensClip }}
                >
                  <div
                    className="magnifier-lens-content"
                    style={{
                      transformOrigin: lensTransformOrigin
                    }}
                  >
                    <PopupContent isPopup />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
