export function normalizeUrl(url) {
    if (!url) return "";
    const t = url.trim();
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) return t;
    return "https://" + t;
  }
  
  export function isValidUrl(url) {
    try {
      new URL(normalizeUrl(url));
      return true;
    } catch {
      return false;
    }
  }
  
  export function sortByNewest(items) {
    return [...items].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  