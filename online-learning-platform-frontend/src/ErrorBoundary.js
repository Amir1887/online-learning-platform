import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an external error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.state.error.toString()}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      );
    }

    // If no error, render children as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
