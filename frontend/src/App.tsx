import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/themeToggle';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <ThemeProvider>
            <div className="app-background">
                <ThemeToggle />
                <Router>
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <Login setIsAuthenticated={setIsAuthenticated} />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Signup setIsAuthenticated={setIsAuthenticated} />
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                isAuthenticated ? (
                                    <Home setIsAuthenticated={setIsAuthenticated} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/login" />}
                        />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;