import { lazy, Suspense, useState } from 'react';
import { initialQuery, readQuery, saveQuery } from './query';


const SqlEditor = lazy(() => import('./SqlEditor'));

export default function App() {
  const [query, setQuery] = useState(readQuery);
  const [saveFailed, setSaveFailed] = useState(false);
  function updateQuery(value: string | undefined) {
    const next = value ?? '';
    setQuery(next);
    setSaveFailed(!saveQuery(next));
  }
  return (
    <main className="editor-page">
      <header>
        <p className="eyebrow">Monaco editor experiment</p>
        <h1>SQL scratchpad</h1>
        <p>Edit a query locally. This demo does not execute SQL or connect to a language server.</p>
      </header>
      <button type="button" onClick={() => updateQuery(initialQuery)}>Reset query</button>
      {saveFailed && <p role="alert">Your query is available in this tab, but could not be saved for reload.</p>}
      <section className="editor-container" aria-label="SQL editor">
        <Suspense fallback={<p role="status">Loading SQL editor…</p>}>
          <SqlEditor value={query} onChange={updateQuery} />
        </Suspense>
      </section>
    </main>
  );
}
