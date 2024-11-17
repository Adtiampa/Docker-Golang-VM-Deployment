import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = await api.login(formData.email, formData.password);

            if (error) {
                setError(error);
                return;
            }

            if (data?.token) {
                setToken(data.token);
                navigate('/home');
            }
        } catch (err) {
            setError('Failed to connect to server');

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass rounded-2xl p-8 w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-secondary dark:text-white/70">
                        Please sign in to continue
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-white">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg glass-input text-primary dark:text-white placeholder-secondary dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-white/50"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg glass-input text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full glass-button text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-white">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="font-medium text-white/90 hover:text-white underline underline-offset-2"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;