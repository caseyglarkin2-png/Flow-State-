// Primo Singularity Map - Schema Validation Tests
// Run with: npx ts-node --esm src/__tests__/schema.test.ts

import { validateFacility, parseFacilityType, parseStatus, calculateKPIs } from '../types/primo';
import type { Facility, Lane } from '../types/primo';

// Test utilities
let passed = 0;
let failed = 0;

function test(name: string, fn: () => boolean) {
  try {
    if (fn()) {
      passed++;
      console.log(`[PASS] ${name}`);
    } else {
      failed++;
      console.log(`[FAIL] ${name}`);
    }
  } catch (err) {
    failed++;
    console.log(`[ERROR] ${name}: ${err}`);
  }
}

// Test validateFacility
test('validateFacility - valid facility returns all valid checks', () => {
  const facility: Facility = {
    id: 'F0001',
    name: 'Test Facility',
    brand: 'Primo',
    facilityType: 'DC',
    status: 'Flow',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    lon: -87.6298,
    counts: {
      trucks: 10,
      trailers: 20,
      guardShacks: 2,
      gates: 4,
      trailerYards: 1,
      dropDocks: 8,
      inboundLanes: 3,
      outboundLanes: 3,
    },
  };
  
  const checks = validateFacility(facility);
  const invalidChecks = checks.filter(c => c.status === 'invalid');
  return invalidChecks.length === 0;
});

test('validateFacility - missing name returns missing check', () => {
  const facility: Partial<Facility> = {
    id: 'F0001',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    lon: -87.6298,
  };
  
  const checks = validateFacility(facility);
  const nameCheck = checks.find(c => c.field === 'name');
  return nameCheck?.status === 'missing';
});

test('validateFacility - invalid latitude returns invalid check', () => {
  const facility: Partial<Facility> = {
    id: 'F0001',
    name: 'Test',
    city: 'Chicago',
    state: 'IL',
    lat: 200, // Invalid
    lon: -87.6298,
  };
  
  const checks = validateFacility(facility);
  const latCheck = checks.find(c => c.field === 'lat');
  return latCheck?.status === 'invalid';
});

test('validateFacility - invalid longitude returns invalid check', () => {
  const facility: Partial<Facility> = {
    id: 'F0001',
    name: 'Test',
    city: 'Chicago',
    state: 'IL',
    lat: 41.8781,
    lon: -300, // Invalid
  };
  
  const checks = validateFacility(facility);
  const lonCheck = checks.find(c => c.field === 'lon');
  return lonCheck?.status === 'invalid';
});

// Test parseFacilityType
test('parseFacilityType - "plant" returns Plant', () => {
  return parseFacilityType('plant') === 'Plant';
});

test('parseFacilityType - "DC" returns DC', () => {
  return parseFacilityType('DC') === 'DC';
});

test('parseFacilityType - "distribution center" returns DC', () => {
  return parseFacilityType('distribution center') === 'DC';
});

test('parseFacilityType - "cross-dock" returns CrossDock', () => {
  return parseFacilityType('cross-dock') === 'CrossDock';
});

test('parseFacilityType - unknown returns Other', () => {
  return parseFacilityType('unknown') === 'Other';
});

// Test parseStatus
test('parseStatus - "flow" returns Flow', () => {
  return parseStatus('flow') === 'Flow';
});

test('parseStatus - "online" returns Flow', () => {
  return parseStatus('online') === 'Flow';
});

test('parseStatus - "activating" returns Activating', () => {
  return parseStatus('activating') === 'Activating';
});

test('parseStatus - "chaos" returns Chaos', () => {
  return parseStatus('chaos') === 'Chaos';
});

test('parseStatus - "offline" returns Chaos', () => {
  return parseStatus('offline') === 'Chaos';
});

// Test calculateKPIs
test('calculateKPIs - computes correct totals', () => {
  const facilities: Facility[] = [
    {
      id: 'F1',
      name: 'Facility 1',
      brand: 'Primo',
      facilityType: 'DC',
      status: 'Flow',
      city: 'Chicago',
      state: 'IL',
      lat: 41.8781,
      lon: -87.6298,
      counts: {
        trucks: 10,
        trailers: 20,
        guardShacks: 2,
        gates: 4,
        trailerYards: 1,
        dropDocks: 8,
        inboundLanes: 3,
        outboundLanes: 3,
      },
    },
    {
      id: 'F2',
      name: 'Facility 2',
      brand: 'Primo',
      facilityType: 'Plant',
      status: 'Flow',
      city: 'Dallas',
      state: 'TX',
      lat: 32.7767,
      lon: -96.797,
      counts: {
        trucks: 15,
        trailers: 25,
        guardShacks: 3,
        gates: 6,
        trailerYards: 2,
        dropDocks: 10,
        inboundLanes: 4,
        outboundLanes: 5,
      },
    },
  ];
  
  const lanes: Lane[] = [
    { id: 'L1', fromFacilityId: 'F1', toFacilityId: 'F2', volume: 100, status: 'Flow' },
  ];
  
  const kpis = calculateKPIs(facilities, lanes);
  
  return (
    kpis.totalFacilities === 2 &&
    kpis.totalTrucks === 25 &&
    kpis.totalTrailers === 45 &&
    kpis.totalGuardShacks === 5 &&
    kpis.totalGates === 10 &&
    kpis.totalTrailerYards === 3 &&
    kpis.totalDropDocks === 18 &&
    kpis.totalInboundLanes === 7 &&
    kpis.totalOutboundLanes === 8
  );
});

// Summary
console.log('\n-------------------');
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('-------------------\n');

if (failed > 0) {
  process.exit(1);
}
