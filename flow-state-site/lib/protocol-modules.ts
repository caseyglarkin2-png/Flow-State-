/**
 * Protocol Module Data Structure
 * 
 * Defines the 4 core protocol modules that power the platform.
 * Used by ProtocolSequenceAnimation and module card displays.
 */

export type ProtocolModuleType = 'Guard' | 'Comms' | 'BOL' | 'YMS';

export interface ProtocolModule {
  id: ProtocolModuleType;
  label: string;
  proof: string;
  description?: string;
}

/**
 * PROTOCOL_MODULES constant - ordered sequence for animation
 * 
 * Order matters: Guard → Comms → BOL → YMS (trust → communicate → document → orchestrate)
 */
export const PROTOCOL_MODULES: readonly ProtocolModule[] = [
  {
    id: 'Guard',
    label: 'Digital Guard',
    proof: 'Verify carrier identity & CDL',
    description: 'Automated identity verification with cryptographic proof enables compliant gate control',
  },
  {
    id: 'Comms',
    label: 'Digital Comms',
    proof: 'Real-time protocol messaging',
    description: 'SMS/email integration with standardized event notifications creates audit trail',
  },
  {
    id: 'BOL',
    label: 'Digital BOL',
    proof: 'Proof of lading becomes digital',
    description: 'Paperless BOL workflow with digital signatures and immutable audit trail',
  },
  {
    id: 'YMS',
    label: 'Digital YMS',
    proof: 'Yard management orchestration',
    description: 'Real-time yard state with dwell prediction and lane optimization',
  },
] as const;

/**
 * Helper: Get module by ID
 */
export function getProtocolModule(id: ProtocolModuleType): ProtocolModule | undefined {
  return PROTOCOL_MODULES.find((module) => module.id === id);
}

/**
 * Helper: Get next module in sequence (for cycling animation)
 */
export function getNextProtocolModule(currentId: ProtocolModuleType): ProtocolModuleType {
  const currentIndex = PROTOCOL_MODULES.findIndex((m) => m.id === currentId);
  const nextIndex = (currentIndex + 1) % PROTOCOL_MODULES.length;
  return PROTOCOL_MODULES[nextIndex].id;
}
