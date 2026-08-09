# Lalbagh Navigator

A route navigation web app for **Lalbagh Botanical Garden** in Bangalore, India.

## Features

- **Interactive map** with 15 landmarks, gates, gardens, and monuments
- **Point-to-point navigation** along Lalbagh's walking paths
- **5 curated walking routes** (Heritage Trail, Lake Loop, Glass House Highlights, etc.)
- **Step-by-step directions** with distances and estimated walk times
- **Mobile-friendly** responsive layout

## Landmarks covered

- All four gates (North, South, East, West/Metro)
- Glass House, Floral Clock, Bandstand
- Lalbagh Lake, Lotus Pond, Kempegowda Tower
- Rose Garden, Bonsai Garden, Topiary Garden
- Peninsular Gneiss, Tree Fossil

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

## Tech stack

- React + TypeScript + Vite
- Leaflet / react-leaflet with OpenStreetMap tiles
- Custom path graph with Dijkstra shortest-path routing

## Note

Walking paths are modeled from Lalbagh's known trail layout. Distances are approximate. For official maps, see [lalbagh.info](https://lalbagh.info).
