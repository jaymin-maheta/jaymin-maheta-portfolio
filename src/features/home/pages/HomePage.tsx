import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { getAllCaseStudies } from "../../case-studies/repository";
import { HomeHero } from "../components/HomeHero";
import { RecognitionStrip } from "../components/RecognitionStrip";
import { AboutSection } from "../components/AboutSection";
import { SkillsMatrix } from "../components/SkillsMatrix";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { ProjectGrid } from "../components/ProjectGrid";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { BlogSection } from "../components/BlogSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  const projects = getAllCaseStudies();

  return (
    <Layout>
      <Navbar
        shortName="JM"
        eyebrow="Portfolio"
        title="Jaymin Maheta"
        sections={[
          { href: "#about", label: "About" },
          { href: "#skills", label: "Skills" },
          { href: "#experience", label: "Experience" },
          { href: "#projects", label: "Work" },
          { href: "#contact", label: "Contact" },
        ]}
      />
      <main id="main-content">
        <HomeHero />
        <div className="relative z-10 mx-auto max-w-7xl content-auto px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16">
          <RecognitionStrip />
          <div className="mb-16 md:mb-24">
            <AboutSection />
          </div>
          <div className="mb-16 md:mb-24">
            <SkillsMatrix />
          </div>
          <div className="mb-16 md:mb-24">
            <ExperienceTimeline />
          </div>
          <div className="mb-16 md:mb-24">
            <ProjectGrid projects={projects} />
          </div>
          <div className="mb-16 md:mb-24">
            <TestimonialsSection />
          </div>
          <div className="mb-16 md:mb-24">
            <BlogSection />
          </div>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
