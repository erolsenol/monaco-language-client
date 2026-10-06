import Editor from '@monaco-editor/react';
import './local-monaco';

interface Props {
  readonly value: string;
  readonly onChange: (value: string | undefined) => void;
}
const options = { minimap: { enabled: false }, automaticLayout: true } as const;

export default function SqlEditor({ value, onChange }: Props) {
  return <Editor height="70vh" defaultLanguage="sql" value={value} onChange={onChange} theme="vs-dark" options={options} loading={<p role="status">Loading SQL editor…</p>} />;
}
