import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import FormGenerator from './FormGenerator';

const mockSchema = {
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

describe('FormGenerator', () => {
  it('renders form with correct title and description', () => {
    render(<FormGenerator schema={mockSchema} />);
    
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<FormGenerator schema={mockSchema} />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<FormGenerator schema={mockSchema} />);
    
    const submitButton = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const errorMessages = screen.getAllByText('This field is required');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('validates email format', async () => {
    render(<FormGenerator schema={mockSchema} />);
    
    const emailInput = screen.getByLabelText('Email');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);
    });

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Invalid email format');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });
});