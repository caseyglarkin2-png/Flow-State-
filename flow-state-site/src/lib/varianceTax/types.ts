/**
 * Variance Tax Type Definitions
 * 
 * TypeScript interfaces for the Variance Tax calculator inputs and outputs.
 * Based on the 6-component cost model from the Variance Tax Protocol.
 * 
 * @see /docs/variance-tax-model-reconciliation.md for model documentation
 */

/**
 * Input atoms for the Variance Tax calculator
 * 
 * All defaults are based on industry benchmarks and can be overridden.
 * Sources cited in JSDoc for each field.
 */
export interface VarianceTaxInputs {
  // ═══════════════════════════════════════════════════════════════════
  // VOLUME & THROUGHPUT
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Total annual truckload volume across all facilities
   * @default 20000
   * @source Industry average for mid-market shippers (DAT, 2024)
   */
  annualLoadVolume: number;
  
  /**
   * Rate of missed or rescheduled appointments
   * @range 0-1 (e.g., 0.05 = 5%)
   * @default 0.05
   * @source CSCMP State of Logistics 2024: "5-8% average appointment failures"
   */
  missedAppointmentRate: number;
  
  /**
   * Premium paid for spot/expedited freight recovery
   * @unit USD per load
   * @default 450
   * @source DAT Spot Rate Premium Index 2024
   */
  spotPremium: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // DWELL TIME & DETENTION
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Average time from gate-in to gate-out
   * @unit hours
   * @default 4.0
   * @source ATRI Wait Time Analysis 2024: "2-4 hours median"
   */
  averageDwellTime: number;
  
  /**
   * Free time before detention charges begin
   * @unit hours
   * @default 2.0
   * @source Standard carrier contracts (OOIDA benchmark)
   */
  freeTime: number;
  
  /**
   * Hourly detention rate charged by carriers
   * @unit USD per hour
   * @default 75
   * @source ATRI Detention Cost Survey 2024
   */
  detentionRate: number;
  
  /**
   * Percentage of loads that incur detention charges
   * @range 0-1 (e.g., 0.15 = 15%)
   * @default 0.15
   * @source Industry survey: "10-20% of loads exceed free time"
   */
  detentionFrequency: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // LABOR COSTS
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Hourly rate for gate guard labor (fully loaded)
   * @unit USD per hour
   * @default 30
   * @source BLS Occupational Employment Statistics 2024
   */
  laborRateGuard: number;
  
  /**
   * Hourly rate for yard jockey labor (fully loaded)
   * @unit USD per hour
   * @default 25
   * @source BLS Occupational Employment Statistics 2024
   */
  laborRateJockey: number;
  
  /**
   * Time for manual check-in process (paper, phone, clipboard)
   * @unit minutes
   * @default 15
   * @source YardFlow customer time studies (n=47 facilities)
   */
  manualCheckInMinutes: number;
  
  /**
   * Time for digital check-in process (kiosk, mobile app)
   * @unit minutes
   * @default 2
   * @source YardFlow platform analytics (2024)
   */
  digitalCheckInMinutes: number;
  
  /**
   * Percentage of loads requiring yard hunting/searching
   * @range 0-1 (e.g., 0.10 = 10%)
   * @default 0.10
   * @source YardFlow customer surveys
   */
  yardHuntingFrequency: number;
  
  /**
   * Time spent hunting for trailers in the yard
   * @unit minutes per hunt
   * @default 20
   * @source YardFlow customer time studies
   */
  yardHuntingMinutes: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // COMPLIANCE & CHARGEBACKS
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Rate of chargebacks applied to failed deliveries
   * @range 0-1 (e.g., 0.03 = 3%)
   * @default 0.03
   * @source Retail chargeback benchmarks (Descartes 2024)
   */
  chargebackRate: number;
  
  /**
   * Rate of loads failing OTIF/compliance requirements
   * @range 0-1 (e.g., 0.03 = 3%)
   * @default 0.03
   * @source Perfect Order Index industry benchmarks
   */
  complianceFailureRate: number;
  
  /**
   * Average invoice value for chargeback calculation
   * @unit USD
   * @default 25000
   * @source Industry average truckload value
   */
  averageInvoiceValue: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // WORKING CAPITAL
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Days of safety stock held due to yard variability
   * @unit days
   * @default 5
   * @source Supply chain inventory benchmarks (Gartner 2024)
   */
  safetyStockDays: number;
  
  /**
   * Value of one day's inventory
   * @unit USD
   * @default 100000
   * @source Mid-market shipper benchmark
   */
  dailyInventoryValue: number;
  
  /**
   * Annual cost of holding inventory (storage, insurance, obsolescence)
   * @range 0-1 (e.g., 0.25 = 25%)
   * @default 0.25
   * @source Inventory holding cost benchmarks (APICS)
   */
  holdingCostRate: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // LOST SALES RISK
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Probability of stockout due to yard inefficiency
   * @range 0-1 (e.g., 0.02 = 2%)
   * @default 0.02
   * @source Industry stockout rates
   */
  stockoutRisk: number;
  
  /**
   * Annual revenue at risk from stockouts
   * @unit USD
   * @default 50000000
   * @source Mid-market shipper benchmark
   */
  annualRevenue: number;
  
  /**
   * Margin impact multiplier for lost sales
   * @range 0-1 (e.g., 0.5 = 50% margin impact)
   * @default 0.5
   * @source Contribution margin benchmarks
   */
  marginImpact: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // TURN TIME (for Synthetic Capacity calculation)
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Current average turn time (gate to dock assignment)
   * @unit minutes
   * @default 48
   * @source Industry benchmark (YardFlow customer baseline)
   */
  currentTurnTimeMinutes: number;
  
  /**
   * Target turn time with YardFlow optimization
   * @unit minutes
   * @default 24
   * @source YardFlow platform target (50% reduction)
   */
  targetTurnTimeMinutes: number;
}

/**
 * Labor breakdown for Component C
 */
export interface LaborBreakdown {
  /** Cost of manual gate check-in vs digital */
  gateWaste: number;
  /** Cost of hunting for trailers in the yard */
  huntWaste: number;
  /** Total labor variance cost */
  total: number;
}

/**
 * Detailed output from the Variance Tax calculator
 * 
 * Includes the 6 cost components (A-F), summary metrics,
 * and derived values for visualization.
 */
export interface VarianceTaxOutputs {
  // ═══════════════════════════════════════════════════════════════════
  // COST COMPONENTS (A-F)
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Component A: Recovery Cost (Premium Freight)
   * = annualLoadVolume × missedAppointmentRate × spotPremium
   * @unit USD/year
   */
  recoveryCost: number;
  
  /**
   * Component B: Detention Cost
   * = annualLoadVolume × detentionFrequency × max(0, avgDwell - freeTime) × detentionRate
   * @unit USD/year
   */
  detentionCost: number;
  
  /**
   * Component C: Labor Variance Cost
   * = gateWaste + huntWaste
   * @unit USD/year
   */
  laborVarianceCost: number;
  
  /** Detailed breakdown of labor costs */
  laborBreakdown: LaborBreakdown;
  
  /**
   * Component D: Chargeback Cost (OTIF Penalties)
   * = annualLoadVolume × complianceFailureRate × avgInvoiceValue × chargebackRate
   * @unit USD/year
   */
  chargebackCost: number;
  
  /**
   * Component E: Working Capital Drag
   * = safetyStockDays × dailyInventoryValue × holdingCostRate
   * @unit USD/year
   */
  workingCapitalDrag: number;
  
  /**
   * Component F: Lost Sales Risk
   * = annualRevenue × stockoutRisk × marginImpact
   * @unit USD/year
   */
  lostSalesRisk: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // SUMMARY METRICS
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Total Variance Tax (sum of all 6 components)
   * @unit USD/year
   */
  totalVarianceTax: number;
  
  /**
   * Synthetic Capacity unlock percentage
   * = ((currentTurnTime - targetTurnTime) / currentTurnTime) × 100
   * @unit percentage (e.g., 50 = 50%)
   */
  syntheticCapacityPercent: number;
  
  /**
   * Reynolds Score for shader binding
   * 0 = laminar flow (ideal), 1 = turbulent (chaotic)
   * @range 0-1
   */
  reynoldsScore: number;
  
  /**
   * Cost per load (for unit economics display)
   * = totalVarianceTax / annualLoadVolume
   * @unit USD/load
   */
  costPerLoad: number;
  
  /**
   * Monthly run rate
   * = totalVarianceTax / 12
   * @unit USD/month
   */
  monthlyRunRate: number;
  
  // ═══════════════════════════════════════════════════════════════════
  // COMPONENT PERCENTAGES (for charts)
  // ═══════════════════════════════════════════════════════════════════
  
  /**
   * Each component as a percentage of total
   */
  componentPercentages: {
    recovery: number;
    detention: number;
    labor: number;
    chargeback: number;
    workingCapital: number;
    lostSales: number;
  };
}

/**
 * Preset scenario configuration
 */
export interface VarianceTaxPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<VarianceTaxInputs>;
}

/**
 * Validation result for input checking
 */
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    field: keyof VarianceTaxInputs;
    message: string;
  }>;
}
