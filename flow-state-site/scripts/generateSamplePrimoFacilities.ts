// Sample Primo Facilities Generator
// Generates exactly 260 facilities with plausible US distribution
// Run with: npx ts-node scripts/generateSamplePrimoFacilities.ts

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

interface Lane {
  id: string;
  fromFacilityId: string;
  toFacilityId: string;
  volume: number;
  status: 'Flow' | 'Activating' | 'Chaos';
}

// Seeded random number generator for deterministic output
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

// US Cities with coordinates (major logistics hubs)
const US_CITIES = [
  { city: 'Los Angeles', state: 'CA', lat: 34.0522, lon: -118.2437 },
  { city: 'Chicago', state: 'IL', lat: 41.8781, lon: -87.6298 },
  { city: 'Houston', state: 'TX', lat: 29.7604, lon: -95.3698 },
  { city: 'Phoenix', state: 'AZ', lat: 33.4484, lon: -112.074 },
  { city: 'Philadelphia', state: 'PA', lat: 39.9526, lon: -75.1652 },
  { city: 'San Antonio', state: 'TX', lat: 29.4241, lon: -98.4936 },
  { city: 'San Diego', state: 'CA', lat: 32.7157, lon: -117.1611 },
  { city: 'Dallas', state: 'TX', lat: 32.7767, lon: -96.797 },
  { city: 'Austin', state: 'TX', lat: 30.2672, lon: -97.7431 },
  { city: 'Jacksonville', state: 'FL', lat: 30.3322, lon: -81.6557 },
  { city: 'Fort Worth', state: 'TX', lat: 32.7555, lon: -97.3308 },
  { city: 'Columbus', state: 'OH', lat: 39.9612, lon: -82.9988 },
  { city: 'Charlotte', state: 'NC', lat: 35.2271, lon: -80.8431 },
  { city: 'Indianapolis', state: 'IN', lat: 39.7684, lon: -86.1581 },
  { city: 'Seattle', state: 'WA', lat: 47.6062, lon: -122.3321 },
  { city: 'Denver', state: 'CO', lat: 39.7392, lon: -104.9903 },
  { city: 'Boston', state: 'MA', lat: 42.3601, lon: -71.0589 },
  { city: 'Nashville', state: 'TN', lat: 36.1627, lon: -86.7816 },
  { city: 'Detroit', state: 'MI', lat: 42.3314, lon: -83.0458 },
  { city: 'Portland', state: 'OR', lat: 45.5155, lon: -122.6789 },
  { city: 'Memphis', state: 'TN', lat: 35.1495, lon: -90.049 },
  { city: 'Louisville', state: 'KY', lat: 38.2527, lon: -85.7585 },
  { city: 'Milwaukee', state: 'WI', lat: 43.0389, lon: -87.9065 },
  { city: 'Albuquerque', state: 'NM', lat: 35.0844, lon: -106.6504 },
  { city: 'Tucson', state: 'AZ', lat: 32.2226, lon: -110.9747 },
  { city: 'Fresno', state: 'CA', lat: 36.7378, lon: -119.7871 },
  { city: 'Sacramento', state: 'CA', lat: 38.5816, lon: -121.4944 },
  { city: 'Kansas City', state: 'MO', lat: 39.0997, lon: -94.5786 },
  { city: 'Atlanta', state: 'GA', lat: 33.749, lon: -84.388 },
  { city: 'Miami', state: 'FL', lat: 25.7617, lon: -80.1918 },
  { city: 'Raleigh', state: 'NC', lat: 35.7796, lon: -78.6382 },
  { city: 'Omaha', state: 'NE', lat: 41.2565, lon: -95.9345 },
  { city: 'Oakland', state: 'CA', lat: 37.8044, lon: -122.2712 },
  { city: 'Minneapolis', state: 'MN', lat: 44.9778, lon: -93.265 },
  { city: 'Cleveland', state: 'OH', lat: 41.4993, lon: -81.6944 },
  { city: 'Tampa', state: 'FL', lat: 27.9506, lon: -82.4572 },
  { city: 'Salt Lake City', state: 'UT', lat: 40.7608, lon: -111.891 },
  { city: 'St. Louis', state: 'MO', lat: 38.627, lon: -90.1994 },
  { city: 'Pittsburgh', state: 'PA', lat: 40.4406, lon: -79.9959 },
  { city: 'Cincinnati', state: 'OH', lat: 39.1031, lon: -84.512 },
  { city: 'Orlando', state: 'FL', lat: 28.5383, lon: -81.3792 },
  { city: 'Newark', state: 'NJ', lat: 40.7357, lon: -74.1724 },
  { city: 'New Orleans', state: 'LA', lat: 29.9511, lon: -90.0715 },
  { city: 'Las Vegas', state: 'NV', lat: 36.1699, lon: -115.1398 },
  { city: 'Riverside', state: 'CA', lat: 33.9806, lon: -117.3755 },
  { city: 'San Jose', state: 'CA', lat: 37.3382, lon: -121.8863 },
  { city: 'Birmingham', state: 'AL', lat: 33.5207, lon: -86.8025 },
  { city: 'Richmond', state: 'VA', lat: 37.5407, lon: -77.436 },
  { city: 'Spokane', state: 'WA', lat: 47.6588, lon: -117.426 },
  { city: 'Boise', state: 'ID', lat: 43.615, lon: -116.2023 },
  { city: 'Little Rock', state: 'AR', lat: 34.7465, lon: -92.2896 },
  { city: 'Des Moines', state: 'IA', lat: 41.5868, lon: -93.625 },
  { city: 'Grand Rapids', state: 'MI', lat: 42.9634, lon: -85.6681 },
  { city: 'Buffalo', state: 'NY', lat: 42.8864, lon: -78.8784 },
  { city: 'Hartford', state: 'CT', lat: 41.7658, lon: -72.6734 },
  { city: 'Providence', state: 'RI', lat: 41.824, lon: -71.4128 },
  { city: 'Albany', state: 'NY', lat: 42.6526, lon: -73.7562 },
  { city: 'Knoxville', state: 'TN', lat: 35.9606, lon: -83.9207 },
  { city: 'El Paso', state: 'TX', lat: 31.7619, lon: -106.485 },
  { city: 'Tulsa', state: 'OK', lat: 36.154, lon: -95.9928 },
  { city: 'Syracuse', state: 'NY', lat: 43.0481, lon: -76.1474 },
  { city: 'Harrisburg', state: 'PA', lat: 40.2732, lon: -76.8867 },
  { city: 'Savannah', state: 'GA', lat: 32.0809, lon: -81.0912 },
  { city: 'Charleston', state: 'SC', lat: 32.7765, lon: -79.9311 },
  { city: 'Greenville', state: 'SC', lat: 34.8526, lon: -82.394 },
  { city: 'Mobile', state: 'AL', lat: 30.6954, lon: -88.0399 },
  { city: 'Shreveport', state: 'LA', lat: 32.5252, lon: -93.7502 },
  { city: 'Jackson', state: 'MS', lat: 32.2988, lon: -90.1848 },
  { city: 'Wichita', state: 'KS', lat: 37.6872, lon: -97.3301 },
  { city: 'Springfield', state: 'MO', lat: 37.2089, lon: -93.2923 },
  { city: 'Amarillo', state: 'TX', lat: 35.222, lon: -101.8313 },
  { city: 'Lubbock', state: 'TX', lat: 33.5779, lon: -101.8552 },
  { city: 'Laredo', state: 'TX', lat: 27.5306, lon: -99.4803 },
  { city: 'Corpus Christi', state: 'TX', lat: 27.8006, lon: -97.3964 },
  { city: 'Norfolk', state: 'VA', lat: 36.8508, lon: -76.2859 },
  { city: 'Lexington', state: 'KY', lat: 38.0406, lon: -84.5037 },
  { city: 'Columbia', state: 'SC', lat: 34.0007, lon: -81.0348 },
  { city: 'Chattanooga', state: 'TN', lat: 35.0456, lon: -85.3097 },
  { city: 'Dayton', state: 'OH', lat: 39.7589, lon: -84.1916 },
  { city: 'Akron', state: 'OH', lat: 41.0814, lon: -81.519 },
  { city: 'Toledo', state: 'OH', lat: 41.6528, lon: -83.5379 },
  { city: 'Fort Wayne', state: 'IN', lat: 41.0793, lon: -85.1394 },
  { city: 'South Bend', state: 'IN', lat: 41.6764, lon: -86.2519 },
  { city: 'Peoria', state: 'IL', lat: 40.6936, lon: -89.589 },
  { city: 'Rockford', state: 'IL', lat: 42.2711, lon: -89.094 },
  { city: 'Madison', state: 'WI', lat: 43.0731, lon: -89.4012 },
  { city: 'Green Bay', state: 'WI', lat: 44.5133, lon: -88.0133 },
  { city: 'Cedar Rapids', state: 'IA', lat: 41.9779, lon: -91.6656 },
  { city: 'Sioux Falls', state: 'SD', lat: 43.5446, lon: -96.7311 },
  { city: 'Fargo', state: 'ND', lat: 46.8772, lon: -96.7898 },
  { city: 'Billings', state: 'MT', lat: 45.7833, lon: -108.5007 },
  { city: 'Cheyenne', state: 'WY', lat: 41.1399, lon: -104.8202 },
  { city: 'Colorado Springs', state: 'CO', lat: 38.8339, lon: -104.8214 },
  { city: 'Reno', state: 'NV', lat: 39.5296, lon: -119.8138 },
  { city: 'Eugene', state: 'OR', lat: 44.0521, lon: -123.0868 },
  { city: 'Tacoma', state: 'WA', lat: 47.2529, lon: -122.4443 },
  { city: 'Bakersfield', state: 'CA', lat: 35.3733, lon: -119.0187 },
  { city: 'Stockton', state: 'CA', lat: 37.9577, lon: -121.2908 },
  { city: 'Modesto', state: 'CA', lat: 37.6391, lon: -120.9969 },
  { city: 'Fontana', state: 'CA', lat: 34.0922, lon: -117.4352 },
];

const BRANDS = [
  'Primo',
  'Poland Spring',
  'Deer Park',
  'Zephyrhills',
  'Ozarka',
  'Ice Mountain',
  'Arrowhead',
  'Pure Life',
  'Crystal Springs',
  'Sparkletts',
];

const FACILITY_TYPES: Array<Facility['facilityType']> = [
  'Plant',
  'DC',
  'CrossDock',
  'Yard',
  'Terminal',
];

const STATUSES: Array<Facility['status']> = ['Flow', 'Activating', 'Chaos'];

function generateFacilities(count: number, seed: number): Facility[] {
  const rng = new SeededRandom(seed);
  const facilities: Facility[] = [];
  const usedNames = new Set<string>();

  // Shuffle cities for variety
  const shuffledCities = rng.shuffle(US_CITIES);

  for (let i = 0; i < count; i++) {
    const cityData = shuffledCities[i % shuffledCities.length];
    
    // Add slight coordinate offset for cities with multiple facilities
    const latOffset = (rng.next() - 0.5) * 0.5;
    const lonOffset = (rng.next() - 0.5) * 0.5;
    
    const brand = rng.pick(BRANDS);
    const facilityType = rng.pick(FACILITY_TYPES);
    
    // Generate unique name
    let facilityNumber = Math.floor(i / shuffledCities.length) + 1;
    let baseName = `${cityData.city} ${facilityType}`;
    let name = facilityNumber > 1 ? `${baseName} ${facilityNumber}` : baseName;
    
    while (usedNames.has(name)) {
      facilityNumber++;
      name = `${baseName} ${facilityNumber}`;
    }
    usedNames.add(name);
    
    // Status distribution: 70% Flow, 20% Activating, 10% Chaos
    const statusRoll = rng.next();
    const status: Facility['status'] = 
      statusRoll < 0.7 ? 'Flow' : 
      statusRoll < 0.9 ? 'Activating' : 'Chaos';
    
    // Generate counts based on facility type
    const baseMultiplier = facilityType === 'Plant' ? 2 : 
                          facilityType === 'DC' ? 1.5 : 
                          facilityType === 'Terminal' ? 1.3 : 1;
    
    facilities.push({
      id: `F${String(i + 1).padStart(4, '0')}`,
      name,
      brand,
      facilityType,
      status,
      address: `${rng.nextInt(100, 9999)} Industrial Blvd`,
      city: cityData.city,
      state: cityData.state,
      lat: cityData.lat + latOffset,
      lon: cityData.lon + lonOffset,
      counts: {
        trucks: Math.round(rng.nextInt(5, 50) * baseMultiplier),
        trailers: Math.round(rng.nextInt(10, 100) * baseMultiplier),
        guardShacks: rng.nextInt(1, 4),
        gates: rng.nextInt(2, 8),
        trailerYards: rng.nextInt(1, 5),
        dropDocks: rng.nextInt(4, 20),
        inboundLanes: rng.nextInt(2, 12),
        outboundLanes: rng.nextInt(2, 12),
      },
      notes: status === 'Chaos' 
        ? 'System integration pending' 
        : status === 'Activating' 
        ? 'Onboarding in progress' 
        : undefined,
      updatedAt: new Date(Date.now() - rng.nextInt(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return facilities;
}

function generateLanes(facilities: Facility[], count: number, seed: number): Lane[] {
  const rng = new SeededRandom(seed);
  const lanes: Lane[] = [];
  const usedPairs = new Set<string>();

  for (let i = 0; i < count; i++) {
    let fromFacility: Facility;
    let toFacility: Facility;
    let pairKey: string;
    
    // Ensure unique pairs and no self-loops
    let attempts = 0;
    do {
      fromFacility = rng.pick(facilities);
      toFacility = rng.pick(facilities);
      pairKey = `${fromFacility.id}-${toFacility.id}`;
      attempts++;
    } while ((fromFacility.id === toFacility.id || usedPairs.has(pairKey)) && attempts < 100);
    
    if (attempts >= 100) continue;
    
    usedPairs.add(pairKey);
    
    // Status correlates with connected facilities
    const bothFlow = fromFacility.status === 'Flow' && toFacility.status === 'Flow';
    const anyChaos = fromFacility.status === 'Chaos' || toFacility.status === 'Chaos';
    
    const status: Lane['status'] = 
      anyChaos ? 'Chaos' :
      bothFlow ? 'Flow' : 'Activating';
    
    lanes.push({
      id: `L${String(i + 1).padStart(4, '0')}`,
      fromFacilityId: fromFacility.id,
      toFacilityId: toFacility.id,
      volume: rng.nextInt(50, 500),
      status,
    });
  }

  return lanes;
}

// Main execution
const SEED = 42;
const FACILITY_COUNT = 260;
const LANE_COUNT = 300;

const facilities = generateFacilities(FACILITY_COUNT, SEED);
const lanes = generateLanes(facilities, LANE_COUNT, SEED + 1);

console.log('Generated Facilities:', facilities.length);
console.log('Generated Lanes:', lanes.length);

// Output to JSON
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'primoFacilities.sample.json'),
  JSON.stringify(facilities, null, 2)
);

fs.writeFileSync(
  path.join(dataDir, 'primoLanes.sample.json'),
  JSON.stringify(lanes, null, 2)
);

console.log('Data files written to src/data/');

// Also export the generator functions for programmatic use
module.exports = { generateFacilities, generateLanes };
