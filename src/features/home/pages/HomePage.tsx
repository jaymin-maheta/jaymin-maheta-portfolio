import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { SectionDivider } from "../../../shared/components/SectionDivider";
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
        eyebrow="Portfolio"
        title="Jaymin Maheta"
        sections={[
          { href: "#about", label: "About" },
          { href: "#skills", label: "Skills" },
          { href: "#experience", label: "Experience" },
          { href: "#projects", label: "Work" },
          { href: "#writing", label: "Writing" },
          { href: "#contact", label: "Contact" },
        ]}
      />
      <main id="main-content">
        <HomeHero />
        <div className="relative z-10 mx-auto max-w-7xl content-auto px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16">
          <RecognitionStrip />
          <AboutSection />
          <SectionDivider index={1} label="Skills" />
          <SkillsMatrix />
          <SectionDivider index={2} label="Experience" />
          <ExperienceTimeline />
          <SectionDivider index={3} label="Work" />
          <ProjectGrid projects={projects} />
          <SectionDivider index={4} label="Feedback" />
          <TestimonialsSection />
          <SectionDivider index={5} label="Writing" />
          <BlogSection />
          <SectionDivider index={6} label="Contact" />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
