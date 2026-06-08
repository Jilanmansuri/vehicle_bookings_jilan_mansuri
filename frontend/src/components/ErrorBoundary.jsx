import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <Paper className="max-w-md w-full p-8 text-center space-y-6 rounded-2xl shadow-xl dark:bg-gray-800">
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                <ErrorIcon className="text-red-500 text-5xl" />
              </div>
            </div>
            
            <div>
              <Typography variant="h4" className="font-bold text-gray-800 dark:text-white mb-2">
                Oops! Something went wrong.
              </Typography>
              <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
                The application encountered an unexpected error. Please try reloading the page.
              </Typography>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-40">
                <Typography variant="caption" className="text-red-500 font-mono">
                  {this.state.error.toString()}
                </Typography>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={this.handleReload}
                className="w-full rounded-xl py-3"
              >
                Reload Page
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={this.handleGoHome}
                className="w-full rounded-xl py-3 dark:text-gray-300 dark:border-gray-600"
              >
                Go to Dashboard
              </Button>
            </div>
          </Paper>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
