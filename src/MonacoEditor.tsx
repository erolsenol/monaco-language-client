import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef } from 'react';

export type EditorProps = {
  value: string;
  onChange: (
    value: string,
    event: monaco.editor.IModelContentChangedEvent
  ) => void;
  editorDidMount: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => void;
};

export default function MonacoEditor({
  value,
  onChange,
  editorDidMount,
}: EditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initMonaco = () => {
    if (containerRef.current) {
      // const model = monaco.editor.createModel(
      //   value,
      //   'sql',
      //   monaco.Uri.parse(`inmemory://model-1.sql`)
      // );

      editorRef.current = monaco.editor.create(containerRef.current, {
        // model,
        theme: 'vs-dark',
        glyphMargin: true,
        automaticLayout: true,
        useShadowDOM: true,
      });

      // After initializing monaco editor
      editorDidMount(editorRef.current, monaco);
    }
  };

  useEffect(() => {
    initMonaco();
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%' }}
      className="editor-container"
    />
  );
}
