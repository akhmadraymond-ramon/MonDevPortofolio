
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects';
import './ProjectDetail.css';

function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const project = projects.find((item) => item.slug === slug);

  const backButton = (
    <button
      className="detail-back"
      onClick={() => navigate('/')}
      aria-label="Back to projects"
      title="Back to projects"
      type="button"
    >
      <img
        src="/icons/chevron-left.svg"
        alt=""
        className="back-icon back-icon-default"
      />

      <img
        src="/icons/x.svg"
        alt=""
        className="back-icon back-icon-hover"
      />
    </button>
  );

  if (!project) {
    return (
      <main className="project-detail">
        {backButton}
        <h1>Project not found</h1>
      </main>
    );
  }

  return (
    <main className="project-detail">
      <div className="detail-container">

        <nav className="detail-navigation">
          {backButton}

          <span className="detail-number">
            PROJECT / {project.number}
          </span>
        </nav>

        <section className="detail-main">

          <div className="detail-content">
            <span className="detail-category">
              {project.category}
            </span>

            <h1>{project.title}</h1>

            <p className="detail-description">
              {project.description}
            </p>

            <div className="detail-technologies">
              <span className="detail-label">BUILT WITH</span>

              <div className="detail-tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <span className="detail-index">
              SELECTED WORK — 2026
            </span>
          </div>

          <div className="detail-visual">
            <button
              className="detail-image-trigger"
              onClick={() => setShowPreview(true)}
              aria-label="Preview project image"
              type="button"
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-detail-image"
              />

              <span className="image-preview-hint">
                <span>↗</span> Click to preview
              </span>
            </button>
          </div>

        </section>

        <footer className="detail-footer">
          <span>© 2026 MONDEV</span>
          <span>END OF PROJECT</span>
        </footer>

      </div>

      {showPreview && (
        <div
          className="image-preview-modal"
          onClick={() => setShowPreview(false)}
        >
          <button
            className="preview-close"
            onClick={() => setShowPreview(false)}
            aria-label="Close preview"
            type="button"
          >
            ×
          </button>

          <img
            src={project.image}
            alt={`${project.title} full preview`}
            onClick={(event) => event.stopPropagation()}
          />

          <span className="preview-caption">
            {project.title} — PROJECT / {project.number}
          </span>
        </div>
      )}

    </main>
  );
}

export default ProjectDetail;
