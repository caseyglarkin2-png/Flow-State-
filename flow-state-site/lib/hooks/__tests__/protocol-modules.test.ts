import { describe, it, expect } from 'vitest';
import {
  PROTOCOL_MODULES,
  getProtocolModule,
  getNextProtocolModule,
  type ProtocolModuleType,
} from '../../protocol-modules';

describe('PROTOCOL_MODULES', () => {
  it('has exactly 4 modules', () => {
    expect(PROTOCOL_MODULES).toHaveLength(4);
  });

  it('contains all required modules in order', () => {
    expect(PROTOCOL_MODULES[0].id).toBe('Guard');
    expect(PROTOCOL_MODULES[1].id).toBe('Comms');
    expect(PROTOCOL_MODULES[2].id).toBe('BOL');
    expect(PROTOCOL_MODULES[3].id).toBe('YMS');
  });

  it('each module has required fields', () => {
    PROTOCOL_MODULES.forEach((module) => {
      expect(module).toHaveProperty('id');
      expect(module).toHaveProperty('label');
      expect(module).toHaveProperty('proof');
      expect(typeof module.id).toBe('string');
      expect(typeof module.label).toBe('string');
      expect(typeof module.proof).toBe('string');
    });
  });

  it('module IDs are unique', () => {
    const ids = PROTOCOL_MODULES.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(PROTOCOL_MODULES.length);
  });

  it('module IDs match ProtocolModuleType', () => {
    const validTypes: ProtocolModuleType[] = ['Guard', 'Comms', 'BOL', 'YMS'];
    PROTOCOL_MODULES.forEach((module) => {
      expect(validTypes).toContain(module.id);
    });
  });
});

describe('getProtocolModule', () => {
  it('returns module by ID', () => {
    const guard = getProtocolModule('Guard');
    expect(guard).toBeDefined();
    expect(guard?.id).toBe('Guard');
    expect(guard?.label).toBe('Digital Guard');
  });

  it('returns undefined for invalid ID', () => {
    // @ts-expect-error testing invalid input
    const invalid = getProtocolModule('InvalidModule');
    expect(invalid).toBeUndefined();
  });

  it('returns correct module for each valid ID', () => {
    expect(getProtocolModule('Guard')?.label).toBe('Digital Guard');
    expect(getProtocolModule('Comms')?.label).toBe('Digital Comms');
    expect(getProtocolModule('BOL')?.label).toBe('Digital BOL');
    expect(getProtocolModule('YMS')?.label).toBe('Digital YMS');
  });
});

describe('getNextProtocolModule', () => {
  it('cycles through modules in order', () => {
    expect(getNextProtocolModule('Guard')).toBe('Comms');
    expect(getNextProtocolModule('Comms')).toBe('BOL');
    expect(getNextProtocolModule('BOL')).toBe('YMS');
  });

  it('loops back from YMS to Guard', () => {
    expect(getNextProtocolModule('YMS')).toBe('Guard');
  });

  it('maintains correct cycling for full loop', () => {
    let current: ProtocolModuleType = 'Guard';
    const sequence: ProtocolModuleType[] = [current];

    for (let i = 0; i < 3; i++) {
      current = getNextProtocolModule(current);
      sequence.push(current);
    }

    expect(sequence).toEqual(['Guard', 'Comms', 'BOL', 'YMS']);

    // One more should loop back
    const nextAfterYMS = getNextProtocolModule(current);
    expect(nextAfterYMS).toBe('Guard');
  });
});
