import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="glass rounded-2xl p-12 w-full max-w-md text-center shadow-xl">
                <h1 className="text-4xl font-bold text-primary dark:text-white mb-8">
                    Hello World!
                </h1>
                <div className="space-y-4">
                    <p className="text-secondary dark:text-white/80 mb-8">
                        Welcome to your dashboard. You're successfully logged in!
                    </p>
                    <button
                        onClick={handleLogout}
                        className="w-full glass-button text-primary dark:text-white py-3 px-8 rounded-lg font-medium hover:bg-red-500/20"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;