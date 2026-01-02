# ROI model spec (Quick + Pro)

This doc explains what the ROI calculator is doing, which inputs drive which outputs, and how the default Pro model aligns to the reference spreadsheets.

## Two models

### Quick mode (V1 sliders)
Quick mode exists to give a directional estimate with a small set of inputs.

**Inputs**
- Facilities
- Trucks/shipments per day per facility
- Avg dwell time (minutes)
- Detention cost ($/hr)
- Fully-loaded labor cost ($/hr)
- Gate staff per facility

**Notes**
- Quick mode uses a simplified model (`calcRoiV1`) for time-saved metrics.
- For dollars (savings, payback, ROI), the UI maps the quick sliders into the unified Pro engine (`roiV2InputsFromQuickMode` → `calcRoiV2`) so the economic outputs stay internally consistent.

### Pro mode (V2 assumptions)
Pro mode is the finance-defensible model: explicit assumptions, spreadsheet-parity math, and transparent pricing.

**Reference spreadsheets**
- “BT ROI CalculatorV2” — Pro mode defaults (`defaultRoiV2Inputs`) are aligned to the spreadsheet’s “Example Customer Opportunity” section.
- “Lineage ROI Calc 1.25” — A separate scenario (`defaultRoiV2InputsLineage`) is implemented to match the sheet’s per-shipment opportunity rows.

We intentionally keep the V2 implementation close to the spreadsheets so outputs can be reconciled cell-by-cell.

## V2 component formulas (high level)

All V2 calculations operate on **shipments per year** derived from the facility mix:

- `shipmentsPerYearByTier = shipmentsPerDay × operatingDaysPerYear`
- `totalShipmentsPerYear = Σ_tier (tierCount × shipmentsPerYearByTier)`

### Labor (dock office + gate)
Matches the BT spreadsheet’s conservative “round down” approach to saved headcount:

- `dockOfficeSavedFte = floor((dockFtePerShift × shiftsPerDay) × dockTimeShare × dockTimeSavings)`
- `guardSavedFte = floor((guardFtePerShift × shiftsPerDay) × guardAutomationShare)`
- `annualLaborSavings = Σ_tier (tierCount × savedFteTotal × dcFteAnnualCost)`

### Paper
- `pagesPerShipment = (pagesPerBol × bolsPerShipment) + otherPagesPerShipment`
- `pagesPerYear = pagesPerShipment × totalShipmentsPerYear × outboundShare`
- `paperlessSavings = pagesPerYear × (printingCostPerPage + storageCostPerPage) × phase1SavedShare`

### Detention
Matches the spreadsheet’s “detention budget → claim count → $/shipment” structure.

- `transportBudget = totalShipmentsPerYear × costPerShipment × paidByCustomerShare × nonOwnedFleetShare`
- `detentionDollars = transportBudget × detentionBudgetShareOfTransport`
- `avgDetentionClaimDollars = avgDetentionHours × costPerHourDetention`
- `totalDetentionClaims = detentionDollars / avgDetentionClaimDollars`

Bucket math (15–30 min, 30+ min) follows the sheet. The model then uses the spreadsheet’s **unweighted** average of the two bucket $/shipment values.

### Throughput + shipper-of-choice
Throughput models realized improvement as:

- `theoreticalImprovement = (baselineGate / improvedGate) - 1`
- `realizedImprovement = theoreticalImprovement × realizedShare`
- `incrementalOutboundShipments = outboundShipments × realizedImprovement`
- `throughputValue = incrementalOutboundShipments × incrementalMarginPerTruck`

Shipper-of-choice models a realized discount on transport spend based on (a) paid-by-customer share and (b) non-owned fleet share.

### Enterprise add-ons ($/shipment)
These represent “extra rows” found in some enterprise-style models (e.g., Lineage). They are applied as additive $/shipment across total shipments/year.

## Pricing and ROI
The model uses transparent commercial inputs:
- `implementationCost = implementationBaseCost + facilities × implementationCostPerFacility`
- `annualSubscription = facilities × annualSubscriptionPerFacility`

Year-1 ramp scales gross savings (board-ready realism):
- `yearOneGrossSavings = totalAnnualSavings × yearOneRampShare`
- `yearOneNetGain = yearOneGrossSavings - implementationCost - annualSubscription`

## Where the code lives
- V1: `src/lib/roi/calc.ts` → `calcRoiV1`
- V2: `src/lib/roi/calc.ts` → `calcRoiV2`, `defaultRoiV2Inputs`, `defaultRoiV2InputsLineage`
- Tests (spreadsheet parity): `src/__tests__/roi.test.ts`
