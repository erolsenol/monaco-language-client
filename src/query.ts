export const initialQuery = 'SELECT * FROM Album;';
export const queryStorageKey = 'erolsenol.sql-scratchpad.v1';

export function readQuery(): string {
  try { return localStorage.getItem(queryStorageKey) ?? initialQuery; }
  catch { return initialQuery; }
}

export function saveQuery(query: string): boolean {
  try { localStorage.setItem(queryStorageKey, query); return true; }
  catch { return false; }
}
