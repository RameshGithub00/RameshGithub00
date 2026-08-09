export type LandmarkCategory =
  | 'gate'
  | 'landmark'
  | 'garden'
  | 'nature'
  | 'monument';

export interface Landmark {
  id: string;
  name: string;
  nameKannada?: string;
  description: string;
  lat: number;
  lng: number;
  category: LandmarkCategory;
  icon: string;
  highlights?: string[];
}

export const LALBAGH_CENTER = { lat: 12.950771, lng: 77.584236 };

export const landmarks: Landmark[] = [
  {
    id: 'north-gate',
    name: 'North Gate (Main Entrance)',
    nameKannada: 'ಉತ್ತರ ದ್ವಾರ',
    description:
      'The main entrance near the Glass House. Most visitors start their Lalbagh walk here.',
    lat: 12.95215,
    lng: 77.58785,
    category: 'gate',
    icon: '🚪',
    highlights: ['Nearest to Glass House', 'Flower show venue'],
  },
  {
    id: 'glass-house',
    name: 'Glass House',
    nameKannada: 'ಗ್ಲಾಸ್ ಹೌಸ್',
    description:
      'Iconic Victorian glass structure built in 1889, inspired by London\'s Crystal Palace. Hosts Republic Day and Independence Day flower shows.',
    lat: 12.9509,
    lng: 77.58714,
    category: 'landmark',
    icon: '🏛️',
    highlights: ['Flower shows twice a year', 'Exotic plant collection'],
  },
  {
    id: 'floral-clock',
    name: 'Floral Clock',
    nameKannada: 'ಹೂವಿನ ಗಡಿಯಾರ',
    description:
      'A decorative clock made of flowering plants, a charming photo spot near the Glass House.',
    lat: 12.95118,
    lng: 77.58675,
    category: 'landmark',
    icon: '🕐',
  },
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    nameKannada: 'ರೋಸ್ ಗಾರ್ಡನ್',
    description:
      'Colorful beds of roses and seasonal blooms — one of the most photogenic sections of Lalbagh.',
    lat: 12.94982,
    lng: 77.58578,
    category: 'garden',
    icon: '🌹',
    highlights: ['Best in winter bloom', 'Fragrant walking paths'],
  },
  {
    id: 'lake',
    name: 'Lalbagh Lake',
    nameKannada: 'ಲಾಲ್ಬಾಗ್ ಕೆರೆ',
    description:
      'Serene lake with walking paths along the shore. Popular for birdwatching and boating.',
    lat: 12.94825,
    lng: 77.58618,
    category: 'nature',
    icon: '🏞️',
    highlights: ['Birdwatching', 'Boating available'],
  },
  {
    id: 'kempegowda-tower',
    name: 'Kempegowda Tower',
    nameKannada: 'ಕೆಂಪೇಗೌಡ ಗೋಪುರ',
    description:
      'Watchtower on Lalbagh Rock offering panoramic views of the garden and Bangalore skyline.',
    lat: 12.94758,
    lng: 77.58548,
    category: 'monument',
    icon: '🗼',
    highlights: ['Panoramic views', 'Historic rock formation'],
  },
  {
    id: 'peninsular-gneiss',
    name: 'Peninsular Gneiss',
    nameKannada: 'ಪೆನಿನ್ಸುಲರ್ ಗ್ನೀಸ್',
    description:
      'National Geological Monument — one of the oldest rock formations on Earth, dated 2.5–3.4 billion years.',
    lat: 12.94788,
    lng: 77.58672,
    category: 'monument',
    icon: '🪨',
    highlights: ['National Geological Monument', 'Ancient rock exposure'],
  },
  {
    id: 'lotus-pond',
    name: 'Lotus Pond',
    nameKannada: 'ಕಮಲ ಕೆರೆ',
    description:
      'Peaceful pond with vibrant lotus flowers blooming among floating leaves.',
    lat: 12.94885,
    lng: 77.58742,
    category: 'nature',
    icon: '🪷',
  },
  {
    id: 'bandstand',
    name: 'Bandstand',
    nameKannada: 'ಬ್ಯಾಂಡ್ ಸ್ಟ್ಯಾಂಡ್',
    description:
      'Historic bandstand built in 1880 for concerts and cultural events. A lovely spot to rest.',
    lat: 12.95008,
    lng: 77.58482,
    category: 'landmark',
    icon: '🎵',
    highlights: ['Cultural events', 'Rest area'],
  },
  {
    id: 'bonsai-garden',
    name: 'Bonsai Garden',
    nameKannada: 'ಬೋನ್ಸಾಯಿ ಗಾರ್ಡನ್',
    description:
      'Collection of miniature trees grown in artistic shapes — a unique and tranquil section.',
    lat: 12.95158,
    lng: 77.58322,
    category: 'garden',
    icon: '🌳',
  },
  {
    id: 'topiary',
    name: 'Topiary Garden',
    nameKannada: 'ಟೋಪಿಯರಿ ಗಾರ್ಡನ್',
    description:
      'Sculpted plants and ornamental hedges maintained by Lalbagh\'s horticulture team.',
    lat: 12.95192,
    lng: 77.58205,
    category: 'garden',
    icon: '✂️',
  },
  {
    id: 'tree-fossil',
    name: 'Tree Fossil',
    nameKannada: 'ಟ್ರೀ ಫಾಸಿಲ್',
    description:
      'Ancient tree trunk fossils believed to be over 20 million years old.',
    lat: 12.95042,
    lng: 77.58348,
    category: 'monument',
    icon: '🦴',
  },
  {
    id: 'west-gate',
    name: 'West Gate (Metro)',
    nameKannada: 'ಪಶ್ಚಿಮ ದ್ವಾರ',
    description:
      'West entrance near Lalbagh Metro Station on the Green Line — the easiest public transit access.',
    lat: 12.94918,
    lng: 77.58018,
    category: 'gate',
    icon: '🚇',
    highlights: ['Lalbagh Metro Station', 'Namma Metro Green Line'],
  },
  {
    id: 'south-gate',
    name: 'South Gate',
    nameKannada: 'ದಕ್ಷಿಣ ದ್ವಾರ',
    description:
      'Southern entrance connecting to Jayanagar and surrounding residential areas.',
    lat: 12.94575,
    lng: 77.58418,
    category: 'gate',
    icon: '🚪',
  },
  {
    id: 'east-gate',
    name: 'East Gate',
    nameKannada: 'ಪೂರ್ವ ದ್ವಾರ',
    description:
      'Eastern entrance facing Siddapura and surrounding neighborhoods.',
    lat: 12.95148,
    lng: 77.59015,
    category: 'gate',
    icon: '🚪',
  },
];

export const landmarkById = Object.fromEntries(
  landmarks.map((l) => [l.id, l]),
) as Record<string, Landmark>;
