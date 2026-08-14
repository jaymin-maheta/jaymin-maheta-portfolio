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
  /** One-line outcome shown on card hover — the headline result, not a feature list */
  impact: string;
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

export interface DesignProcessStep {
  /** Stage name, e.g. "Design in Figma" — shared across all case studies */
  stage: string;
  /** What that stage means in general, one sentence */
  description: string;
  /** How that stage played out specifically on this project */
  projectDetail: string;
}

export interface MockupPanel {
  title: string;
  description: string;
  /** Section labels rendered as an illustrative sidebar/nav in the mockup */
  navItems: string[];
  /** Column headers for the illustrative data table/list */
  columns: string[];
  /** Number of placeholder rows to render (visual rhythm only) */
  rowCount: number;
  /** Small stat labels shown above the table, e.g. "128 Active Clients" */
  stats: { label: string; value: string }[];
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
  designProcess: DesignProcessStep[];
  mockup: MockupPanel;
  snapshot: SnapshotContent;
}
