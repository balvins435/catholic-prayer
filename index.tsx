
import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Use a relative path for the module import to ensure correct resolution.
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
