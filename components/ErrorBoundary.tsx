import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: '#1B1464', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Something went wrong.</h1>
                    <div style={{ maxWidth: '800px', width: '100%', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', overflow: 'auto' }}>
                        <p style={{ color: '#D4AF37', fontWeight: 'bold', marginBottom: '10px' }}>
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <pre style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '30px', padding: '12px 24px', background: '#D4AF37', color: '#1B1464', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(212,175,55,0.3)' }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
