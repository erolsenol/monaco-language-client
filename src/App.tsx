import React, { useState } from 'react';
import { monaco } from 'react-monaco-editor';
import MonacoEditor from 'react-monaco-editor';

function App() {
  const [editorValue, setEditorValue] = useState('SELECT * FROM Album;');

  const editorWillMount = (monacoRef: typeof monaco) => {
    monacoRef.languages.register({ id: 'sql' });

    monacoRef.languages.setMonarchTokensProvider('sql', {
      tokenizer: {
        root: [
          [/\b(?:SELECT|FROM|WHERE)\b/, 'keyword'],
          [/\b(?:\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?\b/, 'number'],
          [/'([^'\\]|\\.)*$/, 'string.invalid'],
          [/'/, 'string', '@string'],
          [/"/, 'string', '@dblString'],
        ],
        string: [
          [/[^']+/, 'string'],
          [/''/, 'string'],
          [/'/, 'string', '@pop'],
        ],
        dblString: [
          [/[^"]+/, 'string'],
          [/""/, 'string'],
          [/"/, 'string', '@pop'],
        ],
      },
    });

    monacoRef.languages.setLanguageConfiguration('sql', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'dblString'] },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });

    monacoRef.languages.registerHoverProvider('sql', {
      provideHover(
        model: monaco.editor.ITextModel,
        position: monaco.Position,
        token: monaco.CancellationToken
      ) {
        return {
          contents: [{ value: 'This is a hover' }],
        };
      },
    });
  };

  const editorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  return (
    <div className="App">
      <div className="editor">
        <MonacoEditor
          language="sql"
          theme="vs-dark"
          value={editorValue}
          options={{
            selectOnLineNumbers: true,
          }}
          onChange={(value) => setEditorValue(value)}
          editorWillMount={editorWillMount}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
}

export default App;
