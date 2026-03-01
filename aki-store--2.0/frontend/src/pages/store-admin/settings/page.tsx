
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faImage, faPalette, faMoon, faSun, faDesktop, faCheckCircle, faCreditCard, faExclamationTriangle, faTimes, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "next-themes";
import { useStoreSettings } from "../../../store/useCartStore";
import { apiUpdateStoreSettings } from "../../../services/api";

// Pre-curated, high-contrast colors that work beautifully in UI design
const presetColors = [
  { name: "Monochrome (AKI Default)", hex: "#000000" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Indigo", hex: "#4f46e5" },
  { name: "Emerald", hex: "#059669" },
  { name: "Amber", hex: "#d97706" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    whatsappNumber, setWhatsappNumber,
    designation, setDesignation,
    manifesto, setManifesto,
    ownerName, setOwnerName,
    contactEmail, setContactEmail,
    socialInstagram, setSocialInstagram,
    socialTwitter, setSocialTwitter,
    primaryColor, setPrimaryColor,
    paystackPublicKey, setPaystackPublicKey,
    paystackSecretKey, setPaystackSecretKey,
    logo, setLogo,
    bannerUrl, setBannerUrl,
  } = useStoreSettings();

  const [localPhone, setLocalPhone] = useState(whatsappNumber);
  const [localDesignation, setLocalDesignation] = useState(designation);
  const [localManifesto, setLocalManifesto] = useState(manifesto);
  const [localOwnerName, setLocalOwnerName] = useState(ownerName);
  const [localEmail, setLocalEmail] = useState(contactEmail);
  const [localIg, setLocalIg] = useState(socialInstagram);
  const [localTwitter, setLocalTwitter] = useState(socialTwitter);
  const [selectedColor, setSelectedColor] = useState(primaryColor || presetColors[0].hex);
  const [localPaystackPub, setLocalPaystackPub] = useState(paystackPublicKey);
  const [localPaystackSec, setLocalPaystackSec] = useState(paystackSecretKey);
  const [localLogo, setLocalLogo] = useState(logo);
  const [localBanner, setLocalBanner] = useState(bannerUrl);

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setLocalPhone(whatsappNumber);
    setLocalDesignation(designation);
    setLocalManifesto(manifesto);
    setLocalOwnerName(ownerName);
    setLocalEmail(contactEmail);
    setLocalIg(socialInstagram);
    setLocalTwitter(socialTwitter);
    if (primaryColor) setSelectedColor(primaryColor);
    setLocalPaystackPub(paystackPublicKey);
    setLocalPaystackSec(paystackSecretKey);
    setLocalLogo(logo);
    setLocalBanner(bannerUrl);
  }, [whatsappNumber, designation, manifesto, ownerName, contactEmail, socialInstagram, socialTwitter, primaryColor, paystackPublicKey, paystackSecretKey, logo, bannerUrl]);

  if (!mounted) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorStatus("The asset you selected is too large. Please limit to 5MB for optimal performance.");
        setTimeout(() => setErrorStatus(null), 4000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') setLocalLogo(reader.result as string);
        else setLocalBanner(reader.result as string);
        setSuccessStatus(`Asset Uploaded: ${type === 'logo' ? 'Logo' : 'Billboard'} updated successfully.`);
        setTimeout(() => setSuccessStatus(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!localOwnerName) return "Administrator name is required for platform integrity.";
    if (!localEmail || !localEmail.includes('@')) return "Enter a valid support email address.";
    if (!localPhone) return "WhatsApp contact is mandatory for buyer-seller communication.";
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorStatus(validationError);
      setTimeout(() => setErrorStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setErrorStatus(null);
    setSuccessStatus(null);

    try {
      await apiUpdateStoreSettings({
        whatsappNumber: localPhone,
        designation: localDesignation,
        manifesto: localManifesto,
        ownerName: localOwnerName,
        socialInstagram: localIg,
        socialTwitter: localTwitter,
        supportEmail: localEmail,
        primaryColor: selectedColor,
        paystackPublicKey: localPaystackPub,
        paystackSecretKey: localPaystackSec,
        logo: localLogo,
        bannerUrl: localBanner
      });

      setWhatsappNumber(localPhone);
      setDesignation(localDesignation);
      setManifesto(localManifesto);
      setOwnerName(localOwnerName);
      setContactEmail(localEmail);
      setSocialInstagram(localIg);
      setSocialTwitter(localTwitter);
      setPrimaryColor(selectedColor);
      setPaystackPublicKey(localPaystackPub);
      setPaystackSecretKey(localPaystackSec);
      setLogo(localLogo);
      setBannerUrl(localBanner);

      // Attempt to immediately update root for visual sync
      document.documentElement.style.setProperty('--color-primary', selectedColor);

      setSuccessStatus("Architectural integrity verified. Store configurations saved successfully.");
      setTimeout(() => setSuccessStatus(null), 5000);
    } catch (e: any) {
      console.error("Failed to save settings", e);
      setErrorStatus(e.message || "Configurations failed to sync. Please verify your connection or reduce asset sizes.");
      setTimeout(() => setErrorStatus(null), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative">

      {/* Persistence Notifications */}
      {(successStatus || errorStatus) && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in slide-in-from-top-4 duration-500">
          <div className={`p-6 border flex items-start gap-4 shadow-2xl backdrop-blur-md ${errorStatus ? 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400' : 'bg-gray-900 border-gray-800 text-white'}`}>
            <FontAwesomeIcon icon={errorStatus ? faExclamationTriangle : faCheckCircle} className="h-5 w-5 mt-0.5" />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{errorStatus ? "Integrity Warning" : "System Verification"}</p>
              <p className="text-xs font-light tracking-wide leading-relaxed">{errorStatus || successStatus}</p>
            </div>
            <button onClick={() => { setErrorStatus(null); setSuccessStatus(null); }} className="text-xs hover:opacity-50 transition-opacity">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}

      <div>
        <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Configurations</h1>
        <p className="text-sm font-light tracking-wide text-gray-500">Manage your brand&apos;s profile, visual identity, and operational settings.</p>
      </div>

      <div className="space-y-8">

        {/* Basic Profile Section */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <FontAwesomeIcon icon={faStore} className="h-5 w-5 text-gray-900 dark:text-white" />
            <h2 className="font-cinzel text-lg tracking-[0.2em] text-gray-900 dark:text-white uppercase">Brand Profile</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Owner / Director Name</label>
              <input
                type="text"
                value={localOwnerName}
                onChange={(e) => setLocalOwnerName(e.target.value)}
                className="font-cinzel tracking-widest text-lg w-full border-b border-gray-300 bg-transparent px-0 py-3 dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Designation</label>
              <input
                type="text"
                value={localDesignation}
                onChange={(e) => setLocalDesignation(e.target.value)}
                className="font-cinzel tracking-widest text-lg w-full border-b border-gray-300 bg-transparent px-0 py-3 dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Manifesto / Story</label>
              <textarea
                rows={3}
                value={localManifesto}
                onChange={(e) => setLocalManifesto(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Digital Presence (URL)</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-700 focus-within:border-gray-900 dark:focus-within:border-white">
                <span className="text-sm font-light tracking-wide text-gray-500 pr-2">aki.com/</span>
                <input type="text" defaultValue="official" className="w-full bg-transparent px-0 py-3 text-sm dark:text-white focus:outline-none focus:ring-0" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Contact Email</label>
              <input
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                placeholder="Business inquiries and support"
              />
            </div>

            <div>
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Instagram Handle</label>
              <input
                type="text"
                value={localIg}
                onChange={(e) => setLocalIg(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Twitter Handle</label>
              <input
                type="text"
                value={localTwitter}
                onChange={(e) => setLocalTwitter(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                placeholder="@username"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">WhatsApp / Support Number</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-700 focus-within:border-gray-900 dark:focus-within:border-white">
                <span className="text-sm font-light tracking-wide text-gray-500 pr-2">+</span>
                <input
                  type="text"
                  value={localPhone}
                  onChange={(e) => setLocalPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-transparent px-0 py-3 text-sm dark:text-white focus:outline-none focus:ring-0"
                  placeholder="Country code + number (e.g. 1234567890)"
                />
              </div>
              <p className="mt-2 text-[10px] font-light tracking-wide text-gray-400">Used for customer follow-up requests after checkout.</p>
            </div>
          </div>
        </div>

        {/* Branding & Visuals Section */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <FontAwesomeIcon icon={faImage} className="h-5 w-5 text-gray-900 dark:text-white" />
            <h2 className="font-cinzel text-lg tracking-[0.2em] text-gray-900 dark:text-white uppercase">Visual Identity</h2>
          </div>

          <div className="space-y-10">
            <div>
              <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Insignia (Logo)</label>
              <div className="flex items-center gap-8 border border-gray-200 bg-transparent p-6 dark:border-white/10">
                <div className="flex h-16 w-16 items-center justify-center border border-gray-900 overflow-hidden text-gray-900 dark:border-white dark:text-white bg-white/5">
                  {localLogo ? (
                    <img src={localLogo} alt="Logo Preview" className="h-full w-full object-contain" />
                  ) : (
                    <span className="font-cinzel text-xl font-medium tracking-widest">A</span>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="logo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer border border-gray-300 bg-transparent px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white transition-colors"
                  >
                    Update Logo
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Billboard Asset (Banner)</label>
              <input
                type="file"
                id="banner-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'banner')}
              />
              <label
                htmlFor="banner-upload"
                className="relative flex h-40 w-full flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-transparent transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-white cursor-pointer group overflow-hidden"
              >
                {localBanner ? (
                  <>
                    <img src={localBanner} alt="Banner Preview" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative z-10 flex flex-col items-center">
                      <FontAwesomeIcon icon={faImage} className="mb-4 h-6 w-6 text-white" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Replace Billboard</span>
                    </div>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faImage} className="mb-4 h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Select Hero Asset</span>
                    <span className="mt-2 text-xs font-light text-gray-400">1200x400px Optimal Resolution</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Payment Integration Section */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <FontAwesomeIcon icon={faCreditCard} className="h-5 w-5 text-gray-900 dark:text-white" />
            <h2 className="font-cinzel text-lg tracking-[0.2em] text-gray-900 dark:text-white uppercase">Payment Gateway Integration</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Paystack Public Key</label>
              <input
                type="text"
                value={localPaystackPub}
                onChange={(e) => setLocalPaystackPub(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                placeholder="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <p className="mt-2 text-[10px] font-light tracking-wide text-gray-400">Your public key is used to initialize the popup checkout.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Paystack Secret Key</label>
              <input
                type="password"
                value={localPaystackSec}
                onChange={(e) => setLocalPaystackSec(e.target.value)}
                className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                placeholder="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <p className="mt-2 text-[10px] font-light tracking-wide text-gray-400">Your secret key. Handled securely to verify transactions server-side.</p>
            </div>
          </div>
        </div>

        {/* Storefront Theme & Colors */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <FontAwesomeIcon icon={faPalette} className="h-5 w-5 text-gray-900 dark:text-white" />
            <h2 className="font-cinzel text-lg tracking-[0.2em] text-gray-900 dark:text-white uppercase">Aesthetic Preferences</h2>
          </div>

          <div className="space-y-12">
            {/* Primary Accent Color */}
            <div>
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Primary Brand Tone
              </label>
              <p className="mb-6 text-xs font-light tracking-wide text-gray-500">Applied to prime actions and interactive elements.</p>

              <div className="flex flex-wrap items-center gap-6 border border-gray-200 bg-transparent p-6 dark:border-white/10">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-none transition-transform hover:scale-110 ${selectedColor === color.hex ? 'ring-2 ring-gray-900 ring-offset-2 dark:ring-white dark:ring-offset-black' : 'ring-1 ring-gray-300 dark:ring-gray-700'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name} color`}
                  >
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 w-max -translate-x-1/2 scale-0 border border-gray-900 bg-gray-900 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-white transition-all group-hover:scale-100 dark:border-white dark:bg-white dark:text-black">
                      {color.name}
                    </span>
                  </button>
                ))}

                {/* Custom Hex Picker */}
                <div className="relative ml-4 flex items-center gap-4 border-l border-gray-200 pl-6 dark:border-gray-800">
                  <div
                    className="h-10 w-10 overflow-hidden rounded-none border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="h-16 w-16 -translate-x-3 -translate-y-3 cursor-pointer opacity-0"
                    />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">{selectedColor}</span>
                </div>
              </div>
            </div>

            {/* Default Theme Preference */}
            <div>
              <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Default State
              </label>
              <p className="mb-6 text-xs font-light tracking-wide text-gray-500">Initial appearance prior to user intervention.</p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center justify-center gap-4 border p-6 transition-all ${theme === "light" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-white/5" : "border-gray-200 bg-transparent hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"}`}
                >
                  <FontAwesomeIcon icon={faSun} className={`h-5 w-5 ${theme === "light" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "light" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center justify-center gap-4 border p-6 transition-all ${theme === "dark" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-white/5" : "border-gray-200 bg-transparent hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"}`}
                >
                  <FontAwesomeIcon icon={faMoon} className={`h-5 w-5 ${theme === "dark" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "dark" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>Dark</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center justify-center gap-4 border p-6 transition-all ${theme === "system" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-white/5" : "border-gray-200 bg-transparent hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"}`}
                >
                  <FontAwesomeIcon icon={faDesktop} className={`h-5 w-5 ${theme === "system" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "system" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>System Standard</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`flex items-center gap-3 border border-gray-900 bg-gray-900 px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="h-4 w-4 rounded-full border-t-2 border-r-2 border-white animate-spin dark:border-black"></div>
            ) : (
              <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4 text-[var(--color-primary)]" />
            )}
            {isSubmitting ? "Enforcing Integration..." : "Verify & Enforce Configurations"}
          </button>
        </div>

      </div>
    </div>
  );
}