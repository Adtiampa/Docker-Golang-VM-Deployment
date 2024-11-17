import React from 'react';
import ReactDOM from 'react-dom/client';
import { env } from './config/env';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';

if (env.isDev) {
    console.log('Environment:', env);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
);

