// ErrorBoundary.jsx
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // can also log the error to an error reporting service
        this.setState({ error, errorInfo });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    }
    
    render() {
        if (this.state.hasError) {
          return (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Something went wrong!</Text>
              <Text style={styles.errorMessage}>
                {this.state.error?.message || 'An unexpected error occurred'}
              </Text>
              <Button 
                title="Try Again"
                onPress={this.resetError}
              />
            </View>
          );
        }
    
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorMessage: {
      textAlign: 'center',
      marginBottom: 20,
      color: '#666',
    },
});

export default ErrorBoundary;