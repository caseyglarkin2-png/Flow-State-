/**
 * Persona Router Component
 * Directs users to role-specific proof paths
 */

import Link from 'next/link';
import { PERSONA_CTAS } from '@/content/ctas';
import { DollarSign, Warehouse, Shield } from 'lucide-react';

const iconMap = {
  DollarSign: DollarSign,
  Warehouse: Warehouse,
  Shield: Shield,
};

export default function PersonaRouter() {
  const personas = [
    {
      role: 'Finance',
      config: PERSONA_CTAS.finance,
    },
    {
      role: 'Operations',
      config: PERSONA_CTAS.operations,
    },
    {
      role: 'Security/Compliance',
      config: PERSONA_CTAS.security,
    },
  ];
  
  return (
    <section className="py-16 bg-void border-b border-steel/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-neon font-mono text-sm tracking-widest mb-3 uppercase">Go Deeper</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Entry Point</h2>
          <p className="text-steel/70 mt-2">Different roles need different proof paths</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map(({ role, config }) => {
            const IconComponent = iconMap[config.icon as keyof typeof iconMap] || DollarSign;
            
            return (
              <Link
                key={role}
                href={config.href}
                className="group p-8 rounded-lg border-2 border-steel/30 hover:border-neon transition-all hover:shadow-lg hover:shadow-neon/20 bg-carbon/30"
              >
                <IconComponent size={40} className="text-neon mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{role}</h3>
                <p className="text-steel mb-4">{config.description}</p>
                <span className="text-neon font-semibold group-hover:underline">{config.label} →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
