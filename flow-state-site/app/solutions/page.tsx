'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DryVan, Intermodal, Flatbed, Tanker } from '@/components/icons/FlowIcons';

type Archetype = {
  slug: string;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
  description: string;
};

const ARCHETYPES: Archetype[] = [
  {
    slug: 'dry-van-reefer',
    label: 'Dry Van & Reefer',
    icon: DryVan,
    description: 'Temperature-controlled shipments with reefer verification, detention automation, and real-time temp tracking.',
  },
  {
    slug: 'intermodal',
    label: 'Intermodal',
    icon: Intermodal,
    description: 'Chassis pool tracking, interchange accuracy, container dwell monitoring, and network-wide visibility.',
  },
  {
    slug: 'flatbed-industrial',
    label: 'Flatbed & Industrial',
    icon: Flatbed,
    description: 'Photo capture for securement verification, weight/dimension validation, and flatbed-specific dock logic.',
  },
  {
    slug: 'tanker-hazmat',
    label: 'Tanker & Hazmat',
    icon: Tanker,
    description: 'HAZMAT driver qualification, chain-of-custody timestamping, and compliance reporting (CTPAT/TSA).',
  },
];

export default function SolutionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-void text-white">
      <section className="pt-32 pb-16 border-b border-neon/20 bg-gradient-to-b from-carbon/50 to-void">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-neon to-white bg-clip-text text-transparent">
            Solutions by Archetype
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Your facility archetype determines which processes to standardize first, which modules to instrument, and how the network-level payoff compounds.
          </p>
        </div>
      </section>

      <section className="sticky top-0 z-40 bg-carbon/90 backdrop-blur-sm border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {ARCHETYPES.map((arch) => (
              <button
                key={arch.slug}
                onClick={() => router.push(`/solutions/archetypes/${arch.slug}`)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all font-bold bg-carbon/50 text-gray-300 hover:bg-neon hover:text-void hover:shadow-neon/50 hover:shadow-lg"
              >
                <arch.icon size={20} />
                {arch.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-xl text-steel/90 mb-12">
          Click an archetype above to see tailored solutions, or explore cards below.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {ARCHETYPES.map((arch) => (
            <Link
              key={arch.slug}
              href={`/solutions/archetypes/${arch.slug}`}
              className="block p-8 rounded-lg bg-carbon/30 border border-neon/10 hover:border-neon/30 hover:bg-carbon/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <arch.icon size={36} className="text-neon/70 group-hover:text-neon transition-colors" />
                <h3 className="text-2xl font-black group-hover:text-neon transition-colors">{arch.label}</h3>
              </div>
              <p className="text-steel/90 mb-4">
                {arch.description}
              </p>
              <span className="text-neon font-semibold text-sm">
                View Solution →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
