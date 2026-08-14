import type { BlogPost } from "../types";

export const designThenBuild: BlogPost = {
  meta: {
    slug: "design-then-build",
    title: "What Changes When You Design the Component, Then Build It Yourself",
    excerpt:
      "Six years ago I was purely a UI/UX designer handing files to developers. Here's what I learned once I started shipping the code myself.",
    tag: "Design Systems",
    readTime: "5 min",
    publishedLabel: "Field notes",
  },
  intro:
    "I started at 9Brainz designing web and mobile interfaces in Figma and Adobe XD, then handing the file to whoever was implementing it next. Watching my own designs get reinterpreted — sometimes broken — by that handoff is what pushed me toward learning Angular and React seriously. Once I was doing both ends myself, on projects like Compito and Artem, the actual gap between design and engineering turned out to be different from what I expected as a designer.",
  sections: [
    {
      heading: "The gap isn't visual fidelity — it's state",
      paragraphs: [
        "As a designer, I thought the hard part of handoff was getting spacing and color exactly right. It's not. Figma shows you one state at a time — the happy path, fully loaded, perfectly populated. The actual hard part of implementation is every state the design file never shows: empty, loading, partial data, permission-denied, validation error, 200-character overflow in a field that was designed for 20.",
        "Once I was building the components myself, I started designing every screen with at least four states in the same file — empty, loading, error, and populated — because I'd been on the receiving end of a design that only specified one.",
      ],
    },
    {
      heading: "Design systems only work if the engineer owns half of them",
      paragraphs: [
        "A Figma component library and a code component library drift apart the moment they're maintained by different people with different incentives — the designer wants visual flexibility, the engineer wants a stable, typed API surface. On every project where I owned both sides, the components stayed in sync because there was no handoff gap for drift to live in.",
        "Concretely: on Compito's design system, a button component's Figma variants map one-to-one to the Angular component's @Input() props. If a variant doesn't exist as a real prop, it doesn't exist in the Figma library either. That constraint sounds limiting from a pure design standpoint, but it's what keeps a design system from becoming aspirational documentation nobody trusts.",
      ],
    },
    {
      heading: "Accessibility is a design decision before it's a code decision",
      paragraphs: [
        "Keyboard navigation order, focus states, color contrast — these get treated as an engineering checklist applied after the fact, but by the time code exists, half the decisions that determine accessibility are already locked in by the layout. A focus order that doesn't match visual order is usually a layout decision made in the design file, not a bug introduced in implementation.",
        "On Artem, an enterprise healthcare platform, I reviewed both the UI/UX design work of five designers and the frontend code of five developers — and the accessibility issues that were expensive to fix were almost always ones baked into the design (insufficient contrast on a status badge, a modal with no clear focus trap) rather than ones introduced during coding.",
      ],
      bullets: [
        "Specify focus order directly in the design file, not just visual hierarchy",
        "Design real error and validation states, not a placeholder red border",
        "Treat color contrast as a design constraint checked before handoff, not a code-review comment after",
      ],
    },
    {
      heading: "What I'd tell a designer who wants to make this jump",
      paragraphs: [
        "Learning to code didn't make me a better visual designer. It made me a more honest one — I stopped designing things I didn't understand the implementation cost of, and started designing systems instead of screens, because I was the one who'd have to maintain the inconsistency if I didn't.",
      ],
    },
  ],
  takeaway:
    "The real value of owning design and engineering together isn't speed — it's that every shortcut, inconsistency, or unhandled state has to be defended to yourself, not negotiated across a handoff, which is a much higher bar.",
};
