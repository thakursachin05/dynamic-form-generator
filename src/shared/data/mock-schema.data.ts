import { Schema } from "../models/schema";

export const mockSchema: Schema = {
    formTitle: 'Test Form',
    formDescription: 'Test Description',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter name'
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        validation: {
          pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
          message: 'Invalid email format'
        }
      }
    ]
  };
  
export const textSchema: Schema = {
    formTitle: 'Test Form',
    formDescription: 'A form for testing minLength and maxLength',
    fields: [
      {
        id: 'username',
        type: 'text',
        label: 'Username',
        required: true,
        validation: {
          min: 5,
          max: 10,
          message: 'Username must be between 5 and 10 characters',
        },
      },
    ],
  };
  
export const mockSchema1: Schema = {
    formTitle: 'Test Form',
    formDescription: 'A form for testing min and max',
    fields: [
      {
        id: 'age',
        type: 'number',
        label: 'Age',
        required: true,
        validation: {
          min: 18,
          max: 65,
          message: 'Age must be between 18 and 65',
        },
      },
    ],
  };