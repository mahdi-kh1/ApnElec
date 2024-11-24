// utils/helpers.ts
export const prefix = (prefix: string, s: string | null | undefined) => {
    if (s == null) return undefined; // Convert null to undefined
    return s.startsWith(prefix) ? s : prefix + s;
  };
  
  export const suffix = (suffix: string, s: string | null | undefined) => {
    if (s == null) return undefined; // Convert null to undefined
    return s.endsWith(suffix) ? s : s + suffix;
  };
  
  // Add any other helper functions here
  