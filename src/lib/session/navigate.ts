/**
 * Crossing the sign-in boundary (signing in or out, joining a team) is a full page load, not a
 * client navigation. The client router caches pages and prefetches it made on the other side of
 * the boundary, such as "/" redirecting to sign-in while signed out, and would replay them.
 */
const FLASH_KEY = "pr_flash";

export function crossSessionBoundary(path: string, flash?: string) {
  if (flash) {
    try {
      sessionStorage.setItem(FLASH_KEY, flash);
    } catch {
      // Private mode or storage blocked: the message is a nicety.
    }
  }
  window.location.assign(path);
}

/** The message left by crossSessionBoundary, once. */
export function takeFlash(): string | null {
  try {
    const message = sessionStorage.getItem(FLASH_KEY);
    sessionStorage.removeItem(FLASH_KEY);
    return message;
  } catch {
    return null;
  }
}
