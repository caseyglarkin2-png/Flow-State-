/**
 * Icon Test Page - Internal preview of all icons at multiple sizes and colors
 * 
 * Purpose: Visual QA for icon redesign verification
 * Access: /icon-test (excluded from sitemap)
 */

import {
  ProtocolGuardIcon,
  ProtocolCommsIcon,
  ProtocolBOLIcon,
  ProtocolYMSIcon,
} from '@/components/icons/ProtocolIcons';
import {
  FlowArrow,
  Confirm,
  Crosshair,
  Signal,
  Manifest,
  Nexus,
  Shield,
} from '@/components/icons/FlowIcons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Icon Test | Internal',
  robots: 'noindex, nofollow',
};

const sizes = [24, 32, 48, 64] as const;
const colors = {
  Neon: '#00B4FF',
  Steel: '#888888',
  White: '#FFFFFF',
  Ember: '#FF2A00',
} as const;

export default function IconTestPage() {
  return (
    <div className="min-h-screen bg-void text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Icon Test Page</h1>
      <p className="text-steel mb-8">Internal preview - not indexed</p>

      {/* Protocol Icons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-neon">Protocol Icons (Redesigned)</h2>
        <p className="text-steel mb-6">New geometric, brand-aligned icons for the 4 protocol modules</p>
        
        <div className="grid gap-8">
          {/* ProtocolGuardIcon */}
          <IconShowcase
            name="ProtocolGuardIcon"
            description="Crosshair + Concentric Rings + Checkmark"
            renderIcon={(size, color) => (
              <ProtocolGuardIcon size={size as 24 | 32 | 48 | 64} color={color} />
            )}
          />
          
          {/* ProtocolCommsIcon */}
          <IconShowcase
            name="ProtocolCommsIcon"
            description="Bidirectional Pulse + Central Hub"
            renderIcon={(size, color) => (
              <ProtocolCommsIcon size={size as 24 | 32 | 48 | 64} color={color} />
            )}
          />
          
          {/* ProtocolBOLIcon */}
          <IconShowcase
            name="ProtocolBOLIcon"
            description="3x3 Data Grid + Verification Checkmark"
            renderIcon={(size, color) => (
              <ProtocolBOLIcon size={size as 24 | 32 | 48 | 64} color={color} />
            )}
          />
          
          {/* ProtocolYMSIcon */}
          <IconShowcase
            name="ProtocolYMSIcon"
            description="Triangular Network + Orchestration Pulse"
            renderIcon={(size, color) => (
              <ProtocolYMSIcon size={size as 24 | 32 | 48 | 64} color={color} />
            )}
          />
        </div>
      </section>

      {/* Reference FlowIcons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-steel">FlowIcons (Reference Standard)</h2>
        <p className="text-steel/70 mb-6">These are the brand standard - ProtocolIcons should match this aesthetic</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          <FlowIconCard name="FlowArrow" icon={<FlowArrow size={48} className="text-neon" />} />
          <FlowIconCard name="Confirm" icon={<Confirm size={48} className="text-neon" />} />
          <FlowIconCard name="Crosshair" icon={<Crosshair size={48} className="text-neon" />} />
          <FlowIconCard name="Signal" icon={<Signal size={48} className="text-neon" />} />
          <FlowIconCard name="Manifest" icon={<Manifest size={48} className="text-neon" />} />
          <FlowIconCard name="Nexus" icon={<Nexus size={48} className="text-neon" />} />
          <FlowIconCard name="Shield" icon={<Shield size={48} className="text-neon" />} />
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Side-by-Side: Protocol + Reference</h2>
        <p className="text-steel mb-6">Visual comparison to verify aesthetic alignment</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ComparisonCard
            title="Guard vs Crosshair"
            protocol={<ProtocolGuardIcon size={64} color="#00B4FF" />}
            reference={<Crosshair size={64} className="text-neon" />}
          />
          <ComparisonCard
            title="Comms vs Signal"
            protocol={<ProtocolCommsIcon size={64} color="#00B4FF" />}
            reference={<Signal size={64} className="text-neon" />}
          />
          <ComparisonCard
            title="BOL vs Manifest"
            protocol={<ProtocolBOLIcon size={64} color="#00B4FF" />}
            reference={<Manifest size={64} className="text-neon" />}
          />
          <ComparisonCard
            title="YMS vs Nexus"
            protocol={<ProtocolYMSIcon size={64} color="#00B4FF" />}
            reference={<Nexus size={64} className="text-neon" />}
          />
        </div>
      </section>

      {/* Light Background Test */}
      <section className="mb-12 bg-white rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-carbon">Light Background Test</h2>
        <div className="flex gap-8">
          <ProtocolGuardIcon size={48} color="#1A1A1A" />
          <ProtocolCommsIcon size={48} color="#1A1A1A" />
          <ProtocolBOLIcon size={48} color="#1A1A1A" />
          <ProtocolYMSIcon size={48} color="#1A1A1A" />
        </div>
      </section>

      {/* Validation Checklist */}
      <section className="border border-neon/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">✅ Visual Checklist</h2>
        <ul className="space-y-2 text-steel">
          <li>□ All icons render at all 4 sizes (24, 32, 48, 64)</li>
          <li>□ All color variants display correctly</li>
          <li>□ Icons are visually distinct from each other</li>
          <li>□ Stroke weights scale proportionally</li>
          <li>□ Icons match FlowIcons aesthetic (geometric, minimal)</li>
          <li>□ No skeuomorphic elements (shields, documents, chat bubbles)</li>
          <li>□ Light background visibility confirmed</li>
        </ul>
      </section>
    </div>
  );
}

function IconShowcase({
  name,
  description,
  renderIcon,
}: {
  name: string;
  description: string;
  renderIcon: (size: number, color: string) => React.ReactNode;
}) {
  return (
    <div className="border border-neon/20 rounded-xl p-6 bg-carbon/30">
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-steel mb-4">{description}</p>
      
      {/* Size variants */}
      <div className="mb-6">
        <h4 className="text-sm text-steel/70 mb-2">Size Variants</h4>
        <div className="flex items-end gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              {renderIcon(size, colors.Neon)}
              <span className="text-xs text-steel mt-1">{size}px</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Color variants */}
      <div>
        <h4 className="text-sm text-steel/70 mb-2">Color Variants</h4>
        <div className="flex gap-6">
          {Object.entries(colors).map(([colorName, colorValue]) => (
            <div key={colorName} className="flex flex-col items-center">
              {renderIcon(48, colorValue)}
              <span className="text-xs text-steel mt-1">{colorName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowIconCard({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center p-4 border border-steel/20 rounded-lg">
      {icon}
      <span className="text-xs text-steel mt-2">{name}</span>
    </div>
  );
}

function ComparisonCard({
  title,
  protocol,
  reference,
}: {
  title: string;
  protocol: React.ReactNode;
  reference: React.ReactNode;
}) {
  return (
    <div className="border border-steel/30 rounded-xl p-4">
      <h4 className="text-sm font-medium mb-3 text-center">{title}</h4>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col items-center">
          {protocol}
          <span className="text-xs text-neon mt-1">New</span>
        </div>
        <div className="flex flex-col items-center">
          {reference}
          <span className="text-xs text-steel mt-1">Ref</span>
        </div>
      </div>
    </div>
  );
}
