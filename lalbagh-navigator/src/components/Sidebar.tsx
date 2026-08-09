import { landmarks, type Landmark, type LandmarkCategory } from '../data/landmarks';
import { curatedRoutes } from '../data/paths';

const categoryLabels: Record<LandmarkCategory, string> = {
  gate: 'Gates',
  landmark: 'Landmarks',
  garden: 'Gardens',
  nature: 'Nature',
  monument: 'Monuments',
};

interface SidebarProps {
  fromId: string | null;
  toId: string | null;
  selectedLandmarkId: string | null;
  activeRouteId: string | null;
  onFromChange: (id: string) => void;
  onToChange: (id: string) => void;
  onLandmarkClick: (id: string) => void;
  onCuratedRouteSelect: (routeId: string) => void;
  onNavigate: () => void;
  onClear: () => void;
}

export default function Sidebar({
  fromId,
  toId,
  selectedLandmarkId,
  activeRouteId,
  onFromChange,
  onToChange,
  onLandmarkClick,
  onCuratedRouteSelect,
  onNavigate,
  onClear,
}: SidebarProps) {
  const categories = [...new Set(landmarks.map((l) => l.category))];

  const canNavigate = fromId && toId && fromId !== toId;

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <div className="logo-row">
          <span className="logo-icon">🌿</span>
          <div>
            <h1>Lalbagh Navigator</h1>
            <p className="subtitle">ಲಾಲ್ಬಾಗ್ ಬಾಟಗಾರ</p>
          </div>
        </div>
        <p className="header-desc">
          Route navigation for Lalbagh Botanical Garden, Bangalore
        </p>
      </header>

      <section className="route-planner">
        <h2>Plan a route</h2>
        <div className="select-row">
          <label>
            <span className="label-dot from">A</span>
            From
            <select
              value={fromId ?? ''}
              onChange={(e) => onFromChange(e.target.value)}
            >
              <option value="">Select start point</option>
              {landmarks.map((l) => (
                <option key={l.id} value={l.id} disabled={l.id === toId}>
                  {l.icon} {l.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="label-dot to">B</span>
            To
            <select
              value={toId ?? ''}
              onChange={(e) => onToChange(e.target.value)}
            >
              <option value="">Select destination</option>
              {landmarks.map((l) => (
                <option key={l.id} value={l.id} disabled={l.id === fromId}>
                  {l.icon} {l.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="action-row">
          <button
            className="btn btn-primary"
            onClick={onNavigate}
            disabled={!canNavigate}
          >
            Navigate
          </button>
          <button className="btn btn-ghost" onClick={onClear}>
            Clear
          </button>
        </div>
      </section>

      <section className="curated-routes">
        <h2>Curated walks</h2>
        <div className="route-cards">
          {curatedRoutes.map((route) => (
            <button
              key={route.id}
              className={`route-card ${activeRouteId === route.id ? 'active' : ''}`}
              onClick={() => onCuratedRouteSelect(route.id)}
            >
              <div className="route-card-top">
                <strong>{route.name}</strong>
                <span className="route-meta">
                  ~{route.estimatedMinutes} min · {route.difficulty}
                </span>
              </div>
              <p>{route.description}</p>
              <span className="route-stops">
                {route.landmarkIds.length} stops
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="landmark-list">
        <h2>Explore landmarks</h2>
        {categories.map((cat) => (
          <div key={cat} className="landmark-group">
            <h3>{categoryLabels[cat]}</h3>
            <ul>
              {landmarks
                .filter((l) => l.category === cat)
                .map((landmark) => (
                  <LandmarkListItem
                    key={landmark.id}
                    landmark={landmark}
                    isSelected={
                      selectedLandmarkId === landmark.id ||
                      fromId === landmark.id ||
                      toId === landmark.id
                    }
                    onClick={() => onLandmarkClick(landmark.id)}
                  />
                ))}
            </ul>
          </div>
        ))}
      </section>
    </aside>
  );
}

function LandmarkListItem({
  landmark,
  isSelected,
  onClick,
}: {
  landmark: Landmark;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        className={`landmark-item ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
      >
        <span className="landmark-icon">{landmark.icon}</span>
        <span className="landmark-name">{landmark.name}</span>
      </button>
    </li>
  );
}
