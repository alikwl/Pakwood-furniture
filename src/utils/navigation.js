/**
 * Programmatic client-side navigation helper for clean URLs without full page reloads
 */
export function navigate(path) {
  if (!path) return;
  let cleanPath = path;
  if (cleanPath.startsWith('#/')) {
    cleanPath = cleanPath.slice(1);
  }
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  window.history.pushState(null, '', cleanPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
