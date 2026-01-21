# YardFlow Facility Network + Animation Strategy

**Date:** January 21, 2026  
**Context:** Primo (first long-term customer) contracted 260 facilities; ROI calc must scale.

---

## FACILITY NETWORK SCALABILITY

### Current State
- **User request:** "Slider version of the ROI calc is gold but need to be sure that network n slides high enough to represent the enterprise yard networks we are hunting for."
- **Problem:** Facility slider may have hard cap (50? 100? unclear)
- **Solution:** Ensure slider scales to 260+ facilities

### Action Items (S5.1 + Integrated into Tickets)

#### In S1.3 (Wire Adoption Slider to ROI)
- Update CoverageSlider acceptance criteria:
  ```
  [ ] Slider accepts adoption % (5-100) OR facilities count (1-500+)
  [ ] For Primo scenario: input 260 facilities
  [ ] Verify ROI outputs calculate correctly at 260 facilities
  [ ] Test both Small (1 facility), Mid (10), Enterprise (260), Max (500+)
  ```

#### In S1.1 (NetworkCoverageModel)
- Add facility count calculation:
  ```typescript
  interface NetworkCoverageModel {
    adoptionPercent: number;
    totalFacilitiesInNetwork: number;  // 260 for Primo
    facilitiesInScope: number;         // = totalFacilities * adoptionPercent
    // E.g., 260 * 5% = 13 facilities in Year 1
  }
  ```

#### In ROI Page Copy (S1.3)
- Make facility count explicit:
  ```
  "Primo Freight: 260 facilities in network"
  "Deep Model assumes 5% adoption Year 1 = 13 facilities"
  "Adjust slider to model 10% (26 facilities), 25% (65), 50% (130), 100% (260)"
  ```

#### Golden Test (S0.1 Enhancement)
- Add Primo scenario fixture:
  ```
  {
    input: {
      facilitiesCount: 260,
      laborReductionPercent: 70,
      dwellReductionMinutes: 24,
      detentionRecoveryPercent: 65,
      adoptionPercent: 5,
    },
    expected: {
      year1Roi: $X,  // Locked
      year3Roi: $Y,  // Locked
      paybackMonths: Z,
    }
  }
  ```

### Verification Checklist
- [ ] ROI calc accepts 260 facilities input (no error)
- [ ] Outputs calculate correctly (no NaN, no overflow)
- [ ] Slider shows "260 facilities in scope" (UI)
- [ ] Adoption % modulation works (5% → 10% → 50% → 100% all valid)
- [ ] PDF export includes facility count
- [ ] Lighthouse performance >75 even at 260 facilities
- [ ] Golden test: Primo scenario locked

---

## ANIMATION STRATEGY (REFACTORED PER SUBAGENT)

### Core Principle
**"Replace weak 'Variance Tax' chaos animations with compelling protocol standardization story."**

### Current Issues (From User + Audit)
1. **Variance Tax animation:** Shows red chaos; doesn't reinforce "same flow, every yard" narrative
2. **URL bars in proof videos:** Distract from protocol story
3. **Emojis out of place:** Inconsistent with premium brand voice
4. **Animation ≠ narrative:** Heavy motion investment doesn't serve adoption % thesis

### Solution: Wave 2 Deferral + Focused S2

#### Sprint 2 (THIS LAUNCH)
✅ **Reduced Motion Support** (S2.1)
- Respect user accessibility preferences
- No motion for users who request it
- Fallback: static images + progress indicators

✅ **Performance Guardrails** (S2.2)
- Establish baseline: LCP <2.5s, CLS <0.1, 55+ FPS
- Prevent motion from tanking performance
- Monitor throughout launch

✅ **Adoption Presets + Responsiveness** (S2.3-2.4)
- Adoption slider works smoothly (no janky transitions)
- Presets respond instantly (buttons, no animation)
- Mobile optimized (touch-friendly)

#### Wave 2 (POST-LAUNCH)
🎬 **Animation Lab** (internal `/dev/animation-lab` route)
- Preview all Lottie + MP4 assets safely
- Internal experimentation without user exposure
- Go/no-go decision based on post-launch metrics

🎬 **Lottie Integration** (provided assets: trucks, circulating particles)
- IF adoption flow CTAs show >25% click-through: invest in protocol visualizations
- Visualize "standardization across network" (not chaos)
- Tie to adoption % narrative (5% = particles beginning to organize, 50% = singularity)

🎬 **MP4 Video Gallery** (proof videos without URL bars)
- Remove any videos with URL bar visible
- Clean presentation of protocol proof (Digital Guard, driver verification, etc.)
- Link to relevant pages (e.g., Digital Guard module → video proof)

🎬 **Singularity Shader Polish** (performance + aesthetics)
- If Singularity page drives conversion: invest in 60+ FPS guarantee
- Schwarzschild raymarching optimization
- Particle network phase shifts (5% chaos → 50% harmony → singularity)

🎬 **Audio Integration** (optional, lower priority)
- Variance hum (chaotic baseline) → Flow pulse (ordered state)
- Emotional reinforcement of adoption thesis
- Low priority unless user testing shows high engagement

### Wave 2 Go/No-Go Decision Criteria

| Metric | Threshold | Action |
|--------|-----------|--------|
| Adoption flow CTA click-through | >25% | Invest in Animation Lab + Lottie |
| Singularity page conversion rate | >15% of home traffic | Invest in shader polish + audio |
| Reduce-motion requests | <5% of users | Keep animation prominent; don't over-invest |
| Page performance (LCP) | >2.5s | Pause all animation work; focus on perf |
| Adoption % narrative resonance | >80% in user testing | Animation is nice-to-have (Wave 2 ok) |

### Strategic Rationale

**Launch Focus:** Get the adoption thesis RIGHT (narrative + copy + CTAs) before investing in motion polish.

**Risk Reduction:** Remove 1 week of animation R&D; free team for ROI hardening + Diagnostic flow clarity.

**Data-Driven:** Measure user engagement post-launch; build Wave 2 based on what resonates, not assumptions.

**Brand Consistency:** Heavy motion without a clear narrative (chaos → flow → predictability) reads as "slick marketing," not "credible product."

---

## ANIMATION ASSET AUDIT (For Wave 2 Planning)

### Existing Public Assets
- `public/animations/driver-journey.json` ✅
- `public/proof/driver-qr-scan.mp4` ⚠️ (check for URL bar)
- `public/proof/Machine-vision-video.mp4` ⚠️
- `public/proof/chain-of-custody-kiosk.mp4` ⚠️
- `public/proof/two-way-comms.mp4` ⚠️
- `public/proof/Smart-bol-kiosk.mp4` ⚠️
- `public/proof/pickup-vs-delivery-video.mp4` ⚠️
- `public/proof/kiosk-demo.mp4` ⚠️

### Placeholder Assets (Wave 2 Creation)
- `public/animations/trucks.json` (trucks orbiting / circulating)
- `public/animations/trucks-3x.json` (3x scaling effect)
- `public/animations/truck-circle.json` (circular network formation)

### Ideal Narrative Arc (Storyboard from Image 5)
1. **Modules** (5% adoption) – Red/chaotic particles, low coherence
2. **Facility** (10% adoption) – Blue particles, beginning to converge
3. **Network** (25-50% adoption) – Green/blue harmonized flow, circular pattern
4. **Unlocked** (50%+ adoption) – Purple singularity, perfect convergence

### Next Steps (Wave 2)
1. Audit MP4s for URL bars (yes/no per video)
2. Create Lottie JSON placeholders (or commission artist)
3. Build Animation Lab route (internal testing)
4. A/B test animations in Wave 2 alpha
5. GA4 tracking: which animations drive CTAs?
6. Iterate based on user behavior

---

## IMPLEMENTATION ROADMAP

### THIS LAUNCH (S0-6, Weeks 1-7)
✅ Adoption % narrative is primary lever  
✅ Network scalability tested (260+ facilities)  
✅ Performance optimized (no animation thrash)  
✅ Accessibility first (reduced-motion respected)  
✅ Brand voice cohesive (no noise, no emojis out of place)  

### WAVE 2 (Post-Launch)
🎬 Animation Lab sandbox created  
🎬 Lottie integration (if CTAs >25% click-through)  
🎬 Video gallery polished (URL bars removed)  
🎬 Singularity shader optimized (if page converts >15%)  
🎬 Audio narrative reinforcement (if high engagement)  

### SUCCESS INDICATORS

**Launch Success:**
- Primo 260-facility scenario works flawlessly (zero errors, clear copy)
- Adoption slider responsive, no janky motion
- CTAs convert (measure with GA4)
- Accessibility compliant (WCAG AA, reduced-motion respected)
- Site feels premium + intentional (not over-animated)

**Wave 2 Go-Decision:**
- Adoption narrative resonates (>80% user testing approval)
- CTAs drive action (email signups, audit bookings)
- Performance maintained (LCP <2.5s even with animations)
- Team capacity available (post-launch sprint retrospective)

---

## FINAL CHECKLIST (This Launch)

- [ ] Facility count slider: test 1, 10, 260, 500 inputs
- [ ] Golden test: Primo 260-facility scenario locked
- [ ] Adoption % semantics locked: narrative-only (S0.5a)
- [ ] Reduced motion framework: accessibility compliant (S2.1)
- [ ] Performance baselines: <2.5s LCP, 55+ FPS (S2.2)
- [ ] CoverageSlider mobile-friendly: touch interaction works (S2.4)
- [ ] Variance Tax animation: remove/replace with clear copy (S3 brand audit)
- [ ] Proof videos: audit for URL bars (wave 2 cleanup list)
- [ ] Brand cohesion: no emojis out of place; one CTA ladder (S3)
- [ ] Animation Lab: deferred to Wave 2 (not in S2)

---

**Status:** ✅ Facility network scalability addressed  
**Status:** ✅ Animation strategy refined (launch-focused, Wave 2 deferred)  
**Status:** ✅ Sprint plan ready for execution  

