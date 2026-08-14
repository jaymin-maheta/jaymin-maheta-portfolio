import { Link, useRouteError } from "react-router-dom";
import { Layout } from "../shared/components/Layout";

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /failed to fetch dynamically imported module|dynamically imported module|importing a module script failed/i.test(
    message
  );
}

export function RouteError() {
  const error = useRouteError();
  const chunkError = isChunkLoadError(error);

  return (
    <Layout>
      <main
        id="main-content"
        className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 py-32 text-center"
      >
        <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-blue">
          {chunkError ? "Update Available" : "Something Went Wrong"}
        </p>
        <h1 className="font-display text-2xl font-semibold text-text-heading sm:text-3xl">
          {chunkError ? "This page was updated" : "Unexpected error"}
        </h1>
        <p className="max-w-md text-[15px] leading-relaxed text-text-muted">
          {chunkError
            ? "The site was updated since you loaded this page. Reload to get the latest version."
            : "Something didn't load correctly. Try reloading the page, or head back to the homepage."}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-full bg-brand-blue px-5 py-2.5 text-[13.5px] font-bold text-white shadow-lg transition hover:bg-brand-blue-dark"
          >
            Reload Page
          </button>
          <Link
            to="/"
            className="rounded-full border border-border-strong px-5 py-2.5 text-[13.5px] font-bold text-text-body transition hover:border-brand-blue hover:text-brand-blue"
          >
            Back to portfolio
          </Link>
        </div>
      </main>
    </Layout>
  );
}
