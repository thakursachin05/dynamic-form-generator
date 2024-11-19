import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import FormGenerator from './FormGenerator';
import { mockSchema, mockSchema1, textSchema } from '../../shared/data/mock-schema.data';

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
  
  it('displays error when text input is below minLength', async () => {
    render(<FormGenerator schema={textSchema} />);
  
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.blur(input);
    })
  
    expect(await screen.findByText('Username must be between 5 and 10 characters')).toBeInTheDocument();
  });
  
  it('displays error when text input exceeds maxLength', async () => {
    render(<FormGenerator schema={textSchema} />);
  
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: 'abcdefghijklmnop' } });
      fireEvent.blur(input);
    });
  
    expect(await screen.findByText('Username must be between 5 and 10 characters')).toBeInTheDocument();
  });
  
  it('accepts text input within minLength and maxLength', async () => {
    render(<FormGenerator schema={textSchema} />);
  
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: 'myuser' } });
      fireEvent.blur(input);
    });
  
    expect(screen.queryByText('Username must be between 5 and 10 characters')).not.toBeInTheDocument();
  });


  it('displays error when number input is below min value', async () => {
    render(<FormGenerator schema={mockSchema1} />);
  
    const input = screen.getByLabelText('Age') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: '16' } });
      fireEvent.blur(input);
    });
  
    expect(await screen.findByText('Age must be between 18 and 65')).toBeInTheDocument();
  });
  
  it('displays error when number input is above max value', async () => {
    render(<FormGenerator schema={mockSchema1} />);
  
    const input = screen.getByLabelText('Age') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: '70' } });
      fireEvent.blur(input);
    });
  
    expect(await screen.findByText('Age must be between 18 and 65')).toBeInTheDocument();
  });
  
  it('accepts number within min and max range', async () => {
    render(<FormGenerator schema={mockSchema1} />);
  
    const input = screen.getByLabelText('Age') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: '30' } });
      fireEvent.blur(input);
    });
  
    expect(screen.queryByText('Age must be between 18 and 65')).not.toBeInTheDocument();
  });
  
});