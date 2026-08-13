import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-transition flex min-h-screen justify-center bg-bg-canvas px-0 py-0 font-display text-text-body antialiased sm:px-4 sm:py-8 md:py-10">
      <div className="theme-transition relative w-full max-w-[1280px] overflow-hidden bg-bg-surface shadow-[var(--shadow-2xl)] ring-1 ring-border-light sm:rounded-2xl md:rounded-3xl">
        {children}
      </div>
    </div>
  );
}
