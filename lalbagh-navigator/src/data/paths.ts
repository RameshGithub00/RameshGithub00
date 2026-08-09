/**
 * Walking path network for Lalbagh Botanical Garden.
 * Nodes are landmark IDs or junction waypoints; edges represent paved walking paths.
 */

export interface PathNode {
  id: string;
  lat: number;
  lng: number;
  name?: string;
}

export interface PathEdge {
  from: string;
  to: string;
  /** Approximate walking distance in meters */
  distance: number;
}

/** Junction waypoints along internal garden paths (not standalone POIs) */
export const junctions: PathNode[] = [
  { id: 'j-north-gh', lat: 12.95175, lng: 77.58755, name: 'North path junction' },
  { id: 'j-gh-floral', lat: 12.95105, lng: 77.58695, name: 'Glass House plaza' },
  { id: 'j-center', lat: 12.95002, lng: 77.58552, name: 'Central crossroads' },
  { id: 'j-rose-lake', lat: 12.94905, lng: 77.58605, name: 'Rose–Lake path' },
  { id: 'j-lake-south', lat: 12.94715, lng: 77.58585, name: 'Lake south path' },
  { id: 'j-west-path', lat: 12.94955, lng: 77.58235, name: 'West garden path' },
  { id: 'j-band-bonsai', lat: 12.95075, lng: 77.58365, name: 'Bandstand–Bonsai path' },
  { id: 'j-east-path', lat: 12.95125, lng: 77.58885, name: 'East garden path' },
];

export const allNodes: PathNode[] = [
  ...junctions,
  // Landmarks are referenced by ID in edges; coordinates come from landmarks.ts at runtime
];

/** Bidirectional walking path edges */
export const pathEdges: PathEdge[] = [
  // North gate area
  { from: 'north-gate', to: 'j-north-gh', distance: 80 },
  { from: 'j-north-gh', to: 'glass-house', distance: 60 },
  { from: 'j-north-gh', to: 'floral-clock', distance: 50 },
  { from: 'glass-house', to: 'j-gh-floral', distance: 40 },
  { from: 'floral-clock', to: 'j-gh-floral', distance: 35 },
  { from: 'j-gh-floral', to: 'j-east-path', distance: 120 },
  { from: 'east-gate', to: 'j-east-path', distance: 90 },

  // Central paths
  { from: 'j-gh-floral', to: 'j-center', distance: 150 },
  { from: 'glass-house', to: 'lotus-pond', distance: 180 },
  { from: 'lotus-pond', to: 'j-rose-lake', distance: 70 },
  { from: 'rose-garden', to: 'j-rose-lake', distance: 60 },
  { from: 'j-rose-lake', to: 'lake', distance: 80 },
  { from: 'j-rose-lake', to: 'j-center', distance: 100 },
  { from: 'j-center', to: 'bandstand', distance: 90 },
  { from: 'j-center', to: 'j-band-bonsai', distance: 110 },

  // Lake loop
  { from: 'lake', to: 'peninsular-gneiss', distance: 70 },
  { from: 'lake', to: 'kempegowda-tower', distance: 90 },
  { from: 'peninsular-gneiss', to: 'lotus-pond', distance: 85 },
  { from: 'kempegowda-tower', to: 'j-lake-south', distance: 60 },
  { from: 'j-lake-south', to: 'south-gate', distance: 120 },
  { from: 'lake', to: 'j-lake-south', distance: 100 },

  // West side
  { from: 'bandstand', to: 'tree-fossil', distance: 70 },
  { from: 'tree-fossil', to: 'j-band-bonsai', distance: 55 },
  { from: 'j-band-bonsai', to: 'bonsai-garden', distance: 80 },
  { from: 'bonsai-garden', to: 'topiary', distance: 90 },
  { from: 'topiary', to: 'j-west-path', distance: 70 },
  { from: 'j-west-path', to: 'west-gate', distance: 100 },
  { from: 'j-west-path', to: 'j-band-bonsai', distance: 130 },
  { from: 'west-gate', to: 'bandstand', distance: 200 },

  // Cross connections
  { from: 'rose-garden', to: 'j-center', distance: 120 },
  { from: 'north-gate', to: 'j-east-path', distance: 150 },
];

export interface CuratedRoute {
  id: string;
  name: string;
  description: string;
  landmarkIds: string[];
  estimatedMinutes: number;
  difficulty: 'easy' | 'moderate';
}

export const curatedRoutes: CuratedRoute[] = [
  {
    id: 'heritage-trail',
    name: 'Heritage Trail',
    description:
      'The classic Lalbagh walk covering all major landmarks — perfect for first-time visitors.',
    landmarkIds: [
      'north-gate',
      'glass-house',
      'floral-clock',
      'rose-garden',
      'lake',
      'kempegowda-tower',
      'peninsular-gneiss',
      'lotus-pond',
      'bandstand',
      'bonsai-garden',
      'tree-fossil',
    ],
    estimatedMinutes: 90,
    difficulty: 'moderate',
  },
  {
    id: 'lake-nature-loop',
    name: 'Lake & Nature Loop',
    description:
      'A peaceful loop around the lake with geological monuments and birdwatching spots.',
    landmarkIds: [
      'rose-garden',
      'lake',
      'kempegowda-tower',
      'peninsular-gneiss',
      'lotus-pond',
      'rose-garden',
    ],
    estimatedMinutes: 45,
    difficulty: 'easy',
  },
  {
    id: 'glass-house-quick',
    name: 'Glass House Highlights',
    description:
      'Short walk from the main gate to the Glass House and nearby attractions.',
    landmarkIds: [
      'north-gate',
      'glass-house',
      'floral-clock',
      'lotus-pond',
      'rose-garden',
    ],
    estimatedMinutes: 30,
    difficulty: 'easy',
  },
  {
    id: 'metro-to-glass',
    name: 'Metro to Glass House',
    description:
      'Enter from West Gate (Metro) and walk to the iconic Glass House.',
    landmarkIds: [
      'west-gate',
      'bandstand',
      'tree-fossil',
      'bonsai-garden',
      'glass-house',
    ],
    estimatedMinutes: 35,
    difficulty: 'easy',
  },
  {
    id: 'west-gardens',
    name: 'Western Gardens Tour',
    description:
      'Explore the horticulture sections on the western side of Lalbagh.',
    landmarkIds: [
      'west-gate',
      'bandstand',
      'tree-fossil',
      'bonsai-garden',
      'topiary',
    ],
    estimatedMinutes: 40,
    difficulty: 'easy',
  },
];
