export interface SectionConfig {
  id: string;
  component: string;
  enabled: boolean;
  order: number;
}

export const landingSections: SectionConfig[] = [
  {
    id: 'hero',
    component: 'HeroSection',
    enabled: true,
    order: 1
  },
  {
    id: 'mainValue',
    component: 'MainValueSection',
    enabled: true,
    order: 2
  },
  {
    id: 'coreBenefits',
    component: 'CoreBenefitsSection',
    enabled: true,
    order: 3
  },
  {
    id: 'writingPartner',
    component: 'WritingPartnerSection',
    enabled: true,
    order: 4
  },
  {
    id: 'produceSong',
    component: 'ProduceSongSection',
    enabled: true,
    order: 5
  },
  {
    id: 'writersBlock',
    component: 'WritersBlockSection',
    enabled: true,
    order: 6
  },
  {
    id: 'musicMentor',
    component: 'MusicMentorSection',
    enabled: true,
    order: 7
  },
  {
    id: 'perfectProcess',
    component: 'PerfectProcessSection',
    enabled: true,
    order: 8
  },
  {
    id: 'testimonials',
    component: 'TestimonialsSection',
    enabled: true,
    order: 9
  },
  {
    id: 'demo',
    component: 'DemoSection',
    enabled: true,
    order: 10
  },
  {
    id: 'uniqueApproach',
    component: 'UniqueApproachSection',
    enabled: true,
    order: 11
  },
  {
    id: 'socialProof',
    component: 'SocialProofSection',
    enabled: true,
    order: 12
  }
];

export function getEnabledSections(): SectionConfig[] {
  return landingSections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);
}

export function getSectionById(id: string): SectionConfig | undefined {
  return landingSections.find(section => section.id === id);
}
