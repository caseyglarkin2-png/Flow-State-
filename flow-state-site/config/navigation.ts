/**
 * Navigation Configuration
 * 
 * Single source of truth for site navigation structure.
 * Used by Header, Footer, mobile menu, and sitemap.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Product',
    href: '/product',
    children: [
      { label: 'Product Overview', href: '/product', description: 'Platform capabilities' },
      { label: 'Security', href: '/security', description: 'Enterprise security features' },
      { label: 'Integrations', href: '/integrations', description: 'Integration partners' },
      { label: 'Implementation', href: '/implementation', description: 'Deployment process' },
      { label: 'Network Effect', href: '/network-effect', description: 'Network compounding' },
      { label: 'Scale', href: '/scale', description: 'Scaling capabilities' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Solutions Overview', href: '/solutions', description: 'All solutions' },
      { label: 'Dry Van', href: '/solutions/dry-van', description: 'Dry van operations' },
      { label: 'Reefer', href: '/solutions/reefer', description: 'Temperature-controlled' },
      { label: 'Flatbed', href: '/solutions/flatbed', description: 'Flatbed operations' },
      { label: 'Intermodal', href: '/solutions/intermodal', description: 'Port & rail' },
      { label: 'Tanker', href: '/solutions/tanker', description: 'Bulk & hazmat' },
    ],
  },
  {
    label: 'Proof',
    href: '/proof',
    description: 'Customer evidence and case studies',
  },
  {
    label: 'ROI',
    href: '/roi',
    description: 'Calculate your savings',
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Guides', href: '/resources/guides', description: 'Implementation guides' },
      { label: 'Field Notes', href: '/resources/field-notes', description: 'Operational insights' },
      { label: 'Simulations', href: '/singularity', description: 'Interactive models' },
      { label: 'Evidence Vault', href: '/resources/procurement', description: 'Procurement resources' },
      { label: 'Economics Methodology', href: '/docs/economics-methodology', description: 'Formula documentation' },
    ],
  },
] as const;

export const FOOTER_SECTIONS = {
  product: {
    title: 'Product',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'ROI Calculator', href: '/roi' },
      { label: 'YardBuilder', href: '/yardbuilder' },
      { label: 'Demo', href: '/demo' },
    ],
  },
  solutions: {
    title: 'Solutions',
    links: [
      { label: 'Solutions Overview', href: '/solutions' },
      { label: 'Dry Van', href: '/solutions/dry-van' },
      { label: 'Reefer', href: '/solutions/reefer' },
      { label: 'Flatbed', href: '/solutions/flatbed' },
      { label: 'Proof', href: '/proof' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Guides', href: '/resources/guides' },
      { label: 'Field Notes', href: '/resources/field-notes' },
      { label: 'Simulations', href: '/singularity' },
      { label: 'Economics Methodology', href: '/docs/economics-methodology' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Co-Development', href: '/co-development' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Press', href: '/press' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Status', href: '/status' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
} as const;

/**
 * Get flat list of all routes for sitemap generation
 */
export function getAllRoutes(): string[] {
  const routes: string[] = [];
  
  function addRoutes(items: readonly NavItem[]) {
    for (const item of items) {
      routes.push(item.href);
      if (item.children) {
        addRoutes(item.children);
      }
    }
  }
  
  addRoutes(NAV_ITEMS);
  
  // Add footer-only routes
  Object.values(FOOTER_SECTIONS).forEach(section => {
    section.links.forEach(link => {
      if (!routes.includes(link.href)) {
        routes.push(link.href);
      }
    });
  });
  
  return [...new Set(routes)];
}
