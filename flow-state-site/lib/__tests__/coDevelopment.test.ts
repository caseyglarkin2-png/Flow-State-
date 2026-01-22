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
  MODULE_ICONS,
  type CoDevModule,
  type PhaseNumber,
  type ModuleIcon,
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

// =============================================================================
// A+ COVERAGE: NEW TESTS
// =============================================================================

describe('Type Safety: MODULE_ICONS', () => {
  it('MODULE_ICONS is a const array', () => {
    expect(Array.isArray(MODULE_ICONS)).toBe(true);
    expect(MODULE_ICONS.length).toBeGreaterThan(0);
  });

  it('all module icons are in MODULE_ICONS array', () => {
    modules.forEach((mod) => {
      expect(MODULE_ICONS).toContain(mod.icon);
    });
  });

  it('all eligibility card icons are in MODULE_ICONS array', () => {
    coDevContent.eligibilityCriteria.forEach((card) => {
      expect(MODULE_ICONS).toContain(card.icon);
    });
  });

  it('all partner benefit icons are in MODULE_ICONS array', () => {
    coDevContent.partnerBenefits.forEach((benefit) => {
      expect(MODULE_ICONS).toContain(benefit.icon);
    });
  });
});

describe('Estimated Availability', () => {
  it('all phases have estimatedAvailability field', () => {
    phases.forEach((phase) => {
      expect(phase.estimatedAvailability).toBeDefined();
      expect(phase.estimatedAvailability!.length).toBeGreaterThan(0);
    });
  });

  it('Phase 1 is available now', () => {
    const phase1 = getPhase(1);
    expect(phase1?.estimatedAvailability).toMatch(/now|available/i);
  });

  it('Phase 2 has a quarter estimate', () => {
    const phase2 = getPhase(2);
    expect(phase2?.estimatedAvailability).toMatch(/Q[1-4] 20\d{2}/);
  });

  it('Phase 3 is later than Phase 2', () => {
    const phase2 = getPhase(2);
    const phase3 = getPhase(3);
    // Phase 3 should have "+" or a later date
    expect(phase3?.estimatedAvailability).toBeDefined();
    expect(phase3?.estimatedAvailability).not.toBe(phase2?.estimatedAvailability);
  });
});

describe('Content Consistency', () => {
  it('FAQ references match actual phase terminology', () => {
    const faqText = coDevContent.faq.map((f) => f.answer).join(' ');
    
    // If FAQ mentions Phase 1, it should reference standardization concepts
    if (faqText.includes('Phase 1')) {
      expect(faqText).toMatch(/protocol|baseline|standardiz|foundation/i);
    }
    
    // If FAQ mentions RTLS, it should reference prerequisites or Phase 2/3
    if (faqText.toLowerCase().includes('rtls')) {
      expect(faqText).toMatch(/prerequisite|phase 2|phase 3|after|unlock/i);
    }
  });

  it('module descriptions do not contain marketing hyperbole', () => {
    const hyperboleWords = ['revolutionary', 'game-changing', 'best-in-class', 'world-class'];
    modules.forEach((mod) => {
      hyperboleWords.forEach((word) => {
        expect(mod.description.toLowerCase()).not.toContain(word);
      });
    });
  });

  it('whyThisOrder reasons are CFO-friendly (no hype words)', () => {
    const hypeWords = ['amazing', 'incredible', 'revolutionary', 'disruptive'];
    const allReasonText = coDevContent.whyThisOrder.reasons
      .map((r) => `${r.title} ${r.description}`)
      .join(' ')
      .toLowerCase();
    
    hypeWords.forEach((word) => {
      expect(allReasonText).not.toContain(word);
    });
  });

  it('all module highlights are short and actionable', () => {
    modules.forEach((mod) => {
      mod.highlights.forEach((highlight) => {
        // Highlights should be under 50 characters
        expect(highlight.length).toBeLessThan(50);
        // Highlights should start with capital letter
        expect(highlight[0]).toBe(highlight[0].toUpperCase());
      });
    });
  });
});

describe('Module Highlights', () => {
  it('all modules have at least 2 highlights', () => {
    modules.forEach((mod) => {
      expect(mod.highlights.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('no duplicate highlights within a module', () => {
    modules.forEach((mod) => {
      const uniqueHighlights = new Set(mod.highlights);
      expect(uniqueHighlights.size).toBe(mod.highlights.length);
    });
  });

  it('highlights do not repeat module name', () => {
    modules.forEach((mod) => {
      mod.highlights.forEach((highlight) => {
        expect(highlight.toLowerCase()).not.toBe(mod.name.toLowerCase());
      });
    });
  });
});

describe('Prerequisites Validity', () => {
  it('all prerequisites have unique IDs within a module', () => {
    modules.forEach((mod) => {
      if (mod.prerequisites.length > 0) {
        const ids = mod.prerequisites.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      }
    });
  });

  it('all prerequisites have non-empty descriptions', () => {
    modules.forEach((mod) => {
      mod.prerequisites.forEach((prereq) => {
        expect(prereq.description.length).toBeGreaterThan(10);
      });
    });
  });

  it('RTLS has at least 4 prerequisites', () => {
    const rtls = modules.find((m) => m.id === 'vision-rtls');
    expect(rtls?.prerequisites.length).toBeGreaterThanOrEqual(4);
  });
});
describe('Partnership Clarity (Sprint 4)', () => {
  it('has exactly 3 clarity sections', () => {
    expect(coDevContent.partnershipClarity.length).toBe(3);
  });

  it('clarity sections have correct IDs', () => {
    const ids = coDevContent.partnershipClarity.map((c) => c.id);
    expect(ids).toContain('what-you-get');
    expect(ids).toContain('what-we-build');
    expect(ids).toContain('what-gets-productized');
  });

  it('each clarity section has at least 3 items', () => {
    coDevContent.partnershipClarity.forEach((clarity) => {
      expect(clarity.items.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('clarity sections have valid icons', () => {
    coDevContent.partnershipClarity.forEach((clarity) => {
      expect(MODULE_ICONS).toContain(clarity.icon);
    });
  });
});

describe('Partner Benefits (Sprint 4)', () => {
  it('roadmap and artifacts have Evidence Vault links', () => {
    const roadmap = coDevContent.partnerBenefits.find((b) => b.id === 'roadmap');
    const artifacts = coDevContent.partnerBenefits.find((b) => b.id === 'artifacts');
    
    expect(roadmap?.link).toBeDefined();
    expect(roadmap?.link?.href).toContain('/resources');
    
    expect(artifacts?.link).toBeDefined();
    expect(artifacts?.link?.href).toContain('/resources');
  });

  it('links have labels', () => {
    coDevContent.partnerBenefits.forEach((benefit) => {
      if (benefit.link) {
        expect(benefit.link.label.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('Eligibility Criteria (Phase 1 Narrative)', () => {
  it('eligibility mentions protocol standardization', () => {
    const allCriteria = coDevContent.eligibilityCriteria
      .flatMap((card) => card.criteria)
      .join(' ')
      .toLowerCase();
    
    expect(allCriteria).toMatch(/protocol|standardize|phase 1|baseline/i);
  });

  it('eligibility does NOT require RTLS-specific criteria', () => {
    const allCriteria = coDevContent.eligibilityCriteria
      .flatMap((card) => card.criteria)
      .join(' ')
      .toLowerCase();
    
    expect(allCriteria).not.toMatch(/\brtls\b/i);
    expect(allCriteria).not.toMatch(/\bcamera\b/i);
    expect(allCriteria).not.toMatch(/\bvision\b/i);
  });
});