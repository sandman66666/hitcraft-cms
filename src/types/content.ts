export interface Button {
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  button: Button;
  secondaryButton?: Button;
  secondaryText?: string;
}

export interface MainValueContent {
  title: string;
  subtitle: string;
  description: string;
  questionsTitle: string;
  questions: string[];
  button: Button;
}

export interface CoreBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface CoreBenefitsContent {
  title: string;
  subtitle: string;
  benefits: CoreBenefit[];
}

export interface WritingPartnerContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  button: Button;
}

export interface ProduceSongContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  button: Button;
}

export interface UniqueApproachContent {
  title: string;
  subtitle: string;
  features: Feature[];
  button: Button;
}

export interface SocialProofTestimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface SocialProofContent {
  title: string;
  subtitle: string;
  testimonials: SocialProofTestimonial[];
}

export interface CallToActionContent {
  title: string;
  subtitle: string;
  button: Button;
  features: string[];
}

export interface LandingPageContent {
  hero: HeroContent;
  mainValue: MainValueContent;
  coreBenefits: CoreBenefitsContent;
  writingPartner: WritingPartnerContent;
  produceSong: ProduceSongContent;
  uniqueApproach: UniqueApproachContent;
  socialProof: SocialProofContent;
  callToAction: CallToActionContent;
}