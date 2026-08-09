import type { NavigationRoute } from '../utils/pathfinding';
import {
  formatDistance,
  estimateWalkTime,
  getLandmark,
} from '../utils/pathfinding';

interface RoutePanelProps {
  route: NavigationRoute | null;
  activeStepIndex: number;
  routeName?: string;
  onStepClick: (index: number) => void;
  onClose: () => void;
}

export default function RoutePanel({
  route,
  activeStepIndex,
  routeName,
  onStepClick,
  onClose,
}: RoutePanelProps) {
  if (!route || route.steps.length === 0) return null;

  const walkMinutes = estimateWalkTime(route.totalDistance);

  return (
    <div className="route-panel">
      <div className="route-panel-header">
        <div>
          <h2>{routeName ?? 'Your route'}</h2>
          <p className="route-summary">
            {formatDistance(route.totalDistance)} · ~{walkMinutes} min walk ·{' '}
            {route.landmarkSteps.length} landmarks
          </p>
        </div>
        <button className="btn-close" onClick={onClose} aria-label="Close route">
          ✕
        </button>
      </div>

      <ol className="route-steps">
        {route.steps.map((step, index) => {
          const landmark = getLandmark(step.nodeId);
          const isActive = index === activeStepIndex;
          const isLandmark = step.isLandmark;

          if (!isLandmark && index > 0 && index < route.steps.length - 1) {
            return null;
          }

          return (
            <li
              key={`${step.nodeId}-${index}`}
              className={`route-step ${isActive ? 'active' : ''} ${isLandmark ? 'landmark' : ''}`}
            >
              <button
                className="route-step-btn"
                onClick={() => onStepClick(index)}
              >
                <span className="step-marker">
                  {index === 0 ? 'A' : index === route.steps.length - 1 ? 'B' : '●'}
                </span>
                <span className="step-content">
                  <strong>
                    {landmark ? `${landmark.icon} ${step.name}` : step.name}
                  </strong>
                  {landmark?.nameKannada && (
                    <span className="step-kannada">{landmark.nameKannada}</span>
                  )}
                  {step.distanceFromPrev > 0 && index > 0 && (
                    <span className="step-distance">
                      {formatDistance(step.distanceFromPrev)} from previous
                    </span>
                  )}
                  {landmark?.highlights && (
                    <span className="step-highlights">
                      {landmark.highlights.join(' · ')}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="route-panel-footer">
        <p>
          Paths follow Lalbagh&apos;s paved walking trails. Allow extra time for
          photos and flower shows.
        </p>
      </div>
    </div>
  );
}
