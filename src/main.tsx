import { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (e) => {
  console.error('WINDOW ERROR:', e.error);
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:16px;z-index:99999;font-family:sans-serif;white-space:pre-wrap;';
  errorDiv.innerText = `Error: ${e.message}\nStack: ${e.error?.stack || ''}`;
  document.body.appendChild(errorDiv);
});

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: '#ff4d4f', background: '#141414', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>🚨 Error en la aplicación:</h2>
          <pre style={{ background: '#262626', padding: 20, borderRadius: 8, overflow: 'auto' }}>
            {this.state.error.toString()}
            {'\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
