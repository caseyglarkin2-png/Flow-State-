/**
 * Co-Development Content Model Tests
 * 
 * These tests ensure:
 * 1. All modules conform to schema (required fields)
 * 2. RTLS is correctly positioned as Phase 2/3
 * 3. Prerequisites exist where required
 * 4. Rollout order is maintained
 */

import { describe, it, expect } from 'vitest';
import {
  coDevContent,
  modules,
  phases,
  getModulesByPhase,
  getPhase,
  hasPrerequisites,
  type CoDevModule,
  type PhaseNumber,
} from '@/src/content/coDevelopment';

describe('CoDevContent Schema Validation', () => {
  it('all modules have required fields', () => {
    modules.forEach((mod) => {
      expect(mod.id).toBeDefined();
      expect(mod.id.length).toBeGreaterThan(0);
      expect(mod.name).toBeDefined();
      expect(mod.name.length).toBeGreaterThan(0);
      expect(mod.description).toBeDefined();
      expect(mod.description.length).toBeGreaterThan(0);
      expect(mod.icon).toBeDefined();
      expect(mod.phase).toBeGreaterThanOrEqual(1);
      expect(mod.phase).toBeLessThanOrEqual(3);
      expect(mod.timeline).toBeDefined();
      expect(mod.timeline.poc).toBeDefined();
      expect(mod.timeline.scale).toBeDefined();
    });
  });

  it('all phases have required fields', () => {
    phases.forEach((phase) => {
      expect(phase.id).toBeDefined();
      expect(phase.number).toBeGreaterThanOrEqual(1);
      expect(phase.number).toBeLessThanOrEqual(3);
      expect(phase.name).toBeDefined();
      expect(phase.shortName).toBeDefined();
      expect(phase.description).toBeDefined();
      expect(['now', 'upcoming', 'future']).toContain(phase.available);
    });
  });

  it('all FAQ items have question and answer', () => {
    coDevContent.faq.forEach((item) => {
      expect(item.question).toBeDefined();
      expect(item.question.length).toBeGreaterThan(0);
      expect(item.answer).toBeDefined();
      expect(item.answer.length).toBeGreaterThan(0);
    });
  });

  it('hero content is complete', () => {
    expect(coDevContent.hero.badge).toBeDefined();
    expect(coDevContent.hero.title).toBeDefined();
    expect(coDevContent.hero.subtitle).toBeDefined();
  });

  it('CTAs are properly configured', () => {
    expect(coDevContent.ctas.primary.label).toBeDefined();
    expect(coDevContent.ctas.primary.href).toBeDefined();
    expect(coDevContent.ctas.primary.href).toMatch(/^\//); // Must start with /
    expect(coDevContent.ctas.secondary.label).toBeDefined();
    expect(coDevContent.ctas.secondary.href).toBeDefined();
  });
});

describe('RTLS Positioning (Critical Business Logic)', () => {
  it('RTLS module exists', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls).toBeDefined();
  });

  it('RTLS module is Phase 2 or higher (NOT Phase 1)', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls?.phase).toBeGreaterThanOrEqual(2);
  });

  it('RTLS module is specifically Phase 3', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls?.phase).toBe(3);
  });

  it('RTLS has non-empty prerequisites', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls?.prerequisites).toBeDefined();
    expect(rtls?.prerequisites?.length).toBeGreaterThan(0);
  });

  it('RTLS prerequisites include required baseline items', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    const prereqIds = rtls?.prerequisites?.map((p) => p.id) ?? [];
    
    // Must have these prerequisites
    expect(prereqIds).toContain('yard-ids');
    expect(prereqIds).toContain('event-model');
    expect(prereqIds).toContain('network-baseline');
  });

  it('RTLS is not in Phase 1 modules', () => {
    const phase1Modules = getModulesByPhase(1);
    const rtlsInPhase1 = phase1Modules.find((m) => m.id === 'vision-rtls');
    expect(rtlsInPhase1).toBeUndefined();
  });
});

describe('Phase Structure', () => {
  it('has exactly 3 phases', () => {
    expect(phases.length).toBe(3);
  });

  it('phases are numbered 1, 2, 3', () => {
    const numbers = phases.map((p) => p.number).sort();
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('Phase 1 is available now', () => {
    const phase1 = getPhase(1);
    expect(phase1?.available).toBe('now');
  });

  it('Phase 3 is future', () => {
    const phase3 = getPhase(3);
    expect(phase3?.available).toBe('future');
  });

  it('Phase 1 includes protocol baseline', () => {
    const phase1Modules = getModulesByPhase(1);
    const hasBaseline = phase1Modules.some((m) => 
      m.id === 'protocol-baseline' || m.name.toLowerCase().includes('baseline')
    );
    expect(hasBaseline).toBe(true);
  });
});

describe('Module Distribution', () => {
  it('Phase 1 has at least 2 modules', () => {
    const phase1Modules = getModulesByPhase(1);
    expect(phase1Modules.length).toBeGreaterThanOrEqual(2);
  });

  it('Phase 3 modules all have prerequisites', () => {
    const phase3Modules = getModulesByPhase(3);
    phase3Modules.forEach((mod) => {
      expect(mod.prerequisites.length).toBeGreaterThan(0);
    });
  });

  it('Phase 1 modules do not require prerequisites from Phase 2/3', () => {
    const phase1Modules = getModulesByPhase(1);
    phase1Modules.forEach((mod) => {
      // Phase 1 modules should have empty or minimal prerequisites
      const hasPhase2Prereqs = mod.prerequisites.some((p) => 
        p.id.includes('rtls') || p.id.includes('ai-') || p.label.toLowerCase().includes('phase 2')
      );
      expect(hasPhase2Prereqs).toBe(false);
    });
  });
});

describe('AI Orchestration Positioning', () => {
  it('AI Orchestration is Phase 2 or higher', () => {
    const aiOrch = modules.find((m) => m.id.includes('ai-orchestration'));
    expect(aiOrch?.phase).toBeGreaterThanOrEqual(2);
  });

  it('AI Orchestration has prerequisites', () => {
    const aiOrch = modules.find((m) => m.id.includes('ai-orchestration'));
    if (aiOrch) {
      expect(aiOrch.prerequisites.length).toBeGreaterThan(0);
    }
  });
});

describe('Helper Functions', () => {
  it('getModulesByPhase returns correct modules', () => {
    const phase1 = getModulesByPhase(1);
    phase1.forEach((m) => expect(m.phase).toBe(1));
    
    const phase3 = getModulesByPhase(3);
    phase3.forEach((m) => expect(m.phase).toBe(3));
  });

  it('getPhase returns correct phase', () => {
    expect(getPhase(1)?.number).toBe(1);
    expect(getPhase(2)?.number).toBe(2);
    expect(getPhase(3)?.number).toBe(3);
  });

  it('hasPrerequisites correctly identifies modules with prerequisites', () => {
    expect(hasPrerequisites('vision-rtls')).toBe(true);
    expect(hasPrerequisites('protocol-baseline')).toBe(false);
    expect(hasPrerequisites('discovery-workshop')).toBe(false);
  });
});

describe('Why This Order Section', () => {
  it('whyThisOrder content exists', () => {
    expect(coDevContent.whyThisOrder).toBeDefined();
    expect(coDevContent.whyThisOrder.headline).toBeDefined();
    expect(coDevContent.whyThisOrder.subheadline).toBeDefined();
  });

  it('whyThisOrder has at least 3 reasons', () => {
    expect(coDevContent.whyThisOrder.reasons.length).toBeGreaterThanOrEqual(3);
  });

  it('reasons mention key concepts', () => {
    const allReasonText = coDevContent.whyThisOrder.reasons
      .map((r) => `${r.title} ${r.description}`)
      .join(' ')
      .toLowerCase();
    
    // Should mention these concepts
    expect(allReasonText).toMatch(/risk|integration/);
    expect(allReasonText).toMatch(/scal|multi-site/);
    expect(allReasonText).toMatch(/data|foundation/);
  });
});

describe('How It Works Steps', () => {
  it('has at least 4 steps', () => {
    expect(coDevContent.howItWorks.length).toBeGreaterThanOrEqual(4);
  });

  it('steps are in correct order', () => {
    const steps = coDevContent.howItWorks;
    for (let i = 0; i < steps.length - 1; i++) {
      expect(steps[i].number).toBeLessThan(steps[i + 1].number);
    }
  });

  it('RTLS/advanced modules come last in how it works', () => {
    const lastStep = coDevContent.howItWorks[coDevContent.howItWorks.length - 1];
    const lastStepText = `${lastStep.title} ${lastStep.description}`.toLowerCase();
    expect(lastStepText).toMatch(/advanced|rtls|phase 2|phase 3/);
  });
});

describe('Rollout Order Invariants', () => {
  /**
   * CRITICAL: These tests enforce the business rule that
   * Network → Protocols → Data → Scale → RTLS
   */
  
  it('no Phase 3 module has empty prerequisites', () => {
    const phase3Modules = getModulesByPhase(3);
    phase3Modules.forEach((mod) => {
      expect(mod.prerequisites.length).toBeGreaterThan(0);
    });
  });

  it('Phase 1 is the only phase available now', () => {
    const phasesNow = phases.filter((p) => p.available === 'now');
    expect(phasesNow.length).toBe(1);
    expect(phasesNow[0].number).toBe(1);
  });

  it('module phases are monotonically ordered by complexity', () => {
    // Protocol baseline should be Phase 1
    const baseline = modules.find((m) => m.id === 'protocol-baseline');
    expect(baseline?.phase).toBe(1);

    // RTLS should be Phase 3
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls?.phase).toBe(3);
  });
});
