import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { landmarks, LALBAGH_CENTER } from '../data/landmarks';
import type { RouteStep } from '../utils/pathfinding';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default Leaflet marker icons in Vite
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const categoryColors: Record<string, string> = {
  gate: '#2563eb',
  landmark: '#dc2626',
  garden: '#16a34a',
  nature: '#0891b2',
  monument: '#9333ea',
};

function createLandmarkIcon(category: string, selected: boolean) {
  const color = categoryColors[category] ?? '#64748b';
  const size = selected ? 36 : 28;
  const border = selected ? 3 : 2;

  return L.divIcon({
    className: 'landmark-marker',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:${border}px solid white;
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      display:flex;align-items:center;justify-content:center;
      font-size:${selected ? 14 : 11}px;color:white;font-weight:700;
      transition:all 0.2s ease;
    ">●</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 17);
      return;
    }
    const bounds = L.latLngBounds(positions.map((p) => L.latLng(p[0], p[1])));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17 });
  }, [map, positions]);

  return null;
}

interface MapViewProps {
  selectedLandmarkId: string | null;
  routeSteps: RouteStep[];
  onLandmarkSelect: (id: string) => void;
  activeStepIndex: number;
}

export default function MapView({
  selectedLandmarkId,
  routeSteps,
  onLandmarkSelect,
  activeStepIndex,
}: MapViewProps) {
  const routePositions: [number, number][] = routeSteps.map((s) => [s.lat, s.lng]);

  const fitPositions =
    routePositions.length > 0
      ? routePositions
      : [[LALBAGH_CENTER.lat, LALBAGH_CENTER.lng] as [number, number]];

  return (
    <MapContainer
      center={[LALBAGH_CENTER.lat, LALBAGH_CENTER.lng]}
      zoom={16}
      className="map-container"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds positions={fitPositions} />

      {landmarks.map((landmark) => {
        const isSelected = landmark.id === selectedLandmarkId;
        const isOnRoute = routeSteps.some((s) => s.nodeId === landmark.id && s.isLandmark);
        const isActive =
          routeSteps[activeStepIndex]?.nodeId === landmark.id;

        return (
          <Marker
            key={landmark.id}
            position={[landmark.lat, landmark.lng]}
            icon={createLandmarkIcon(
              landmark.category,
              isSelected || isActive,
            )}
            eventHandlers={{
              click: () => onLandmarkSelect(landmark.id),
            }}
          >
            <Popup>
              <div className="map-popup">
                <strong>{landmark.icon} {landmark.name}</strong>
                {landmark.nameKannada && (
                  <span className="map-popup-kannada">{landmark.nameKannada}</span>
                )}
                <p>{landmark.description}</p>
                {isOnRoute && <span className="map-popup-badge">On route</span>}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {routePositions.length > 1 && (
        <Polyline
          positions={routePositions}
          pathOptions={{
            color: '#059669',
            weight: 5,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      )}

      {routeSteps.map((step, index) => {
        if (!step.isLandmark && index > 0 && index < routeSteps.length - 1) {
          return (
            <Marker
              key={`step-${index}`}
              position={[step.lat, step.lng]}
              icon={L.divIcon({
                className: 'junction-marker',
                html: `<div style="
                  width:10px;height:10px;
                  background:#059669;
                  border:2px solid white;
                  border-radius:50%;
                  opacity:0.7;
                "></div>`,
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              })}
              interactive={false}
            />
          );
        }
        return null;
      })}
    </MapContainer>
  );
}
