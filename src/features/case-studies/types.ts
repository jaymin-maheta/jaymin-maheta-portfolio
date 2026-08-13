import type { IconName } from "../../shared/components/Icon";

export interface CaseStudyMeta {
  slug: string;
  shortName: string;
  navLabel: string;
  title: string;
  accentFrom: string;
  accentTo: string;
  industry: string;
  stack: string;
  role: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface MetricCard {
  icon: IconName;
  gradientFrom: string;
  gradientTo: string;
  value: string;
  description: string;
}

export interface FlowStep {
  icon: IconName;
  iconGradientFrom: string;
  iconGradientTo: string;
  title: string;
  subtitle: string;
  connectorLabel?: string;
  connectorColor?: "blue" | "emerald";
  highlighted?: boolean;
}

export interface InfoPanel {
  icon: IconName;
  title: string;
  paragraphs: string[];
}

export interface ChallengePanel {
  icon: IconName;
  title: string;
  emphasisParagraph: string;
  paragraphs: string[];
}

export interface ContributionItem {
  text: string;
}

export interface OutcomesContent {
  challenges: string[];
  outcomesIntro: string;
  outcomes: string[];
  summary: string;
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface TechStackCard {
  badge: string;
  category: string;
  name: string;
  description: string;
  accent: "sky" | "orange" | "emerald" | "violet";
}

export interface SnapshotContent {
  fields: { label: string; value: string }[];
  capabilities: string[];
}

export interface CaseStudyData {
  meta: CaseStudyMeta;
  hero: HeroContent;
  metrics: MetricCard[];
  flowTitle: string;
  flowSubtitle: string;
  flow: FlowStep[];
  about: InfoPanel;
  challenge: ChallengePanel;
  contributionPlaceholder?: string;
  contribution: ContributionItem[];
  outcomes: OutcomesContent;
  approachIntro: string;
  approach: ApproachStep[];
  techStack: TechStackCard[];
  snapshot: SnapshotContent;
}
