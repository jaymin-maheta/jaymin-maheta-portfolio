import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { ProjectSwitcher } from "../../../shared/components/ProjectSwitcher";
import { getAllCaseStudies, loadCaseStudyBySlug } from "../repository";
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
import type { CaseStudyData } from "../types";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<CaseStudyData | null | undefined>(undefined);
  // undefined = loading, null = not found, object = ready

  useEffect(() => {
    let cancelled = false;
    setData(undefined);

    if (!slug) {
      setData(null);
      return;
    }

    loadCaseStudyBySlug(slug).then((result) => {
      if (!cancelled) setData(result ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (data === undefined) {
    return (
      <Layout>
        <div
          className="flex min-h-[50vh] items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label="Loading case study"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-brand-blue" />
        </div>
      </Layout>
    );
  }

  if (data === null) {
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
      <div className="relative z-10 content-auto px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14 md:px-12 md:pb-20 md:pt-16 lg:px-16">
        <FlowDiagram title={data.flowTitle} subtitle={data.flowSubtitle} steps={data.flow} />
        <AboutAndChallenge about={data.about} challenge={data.challenge} />
        <ContributionCard
          role={data.meta.role}
          items={data.contribution}
          placeholder={data.contributionPlaceholder}
        />
        <OutcomesSection outcomes={data.outcomes} />
        <ApproachSteps intro={data.approachIntro} steps={data.approach} />
        <TechStackGrid items={data.techStack} />
        <SnapshotFooter snapshot={data.snapshot} />
      </div>
    </Layout>
  );
}
