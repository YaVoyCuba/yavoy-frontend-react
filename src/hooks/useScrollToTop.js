import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Centralized scroll-to-top hook.
 *
 * Why this exists
 * ---------------
 * Mobile browsers (and desktop Chrome/Firefox/Safari) restore the previous
 * scroll position when the user presses the hardware/browser Back button.
 * That restoration runs AFTER React mounts the route component and AFTER its
 * `useEffect` callbacks, so any per-page `window.scrollTo(0, 0)` is silently
 * overridden by the browser — the user lands at the footer instead of below
 * the sticky header.
 *
 * Setting `history.scrollRestoration = 'manual'` disables the browser's
 * automatic restoration and lets us take control. We then trigger an instant
 * `scrollTo(0, 0)` on every pathname change.
 *
 * "Instant" (not "smooth") is intentional: when the user presses Back they
 * expect the previous page to *be* there, not to animate into place.
 *
 * Usage
 * -----
 * Call this hook ONCE, inside the layout component (e.g. TemplateLanding)
 * that wraps every route via <Outlet />. Do NOT call it inside individual
 * page components — those should rely on this centralized behavior.
 *
 * Special cases
 * -------------
 * - Pages that need to scroll to a specific element on mount (e.g. scroll to
 *   a catalog section after a category change) should do so via their own
 *   useEffect that depends on the relevant state, but MUST skip the first
 *   render so they don't fight with this centralized scroll-to-top on back
 *   navigation. See Restaurants.jsx for an example.
 *
 * - State-driven scrolls (e.g. scrolling to a success message after a form
 *   submit) are independent of route changes and are NOT affected by this
 *   hook. Keep those useEffects in the page component.
 *
 * - URL hash navigation (#section) is handled natively: if a hash is present
 *   we attempt to scroll the matching element into view.
 */
export function useScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const isFirstRender = useRef(true);

  // Disable browser scroll restoration once for the lifetime of the layout.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        // Restore on unmount (mostly for HMR / StrictMode double-invoke).
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  useEffect(() => {
    // 1. Hash navigation → let the browser scroll the target into view.
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    // 2. Otherwise scroll the window to the top instantly.
    //    The sticky header (position: sticky) naturally sits at the top of
    //    the document, so scrolling to 0 places the content right below it.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    isFirstRender.current = false;
  }, [pathname, search, hash]);
}

export default useScrollToTop;
