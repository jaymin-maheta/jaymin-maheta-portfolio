import { useParams } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { ProjectSwitcher } from "../../../shared/components/ProjectSwitcher";
import { getAllCaseStudies, getCaseStudyBySlug } from "../repository";
import { MetaBadges } from "../components/MetaBadges";
import { CaseStudyHero } from "../components/CaseStudyHero";
import { MetricsGrid } from "../components/MetricsGrid";
import { FlowDiagram } from "../components/FlowDiagram";
import { AboutAndChallenge } from "../components/InfoCard";
import { ContributionCard } from "../components/ContributionCard";
import { OutcomesSection } from "../components/OutcomesSection";
import { ApproachSteps } from "../components/ApproachSteps";
import { TechStackGrid } from "../components/TechStackGrid";
import { SnapshotFooter } from "../components/SnapshotFooter";
import { NotFoundPage } from "./NotFoundPage";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!data) {
    return <NotFoundPage />;
  }

  const allProjects = getAllCaseStudies();

  return (
    <Layout>
      <Navbar
        shortName={data.meta.shortName}
        eyebrow="Project Case Study"
        title={data.meta.title}
        homeLink={{ href: "/", label: "Portfolio · Jaymin Maheta →" }}
        switcher={<ProjectSwitcher projects={allProjects} activeSlug={data.meta.slug} />}
      />
      <MetaBadges meta={data.meta} />
      <CaseStudyHero hero={data.hero} />
      <MetricsGrid metrics={data.metrics} />
      <div className="relative z-10 px-6 pb-16 pt-16 sm:px-10 md:px-16 md:pb-20 md:pt-20 lg:px-20">
        <FlowDiagram title={data.flowTitle} subtitle={data.flowSubtitle} steps={data.flow} />
        <AboutAndChallenge about={data.about} challenge={data.challenge} />
        <ContributionCard role={data.meta.role} items={data.contribution} placeholder={data.contributionPlaceholder} />
        <OutcomesSection outcomes={data.outcomes} />
        <ApproachSteps intro={data.approachIntro} steps={data.approach} />
        <TechStackGrid items={data.techStack} />
        <SnapshotFooter snapshot={data.snapshot} />
      </div>
    </Layout>
  );
}
