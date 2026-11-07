
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Menunggu sampai scroll selesai
  const waitForScrollEnd = () => {
    return new Promise((resolve) => {
      let timeout;

      const finish = () => {
        clearTimeout(timeout);
        window.removeEventListener('scrollend', finish);
        resolve();
      };

      window.addEventListener('scrollend', finish, { once: true });
      timeout = setTimeout(finish, 5000);
    });
  };

  // Navigasi Projects desktop
  const handleProjectsClick = async (e) => {
    if (window.innerWidth <= 600) return;

    e.preventDefault();

    const section = document.getElementById('projects');

    if (!section) return;

    // Hitung posisi title dari section, bukan elemen sticky
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;

    const sectionPaddingTop =
      parseFloat(getComputedStyle(section).paddingTop) || 0;

    const headingPosition =
      sectionTop + sectionPaddingTop + 180;

    // Tahap 1: Scroll ke akhir section Projects
    const sectionBottom =
      section.getBoundingClientRect().bottom + window.scrollY;

    const bottomPosition = Math.max(
      0,
      sectionBottom - window.innerHeight
    );

    window.scrollTo({
      top: bottomPosition,
      behavior: 'smooth',
    });

    await waitForScrollEnd();

    // Tahap 2: Kembali ke posisi title
    window.scrollTo({
      top: headingPosition,
      behavior: 'smooth',
    });

    setActiveSection('projects');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a
          href="#home"
          className={activeSection === 'home' ? 'active' : ''}
        >
          Home
        </a>

        <a
          href="#about"
          className={activeSection === 'about' ? 'active' : ''}
        >
          Let Know
        </a>

        <a
          href="#projects"
          className={activeSection === 'projects' ? 'active' : ''}
          onClick={handleProjectsClick}
        >
          Projects
        </a>

        <a
          href="#contact"
          className={activeSection === 'contact' ? 'active' : ''}
        >
          AskMe
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
