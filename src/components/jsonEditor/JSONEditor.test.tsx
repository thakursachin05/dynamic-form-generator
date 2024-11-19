import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JSONEditor from './JSONEditor';

jest.mock('ace-builds/src-noconflict/mode-json', () => {});
jest.mock('ace-builds/src-noconflict/theme-monokai', () => {});

interface MockAceEditorProps {
  value: string;
  onChange: (value: string) => void;
}

jest.mock('react-ace', () => {
  const React = require('react');
  return ({ value, onChange }: MockAceEditorProps) => (
    <textarea
      data-testid="ace-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

describe('JSONEditor Component', () => {
  const initialJson = '{"key": "value"}';

  test('renders without crashing', () => {
    render(<JSONEditor json={initialJson} onChange={() => {}} />);
    const editor = screen.getByTestId('ace-editor');
    expect(editor).toBeInTheDocument();
  });

  test('displays the initial JSON value', () => {
    render(<JSONEditor json={initialJson} onChange={() => {}} />);
    const editor = screen.getByTestId('ace-editor') as HTMLTextAreaElement;
    expect(editor.value).toBe(initialJson);
  });

  test('calls onChange with new value when valid JSON is entered', () => {
    const handleChange = jest.fn();
    render(<JSONEditor json={initialJson} onChange={handleChange} />);
    const editor = screen.getByTestId('ace-editor') as HTMLTextAreaElement;

    const newJson = '{"newKey": "newValue"}';
    fireEvent.change(editor, { target: { value: newJson } });

    expect(handleChange).toHaveBeenCalledWith(newJson);
    expect(screen.queryByText(/Invalid JSON/)).not.toBeInTheDocument();
  });

  test('displays error message when invalid JSON is entered', () => {
    const handleChange = jest.fn();
    render(<JSONEditor json={initialJson} onChange={handleChange} />);
    const editor = screen.getByTestId('ace-editor') as HTMLTextAreaElement;

    const invalidJson = '{"key": "value"';
    fireEvent.change(editor, { target: { value: invalidJson } });

    expect(handleChange).toHaveBeenCalledWith(invalidJson);
    expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
  });
});
