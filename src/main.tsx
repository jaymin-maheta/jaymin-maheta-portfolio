import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css";
import "./features/case-studies/tailwind-safelist";

// A stale/deployed build can leave an old chunk hash in the browser's cache.
// Reload once (not in a loop) to pick up the fresh asset manifest instead of
// showing the router's error screen for what's really just an outdated cache.
const PRELOAD_RELOAD_KEY = "vite-preload-reloaded";
window.addEventListener("vite:preloadError", () => {
  if (sessionStorage.getItem(PRELOAD_RELOAD_KEY)) return;
  sessionStorage.setItem(PRELOAD_RELOAD_KEY, "1");
  window.location.reload();
});
window.addEventListener("load", () => {
  sessionStorage.removeItem(PRELOAD_RELOAD_KEY);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
