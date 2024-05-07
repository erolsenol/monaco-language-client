import * as monaco from 'monaco-editor';
import { UserConfig } from 'monaco-editor-wrapper';
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';

// https://github.com/microsoft/vscode/tree/main/extensions/sql
// import '@codingame/monaco-vscode-sql-default-extension';

monaco.languages.register({
  id: 'sql',
  extensions: ['.sql'],
  aliases: ['SQL', 'sql'],
  mimetypes: ['application/sql'],
});

console.log(monaco.languages.getLanguages());

const userConfig: UserConfig = {
  wrapperConfig: {
    editorAppConfig: {
      $type: 'extended',
      languageId: 'sql',
      code: 'SELECT * FROM Album',
      useDiffEditor: false,
      codeUri: `query-1.sql`,
      // codeUri: `inmemory://query-1.sql`,
      userConfiguration: {
        json: JSON.stringify({
          'workbench.colorTheme': 'Default Dark Modern',
          'editor.lightbulb.enabled': 'On',
        }),
      },
    },
  },
  // languageClientConfig: {
  //   options: {
  //     $type: 'WebSocketUrl',
  //     url: 'ws://localhost:3030/server',
  //     startOptions: {
  //       onCall: () => {
  //         console.log('Connected to socket.');
  //       },
  //       reportStatus: true,
  //     },
  //     stopOptions: {
  //       onCall: () => {
  //         console.log('Disconnected from socket.');
  //       },
  //       reportStatus: true,
  //     },
  //   },
  // },
};

const comp = (
  <MonacoEditorReactComp userConfig={userConfig} style={{ height: '100%' }} />
);

function App() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useWorkerFactory({
    ignoreMapping: true,
    workerLoaders: {
      editorWorkerService: () =>
        new Worker(
          new URL(
            'monaco-editor/esm/vs/editor/editor.worker.js',
            import.meta.url
          ),
          { type: 'module' }
        ),
    },
  });

  useEffect(() => {
    ReactDOM.createRoot(containerRef.current!).render(comp);
  }, []);

  return (
    <div className="App">
      <div ref={containerRef} className="editor-container"></div>
    </div>
  );
}

export default App;
