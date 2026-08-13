import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import { CaseStudyPage } from "../features/case-studies/pages/CaseStudyPage";
import { NotFoundPage } from "../features/case-studies/pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/:slug", element: <CaseStudyPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
