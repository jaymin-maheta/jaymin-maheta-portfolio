import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { getAllCaseStudies } from "../../case-studies/repository";
import { HomeHero } from "../components/HomeHero";
import { RecognitionStrip } from "../components/RecognitionStrip";
import { ProjectGrid } from "../components/ProjectGrid";

export function HomePage() {
  const projects = getAllCaseStudies();

  return (
    <Layout>
      <Navbar shortName="JM" eyebrow="Portfolio" title="Jaymin Maheta" />
      <HomeHero />
      <div className="relative z-10 px-6 py-14 sm:px-10 md:px-16 md:py-16 lg:px-20">
        <RecognitionStrip />
        <ProjectGrid projects={projects} />
      </div>
      <Footer />
    </Layout>
  );
}
