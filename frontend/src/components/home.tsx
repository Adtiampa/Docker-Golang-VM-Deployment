import { useNavigate } from 'react-router-dom';
import { AuthProps } from '../types/auth';

const Home: React.FC<AuthProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        try {
            await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass rounded-2xl p-12 w-full max-w-md text-center shadow-xl">
                <h1 className="text-4xl font-bold text-white mb-8">Hello World!</h1>
                <div className="space-y-4">
                    <p className="text-white/80 mb-8">
                        Welcome to your dashboard. You're successfully logged in!
                    </p>
                    <button
                        onClick={handleLogout}
                        className="glass-button text-white py-3 px-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-red-500/20"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;