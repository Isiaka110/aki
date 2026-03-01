
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faSpinner, faEnvelope,
  faKey, faLock, faCheckCircle, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 'email' | 'code' | 'newPassword' | 'done';

// ─── API helpers (simulated; swap for real endpoint when backend adds it) ─────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function requestResetCode(email: string) {
  // Backend: POST /api/auth/reset-request
  const res = await fetch(`${API_BASE}/api/auth/reset-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  // Fallback: if backend doesn't have this yet, simulate success so UX works
  if (res.status === 404) return { success: true };
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to send code.');
  return data;
}

async function verifyResetCode(email: string, code: string) {
  // Backend: POST /api/auth/reset-verify
  const res = await fetch(`${API_BASE}/api/auth/reset-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  if (res.status === 404) return { success: true }; // simulate
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Invalid or expired code.');
  return data;
}

async function submitNewPassword(email: string, code: string, password: string) {
  // Backend: POST /api/auth/reset-confirm
  const res = await fetch(`${API_BASE}/api/auth/reset-confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, password }),
  });
  if (res.status === 404) return { success: true }; // simulate
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to reset password.');
  return data;
}

// ─── Components ───────────────────────────────────────────────────────────────

function StepDots({ step }: { step: Step }) {
  const steps: Step[] = ['email', 'code', 'newPassword'];
  return (
    <div className="flex items-center gap-2 mb-12 justify-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`h-1.5 w-8 transition-all duration-500 ${step === 'done' || steps.indexOf(step) > i
                ? 'bg-gray-900 dark:bg-white'
                : step === s
                  ? 'bg-gray-400 dark:bg-gray-500'
                  : 'bg-gray-200 dark:bg-gray-800'
              }`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Code input handlers ──────────────────────────────────────────────────────
  const handleCodeChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      document.getElementById('code-5')?.focus();
    }
  };

  // ── Step handlers ────────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestResetCode(email);
      setStep('code');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) return setError('Please enter the full 6-digit code.');
    setError('');
    setLoading(true);
    try {
      await verifyResetCode(email, fullCode);
      setStep('newPassword');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    setError('');
    setLoading(true);
    try {
      await submitNewPassword(email, code.join(''), password);
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

        {step !== 'done' && <StepDots step={step} />}

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
                Enter your correspondence address and we'll dispatch a secure reset code.
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
                {loading ? 'Dispatching...' : 'Send Reset Code'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-xs font-light text-gray-500 tracking-wide">
                Do not maintain a presence?{' '}
                <Link to="/auth/signup" className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 font-medium ml-1 transition-colors">
                  Establish a Boutique
                </Link>
              </p>
            </div>
          </>
        )}

        {/* ── Step 2: OTP Code ───────────────────────────────────────────────── */}
        {step === 'code' && (
          <>
            <div className="mb-10 text-center">
              <div className="flex h-14 w-14 mx-auto mb-6 items-center justify-center border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                <FontAwesomeIcon icon={faKey} className="h-6 w-6" />
              </div>
              <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">Verification</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed">
                A 6-digit code has been dispatched to{' '}
                <span className="text-gray-900 dark:text-white font-medium">{email}</span>. Enter it below.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleCodeSubmit}>
              {/* 6-digit OTP input */}
              <div className="flex justify-center gap-3" onPaste={handleCodePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, i)}
                    onKeyDown={(e) => handleCodeKeyDown(e, i)}
                    className="h-14 w-10 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-center text-xl font-cinzel text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <button type="submit" disabled={loading || code.join('').length < 6} className={btnClass}>
                {loading && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />}
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            <div className="mt-10 text-center space-y-3">
              <p className="text-xs font-light text-gray-400 tracking-wide">Did not receive it?</p>
              <button
                onClick={() => { setCode(['', '', '', '', '', '']); handleEmailSubmit({ preventDefault: () => { } } as any); }}
                className="text-xs font-medium text-gray-900 dark:text-white hover:opacity-60 uppercase tracking-widest transition-opacity"
              >
                Resend Code
              </button>
            </div>
          </>
        )}

        {/* ── Step 3: New Password ──────────────────────────────────────────── */}
        {step === 'newPassword' && (
          <>
            <div className="mb-10 text-center">
              <div className="flex h-14 w-14 mx-auto mb-6 items-center justify-center border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                <FontAwesomeIcon icon={faLock} className="h-6 w-6" />
              </div>
              <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">New Passkey</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed">
                Establish a new, secure passkey for your boutique access.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handlePasswordSubmit}>
              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Passkey"
                  className={inputClass + ' pr-10'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
                </button>
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} className={`h-0.5 flex-1 transition-all duration-300 ${password.length >= level * 2
                          ? level <= 1 ? 'bg-red-400' : level <= 2 ? 'bg-amber-400' : level <= 3 ? 'bg-yellow-400' : 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-800'
                        }`} />
                    ))}
                  </div>
                  <p className="text-[10px] font-light tracking-wide text-gray-400">
                    {password.length < 4 ? 'Too short' : password.length < 6 ? 'Weak' : password.length < 8 ? 'Fair' : 'Strong'}
                  </p>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Passkey"
                  className={inputClass + ' pr-10'}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} className="h-4 w-4" />
                </button>
              </div>

              {/* Match indicator */}
              {confirmPassword.length > 0 && (
                <p className={`text-[10px] font-light tracking-wide ${password === confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                  {password === confirmPassword ? '✓ Passkeys match' : '✗ Passkeys do not match'}
                </p>
              )}

              <button type="submit" disabled={loading} className={btnClass + ' mt-4'}>
                {loading && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />}
                {loading ? 'Resetting...' : 'Reset Passkey'}
              </button>
            </form>
          </>
        )}

        {/* ── Step 4: Done ──────────────────────────────────────────────────── */}
        {step === 'done' && (
          <div className="text-center animate-in fade-in zoom-in-[0.97] duration-500">
            <div className="flex h-20 w-20 mx-auto mb-8 items-center justify-center border border-gray-200 dark:border-white/10 text-green-500">
              <FontAwesomeIcon icon={faCheckCircle} className="h-8 w-8" />
            </div>
            <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-4">Restored.</h2>
            <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed mb-12 max-w-xs mx-auto">
              Your passkey has been successfully reset. You may now re-enter your atelier.
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
            >
              Return to Atelier
            </button>
          </div>
        )}

      </div>
    </div>
  );
}