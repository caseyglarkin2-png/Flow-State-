'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

type VaultLink = {
  label: string;
  href: string;
  kind: 'page' | 'download';
  note?: string;
};

type VaultSection = {
  title: string;
  items: VaultLink[];
};

const DEFAULT_SECTIONS: VaultSection[] = [
  {
    title: 'Proof',
    items: [
      { label: 'Case studies', href: '/case-studies', kind: 'page', note: 'Modeled example + format' },
      { label: 'ROI calculator (board-ready)', href: '/roi', kind: 'page' },
    ],
  },
  {
    title: 'Trust',
    items: [
      { label: 'Security & Trust', href: '/security', kind: 'page' },
      { label: 'Integrations', href: '/integrations', kind: 'page' },
      { label: 'Implementation', href: '/implementation', kind: 'page' },
    ],
  },
  {
    title: 'Buying',
    items: [
      { label: 'Pricing (how buying works)', href: '/pricing', kind: 'page' },
      { label: 'FAQ', href: '/faq', kind: 'page' },
      { label: 'Compare', href: '/compare', kind: 'page' },
    ],
  },
];

export default function EvidenceVaultDrawer() {
  const [open, setOpen] = useState(false);

  const sections = useMemo(() => DEFAULT_SECTIONS, []);

  useEffect(() => {
    if (!open) return;
    trackEvent('evidence_vault_opened');
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-carbon/90 border border-neon/25 text-white hover:border-neon/50 transition-colors backdrop-blur-md"
          aria-label="Open Evidence Vault"
        >
          <div className="flex items-center gap-2">
            <span className="text-neon font-semibold">Evidence Vault</span>
            <span className="text-xs text-steel/80">(procurement-ready)</span>
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-void/70 z-50" />
        <Dialog.Content
          className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-carbon z-50 border-l border-neon/20 outline-none"
          aria-label="Evidence Vault"
        >
          <div className="p-6 border-b border-neon/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-xl font-black text-white">Evidence Vault</Dialog.Title>
                <Dialog.Description className="text-sm text-steel mt-1">
                  Short artifacts you can forward internally.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg border border-steel/25 text-white hover:border-neon/40 transition-colors"
                  aria-label="Close"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="p-6 space-y-8 overflow-auto h-[calc(100%-88px)]">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-neon mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.href} className="rounded-xl border border-neon/10 bg-void/20">
                      {item.kind === 'page' ? (
                        <Link
                          href={item.href}
                          className="block px-4 py-3 hover:bg-void/30 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-white font-semibold">{item.label}</span>
                            <span className="text-xs text-steel">Open</span>
                          </div>
                          {item.note ? <div className="text-xs text-steel/80 mt-1">{item.note}</div> : null}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="block px-4 py-3 hover:bg-void/30 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-white font-semibold">{item.label}</span>
                            <span className="text-xs text-steel">Download</span>
                          </div>
                          {item.note ? <div className="text-xs text-steel/80 mt-1">{item.note}</div> : null}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-neon/20 bg-void/20 p-4">
              <div className="text-white font-semibold">Next step</div>
              <p className="text-sm text-steel mt-1">
                Want a board‑ready ROI story? Generate a YardBuilder report or export your ROI as a PDF.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/yardbuilder"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold bg-neon text-void"
                  onClick={() => setOpen(false)}
                >
                  Generate Yard Report
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Book Demo / Get Quote
                </Link>
              </div>
              <p className="text-xs text-steel/70 mt-3">
                No fake scarcity. Urgency is operational: dwell, detention, labor.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
