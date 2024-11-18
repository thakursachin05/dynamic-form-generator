import React, { useState } from 'react';
import JSONEditor from './components/jsonEditor/JSONEditor';
import FormGenerator from './components/formGenerator/FormGenerator';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const initialSchema = {
  formTitle: "Sample Form",
  formDescription: "Edit the JSON to see changes",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your name",
    },
  ],
};

const App: React.FC = () => {
  const [json, setJson] = useState(JSON.stringify(initialSchema, null, 2));
  const [formSchema, setFormSchema] = useState(initialSchema);

  const handleJsonChange = (updatedJson: string) => {
    setJson(updatedJson);
    try {
      const parsedSchema = JSON.parse(updatedJson);
      setFormSchema(parsedSchema);
    } catch {
      console.error("Invalid JSON");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800">
          <h2 className="text-lg font-bold mb-4">JSON Editor</h2>
          <JSONEditor json={json} onChange={handleJsonChange} />
        </div>
        <div className="p-4 bg-white rounded shadow dark:bg-gray-800">
          <h2 className="text-lg font-bold mb-4">Form Preview</h2>
          <ErrorBoundary>
            <FormGenerator schema={formSchema} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default App;
