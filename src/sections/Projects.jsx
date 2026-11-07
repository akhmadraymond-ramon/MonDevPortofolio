
import { useEffect, useState } from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import './Projects.css';

function Projects() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 600
  );

  const [stackComplete, setStackComplete] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-container">

        <div className="mobile-background-text">
          <div className="mobile-page-label">
            <span>03</span>
            <span className="home-divider">/</span>
            <span>PROJECTS</span>
          </div>

          <p>A collection of my work and experiments.</p>
        </div>

        <div
          className={`projects-heading ${
            stackComplete ? 'projects-heading--exit' : ''
          }`}
        >
          <h2>Things I've built.</h2>
          <p>A collection of experiments, ideas, and projects.</p>
        </div>

        <div className="projects-content">
          <ScrollStack
            useWindowScroll
            itemDistance={200}
            itemStackDistance={isMobile ? 30 : 55}
            stackPosition="15%"
            baseScale={0.85}
            itemScale={0.04}
            smoothScroll
            onStackComplete={setStackComplete}
          >
            {projects.map((project) => (
              <ScrollStackItem key={project.number}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="project-card-link"
                  onClick={() => {
                    sessionStorage.setItem(
                      'homeScrollY',
                      window.scrollY
                    );
                  }}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="project-preview-image"
                  />

                  <div className="project-preview-overlay">
                    <div className="project-preview-top">
                      <span>PROJECT / {project.number}</span>
                      <span>2026</span>
                    </div>

                    <div className="project-card-info">
                      <div className="project-info-main">
                        <span className="project-category">
                          {project.category}
                        </span>

                        <h3>{project.title}</h3>

                        <p>{project.description}</p>

                        <div className="project-tech">
                          {project.technologies.map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      <span className="project-card-arrow">↗</span>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

      </div>
    </section>
  );
}

export default Projects;
