"use client";

import { useState, useEffect } from "react";
import { Store, ImageIcon, Save, Palette, Moon, Sun, Monitor, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useStoreSettings } from "../../store/useCartStore";

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
  const [selectedColor, setSelectedColor] = useState(presetColors[0].hex);
  const {
    whatsappNumber, setWhatsappNumber,
    designation, setDesignation,
    manifesto, setManifesto,
    ownerName, setOwnerName,
    contactEmail, setContactEmail,
    socialInstagram, setSocialInstagram,
    socialTwitter, setSocialTwitter
  } = useStoreSettings();

  const [localPhone, setLocalPhone] = useState(whatsappNumber);
  const [localDesignation, setLocalDesignation] = useState(designation);
  const [localManifesto, setLocalManifesto] = useState(manifesto);
  const [localOwnerName, setLocalOwnerName] = useState(ownerName);
  const [localEmail, setLocalEmail] = useState(contactEmail);
  const [localIg, setLocalIg] = useState(socialInstagram);
  const [localTwitter, setLocalTwitter] = useState(socialTwitter);

  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocalPhone(whatsappNumber);
    setLocalDesignation(designation);
    setLocalManifesto(manifesto);
    setLocalOwnerName(ownerName);
    setLocalEmail(contactEmail);
    setLocalIg(socialInstagram);
    setLocalTwitter(socialTwitter);
  }, [whatsappNumber, designation, manifesto, ownerName, contactEmail, socialInstagram, socialTwitter]);

  if (!mounted) return null;

  const handleSave = () => {
    setWhatsappNumber(localPhone);
    setDesignation(localDesignation);
    setManifesto(localManifesto);
    setOwnerName(localOwnerName);
    setContactEmail(localEmail);
    setSocialInstagram(localIg);
    setSocialTwitter(localTwitter);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div>
        <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Configurations</h1>
        <p className="text-sm font-light tracking-wide text-gray-500">Manage your brand&apos;s profile, visual identity, and operational settings.</p>
      </div>

      <div className="space-y-8">

        {/* Basic Profile Section */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <Store className="h-5 w-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
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
            <ImageIcon className="h-5 w-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
            <h2 className="font-cinzel text-lg tracking-[0.2em] text-gray-900 dark:text-white uppercase">Visual Identity</h2>
          </div>

          <div className="space-y-10">
            <div>
              <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Insignia (Logo)</label>
              <div className="flex items-center gap-8 border border-gray-200 bg-transparent p-6 dark:border-white/10">
                <div className="flex h-16 w-16 items-center justify-center border border-gray-900 text-gray-900 dark:border-white dark:text-white">
                  <span className="font-cinzel text-xl font-medium tracking-widest">A</span>
                </div>
                <button className="border border-gray-300 bg-transparent px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 hover:border-gray-900 hover:text-gray-900 dark:border-white/20 dark:text-gray-300 dark:hover:border-white dark:hover:text-white transition-colors">
                  Update
                </button>
              </div>
            </div>

            <div>
              <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Billboard Asset (Banner)</label>
              <div className="flex h-40 w-full flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-transparent transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-white cursor-pointer group">
                <ImageIcon className="mb-4 h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" strokeWidth={1} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Select Hero Asset</span>
                <span className="mt-2 text-xs font-light text-gray-400">1200x400px Optimal Resolution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Storefront Theme & Colors */}
        <div className="border border-gray-200 bg-transparent p-8 dark:border-white/10">
          <div className="mb-8 flex items-center gap-4">
            <Palette className="h-5 w-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
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
                  <Sun className={`h-5 w-5 ${theme === "light" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} strokeWidth={1.5} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "light" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center justify-center gap-4 border p-6 transition-all ${theme === "dark" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-white/5" : "border-gray-200 bg-transparent hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"}`}
                >
                  <Moon className={`h-5 w-5 ${theme === "dark" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} strokeWidth={1.5} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "dark" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>Dark</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center justify-center gap-4 border p-6 transition-all ${theme === "system" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-white/5" : "border-gray-200 bg-transparent hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"}`}
                >
                  <Monitor className={`h-5 w-5 ${theme === "system" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} strokeWidth={1.5} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${theme === "system" ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>System Standard</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 items-center gap-4">
          {isSaved && (
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#25D366] transition-opacity duration-300">
              <CheckCircle className="h-4 w-4" /> Saved Successfully
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-3 border border-gray-900 bg-gray-900 px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
          >
            <Save className="h-4 w-4" strokeWidth={1.5} /> Save Configurations
          </button>
        </div>

      </div>
    </div>
  );
}