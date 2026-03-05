import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faSpinner, faEnvelope,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 'email' | 'done';

// ─── API helpers ──────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function requestResetCode(email: string) {
  const res = await fetch(`${API_BASE}/api/auth/reset-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (res.status === 404) return { success: true };
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to request password reset.');
  return data;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestResetCode(email);
      setStep('done');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors duration-300 tracking-wide font-light placeholder-gray-400';

  const btnClass =
    'w-full border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3';

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#050505] flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative">

      {/* Back to home logo */}
      <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
        <Link to="/" className="inline-block group">
          <span className="font-cinzel text-2xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase transition-opacity hover:opacity-70">AKI.</span>
        </Link>
      </div>

      {/* Return to login */}
      {step !== 'done' && (
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
          <Link to="/auth/login" className="flex items-center gap-2 text-xs font-light tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
            <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> Return to Login
          </Link>
        </div>
      )}

      {/* ─── Card ──────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Error Banner */}
        {error && (
          <div className="mb-6 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs font-light tracking-wide text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Step 1: Email ──────────────────────────────────────────────────── */}
        {step === 'email' && (
          <>
            <div className="mb-10 text-center">
              <div className="flex h-14 w-14 mx-auto mb-6 items-center justify-center border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
              </div>
              <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">Recovery</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed">
                Enter your email address and we'll send a temporary password if the account exists.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={inputClass}
              />
              <button type="submit" disabled={loading} className={btnClass}>
                {loading && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />}
                {loading ? 'Sending...' : 'Send Password'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-xs font-light text-gray-500 tracking-wide">
                Don't have a store?{' '}
                <Link to="/auth/signup" className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 font-medium ml-1 transition-colors">
                  Create a Store
                </Link>
              </p>
            </div>
          </>
        )}

        {/* ── Step 2: Done ──────────────────────────────────────────────────── */}
        {step === 'done' && (
          <div className="text-center animate-in fade-in zoom-in-[0.97] duration-500">
            <div className="flex h-20 w-20 mx-auto mb-8 items-center justify-center border border-gray-200 dark:border-white/10 text-green-500">
              <FontAwesomeIcon icon={faCheckCircle} className="h-8 w-8" />
            </div>
            <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-4">Email Sent!</h2>
            <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed mb-12 max-w-xs mx-auto">
              If an account is associated with this email, a new temporary password has been sent to your inbox. Use it to log in and then update your password in Settings.
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className={btnClass}
            >
              Return to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}