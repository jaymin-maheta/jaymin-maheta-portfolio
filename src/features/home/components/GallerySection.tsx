import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Reveal } from "../../../shared/components/Reveal";
import { RevealGroup, RevealItem } from "../../../shared/components/RevealGroup";
import { SplitText } from "../../../shared/components/SplitText";

type GalleryCategory = "Award" | "Mentoring" | "Event";

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  aspect: "portrait" | "square" | "landscape";
}

const GALLERY: GalleryPhoto[] = [
  {
    src: "https://picsum.photos/seed/award-stage/900/1200",
    alt: "Receiving the Spotlight Award on stage",
    caption: "Spotlight Award — Dec 2024",
    category: "Award",
    aspect: "portrait",
  },
  {
    src: "https://picsum.photos/seed/mentoring-session/900/700",
    alt: "Mentoring junior developers at a whiteboard session",
    caption: "Mentoring session with junior engineers",
    category: "Mentoring",
    aspect: "landscape",
  },
  {
    src: "https://picsum.photos/seed/team-celebration/900/900",
    alt: "Team celebration after a production launch",
    caption: "Team celebration — production launch",
    category: "Event",
    aspect: "square",
  },
  {
    src: "https://picsum.photos/seed/conference-talk/900/1300",
    alt: "Speaking at a design systems meetup",
    caption: "Speaking at a design systems meetup",
    category: "Event",
    aspect: "portrait",
  },
  {
    src: "https://picsum.photos/seed/award-handshake/900/650",
    alt: "Award handshake with leadership",
    caption: "Client Appreciation Award handshake",
    category: "Award",
    aspect: "landscape",
  },
  {
    src: "https://picsum.photos/seed/students-workshop/900/1100",
    alt: "Leading a frontend workshop for students",
    caption: "Frontend workshop for design students",
    category: "Mentoring",
    aspect: "portrait",
  },
  {
    src: "https://picsum.photos/seed/notable-guest/900/900",
    alt: "With a notable guest at an industry event",
    caption: "With a notable guest — industry event",
    category: "Event",
    aspect: "square",
  },
  {
    src: "https://picsum.photos/seed/tech-titans/900/750",
    alt: "Tech Titans recognition ceremony",
    caption: "Tech Titans Recognition ceremony",
    category: "Award",
    aspect: "landscape",
  },
];

const ASPECT_CLASS: Record<GalleryPhoto["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

const CATEGORY_ACCENT: Record<GalleryCategory, string> = {
  Award: "text-amber-200 border-amber-300/40 bg-amber-500/20",
  Mentoring: "text-sky-200 border-sky-300/40 bg-sky-500/20",
  Event: "text-violet-200 border-violet-300/40 bg-violet-500/20",
};

export function GallerySection() {
  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
        Gallery
      </p>
      <SplitText
        as="h2"
        id="gallery-heading"
        className="mb-3 block text-balance font-display text-2xl font-semibold tracking-tight text-text-heading sm:text-3xl"
      >
        Moments behind the work.
      </SplitText>
      <Reveal>
        <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
          Awards, mentoring sessions, and the people I've built alongside — a look beyond the
          screenshots.
        </p>
      </Reveal>

      <RevealGroup className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:gap-5">
        {GALLERY.map((photo, i) => (
          <RevealItem key={photo.src} className="mb-3 break-inside-avoid sm:mb-4 xl:mb-5">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`theme-transition group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border-light bg-bg-surface-alt focus-visible:outline-offset-2 sm:rounded-2xl ${ASPECT_CLASS[photo.aspect]}`}
              aria-label={`Open photo: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/0 opacity-100 transition-opacity duration-300 sm:from-black/70 sm:via-black/0 sm:opacity-0 sm:group-hover:opacity-100" />
              <span
                className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-widest ${CATEGORY_ACCENT[photo.category]}`}
              >
                {photo.category}
              </span>
              <span className="absolute inset-x-2 bottom-2 text-[11px] font-medium leading-snug text-white opacity-100 transition duration-300 sm:inset-x-3 sm:bottom-3 sm:translate-y-1 sm:text-[12.5px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                {photo.caption}
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={GALLERY.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
          title: photo.caption,
          description: photo.category,
        }))}
        plugins={[Captions]}
        styles={{ container: { backgroundColor: "rgba(10, 11, 14, 0.95)" } }}
      />
    </section>
  );
}
