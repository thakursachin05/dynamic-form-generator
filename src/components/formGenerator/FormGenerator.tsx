import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { Schema } from '../types/schema';
import { Schema } from '../../shared/models/schema';


interface FormGeneratorProps {
  schema: Schema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { formTitle, formDescription, fields } = schema;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-bold">{formTitle}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">{formDescription}</p>

      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          ) : field.type === 'select' ? (
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
          ) : null}
          {errors[field.id] && <span className="text-red-500">This field is required</span>}
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
