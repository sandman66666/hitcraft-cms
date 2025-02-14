export interface Button {
  text: string;
}

export interface TitlePart {
  text: string;
  style?: 'bold' | 'normal';
}

export interface SubtitleContent {
  text: string;
  style?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  button: Button;
  secondaryButton?: Button;
}

export interface MainValueContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface CoreBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface CoreBenefitsContent {
  title: string;
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface WritingPartnerContent {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  additionalDescription?: string;
  button: Button;
}

export interface ProduceSongContent {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  additionalDescription?: string;
  button: Button;
}

export interface WritersBlockContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  button: Button;
}

export interface MusicMentorContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  button: Button;
}

export interface CarouselItem {
  category: string;
  title: string;
  description: string;
}

export interface PerfectProcessContent {
  title: string;
  carouselItems: CarouselItem[];
  button: Button;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  testimonials: Testimonial[];
}

export interface DemoContent {
  title: string;
  subtitle: string;
  demoUrl: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface UniqueApproachContent {
  title: string;
  features: Feature[];
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

export interface Section {
  title: string;
  features: string[];
}

export interface LandingPageContent {
  hero: HeroContent;
  mainValue: MainValueContent;
  coreBenefits: CoreBenefitsContent;
  writingPartner: WritingPartnerContent;
  produceSong: ProduceSongContent;
  writersBlock: WritersBlockContent;
  musicMentor: MusicMentorContent;
  perfectProcess: PerfectProcessContent;
  testimonials: TestimonialsContent;
  uniqueApproach: UniqueApproachContent;
  socialProof: SocialProofContent;
  callToAction: CallToActionContent;
  demo: DemoContent;
}
