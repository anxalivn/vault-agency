"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

// Reads a media query as live, external browser state (pointer type)
// via useSyncExternalStore instead of matchMedia + setState-in-effect,
// so it reacts to the value changing mid-session and never needs a
// mount-only effect just to read a boolean.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false
  );
}
