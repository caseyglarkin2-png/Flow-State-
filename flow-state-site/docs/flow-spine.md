# YardFlow by FreightRoll Narrative Spine

**Purpose:** Define the canonical journey for each buyer persona so every page advances a coherent story.

---

## Persona Spines

### 1. CFO / Finance Spine
**Goal:** Self-educate in 5 minutes, forward board-ready artifact

```
Home → Diagnostic → ROI → Network Effect → Evidence Vault → Pricing → Contact
```

| Step | Page | Purpose | Questions Answered | Must Prove | Primary CTA | Secondary CTA | Handoff |
|------|------|---------|-------------------|------------|-------------|---------------|---------|
| 1 | Home | Hook + pain recognition | "What is this?" "Why should I care?" | Yard costs money invisibly | Calculate Your Yard Tax | Map a Facility | → Diagnostic |
| 2 | Diagnostic | Quantify their specific pain | "How much is MY yard costing?" | Their pain is real and measurable | Generate Board Memo | Run Full ROI Model | → ROI or Contact |
| 3 | ROI | Scenario-based modeling | "What's the Year-1 ROI?" "What are the assumptions?" | Savings are defensible, assumptions transparent | Export Board-Ready PDF | Get Custom Analysis | → Contact |
| 4 | Network Effect | Compounding value | "Why more than one site?" "What's the upside?" | Network scales value super-linearly | Run Your Network Scenario | View Implementation | → ROI or Implementation |
| 5 | Evidence Vault | Trust pack for procurement | "Is this vendor safe?" "What's the risk?" | Security, compliance, references | Download Vendor Packet | Request Custom SOC2 | → Pricing |
| 6 | Pricing | Cost clarity | "What does it cost?" "How does pricing work?" | Cost is transparent and justified | Get a Quote | Open ROI Calculator | → Contact |
| 7 | Contact | Conversion | "How do I start?" | Clear next steps | Submit Inquiry | Book a Demo | → Sales |

---

### 2. Ops / DC Leader Spine
**Goal:** Understand the product, see operational impact, validate rollout

```
Home → Solutions → Product → Implementation → ROI → Contact
```

| Step | Page | Purpose | Questions Answered | Must Prove | Primary CTA | Secondary CTA | Handoff |
|------|------|---------|-------------------|------------|-------------|---------------|---------|
| 1 | Home | Problem recognition | "Do they understand my pain?" | We know yard ops | Calculate Your Yard Tax | Map a Facility | → Diagnostic or Solutions |
| 2 | Solutions | Mission-specific pain | "Can they solve MY specific problem?" | We have a playbook for your pain | Pick Your Tax to Cut | View Full Product | → Product |
| 3 | Product | Feature validation | "What does it actually do?" "How does it work?" | Modules are real and useful | Calculate Your Yard Tax | View Implementation | → Implementation |
| 4 | Implementation | Rollout reality | "How long? Who does what? What could go wrong?" | We've done this before | Get Rollout Plan | Contact Implementation Team | → Contact |
| 5 | ROI | Justify the project | "Can I make the business case?" | Numbers are defensible | Export for Finance | Get Custom Analysis | → Contact |

---

### 3. IT / Security Spine
**Goal:** Validate security posture, integrations, and technical architecture

```
Home → Security → Integrations → Implementation → Contact
```

| Step | Page | Purpose | Questions Answered | Must Prove | Primary CTA | Secondary CTA | Handoff |
|------|------|---------|-------------------|------------|-------------|---------------|---------|
| 1 | Home | Context | "What is this solution?" | We're a real vendor | View Security Posture | View Integrations | → Security |
| 2 | Security | Trust validation | "Is this secure? SOC2? GDPR?" "What's the risk?" | We meet enterprise standards | Download Security Packet | Request Custom Review | → Integrations |
| 3 | Integrations | Technical fit | "Does it work with our stack?" "How hard is integration?" | We integrate cleanly | View Architecture Diagram | Contact Technical Team | → Implementation |
| 4 | Implementation | Rollout validation | "What's the IT lift?" "Who owns what?" | We handle the hard parts | Get Technical Requirements | Schedule Architecture Review | → Contact |

---

### 4. Procurement Spine
**Goal:** Complete vendor evaluation checklist efficiently

```
Pricing → Evidence Vault (Security) → Terms/Privacy → Implementation → Contact
```

| Step | Page | Purpose | Questions Answered | Must Prove | Primary CTA | Secondary CTA | Handoff |
|------|------|---------|-------------------|------------|-------------|---------------|---------|
| 1 | Pricing | Cost structure | "What does it cost?" "How is it structured?" | Transparent and predictable | Get a Quote | View Terms | → Evidence Vault |
| 2 | Evidence Vault | Risk assessment | "Vendor packet items" | All boxes checked | Download Vendor Packet | Request MSA Review | → Terms |
| 3 | Terms | Legal review | "What are the terms?" | Standard, negotiable | Download Terms PDF | Contact Legal | → Implementation |
| 4 | Implementation | Timeline/RACI | "What are we signing up for?" | Predictable rollout | Get Implementation Timeline | Contact Procurement | → Contact |

---

## Page-Level CTA Rules

### Primary CTA Selection
1. **Must advance the persona spine** — no dead ends
2. **Must be specific** — "Calculate Your Yard Tax" not "Learn More"
3. **Must match page intent** — ROI page → export or contact, not "Go Home"

### Secondary CTA Selection
1. **Alternate path for different persona** — CFO on Product page gets "View ROI"
2. **Escape hatch to conversion** — Contact/Demo always available
3. **No more than 2 CTAs above fold** — avoid paradox of choice

### CTA Copy Guidelines
| Generic (❌) | Specific (✅) |
|--------------|---------------|
| Learn more | View full product breakdown |
| Get started | Calculate your yard tax |
| Contact us | Get a custom analysis |
| Submit | Send my inquiry |
| Download | Export board-ready PDF |

---

## Flow Validation Rules

### Every page must:
- [ ] Have exactly one H1 that matches the page purpose
- [ ] Have a primary CTA that advances to the next spine step
- [ ] Have a secondary CTA for alternate personas or escape
- [ ] Not repeat content from other pages (modular, not redundant)
- [ ] Load in <3s on mobile

### Flow must:
- [ ] CFO can reach Contact in ≤4 clicks from Home
- [ ] Every page links to at least 2 other spine pages
- [ ] No orphan pages (every page is linked from nav, footer, or another page)
- [ ] No circular dead ends (Page A → Page B → Page A with no forward progress)

---

## Visual Flow Map

```
                                    ┌─────────────┐
                                    │   HOME      │
                                    │ (Pain Hook) │
                                    └──────┬──────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
           ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
           │  DIAGNOSTIC   │      │   SOLUTIONS   │      │   SECURITY    │
           │ (Quantify)    │      │ (Use Cases)   │      │ (Trust)       │
           └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
                   │                      │                      │
                   ▼                      ▼                      ▼
           ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
           │     ROI       │      │   PRODUCT     │      │ INTEGRATIONS  │
           │ (Model)       │◄─────│ (Features)    │      │ (Tech Fit)    │
           └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
                   │                      │                      │
                   ▼                      ▼                      │
           ┌───────────────┐      ┌───────────────┐              │
           │NETWORK EFFECT │      │IMPLEMENTATION │◄─────────────┘
           │ (Compound)    │─────►│ (Rollout)     │
           └───────┬───────┘      └───────┬───────┘
                   │                      │
                   │      ┌───────────────┘
                   │      │
                   ▼      ▼
           ┌───────────────┐
           │   PRICING     │
           └───────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │   CONTACT     │
           │ (Conversion)  │
           └───────────────┘
```

---

## Implementation Checklist

- [ ] Audit all pages against this spine
- [ ] Fix CTA copy to be specific
- [ ] Add persona routing module to key pages
- [ ] Ensure mobile nav follows spine priority
- [ ] Add breadcrumbs or progress indicator for multi-page flows
