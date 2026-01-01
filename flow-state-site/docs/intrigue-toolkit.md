# Intrigue Toolkit

A small, reusable component set that enforces the PASS 3 framing rules.

## Components

- `FrameShiftHero`
  - Purpose: 5-second hook + reframe + proof nugget + lane toggle + CTA.
  - A11y: uses semantic heading; CTAs are links.

- `CageMatchTable`
  - Purpose: side-by-side capability table + credibility section (“When legacy wins”).
  - A11y: real `<table>` with headings.

- `EvidenceVaultDrawer`
  - Purpose: sticky access to proof + trust artifacts.
  - A11y: Radix Dialog, keyboard and focus managed.

- `MissionCard`
  - Purpose: “use cases as missions” with trigger → break → intervention → measurable outcome.

- `RevealMetric`
  - Purpose: micro-reward metric animation on viewport enter (respects reduced motion).

- `AssumptionChip`
  - Purpose: hover/click definition disclosure without clutter.

- `BoardReadyExportCTA`
  - Purpose: PDF export funnel + minimal form capture.

## Event names

- `lane_selected`
- `evidence_vault_opened`
- `yardbuilder_step_completed`
- `roi_export_pdf`
- `pdf_generated_roi`
- `pdf_generated_yardbuilder`
- `pricing_quote_clicked`
- `demo_submitted`
