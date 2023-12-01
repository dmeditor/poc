import React from 'react';

export class ErrorBoundary extends React.Component<any> {
  state: { hasError: boolean; error: Error | null } = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error?.message}</p>
        </div>
      );
    }

    return children;
  }
}
