import type { BlogPost } from "../types";

export const scssArchitectureThatSurvivesTeams: BlogPost = {
  meta: {
    slug: "scss-architecture-that-survives-teams",
    title: "A 7-1 SCSS Architecture That Survives Multiple Teams and Multiple Years",
    excerpt:
      "Folders were never the architecture. Scope, ownership, dependency direction and blast radius are — here's the model I've rebuilt on three enterprise apps now.",
    tag: "Architecture",
    readTime: "9 min",
    publishedLabel: "Field notes",
  },
  intro:
    "A team adopts a clean folder structure — base styles here, components there, themes over there. Eighteen months later, the same team has global overrides nobody remembers authorizing, three near-identical card components, a specificity fight that only resolves with !important, and a shared stylesheet everyone's afraid to touch. The folders are still exactly where they were on day one. I've rebuilt this from scratch on three different enterprise products now — Compito, BMC and Artem — and every time it confirms the same thing: the folders didn't fail, because they were never the thing doing the work. The thing doing the work is scope, ownership, dependency direction, cascade, specificity, and the blast radius of change.",
  sections: [
    {
      heading: "The problem CSS architecture is actually solving",
      paragraphs: [
        "CSS becomes an engineering problem once a codebase crosses certain thresholds: many developers touching the same styles, multiple teams owning different parts of one app, a design system expected to evolve rather than sit still, third-party libraries bringing their own CSS assumptions. Underneath all of it is one condition — developers who genuinely can't predict which pages a given change will touch.",
        "CSS fails silently in a way most application code doesn't. A change can compile cleanly, pass every test, and still visually break a page nobody thought to check, three teams away, discovered by a support ticket instead of a build failure. A good architecture has to manufacture the predictability CSS doesn't give you for free — a developer should be able to answer 'if I change this, what else could break?' with something better than a shrug.",
      ],
    },
    {
      heading: "The 7-1 pattern as vocabulary, not architecture",
      paragraphs: [
        "The classic pattern groups styles into folders — abstracts, vendors, base, layout, components, pages, themes, one entry point — and it was reaching for something real: separation of responsibility, a distinction between global and local styles, one controlled place where everything composes together.",
        "The problem was never the folder names. It was assuming that sorting files into the right category was the architecture — that once a style lived in a folder named 'components', the underlying risks of leakage, override chains and unclear ownership had been handled. They hadn't. A folder can't enforce a dependency rule. It can't stop one team's component style from silently depending on another team's layout. The taxonomy was real; the governance was assumed, and assumed governance doesn't survive five years and twenty developers.",
      ],
      bullets: [
        "abstracts/ — design tokens as variables and mixins, never raw output",
        "vendors/ — every third-party override, one file per library, documented with why",
        "themes/ — light/dark token maps, nothing else",
        "No file outside abstracts/ and vendors/ references a third-party component's internal class names",
      ],
    },
    {
      heading: "Dependency direction is the part that actually matters",
      paragraphs: [
        "Tokens flow into base, base into layout, layout into components, components into features — one direction only. Tokens should never depend on components; layout should never depend on a business-specific component; feature styles should never become a dependency for an unrelated feature.",
        "This exists to make blast radius predictable. If a lower layer can depend on a higher one — a token quietly shaped by one component's needs, a base style unofficially tuned for one feature — there's no way to reason locally about what a change touches. In principle, everything could affect everything. A strictly one-directional graph means a change to a component can only ever affect that component and whatever explicitly, visibly depends on it.",
      ],
    },
    {
      heading: "Eliminating ::ng-deep is a policy, not a refactor",
      paragraphs: [
        "You can't grep-and-replace your way out of ::ng-deep usage, because each instance exists to solve a real visual problem someone had. The actual fix is re-solving each one using the library's supported theming API — design tokens, CSS custom properties, view encapsulation scoped correctly — and it takes as long as it takes.",
        "What made it stick, across every codebase I've done this on, was pairing the removal with a lint rule or PR checklist that flags new ::ng-deep usage before merge. Without that guardrail, the discipline erodes again within a quarter — which is really the same lesson as cascade layers: precedence should be designed, not discovered accidentally while debugging why an override didn't take effect.",
      ],
    },
    {
      heading: "Specificity as a budget, not a weapon",
      paragraphs: [
        "Every escalation in specificity spends part of a budget the next developer inherits. A shallow selector like .card__title beats a five-level descendant chain not just on style grounds — the deep chain encodes assumptions about DOM depth that have nothing to do with styling intent, and it sets a floor every future override now has to clear.",
        "If !important shows up frequently across a codebase, that's not a specificity problem. It's a symptom that the architecture's dependency direction or cascade design already broke down somewhere upstream, and !important is just where the pressure is escaping.",
      ],
    },
    {
      heading: "Light and dark mode without duplicating every rule",
      paragraphs: [
        "The pattern I keep coming back to: components only ever reference semantic tokens — text-heading, bg-surface, border-focus — never raw color values, and the themes layer is the only place those tokens get remapped per mode. Themes should change values, not rewrite component architecture.",
        "That's the difference between a five-minute dark-mode toggle and a multi-day retrofit. It has to be designed in from the first component, not bolted on after fifty screens already hardcode hex values.",
      ],
    },
    {
      heading: "Global scope should be earned, not assumed",
      paragraphs: [
        "The default should always be the smallest reasonable scope. Every rule added at global scope is a rule every future developer has to hold in their head as a possible cause of any visual bug, anywhere in the app — that's a real, ongoing cost, and it should be paid deliberately, not by default because global was the path of least resistance in the moment.",
        "The same discipline applies to abstractions generally: don't create a shared component or token because a style might get reused someday. Promote it when a second real consumer shows up and someone is willing to own what that consumer now depends on. Duplication is a known, bounded cost; a bad shared abstraction is an unbounded one.",
      ],
    },
  ],
  takeaway:
    "A 7-1 architecture is only as good as the rules enforced around it — the folder structure alone doesn't stop a shortcut under deadline pressure. Dependency direction, a specificity budget, a documented vendor boundary and a guardrail against new ::ng-deep usage are what actually make it survive contact with a real team over real years.",
};
