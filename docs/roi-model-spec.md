# ROI Model Spec (Flow State)

This document describes:
- **V1**: the current web calculator model (as implemented today)
- **V2**: the spreadsheet-grade model (BT + Lineage) to be implemented

## Where the V1 model lives (source of truth)

- Route/UI: flow-state-site/app/roi/page.tsx
- Engine: flow-state-site/src/lib/roi/calc.ts (`calcRoiV1`)
- Types: flow-state-site/src/lib/roi/types.ts

## V1 (current web calculator) — formula spec

### Inputs

- `facilities`
- `trucksPerDayPerFacility`
- `avgDwellTimeMinutes`
- `detentionCostPerHour`
- `laborCostPerHour`
- `gateStaffPerFacility`

### Constants / assumptions (as implemented)

- Network multiplier: `1 + ln(facilities + 1) * 0.5`
- Dwell time reduction: 50%
- Detention reduction: 65%
- Detention exposure: `0.15 hours / truck` (implicit)
- Labor automation share: 70%
- Annual hours / FTE: 2080
- Throughput increase: 42%
- Value per additional truck: $45
- Paper/admin savings: $15 per truck
- Implementation cost: `$2,500 * facilities` (one-time)
- Subscription: `$8,000 / facility / year` by default (Pro Mode supports $5k–$15k)
- 5-year savings growth: 2% per year on savings

### Outputs

- Annual Time Saved (minutes/year):
  - `newDwellTime = avgDwellTimeMinutes * 0.5`
  - `timeSavedPerTruck = avgDwellTimeMinutes - newDwellTime`
  - `annualTimeSavedMinutes = timeSavedPerTruck * trucksPerDayPerFacility * 365 * facilities`

- Detention Reduction (annual $):
  - `annualDetentionSavings = trucksPerDayPerFacility * 0.15 * detentionCostPerHour * 365 * facilities * 0.65`

- Labor Automation (annual $):
  - `annualLaborSavings = facilities * gateStaffPerFacility * 0.7 * laborCostPerHour * 2080`

- Throughput Increase (annual $):
  - `throughputValue = trucksPerDayPerFacility * 0.42 * 45 * 365 * facilities`

- Paperless Operations (annual $):
  - `paperlessSavings = 15 * trucksPerDayPerFacility * 365 * facilities`

- Base Savings:
  - `baseSavings = detention + labor + throughput + paperless`

- Network Effect Bonus:
  - `networkBonusSavings = baseSavings * (networkMultiplier - 1)`

- Total Annual Savings:
  - `totalAnnualSavings = baseSavings + networkBonusSavings`

- Year 1 Net Gain:
  - `yearOneNetGain = totalAnnualSavings - implementationCost - annualSubscription`

- Year 1 ROI % (denominator = implementation only):
  - `yearOneRoiPercent = ((totalAnnualSavings - annualSubscription) / implementationCost) * 100`

- Payback months:
  - `paybackMonths = implementationCost / ((totalAnnualSavings - annualSubscription) / 12)`

- 5-year value:
  - `fiveYearValue = (sum_{i=0..4} (totalAnnualSavings * 1.02^i - annualSubscription)) - implementationCost`

## V2 (spreadsheet-grade: BT + Lineage)

### Status

- BT model: implemented in code and parity-tested against the spreadsheet.
- Lineage model: implemented in the unified Pro model via enterprise add-ons and parity-tested against the spreadsheet summary totals.

### Where to place the spreadsheets

Put them here so they don’t mix with build artifacts:

- `flow-state-site/roi-models/BT ROI CalculatorV2.xlsx`
- `flow-state-site/roi-models/Lineage ROI Calc 1.25.xlsx`

### How to extract structure/formulas

This repo runs in an Ubuntu dev container. Python package installs may be blocked by PEP 668 (“externally managed environment”).

If you need `openpyxl`, prefer OS packages:

- `sudo apt-get update && sudo apt-get install -y python3-openpyxl`

Run:

- `python3 flow-state-site/scripts/extract_roi_formulas.py --workbook "flow-state-site/roi-models/BT ROI CalculatorV2.xlsx" --find "payback,total,detention,throughput,paper,labor"`
- `python3 flow-state-site/scripts/extract_roi_formulas.py --workbook "flow-state-site/roi-models/Lineage ROI Calc 1.25.xlsx" --find "payback,total,detention,throughput,paper,labor"`

Then we will update this document with the final V2 spec:

- Inputs → intermediate calcs → outputs
- Explicit named assumptions (no magic numbers)
- Rounding rules (e.g., `Math.floor` saved FTE)

### Implementation target

- Engine: flow-state-site/src/lib/roi/calc.ts (`calcRoiV2`)
- Types: flow-state-site/src/lib/roi/types.ts (`RoiV2Inputs`, `RoiV2Outputs`)

### V2 (BT) — model spec (implemented)

Source of truth:

- Engine: `flow-state-site/src/lib/roi/calc.ts` (`calcRoiV2`, `defaultRoiV2Inputs`)
- Types: `flow-state-site/src/lib/roi/types.ts`
- Parity test: `flow-state-site/src/__tests__/roi.test.ts`

#### Inputs (BT)

Facility tiers: `XL`, `L`, `M`, `S`

Per tier:

- `count`
- `shipmentsPerDay`
- `operatingDaysPerYear`
- `dcFteAnnualCost` (UI sets one value and applies to all tiers)

Assumptions:

- Labor: per tier `dockOfficeFtePerShift`, `shiftsPerDay`, `dockOfficeTimeShareOnDriverProcess`, `dockOfficeTimeSavingsShare`, `guardFtePerShift`, `guardAutomationShare`
- Paper: `pagesPerBol`, `bolsPerShipment`, `otherPagesPerShipment`, `outboundShare`, `printingCostPerPage`, `storageCostPerPage`, `phase1SavedShare`
- Shipper-of-choice: `costPerShipment`, `paidByCustomerShare`, `nonOwnedFleetShare`, `shipperOfChoiceDiscountShare`, `realizedShare`
- Detention: `detentionBudgetShareOfTransport`, `atFacilitiesShare`, `avgDetentionHours`, `costPerHourDetention`, `claimsShare15to30MinOver`, `claimsShare30PlusMinOver`
- Throughput: `avgGateInToOutMinutes`, `reduceCheckInMinutes`, `reduceCheckOutMinutes`, `realizedShare`, `outboundShare`, `incrementalMarginPerTruck`
- Network effect: `network.logFactor` (default `0` to match BT sheet baseline)
- Ramp: `yearOneRampShare` (0–1)

#### Intermediates (BT)

- Tier shipments/year: `shipmentsPerDay * operatingDaysPerYear`
- Total facilities: `sum(count)`
- Total shipments/year: `sum(count * tierShipmentsPerYear)`

#### Labor savings (BT)

For each tier, per facility:

- Dock office saved FTE:
  - `ROUNDDOWN((dockOfficeFtePerShift * shiftsPerDay) * dockOfficeTimeShareOnDriverProcess * dockOfficeTimeSavingsShare, 0)`
- Guard saved FTE:
  - `ROUNDDOWN((guardFtePerShift * shiftsPerDay) * guardAutomationShare, 0)`

Annual labor savings:

- `sum_over_tiers( count * (dockSavedFte + guardSavedFte) * dcFteAnnualCost )`

Rounding rule:

- Spreadsheet uses Excel `ROUNDDOWN(..., 0)`. Code uses `Math.floor`.

#### Paper savings (BT)

- Pages per shipment: `(pagesPerBol * bolsPerShipment) + otherPagesPerShipment`
- Total pages/year: `totalShipmentsPerYear * pagesPerShipment`
- Cost/page: `printingCostPerPage + storageCostPerPage`
- Paper savings/year: `totalPagesPerYear * costPerPage * phase1SavedShare`

BT baseline defaults set `phase1SavedShare = 0`, so paper savings are $0 unless enabled.

#### Shipper-of-choice (BT)

- Eligible shipment share: `paidByCustomerShare * nonOwnedFleetShare`
- Value/year:
  - `totalShipmentsPerYear * costPerShipment * shipperOfChoiceDiscountShare * realizedShare * eligibleShipmentShare`

#### Detention (BT)

- Transport budget/year: `totalShipmentsPerYear * costPerShipment`
- Detention budget/year: `transportBudget * detentionBudgetShareOfTransport`
- Detention at facilities: `detentionBudget * atFacilitiesShare`
- Claimable detention: `detentionAtFacilities * (claimsShare15to30MinOver + claimsShare30PlusMinOver)`

The BT sheet’s “$ per shipment” uses an *unweighted average* of the two claim buckets’ per-shipment values.
Code mirrors this behavior to match spreadsheet totals.

#### Throughput (BT)

- Total reduction minutes: `reduceCheckInMinutes + reduceCheckOutMinutes`
- Gate time improvement ratio:
  - `((avgGateInToOutMinutes / (avgGateInToOutMinutes - reductionMinutes)) - 1) * realizedShare`
- Outbound shipments/year: `totalShipmentsPerYear * outboundShare`
- Incremental outbound shipments: `outboundShipments * improvementRatio`
- Throughput value/year: `incrementalOutboundShipments * incrementalMarginPerTruck`

#### Totals (BT)

- Base annual savings: `labor + detention + paper + throughput`
- Network multiplier (optional): `1 + ln(totalFacilities + 1) * logFactor`
- Network-adjusted savings: `baseSavings * networkMultiplier`
- Year-1 ramp: `totalAnnualSavingsYear1 = totalAnnualSavings * yearOneRampShare`

### V2 (Lineage) — model spec (pending)

Spreadsheet is stored at `flow-state-site/roi-models/Lineage ROI Calc 1.25.xlsx`.

Current implementation approach:

- The unified Pro engine supports Lineage’s “hard savings” rows as $/shipment enterprise add-ons.
- This avoids double-counting by keeping BT-style submodels (shipper-of-choice, BT detention, BT throughput, BT labor) controllable via their own inputs.

Parity-tested outputs (Lineage ROI sheet):

- Total shipments/year (M13)
- Component totals (rows 17–24)
- Total opportunity/year (M25)
