import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export type YardbuilderPdfPayload = {
  lead: { name: string; email: string; company: string };
  inputs: {
    company: string;
    facilityCount: number;
    shipmentsPerDay: number;
    gateStyle: string;
    pain: string;
  };
  preview: {
    annualShipments: number;
    focus: string;
    nextSteps: string[];
  };
  disclaimer: string;
};

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 11, fontFamily: 'Helvetica' },
  h1: { fontSize: 18, fontWeight: 700 },
  h2: { fontSize: 12, fontWeight: 700, marginTop: 16 },
  muted: { color: '#666666' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  label: { color: '#555555' },
  value: { fontWeight: 700 },
  box: { border: '1pt solid #DDDDDD', padding: 10, borderRadius: 6, marginTop: 10 },
});

export function YardReadinessPdf({ payload }: { payload: YardbuilderPdfPayload }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>Flow State — Yard Readiness Report (Modeled)</Text>
        <Text style={styles.muted}>Company: {payload.inputs.company}</Text>
        <Text style={styles.muted}>
          Prepared for: {payload.lead.name} ({payload.lead.email})
        </Text>

        <View style={styles.box}>
          <Text style={styles.h2}>Inputs</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Facilities</Text>
            <Text style={styles.value}>{Math.max(1, payload.inputs.facilityCount).toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipments/day (per facility)</Text>
            <Text style={styles.value}>{Math.max(0, payload.inputs.shipmentsPerDay).toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gate process style</Text>
            <Text style={styles.value}>{payload.inputs.gateStyle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Biggest pain</Text>
            <Text style={styles.value}>{payload.inputs.pain}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Preview (reward)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Modeled volume</Text>
            <Text style={styles.value}>{Math.round(payload.preview.annualShipments).toLocaleString()} shipments/year</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Primary focus</Text>
            <Text style={styles.value}>{payload.preview.focus}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Recommended next steps</Text>
          {payload.preview.nextSteps.map((s) => (
            <Text key={s} style={{ marginTop: 4 }}>
              • {s}
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
