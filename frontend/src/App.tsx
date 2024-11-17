import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import { useAuth } from './contexts/AuthContext';

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <div className="app-background">
                <Routes>
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
                    />
                    <Route
                        path="/signup"
                        element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
                    />
                    <Route
                        path="/home"
                        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;