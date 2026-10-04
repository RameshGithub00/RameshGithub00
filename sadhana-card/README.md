# Sadhana Card — Chanting Recorder

A simple monthly **Sadhana Card** for logging daily chanting (or any practice), modeled on the paper cards used in many communities.

## Features

- Month view with **Name**, **Subject**, and a three-column **Date / Count** grid
- Counts saved automatically in your browser (`localStorage`)
- **Fill empty** with your default count (e.g. 5)
- **Right-click** a count cell to mark **Ekadashi** (configurable, e.g. 16)
- **Print** a clean card, **export/import** JSON backups
- Monthly totals: days logged and sum of counts

## Run locally

```bash
cd sadhana-card
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

Static files are in `dist/` and can be hosted on any static host.
