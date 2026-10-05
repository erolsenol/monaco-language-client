import Editor from '@monaco-editor/react';

const initialQuery = 'SELECT * FROM Album;';

export default function App() {
  return (
    <main className="editor-page">
      <header>
        <p className="eyebrow">Monaco editor experiment</p>
        <h1>SQL scratchpad</h1>
        <p>Edit a query locally. This demo does not execute SQL or connect to a language server.</p>
      </header>
      <section className="editor-container" aria-label="SQL editor">
        <Editor
          height="70vh"
          defaultLanguage="sql"
          defaultValue={initialQuery}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, automaticLayout: true }}
        />
      </section>
    </main>
  );
}
