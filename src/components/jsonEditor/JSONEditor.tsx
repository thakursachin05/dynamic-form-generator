import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

interface JSONEditorProps {
  json: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      JSON.parse(json);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, [json]);

  const handleJsonChange = (value: string) => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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
      <div data-testid="json-editor">
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
      </div>
      {error && (
        <p className="error-message text-red-500 mt-2">
          Invalid JSON: {error}
        </p>
      )}
    </div>
  );
};

export default JSONEditor;
