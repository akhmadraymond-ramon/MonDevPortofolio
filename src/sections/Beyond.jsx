import CircularCarousel from '../components/CircularCarousel';
import BeyondCard from '../components/BeyondCard';
import { GitHubCalendar } from 'react-github-calendar';
import GitHubActivity from '../components/GitHubActivity';
import './Beyond.css';

const techItems = [
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    alt: 'HTML5 logo',
    title: 'HTML',
    subtitle: 'Markup Language',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    alt: 'CSS3 logo',
    title: 'CSS',
    subtitle: 'Styling Language',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    alt: 'JavaScript logo',
    title: 'JavaScript',
    subtitle: 'Programming Language',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    alt: 'React logo',
    title: 'React JS',
    subtitle: 'JavaScript Library',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    alt: 'Python logo',
    title: 'Python',
    subtitle: 'Programming Language',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    alt: 'Git logo',
    title: 'Git',
    subtitle: 'Version Control',
  },
];

function Beyond() {
  return (
    <section className="beyond" id="beyond">
      <div className="beyond-container">

        {/* Header */}
        <div className="beyond-header">
          <div className="beyond-section-label">
            <div className="mobile-page-label">
              <span>04</span>
              <span className="home-divider">/</span>
              <span>BEYOND</span>
            </div>

            <p>
              What I explore, what I learn, and what I'm working towards.
            </p>
          </div>

          <div className="beyond-heading">
            <h2>Beyond the projects.</h2>

            <p>
              What I explore, what I learn, and what I'm working towards.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="beyond-grid">

          {/* Card 1: Recent Activity */}
          <BeyondCard className="beyond-card-activity">
            <div className="beyond-card-content activity-content">
              <div className="beyond-card-heading">
                <span className="beyond-eyebrow">
                  01 / TECHNOLOGY
                </span>

                <span className="beyond-status">
                  ● LEARNING
                </span>
              </div>

              <h3>Tech Stack</h3>

              <p className="beyond-description">
                Technologies I'm exploring and building with.
              </p>

              <div className="tech-carousel">
                <CircularCarousel
                  items={techItems}
                  preset="cylinder"
                  cardWidth={170}
                  aspectRatio={1.5}
                  gap={50}
                  autoplay="drift"
                  speed={20}
                  direction="left"
                  draggable
                  snap
                  captions
                  pauseOnHover
                  cornerRadius={16}
                  intro="rise"
                />
              </div>
            </div>
          </BeyondCard>

          {/* Card 2: GitHub Contributions */}
          <BeyondCard className="beyond-card-contributions">
            <div className="beyond-card-content contribution-content">

              <div className="beyond-card-heading">
                <span className="beyond-eyebrow">
                  GITHUB / CONTRIBUTIONS
                </span>

                <span className="contribution-period">
                  LAST 12 MONTHS
                </span>
              </div>

              <h3>Contribution Graph</h3>

              <p className="beyond-description">
                Every contribution is part of the journey.
              </p>

              <div className="contribution-graph-wrapper github-calendar-wrap">
                <GitHubCalendar
                  username="akhmadraymond-ramon"
                  colorScheme="light"
                  blockSize={15}
                  blockMargin={4}
                  fontSize={12}
                  showTotalCount
                  showColorLegend
                  theme={{
                    light: [
                      '#ebedf0',
                      '#9be9a8',
                      '#40c463',
                      '#30a14e',
                      '#216e39',
                    ],
                  }}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>

            </div>
          </BeyondCard>

          {/* Card 3: Web Development */}
          {/* Card 3: GitHub Recent Activity */}
          <BeyondCard className="beyond-card-web">
            <div className="beyond-card-content activity-feed-content">

              <div className="beyond-card-heading">
                <span className="beyond-eyebrow">
                  02 / GITHUB ACTIVITY
                </span>

                <span className="contribution-period">
                  RECENT EVENTS
                </span>
              </div>

              <h3>Recent Activity</h3>

              <p className="beyond-description">
                A glimpse of what I've been doing on GitHub.
              </p>

              <GitHubActivity />

            </div>
          </BeyondCard>

          {/* Card 4: Networking & IT */}
          <BeyondCard className="beyond-card-network">
            <div className="beyond-card-content focus-content">
              <span className="beyond-eyebrow">
                02 / FOCUS AREA
              </span>

              <div className="focus-main">
                <span className="focus-number">02</span>

                <h3>Networking & IT</h3>

                <p className="beyond-description">
                  Exploring networks, infrastructure,
                  and the technology behind connected systems.
                </p>
              </div>

              <div className="focus-tags">
                <span>Networking</span>
                <span>Systems</span>
                <span>Technology</span>
              </div>
            </div>
          </BeyondCard>

        </div>
      </div>
    </section>
  );
}

export default Beyond;