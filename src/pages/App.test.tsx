import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../pages/App';

describe('Dynamic Form Generator App', () => {
  it('renders main title', () => {
    render(<App />);
    expect(screen.getByText('Dynamic Form Generator')).toBeInTheDocument();
  });

  it('toggles dark mode', () => {
    render(<App />);
    const darkModeButton = screen.getByText(/Toggle (Light|Dark) Mode/);
    
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    
    fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
    
    fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });

  it('renders JSON editor and form preview', () => {
    render(<App />);
    
    expect(screen.getByText('JSON Editor')).toBeInTheDocument();
    expect(screen.getByText('Form Preview')).toBeInTheDocument();
  });

  it('copies form JSON to clipboard', () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };

    const mockAlert = jest.fn();

    Object.defineProperty(global.navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });

    global.alert = mockAlert;

    render(<App />);
    
    const copyButton = screen.getByText('Copy Form JSON');
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledTimes(1);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('"formTitle"')
    );

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('Form JSON copied to clipboard!');
  });
});
