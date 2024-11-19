import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

interface JSONEditorProps {
  json: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    try {
      JSON.parse(value); 
      setError(null); 
    } catch (e: any) {
      setError(e.message);
    }
    onChange(value);
  };

  return (
    <div>
      <AceEditor
        mode="json"
        theme="monokai"
        value={json}
        onChange={handleJsonChange}
        name="json-editor"
        fontSize={14}
        width="100%"
        height="500px"
        className="border dark:border-gray-600"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          tabSize: 2,
          showPrintMargin: false,
        }}
      />
      {error && <p className="text-red-500 mt-2">Invalid JSON: {error}</p>}
    </div>
  );
};

export default JSONEditor;
