import { expect, test } from '@playwright/test';

test.describe('smoke', () => {
  test('home loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /generate yard report/i })).toBeVisible();
  });

  test('pricing loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { name: /transparent pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /open roi calculator/i })).toBeVisible();
  });

  test('roi calculator loads', async ({ page }) => {
    await page.goto('/roi');
    await expect(page.getByRole('heading', { name: /calculate your flow state/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /roi model/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /board-ready/i })).toBeVisible();
  });

  test('contact loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /contact flow state/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /get a quote/i })).toBeVisible();
  });

  test('security loads', async ({ page }) => {
    await page.goto('/security');
    await expect(page.getByRole('heading', { level: 1, name: /security/i })).toBeVisible();
  });

  test('integrations loads', async ({ page }) => {
    await page.goto('/integrations');
    await expect(page.getByRole('heading', { level: 1, name: /integrations/i })).toBeVisible();
  });

  test('implementation loads', async ({ page }) => {
    await page.goto('/implementation');
    await expect(page.getByRole('heading', { level: 1, name: /implementation/i })).toBeVisible();
  });

  test('compare loads', async ({ page }) => {
    await page.goto('/compare');
    await expect(page.getByRole('heading', { level: 1, name: /compare/i })).toBeVisible();
  });

  test('faq loads', async ({ page }) => {
    await page.goto('/faq');
    await expect(page.getByRole('heading', { level: 1, name: /faq/i })).toBeVisible();
  });

  test('pdf endpoints return a pdf', async ({ request }) => {
    const lead = { name: 'Test User', email: 'test@example.com', company: 'TestCo' };

    const roiInputs = {
      tiers: {
        XL: { count: 20, shipmentsPerDay: 200, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
        L: { count: 25, shipmentsPerDay: 100, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
        M: { count: 100, shipmentsPerDay: 65, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
        S: { count: 200, shipmentsPerDay: 25, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
      },
      labor: {
        tiers: {
          XL: {
            dockOfficeFtePerShift: 2,
            shiftsPerDay: 4,
            dockOfficeTimeShareOnDriverProcess: 0.25,
            dockOfficeTimeSavingsShare: 0.9,
            guardFtePerShift: 2,
            guardAutomationShare: 0.5,
          },
          L: {
            dockOfficeFtePerShift: 1.5,
            shiftsPerDay: 3,
            dockOfficeTimeShareOnDriverProcess: 0.25,
            dockOfficeTimeSavingsShare: 0.9,
            guardFtePerShift: 1,
            guardAutomationShare: 0.5,
          },
          M: {
            dockOfficeFtePerShift: 1.5,
            shiftsPerDay: 2,
            dockOfficeTimeShareOnDriverProcess: 0.33,
            dockOfficeTimeSavingsShare: 0.9,
            guardFtePerShift: 1,
            guardAutomationShare: 0.5,
          },
          S: {
            dockOfficeFtePerShift: 1,
            shiftsPerDay: 1,
            dockOfficeTimeShareOnDriverProcess: 0.5,
            dockOfficeTimeSavingsShare: 0.9,
            guardFtePerShift: 0,
            guardAutomationShare: 0.5,
          },
        },
      },
      paper: {
        pagesPerBol: 3,
        bolsPerShipment: 3,
        otherPagesPerShipment: 0,
        outboundShare: 0.6,
        printingCostPerPage: 0.08,
        storageCostPerPage: 0.02,
        phase1SavedShare: 0,
      },
      shipper: {
        costPerShipment: 750,
        paidByCustomerShare: 0.2,
        nonOwnedFleetShare: 0.9,
        shipperOfChoiceDiscountShare: 0.11,
        realizedShare: 0.1,
      },
      detention: {
        detentionBudgetShareOfTransport: 0.01,
        atFacilitiesShare: 0.4,
        avgDetentionHours: 1.5,
        costPerHourDetention: 50,
        claimsShare15to30MinOver: 0.4,
        claimsShare30PlusMinOver: 0.6,
      },
      throughput: {
        avgGateInToOutMinutes: 50,
        reduceCheckInMinutes: 5,
        reduceCheckOutMinutes: 5,
        realizedShare: 0.1,
        outboundShare: 0.6,
        incrementalMarginPerTruck: 500,
      },
      network: {
        logFactor: 0,
      },
      commercial: {
        implementationBaseCost: 0,
        implementationCostPerFacility: 2500,
        annualSubscriptionPerFacility: 8000,
      },
      enterpriseAddOns: {
        perShipment: {
          lostBolsLostSales: 0,
          manualWmsFailoverSavings: 0,
          dockClerkProductivity: 0,
          missedDeliveries: 0,
          yardSpotterProductivity: 0,
          osdSearchTime: 0,
          detentionClaimsReduction: 0,
        },
      },
      yearOneRampShare: 1,
    };

    const roiRes = await request.post('/api/pdf/roi', {
      data: {
        lead,
        inputs: roiInputs,
      },
    });
    expect(roiRes.status()).toBe(200);
    expect(roiRes.headers()['content-type']).toContain('application/pdf');

    const yardRes = await request.post('/api/pdf/yardbuilder', {
      data: {
        lead,
        inputs: {
          company: 'TestCo',
          facilityCount: 2,
          shipmentsPerDay: 150,
          gateStyle: 'guard',
          pain: 'detention',
        },
      },
    });
    expect(yardRes.status()).toBe(200);
    expect(yardRes.headers()['content-type']).toContain('application/pdf');
  });
});
