import { useEffect, useState } from 'react';
import './GitHubActivity.css';

const GITHUB_USERNAME = 'akhmadraymond-ramon';

function getActivityDetails(event) {
  const repo = event.repo?.name || 'Unknown repository';

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload?.commits || [];
      const count = event.payload?.size || commits.length || 0;

      return {
        icon: 'git-commit-horizontal',
        title: 'Pushed commits',
        description: `${count} commit${count !== 1 ? 's' : ''}`,
        repository: repo,
      };
    }

    case 'CreateEvent':
      return {
        icon: 'folder-plus',
        title: 'Created repository',
        description: event.payload?.ref || 'New repository activity',
        repository: repo,
      };

    case 'PullRequestEvent':
      return {
        icon: 'git-pull-request',
        title: `${event.payload?.action || 'Updated'} pull request`,
        description: event.payload?.pull_request?.title || 'Pull request activity',
        repository: repo,
      };

    case 'IssuesEvent':
      return {
        icon: 'circle-dot',
        title: `${event.payload?.action || 'Updated'} issue`,
        description: event.payload?.issue?.title || 'Issue activity',
        repository: repo,
      };

    case 'IssueCommentEvent':
      return {
        icon: 'message-circle',
        title: 'Commented on an issue',
        description: event.payload?.issue?.title || 'New comment',
        repository: repo,
      };

    case 'WatchEvent':
      return {
        icon: 'star',
        title: 'Starred a repository',
        description: 'Repository starred',
        repository: repo,
      };

    case 'ForkEvent':
      return {
        icon: 'git-fork',
        title: 'Forked repository',
        description: 'Created a fork',
        repository: repo,
      };

    case 'ReleaseEvent':
      return {
        icon: 'tag',
        title: 'Published a release',
        description: event.payload?.release?.name || 'New release',
        repository: repo,
      };

    case 'DeleteEvent':
      return {
        icon: 'trash-2',
        title: 'Deleted repository content',
        description: event.payload?.ref || 'Content deleted',
        repository: repo,
      };

    default:
      return {
        icon: 'activity',
        title: event.type?.replace('Event', '') || 'GitHub activity',
        description: 'Repository activity',
        repository: repo,
      };
  }
}

function formatTime(dateString) {
  const date = new Date(dateString);
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

        return (
          <a
            className="github-activity-item"
            href={`https://github.com/${event.repo?.name || GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            key={event.id}
          >
            <div className="github-activity-icon">
                {activity.icon}
            </div>

            <div className="github-activity-info">
              <div className="github-activity-title">
                {activity.title}
              </div>

              <div className="github-activity-description">
                {activity.description}
              </div>

              <div className="github-activity-repo">
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