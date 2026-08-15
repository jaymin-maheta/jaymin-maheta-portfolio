import { Layout } from "../../../shared/components/Layout";
import { Navbar } from "../../../shared/components/Navbar";
import { Footer } from "../../../shared/components/Footer";
import { SectionDivider } from "../../../shared/components/SectionDivider";
import { useSeoMeta } from "../../../shared/hooks/useSeoMeta";
import { getAllCaseStudies } from "../../case-studies/repository";
import { HomeHero } from "../components/HomeHero";
import { RecognitionStrip } from "../components/RecognitionStrip";
import { GallerySection } from "../components/GallerySection";
import { AboutSection } from "../components/AboutSection";
import { SkillsMatrix } from "../components/SkillsMatrix";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { ProjectGrid } from "../components/ProjectGrid";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  const projects = getAllCaseStudies();

  useSeoMeta({
    title: "Jaymin Maheta — Senior UI Engineer, Angular & React",
    description:
      "Senior UI Engineer (7+ yrs) turning Figma designs into production Angular & React apps — design systems, accessibility, enterprise UI. Open to remote roles.",
    keywords:
      "jaymin maheta, senior ui engineer, angular react ui engineer, remote frontend engineer angular, ui/ux to frontend engineer, design systems engineer, figma to code developer",
    path: "/",
    ogType: "profile",
  });

  return (
    <Layout>
      <Navbar
        title="Jaymin Maheta"
        sections={[
          { href: "#gallery", label: "Gallery" },
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
          <div className="mb-12 md:mb-16">
            <GallerySection />
          </div>
          <AboutSection />
          <SectionDivider index={1} label="Skills" />
          <SkillsMatrix />
          <SectionDivider index={2} label="Experience" />
          <ExperienceTimeline />
          <SectionDivider index={3} label="Work" />
          <ProjectGrid projects={projects} />
          <SectionDivider index={4} label="Feedback" />
          <TestimonialsSection />
          <SectionDivider index={5} label="Contact" />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </Layout>
  );
}
