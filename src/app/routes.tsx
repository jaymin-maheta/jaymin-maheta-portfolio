import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";

// Lazy-load case study & 404 so the home page ships a smaller initial chunk
const CaseStudyPage = lazy(() =>
  import("../features/case-studies/pages/CaseStudyPage").then((m) => ({
    default: m.CaseStudyPage,
  }))
);

const NotFoundPage = lazy(() =>
  import("../features/case-studies/pages/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
);

function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-brand-blue" />
    </div>
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/:slug", element: withSuspense(<CaseStudyPage />) },
    { path: "*", element: withSuspense(<NotFoundPage />) },
  ],
  { basename: import.meta.env.BASE_URL }
);
