import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
    }
  
    render() {
      if (this.state.hasError) {
        return <h4>{this.props.errorMessage}</h4>;
      }
  
      return this.props.children; 
    }
  }