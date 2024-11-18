import React from 'react';

interface JSONEditorProps {
  json: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, onChange }) => {
  return (
    <textarea
      className="w-full h-96 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      value={json}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default JSONEditor;
