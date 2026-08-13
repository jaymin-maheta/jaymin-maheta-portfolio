import { createBrowserRouter } from "react-router-dom";
import { CaseStudyPage } from "../features/case-studies/pages/CaseStudyPage";
import { NotFoundPage } from "../features/case-studies/pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/:slug", element: <CaseStudyPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
