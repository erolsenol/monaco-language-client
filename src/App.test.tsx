import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initialQuery, queryStorageKey } from './query';
vi.mock('./SqlEditor', () => ({ default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => <textarea aria-label="SQL query" value={value} onChange={(event) => onChange(event.target.value)} /> }));
import App from './App';
beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('SQL scratchpad persistence', () => {
  it('saves edits across remounts, including an intentionally empty query', async () => {
    render(<App />); await screen.findByLabelText('SQL query');
    fireEvent.change(screen.getByLabelText('SQL query'), { target: { value: 'SELECT 1;' } });
    expect(localStorage.getItem(queryStorageKey)).toBe('SELECT 1;');
    cleanup(); render(<App />); await screen.findByLabelText('SQL query');
    expect((screen.getByLabelText('SQL query') as HTMLTextAreaElement).value).toBe('SELECT 1;');
    fireEvent.change(screen.getByLabelText('SQL query'), { target: { value: '' } });
    cleanup(); render(<App />); await screen.findByLabelText('SQL query');
    expect((screen.getByLabelText('SQL query') as HTMLTextAreaElement).value).toBe('');
  });
  it('resets both the editor and stored query', async () => {
    localStorage.setItem(queryStorageKey, 'SELECT 2;'); render(<App />); await screen.findByLabelText('SQL query');
    fireEvent.click(screen.getByRole('button', { name: 'Reset query' }));
    expect(localStorage.getItem(queryStorageKey)).toBe(initialQuery);
  });
  it('continues editing with an accessible warning when storage fails', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    render(<App />); await screen.findByLabelText('SQL query');
    expect((screen.getByLabelText('SQL query') as HTMLTextAreaElement).value).toBe(initialQuery);
    const save = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota'); });
    fireEvent.change(screen.getByLabelText('SQL query'), { target: { value: 'SELECT 3;' } });
    expect(screen.getByRole('alert')).toBeTruthy();
    expect((screen.getByLabelText('SQL query') as HTMLTextAreaElement).value).toBe('SELECT 3;');
    save.mockRestore(); fireEvent.click(screen.getByRole('button', { name: 'Reset query' }));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
