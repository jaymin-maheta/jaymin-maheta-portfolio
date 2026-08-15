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
    src: `${import.meta.env.BASE_URL}assets/gallery/spotlight-award-certificate-dec2024.jpg`,
    alt: "Spotlight Award certificate presented by Augmented",
    caption: "Spotlight Award — Dec 2024",
    category: "Award",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/classroom-workshop-session.jpg`,
    alt: "Leading a classroom workshop session for students",
    caption: "Classroom workshop session",
    category: "Mentoring",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/team-appreciation-event.jpg`,
    alt: "Team appreciation event on stage with awards",
    caption: "Team appreciation event",
    category: "Event",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/uiux-seminar-podium.jpg`,
    alt: "Speaking at a UI/UX seminar podium",
    caption: "UI/UX seminar for BCA & MCA students",
    category: "Event",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/spotlight-award-handshake.jpg`,
    alt: "Spotlight Award handshake with leadership",
    caption: "Spotlight Award handshake",
    category: "Award",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/college-lecture-session.jpg`,
    alt: "Leading a college lecture session",
    caption: "Guest lecture session",
    category: "Mentoring",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/seminar-guest-felicitation.jpg`,
    alt: "Felicitating a guest of honor at a student seminar",
    caption: "Guest felicitation — student seminar",
    category: "Event",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/tech-expo-gujarat.jpg`,
    alt: "At Tech Expo Gujarat with a distinguished guest",
    caption: "Tech Expo Gujarat",
    category: "Event",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/certificate-of-appreciation-handoff.jpg`,
    alt: "Receiving a Certificate of Appreciation",
    caption: "Certificate of Appreciation",
    category: "Award",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/seminar-audience-wideshot.jpg`,
    alt: "Wide shot of a packed student seminar audience",
    caption: "Student seminar — full house",
    category: "Event",
    aspect: "portrait",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/uiux-presentation-prezi.jpg`,
    alt: "Presenting a UI/UX introduction slide deck",
    caption: "UI/UX for BCA & MCA students — presentation",
    category: "Mentoring",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/panel-discussion-seated.jpg`,
    alt: "Seated on a panel discussion table",
    caption: "Panel discussion",
    category: "Event",
    aspect: "landscape",
  },
  {
    src: `${import.meta.env.BASE_URL}assets/gallery/spotlight-award-certificate-apr2024.jpg`,
    alt: "Spotlight Award certificate — April 2024",
    caption: "Spotlight Award — Apr 2024",
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
