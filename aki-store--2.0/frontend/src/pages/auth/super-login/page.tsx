
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShieldAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { apiLogin } from '../../../services/api';
import { useAuthStore } from '../../../store/useAuthStore';

export default function SuperAdminLogin() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setAuth } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await apiLogin(email, password, 'super-admin');
            setAuth(data.user, data.token);
            const next = searchParams.get('next') || '/super-admin';
            navigate(next, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fcfcfc] dark:bg-[#050505] p-4 pt-20">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="mb-12 text-center">
                    <Link to="/" className="inline-block group mb-8">
                        <span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">
                            AKI.
                        </span>
                    </Link>
                    <div>
                        <p className="text-xs text-red-700 dark:text-red-400 font-bold tracking-[0.2em] uppercase flex justify-center items-center gap-2">
                            <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4" /> System Core / Authentication
                        </p>
                    </div>
                </div>

                <div className="border border-gray-200 bg-transparent p-8 sm:p-12 dark:border-white/10 shadow-sm relative overflow-hidden">
                    <h1 className="font-cinzel text-2xl font-medium tracking-wide text-gray-900 dark:text-white mb-2 relative z-10">Director Access</h1>
                    <p className="text-sm font-light text-gray-500 mb-8 relative z-10">Enter root credentials to manage platform integrity.</p>

                    {error && (
                        <div className="mb-6 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs font-light tracking-wide text-red-700 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Root Email Address"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Secure Passphrase"
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-3 border border-red-900 bg-red-900 px-10 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-red-900 dark:border-red-900 dark:bg-red-900 dark:text-white dark:hover:bg-transparent dark:hover:text-red-500 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Authenticate
                                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
