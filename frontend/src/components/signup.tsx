import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {api} from "../services/api.ts";
import {useAuth} from "../contexts/AuthContext.tsx";

const Signup = () => {
    const { setToken } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const { data, error } = await api.signup(formData.email, formData.password);
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
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-white/70">Sign up to get started</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-white">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg glass-input text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg glass-input text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            placeholder="Choose a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full glass-button text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-white">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="font-medium text-white/90 hover:text-white underline underline-offset-2"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;