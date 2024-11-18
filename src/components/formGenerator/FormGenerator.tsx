import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Schema, Field } from '../../shared/models/schema';

interface FormGeneratorProps {
  schema: Schema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { formTitle, formDescription, fields } = schema;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<Record<string, any> | null>(null);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Data:', data);
    setFormData(data);
    alert('Form submitted successfully!');
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'url':
      case 'tel':
      case 'date':
      case 'datetime-local':
      case 'time':
        return (
          <input
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id, { required: field.required })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            {...register(field.id, { required: field.required })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                  className="form-radio dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  {...register(field.id)}
                  className="form-checkbox dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id, { required: field.required })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        );

      case 'file':
        return (
          <input
            type="file"
            id={field.id}
            {...register(field.id, { required: field.required })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        );

      default:
        return <p className="text-red-500">Unsupported field type: {field.type}</p>;
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-submission.json';
    link.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-bold">{formTitle}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">{formDescription}</p>

      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block font-medium">{field.label}</label>
          {renderField(field)}
          {errors[field.id] && <span className="text-red-500">This field is required</span>}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {formData && (
        <button
          type="button"
          onClick={downloadJSON}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Submission
        </button>
      )}
    </form>
  );
};

export default FormGenerator;
