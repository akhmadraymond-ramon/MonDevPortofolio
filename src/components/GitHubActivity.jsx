
import { useEffect, useState } from 'react';
import './GitHubActivity.css';

const GITHUB_USERNAME = 'akhmadraymond-ramon';

function ActivityIcon({ name }) {
  const commonProps = {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'git-commit-horizontal':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h6m6 0h6" />
        </svg>
      );

    case 'folder-plus':
      return (
        <svg {...commonProps}>
          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M12 11v6m-3-3h6" />
        </svg>
      );

    case 'git-pull-request':
      return (
        <svg {...commonProps}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M6 9v12m12-6V9a6 6 0 0 0-6-6h-2" />
          <path d="m8 5-2 2-2-2" />
        </svg>
      );

    case 'circle-dot':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case 'message-circle':
      return (
        <svg {...commonProps}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
        </svg>
      );

    case 'star':
      return (
        <svg {...commonProps}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
        </svg>
      );

    case 'git-fork':
      return (
        <svg {...commonProps}>
          <circle cx="6" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M6 9v3a6 6 0 0 0 6 6m0-12v6a6 6 0 0 0 6 6" />
        </svg>
      );

    case 'tag':
      return (
        <svg {...commonProps}>
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1 0-2.8l7.2-7.2A2 2 0 0 1 12 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-.4 1.4z" />
          <circle cx="16.5" cy="7.5" r="1" />
        </svg>
      );

    case 'trash-2':
      return (
        <svg {...commonProps}>
          <path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
        </svg>
      );
  }
}

function getActivityDetails(event) {
  const repo = event.repo?.name || 'Unknown repository';

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload?.commits || [];
      const count = event.payload?.size || commits.length || 0;

      return {
        icon: 'git-commit-horizontal',
        category: 'PUSH',
        title: 'Pushed commits',
        description: `${count} commit${count !== 1 ? 's' : ''}`,
        repository: repo,
      };
    }

    case 'CreateEvent': {
      const refType = event.payload?.ref_type;
      const ref = event.payload?.ref;

      return {
        icon: 'folder-plus',
        category: 'CREATE',
        title:
          refType === 'repository'
            ? 'Created repository'
            : `Created ${refType || 'new content'}`,
        description: ref || 'New repository activity',
        repository: repo,
      };
    }

    case 'PullRequestEvent':
      return {
        icon: 'git-pull-request',
        category: 'PULL REQUEST',
        title: `${event.payload?.action || 'Updated'} pull request`,
        description:
          event.payload?.pull_request?.title || 'Pull request activity',
        repository: repo,
      };

    case 'IssuesEvent':
      return {
        icon: 'circle-dot',
        category: 'ISSUE',
        title: `${event.payload?.action || 'Updated'} issue`,
        description: event.payload?.issue?.title || 'Issue activity',
        repository: repo,
      };

    case 'IssueCommentEvent':
      return {
        icon: 'message-circle',
        category: 'COMMENT',
        title: 'Commented on an issue',
        description: event.payload?.issue?.title || 'New comment',
        repository: repo,
      };

    case 'WatchEvent':
      return {
        icon: 'star',
        category: 'STAR',
        title: 'Starred a repository',
        description: 'Repository starred',
        repository: repo,
      };

    case 'ForkEvent':
      return {
        icon: 'git-fork',
        category: 'FORK',
        title: 'Forked repository',
        description: 'Created a fork',
        repository: repo,
      };

    case 'ReleaseEvent':
      return {
        icon: 'tag',
        category: 'RELEASE',
        title: 'Published a release',
        description: event.payload?.release?.name || 'New release',
        repository: repo,
      };

    case 'DeleteEvent':
      return {
        icon: 'trash-2',
        category: 'DELETE',
        title: 'Deleted repository content',
        description: event.payload?.ref || 'Content deleted',
        repository: repo,
      };

    default:
      return {
        icon: 'activity',
        category: 'ACTIVITY',
        title: event.type?.replace('Event', '') || 'GitHub activity',
        description: 'Repository activity',
        repository: repo,
      };
  }
}

function formatTime(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diff = Math.max(0, now - date);

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
}

function GitHubActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchActivity() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? 'GitHub API rate limit reached. Please try again later.'
              : 'Unable to load GitHub activity.'
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response from GitHub.');
        }

        setActivities(data.slice(0, 5));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchActivity();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="github-activity-state">
        <span className="github-activity-loader" />
        <p>Loading GitHub activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-activity-state">
        <span className="github-activity-state-icon">!</span>
        <p>{error}</p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
        >
          Visit GitHub profile
        </a>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="github-activity-state">
        <p>No recent public activity found.</p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
        >
          Visit GitHub profile
        </a>
      </div>
    );
  }

  return (
    <div className="github-activity-list">
      {activities.map((event) => {
        const activity = getActivityDetails(event);
        const repositoryUrl = `https://github.com/${
          event.repo?.name || GITHUB_USERNAME
        }`;

        return (
          <a
            className="github-activity-item"
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            key={event.id}
          >
            <div className={`github-activity-icon ${activity.category.toLowerCase().replace(' ', '-')}`}>
              <ActivityIcon name={activity.icon} />
            </div>

            <div className="github-activity-info">
              <div className="github-activity-title">
                {activity.title}
              </div>

              <div className="github-activity-description">
                {activity.description}
              </div>

              <div className="github-activity-repo">
                <span className="github-activity-repo-dot" />
                {activity.repository}
              </div>
            </div>

            <time className="github-activity-time">
              {formatTime(event.created_at)}
            </time>
          </a>
        );
      })}
    </div>
  );
}

export default GitHubActivity;
