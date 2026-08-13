import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-bg-canvas px-0 py-0 font-display text-text-body antialiased transition-colors duration-300 sm:px-4 sm:py-10">
      <div className="relative w-full max-w-[1440px] overflow-hidden bg-bg-surface shadow-2xl shadow-slate-900/10 ring-1 ring-border-light transition-colors duration-300 dark:shadow-black/50 sm:rounded-3xl">
        {children}
      </div>
    </div>
  );
}
