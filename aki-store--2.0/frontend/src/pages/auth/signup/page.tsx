
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner, faShieldAlt, faBolt, faGlobe, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { apiRegister } from '../../../services/api';
import { useAuthStore } from '../../../store/useAuthStore';
import logo from '../../../assets/logo.png';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', storeName: '' });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    document.title = "Apply | AKI Ecommerce Platform";

    // Detect fresh session for coach marks (one-time welcome)
    const isReturning = localStorage.getItem('aki_returning_vendor');
    if (!isReturning) {
      setShowTooltip('onboarding');
      localStorage.setItem('aki_returning_vendor', 'true');
    }
  }, []);

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^A-Za-z0-9]/.test(pass);
    return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
  };

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      return setError('Security threshold not met. Use 8+ characters with mixed cases, numbers, and symbols.');
    }

    setError('');
    setLoading(true);
    try {
      // Formatted for Nigerian Convention (Surname First tracking)
      const submission = {
        ...form,
        lastName: form.lastName.toUpperCase(),
        firstName: form.firstName.charAt(0).toUpperCase() + form.firstName.slice(1).toLowerCase()
      };
      const { user, token } = await apiRegister(submission);
      setAuth(user, token);
      navigate('/store-admin');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Check your ecommerce name availability.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#050505]">

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80')] bg-cover bg-left grayscale opacity-60"></div>
        </div>
        <div className="absolute inset-0 z-10 bg-black/50"></div>

        <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="AKI Platform"
                className="h-8 w-auto transition-opacity hover:opacity-70 invert"
              />
            </Link>
          </div>
          <div className="max-w-xl">
            <h1 className="font-cinzel text-6xl text-white tracking-wide mb-10 leading-[1.1]">Establish<br />Your <span className="text-gray-400">Legacy.</span></h1>
            <div className="space-y-8 pl-2">
              {[
                { icon: faBolt, title: 'Immediate Prestige', desc: 'Launch your ecommerce instantly with pre-configured, architecturally designed templates.' },
                { icon: faShieldAlt, title: 'Absolute Discretion', desc: 'Your identity and data secured via National Identification or Driver\'s License verification.' },
                { icon: faGlobe, title: 'Global Operations', desc: 'Transact locally while scaling your presence across international markets.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <FontAwesomeIcon icon={item.icon} className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-cinzel text-white uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed tracking-wide max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-500 text-[10px] font-medium tracking-[0.2em] uppercase">Part of the AKI Group</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:px-24 bg-[#fcfcfc] dark:bg-[#050505] relative">
        <div className="w-full max-w-sm mx-auto">

          <div className="mb-16 block lg:hidden text-center">
            <Link to="/"><span className="font-cinzel text-3xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase">AKI.</span></Link>
          </div>

          <div className="mb-12">
            <h2 className="font-cinzel text-4xl text-gray-900 dark:text-white tracking-wide mb-3">Application</h2>
            <p className="text-sm text-gray-500 font-light tracking-wide">Enter your details to initiate the curation process.</p>
          </div>

          {error && (
            <div className="mb-6 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs font-light tracking-wide text-red-700 dark:text-red-400 animate-shake">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="First Name" autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other"
                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
              <input type="text" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Last Name" autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other"
                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
            </div>
            <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email Address" autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other"
              className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />



            <div className="relative group">
              <input type="text" required value={form.storeName} onChange={(e) => set('storeName', e.target.value)}
                onFocus={() => setShowTooltip('boutique')} onBlur={() => setShowTooltip(null)}
                placeholder="Boutique Name" autoComplete="off"
                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
              {showTooltip === 'boutique' && (
                <div className="absolute -top-12 left-0 right-0 bg-gray-900 text-white text-[10px] py-2 px-3 animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
                  Must be unique. Public URL: <span className="text-gray-400">aki.digital/&quot;name&quot;</span>
                </div>
              )}
            </div>

            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={form.password} onChange={(e) => set('password', e.target.value)}
                onFocus={() => setShowTooltip('password')} onBlur={() => setShowTooltip(null)}
                placeholder="Secure Password"
                className="w-full border-b border-gray-300 bg-transparent px-2 py-3 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide font-light placeholder-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
              </button>
              {showTooltip === 'password' && (
                <div className="absolute -top-16 left-0 right-0 bg-gray-900 text-white text-[10px] py-2 px-3 animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 leading-relaxed">
                  Required: 8+ chars • Uppercase • Lowercase • Numerical • Special Symbol (!@#$)
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 rounded-none border border-gray-300 dark:border-gray-600 cursor-pointer accent-gray-900 shrink-0" />
              <label className="text-xs font-light tracking-wide text-gray-500 dark:text-gray-400">
                I accept the{' '}
                <Link to="/terms" className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">Terms of Service</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full border border-gray-900 bg-gray-900 px-6 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
              {loading && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs font-light text-gray-500 tracking-wide">
              Already a member?{' '}
              <Link to="/auth/login" className="text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 font-medium ml-1 transition-colors">Enter Atelier</Link>
            </p>
          </div>

          <div className="absolute top-8 right-8">
            <Link to="/" className="flex items-center gap-2 text-xs font-light tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase">
              <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" /> Return
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}