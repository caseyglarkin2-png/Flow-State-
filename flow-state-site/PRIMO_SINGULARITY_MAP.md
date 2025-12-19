# Primo Singularity Map

A production-ready geospatial network visualization for the Primo facility network (~260 sites). Built with Next.js 14+, MapLibre GL, deck.gl, and a custom "Event Horizon" dark UI.

## Features

- **Full-screen Map**: 260 facility nodes rendered with deck.gl on MapLibre GL
- **Network Control Panel**: Search, filter by brand/type/status/region, display toggles
- **KPI Strip**: Real-time computed totals for trucks, trailers, guard shacks, gates, etc.
- **Facility Detail Drawer**: Complete facility information with data quality indicators
- **Theme Studio**: Customize colors, typography, logos, and icons with live preview
- **CSV Import**: Upload and map custom facility data
- **Lane Visualization**: Optional arc lines showing facility connections

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd flow-state-site
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000/singularity/primo](http://localhost:3000/singularity/primo)

### Production Build

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push your repository to GitHub
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Import the repository
4. Set the root directory to `flow-state-site` (if needed)
5. Deploy

No environment variables are required - the map uses free CARTO basemap tiles.

## Project Structure

```
flow-state-site/
  app/
    singularity/
      primo/
        page.tsx          # Main Primo Singularity Map page
  src/
    brand/
      icons/
        index.tsx         # Custom SVG icon system
      logos/
        index.tsx         # 4 logo variants
    components/
      primo/
        PrimoMap.tsx      # MapLibre + deck.gl map component
        KPIStrip.tsx      # KPI totals bar
        ControlPanel.tsx  # Search, filters, toggles
        FacilityDrawer.tsx # Facility detail sidebar
        ThemeStudio.tsx   # Theme customization panel
        CSVImport.tsx     # CSV upload and mapping
        LogoSwitcher.tsx  # Clickable logo component
    data/
      primoFacilities.sample.json  # 260 sample facilities
      primoLanes.sample.json       # 300 sample lane connections
    lib/
      utils.ts            # Utility functions
    store/
      primoStore.ts       # Zustand state management
    types/
      primo.ts            # TypeScript interfaces
  scripts/
    generateSamplePrimoFacilities.ts  # Data generator
```

## CSV Import

### Supported Columns

| Column | Required | Description |
|--------|----------|-------------|
| name | Yes | Facility name |
| lat | Yes | Latitude |
| lon | Yes | Longitude |
| city | Yes | City name |
| state | Yes | State code (2 letters) |
| id | No | Unique identifier (auto-generated if missing) |
| brand | No | Brand name (defaults to "Unknown") |
| facilityType | No | Plant, DC, CrossDock, Yard, Terminal, Other |
| status | No | Flow, Activating, Chaos |
| trucks | No | Number of trucks |
| trailers | No | Number of trailers |
| guardShacks | No | Number of guard shacks |
| gates | No | Number of gates |
| trailerYards | No | Number of trailer yards |
| dropDocks | No | Number of drop docks |
| inboundLanes | No | Number of inbound lanes |
| outboundLanes | No | Number of outbound lanes |

### Import Steps

1. Click the upload icon in the Control Panel header
2. Select your CSV file
3. Map columns to facility schema fields
4. Click "Validate & Preview"
5. Click "Import X Facilities"

## Theme Studio

### Export Theme

1. Open Theme Studio (gear icon)
2. Click the download icon
3. Save the JSON file

### Import Theme

1. Open Theme Studio
2. Click the upload icon
3. Select a theme JSON file

### Theme JSON Structure

```json
{
  "id": "custom-theme",
  "name": "My Theme",
  "colors": {
    "background": "#050505",
    "surface": "#0F0F0F",
    "primary": "#00FFC2",
    "alert": "#FF2A00",
    "text": "#FFFFFF",
    "textSecondary": "#888888"
  },
  "typography": {
    "bodyFont": "Inter",
    "monoFont": "JetBrains Mono",
    "sizeBase": 14,
    "sizeSmall": 12,
    "sizeLarge": 18,
    "sizeXLarge": 24
  },
  "icons": {
    "variant": "flow-v1"
  },
  "logos": {
    "variant": "horizontal"
  }
}
```

## Replacing Sample Data

### Option 1: CSV Import (Runtime)

Use the CSV Import feature to replace data at runtime. Changes persist in memory until page reload.

### Option 2: Replace JSON Files

1. Generate your own JSON data matching the schema in `src/types/primo.ts`
2. Replace `src/data/primoFacilities.sample.json`
3. Optionally replace `src/data/primoLanes.sample.json`
4. Rebuild the application

### Facility Schema

```typescript
interface Facility {
  id: string;
  name: string;
  brand: string;
  facilityType: 'Plant' | 'DC' | 'CrossDock' | 'Yard' | 'Terminal' | 'Other';
  status: 'Flow' | 'Activating' | 'Chaos';
  address?: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  counts: {
    trucks: number;
    trailers: number;
    guardShacks: number;
    gates: number;
    trailerYards: number;
    dropDocks: number;
    inboundLanes: number;
    outboundLanes: number;
  };
  notes?: string;
  updatedAt?: string;
}
```

### Lane Schema

```typescript
interface Lane {
  id: string;
  fromFacilityId: string;
  toFacilityId: string;
  volume: number;
  status: 'Flow' | 'Activating' | 'Chaos';
}
```

## Icon System

Custom SVG icons are located in `src/brand/icons/index.tsx`. Available icons:

- Facility Types: Plant, DC, CrossDock, Yard, Terminal
- Assets: Truck, Trailer, GuardShack, Gate, TrailerYard, DropDock
- Lanes: InboundLane, OutboundLane
- UI: Filter, Search, Settings, Close, ChevronDown, ChevronRight
- Status: FlowStatus, ActivatingStatus, ChaosStatus

### Usage

```tsx
import { PlantIcon, TruckIcon } from '@/brand/icons';

<PlantIcon size={24} color="#00FFC2" />
```

## Logo Variants

Four logo variants in `src/brand/logos/index.tsx`:

1. **mark** - Icon only
2. **wordmark** - Text only ("Flow State")
3. **horizontal** - Icon + text side by side
4. **stacked** - Icon above text

Click the logo in the map header to cycle through variants.

## Performance Notes

- 260 facilities render at 60fps on modern hardware
- Lanes are rendered as arcs using deck.gl's ArcLayer
- Labels appear only at zoom level 6+
- Use "Cluster Points" toggle for better performance at low zoom

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Map**: MapLibre GL + react-map-gl
- **Layers**: deck.gl (ScatterplotLayer, ArcLayer, TextLayer)
- **State**: Zustand with localStorage persistence
- **Animations**: Framer Motion
- **CSV Parsing**: PapaParse
- **Icons**: Custom SVG React components

## License

MIT
