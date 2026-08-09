import { landmarks, landmarkById, type Landmark } from '../data/landmarks';
import { junctions, pathEdges } from '../data/paths';

export interface GraphNode {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

export interface RouteStep {
  nodeId: string;
  name: string;
  lat: number;
  lng: number;
  distanceFromPrev: number;
  isLandmark: boolean;
}

export interface NavigationRoute {
  steps: RouteStep[];
  totalDistance: number;
  landmarkSteps: RouteStep[];
}

function buildNodeMap(): Map<string, GraphNode> {
  const map = new Map<string, GraphNode>();

  for (const l of landmarks) {
    map.set(l.id, {
      id: l.id,
      lat: l.lat,
      lng: l.lng,
      name: l.name,
    });
  }

  for (const j of junctions) {
    map.set(j.id, {
      id: j.id,
      lat: j.lat,
      lng: j.lng,
      name: j.name ?? 'Path junction',
    });
  }

  return map;
}

function buildAdjacency(): Map<string, Array<{ to: string; distance: number }>> {
  const adj = new Map<string, Array<{ to: string; distance: number }>>();

  const addEdge = (from: string, to: string, distance: number) => {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push({ to, distance });
  };

  for (const edge of pathEdges) {
    addEdge(edge.from, edge.to, edge.distance);
    addEdge(edge.to, edge.from, edge.distance);
  }

  return adj;
}

const nodeMap = buildNodeMap();
const adjacency = buildAdjacency();

/** Dijkstra shortest path on the garden walking network */
export function findRoute(fromId: string, toId: string): NavigationRoute | null {
  if (fromId === toId) {
    const node = nodeMap.get(fromId);
    if (!node) return null;
    const isLandmark = landmarkById[fromId] !== undefined;
    return {
      steps: [
        {
          nodeId: fromId,
          name: node.name,
          lat: node.lat,
          lng: node.lng,
          distanceFromPrev: 0,
          isLandmark,
        },
      ],
      totalDistance: 0,
      landmarkSteps: isLandmark
        ? [
            {
              nodeId: fromId,
              name: node.name,
              lat: node.lat,
              lng: node.lng,
              distanceFromPrev: 0,
              isLandmark: true,
            },
          ]
        : [],
    };
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, { nodeId: string; distance: number } | null>();
  const unvisited = new Set<string>();

  for (const id of nodeMap.keys()) {
    dist.set(id, Infinity);
    prev.set(id, null);
    unvisited.add(id);
  }

  dist.set(fromId, 0);

  while (unvisited.size > 0) {
    let current: string | null = null;
    let minDist = Infinity;

    for (const id of unvisited) {
      const d = dist.get(id)!;
      if (d < minDist) {
        minDist = d;
        current = id;
      }
    }

    if (current === null || minDist === Infinity) break;

    unvisited.delete(current);

    if (current === toId) break;

    const neighbors = adjacency.get(current) ?? [];
    for (const { to, distance } of neighbors) {
      if (!unvisited.has(to)) continue;
      const alt = dist.get(current)! + distance;
      if (alt < dist.get(to)!) {
        dist.set(to, alt);
        prev.set(to, { nodeId: current, distance });
      }
    }
  }

  if (dist.get(toId) === Infinity) return null;

  const pathIds: string[] = [];
  let cur: string | null = toId;
  while (cur !== null) {
    pathIds.unshift(cur);
    const p = prev.get(cur);
    cur = p ? p.nodeId : null;
  }

  const steps: RouteStep[] = [];
  for (let i = 0; i < pathIds.length; i++) {
    const id = pathIds[i];
    const node = nodeMap.get(id);
    if (!node) continue;

    let distanceFromPrev = 0;
    if (i > 0) {
      const prevId = pathIds[i - 1];
      const edge = adjacency.get(prevId)?.find((e) => e.to === id);
      distanceFromPrev = edge?.distance ?? 0;
    }

    steps.push({
      nodeId: id,
      name: node.name,
      lat: node.lat,
      lng: node.lng,
      distanceFromPrev,
      isLandmark: landmarkById[id] !== undefined,
    });
  }

  const totalDistance = dist.get(toId) ?? 0;
  const landmarkSteps = steps.filter((s) => s.isLandmark);

  return { steps, totalDistance, landmarkSteps };
}

/** Chain shortest paths between a sequence of landmark IDs */
export function findMultiStopRoute(landmarkIds: string[]): NavigationRoute | null {
  if (landmarkIds.length === 0) return null;

  const allSteps: RouteStep[] = [];
  let totalDistance = 0;

  for (let i = 0; i < landmarkIds.length - 1; i++) {
    const segment = findRoute(landmarkIds[i], landmarkIds[i + 1]);
    if (!segment) return null;

    const segmentSteps =
      i === 0 ? segment.steps : segment.steps.slice(1);

    for (const step of segmentSteps) {
      allSteps.push({
        ...step,
        distanceFromPrev:
          allSteps.length === 0 ? 0 : step.distanceFromPrev,
      });
    }
    totalDistance += segment.totalDistance;
  }

  if (landmarkIds.length === 1) {
    return findRoute(landmarkIds[0], landmarkIds[0]);
  }

  return {
    steps: allSteps,
    totalDistance,
    landmarkSteps: allSteps.filter((s) => s.isLandmark),
  };
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function estimateWalkTime(meters: number): number {
  return Math.ceil(meters / 75); // ~4.5 km/h leisurely garden pace
}

export function getLandmark(id: string): Landmark | undefined {
  return landmarkById[id];
}

export function getNodeCoordinates(id: string): { lat: number; lng: number } | null {
  const node = nodeMap.get(id);
  return node ? { lat: node.lat, lng: node.lng } : null;
}
