import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export type RoiPdfPayload = {
  lead: { name: string; email: string; company: string };
  inputs: Record<string, unknown>;
  results: {
    totalAnnualSavings?: number;
    baseSavings?: number;
    networkBonusSavings?: number;

    yearOneRampShare?: number;
    yearOneGrossSavings?: number;
    yearOneNetGain?: number;
    yearOneRoiPercent?: number;
    paybackMonths?: number;
    fiveYearValue?: number;
    annualSubscription?: number;
    implementationCost?: number;
  };
  assumptions: string[];
  disclaimer: string;
};

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 11, fontFamily: 'Helvetica' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2pt solid #00FF88',
    paddingBottom: 12,
    marginBottom: 16,
  },
  headerLeft: { flex: 1 },
  headerRight: { alignItems: 'flex-end' },
  brandName: { fontSize: 10, color: '#00FF88', fontWeight: 700, letterSpacing: 1 },
  companyName: { fontSize: 16, fontWeight: 700, marginTop: 4 },
  generatedDate: { fontSize: 9, color: '#888888', marginTop: 2 },
  h1: { fontSize: 18, fontWeight: 700 },
  h2: { fontSize: 12, fontWeight: 700, marginTop: 16 },
  muted: { color: '#666666' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  label: { color: '#555555' },
  value: { fontWeight: 700 },
  box: { border: '1pt solid #DDDDDD', padding: 10, borderRadius: 6, marginTop: 10 },
});

function money(n: number | undefined): string {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return `$${Math.round(n).toLocaleString()}`;
}

function pct(n: number | undefined): string {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return `${Math.round(n)}%`;
}

function pct01(n: number | undefined): string {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return `${Math.round(n * 100)}%`;
}

function num(n: number | undefined): string {
  if (typeof n !== 'number' || Number.isNaN(n)) return '-';
  return `${Math.round(n).toLocaleString()}`;
}

export function RoiSummaryPdf({ payload }: { payload: RoiPdfPayload }) {
  const opportunityCost90d =
    typeof payload.results.yearOneGrossSavings === 'number'
      ? Math.max(0, payload.results.yearOneGrossSavings) / 4
      : undefined;

  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Branded Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandName}>YARDFLOW BY FREIGHTROLL</Text>
            <Text style={styles.companyName}>{payload.lead.company}</Text>
            <Text style={styles.generatedDate}>Prepared for: {payload.lead.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.generatedDate}>Generated: {generatedDate}</Text>
            <Text style={styles.generatedDate}>{payload.lead.email}</Text>
          </View>
        </View>

        <Text style={styles.h1}>ROI Summary (Modeled)</Text>
        <Text style={[styles.muted, { marginTop: 6 }]}>
          This summary is a directional model. Pro-mode defaults are aligned to a reference spreadsheet model; accuracy depends on
          validating assumptions against your operational data.
        </Text>

        <View style={styles.box}>
          <Text style={styles.h2}>Executive Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Steady-state annual savings (modeled)</Text>
            <Text style={styles.value}>{money(payload.results.totalAnnualSavings)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Base savings (steady-state)</Text>
            <Text style={styles.value}>{money(payload.results.baseSavings)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Network bonus (steady-state)</Text>
            <Text style={styles.value}>{money(payload.results.networkBonusSavings)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Year‑1 realization factor</Text>
            <Text style={styles.value}>{pct01(payload.results.yearOneRampShare)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Year‑1 realized savings (before costs)</Text>
            <Text style={styles.value}>{money(payload.results.yearOneGrossSavings)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Opportunity cost (90 days, illustrative)</Text>
            <Text style={styles.value}>{money(opportunityCost90d)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Year 1 net gain (modeled)</Text>
            <Text style={styles.value}>{money(payload.results.yearOneNetGain)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Year 1 ROI</Text>
            <Text style={styles.value}>{pct(payload.results.yearOneRoiPercent)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payback</Text>
            <Text style={styles.value}>{num(payload.results.paybackMonths)} months</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Five-year value (modeled)</Text>
            <Text style={styles.value}>{money(payload.results.fiveYearValue)}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Commercial assumptions</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Annual subscription</Text>
            <Text style={styles.value}>{money(payload.results.annualSubscription)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Implementation (one-time)</Text>
            <Text style={styles.value}>{money(payload.results.implementationCost)}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Assumptions (inline, not hidden)</Text>
          {payload.assumptions.map((a) => (
            <Text key={a} style={{ marginTop: 4 }}>
              • {a}
            </Text>
          ))}
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Disclaimer</Text>
          <Text style={styles.muted}>{payload.disclaimer}</Text>
        </View>
      </Page>
    </Document>
  );
}
