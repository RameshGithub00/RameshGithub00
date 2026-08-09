import { useState, useCallback } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import RoutePanel from './components/RoutePanel';
import { curatedRoutes } from './data/paths';
import {
  findRoute,
  findMultiStopRoute,
  type NavigationRoute,
} from './utils/pathfinding';

export default function App() {
  const [fromId, setFromId] = useState<string | null>(null);
  const [toId, setToId] = useState<string | null>(null);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<NavigationRoute | null>(null);
  const [activeRouteName, setActiveRouteName] = useState<string | undefined>();
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleNavigate = useCallback(() => {
    if (!fromId || !toId) return;
    const route = findRoute(fromId, toId);
    if (route) {
      setActiveRoute(route);
      setActiveRouteName(undefined);
      setActiveRouteId(null);
      setActiveStepIndex(0);
    }
  }, [fromId, toId]);

  const handleCuratedRoute = useCallback((routeId: string) => {
    const curated = curatedRoutes.find((r) => r.id === routeId);
    if (!curated) return;

    const route = findMultiStopRoute(curated.landmarkIds);
    if (route) {
      setFromId(curated.landmarkIds[0]);
      setToId(curated.landmarkIds[curated.landmarkIds.length - 1]);
      setActiveRoute(route);
      setActiveRouteName(curated.name);
      setActiveRouteId(routeId);
      setActiveStepIndex(0);
    }
  }, []);

  const handleLandmarkClick = useCallback((id: string) => {
    setSelectedLandmarkId(id);

    if (!fromId) {
      setFromId(id);
    } else if (!toId && id !== fromId) {
      setToId(id);
    } else {
      setFromId(id);
      setToId(null);
      setActiveRoute(null);
      setActiveRouteId(null);
    }
  }, [fromId, toId]);

  const handleLandmarkSelect = useCallback((id: string) => {
    setSelectedLandmarkId(id);
  }, []);

  const handleClear = useCallback(() => {
    setFromId(null);
    setToId(null);
    setSelectedLandmarkId(null);
    setActiveRoute(null);
    setActiveRouteName(undefined);
    setActiveRouteId(null);
    setActiveStepIndex(0);
  }, []);

  const handleCloseRoute = useCallback(() => {
    setActiveRoute(null);
    setActiveRouteName(undefined);
    setActiveRouteId(null);
    setActiveStepIndex(0);
  }, []);

  return (
    <div className="app">
      <Sidebar
        fromId={fromId}
        toId={toId}
        selectedLandmarkId={selectedLandmarkId}
        activeRouteId={activeRouteId}
        onFromChange={setFromId}
        onToChange={setToId}
        onLandmarkClick={handleLandmarkClick}
        onCuratedRouteSelect={handleCuratedRoute}
        onNavigate={handleNavigate}
        onClear={handleClear}
      />

      <main className="map-area">
        <MapView
          selectedLandmarkId={selectedLandmarkId}
          routeSteps={activeRoute?.steps ?? []}
          onLandmarkSelect={handleLandmarkSelect}
          activeStepIndex={activeStepIndex}
        />

        {activeRoute && (
          <RoutePanel
            route={activeRoute}
            activeStepIndex={activeStepIndex}
            routeName={activeRouteName}
            onStepClick={setActiveStepIndex}
            onClose={handleCloseRoute}
          />
        )}

        <div className="map-legend">
          <span><i className="dot gate" /> Gates</span>
          <span><i className="dot landmark" /> Landmarks</span>
          <span><i className="dot garden" /> Gardens</span>
          <span><i className="dot nature" /> Nature</span>
          <span><i className="dot monument" /> Monuments</span>
        </div>
      </main>
    </div>
  );
}
