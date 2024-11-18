import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught in ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500">Something went wrong!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
