import { Link } from "react-router-dom";
import { Layout } from "../../../shared/components/Layout";

export function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-32 text-center">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">404</p>
        <h1 className="text-2xl font-extrabold text-text-heading sm:text-3xl">Project not found</h1>
        <p className="max-w-md text-[15px] leading-relaxed text-text-muted">This case study doesn't exist or may have moved.</p>
        <Link to="/" className="mt-2 rounded-full bg-brand-blue px-5 py-2.5 text-[13.5px] font-bold text-white shadow-lg transition hover:bg-brand-blue-dark">
          Back to portfolio
        </Link>
      </div>
    </Layout>
  );
}
