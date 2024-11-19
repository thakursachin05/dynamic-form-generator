import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Schema, Field } from '../../shared/models/schema';

interface FormGeneratorProps {
  schema: Schema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { formTitle, formDescription, fields } = schema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [formData, setFormData] = useState<Record<string, any> | null>(null);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Data:', data);
    setFormData(data);
    alert('Form submitted successfully!');
  };

  const renderField = (field: Field) => {
    const validationRules: any = {
      required: field.required ? 'This field is required' : false,
    };
  
    if (field.validation) {
      const { pattern, message, min, max, minLength, maxLength } = field.validation;
  
      if (pattern) {
        validationRules.pattern = {
          value: new RegExp(pattern),
          message: field.validation.message || 'Invalid input format',
        };
      }
  
      if (min !== undefined) {
        if (['number', 'date', 'datetime-local', 'time'].includes(field.type)) {
          validationRules.min = {
            value: min,
            message: field.validation.message || `Value must be at least ${min}`,
          };
        } else {
          validationRules.minLength = {
            value: min,
            message: field.validation.message || `Minimum length is ${min} characters`,
          };
        }
      }
  
      if (max !== undefined) {
        if (['number', 'date', 'datetime-local', 'time'].includes(field.type)) {
          validationRules.max = {
            value: max,
            message: field.validation.message || `Value must be at most ${max}`,
          };
        } else {
          validationRules.maxLength = {
            value: max,
            message: field.validation.message || `Maximum length is ${max} characters`,
          };
        }
      }
    }
    return (
      <div className="relative">
        {['text', 'email', 'password', 'number', 'url', 'tel', 'date', 'datetime-local', 'time'].includes(field.type) && (
          <input
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id, validationRules)}
            onBlur={() => trigger(field.id)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}

        {field.type === 'select' && (
          <select
            id={field.id}
            {...register(field.id, validationRules)}
            onBlur={() => trigger(field.id)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {field.type === 'radio' && (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center mx-2 space-x-2 dark:text-white">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  {...register(field.id, validationRules)}
                  onBlur={() => trigger(field.id)}
                  className="form-radio dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === 'checkbox' && (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center mx-2 space-x-2 dark:text-white">
                <input
                  type="checkbox"
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  {...register(field.id)}
                  onBlur={() => trigger(field.id)}
                  className="form-checkbox dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === 'textarea' && (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id, validationRules)}
            onBlur={() => trigger(field.id)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}

        {field.type === 'file' && (
          <input
            type="file"
            id={field.id}
            {...register(field.id, validationRules)}
            onBlur={() => trigger(field.id)}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}

        {errors[field.id] && (
          <span className="text-red-500 mt-1 block">
            {errors[field.id]?.message as string}
          </span>
        )}
      </div>
    );
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
     <h1 className="text-xl font-bold dark:text-white" data-testid="form-title">
      {formTitle}
     </h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">{formDescription}</p>

      {fields?.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block font-medium dark:text-white">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      {fields?.length > 0 && (
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      )}

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
