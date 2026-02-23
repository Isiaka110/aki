"use client";

import { useState, useEffect } from "react";
import { Store, ImageIcon, Save, Palette, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Store Settings</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your store's profile, visuals, and brand colors.</p>
      </div>

      <div className="space-y-6">

        {/* Basic Profile Section (Unchanged) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
            <Store className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Store Profile</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Name</label>
              <input type="text" defaultValue="Thrift Elegance" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Description</label>
              <textarea rows={3} defaultValue="Premium thrifted fashion for the modern aesthetic." className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Store URL Link</label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800">aki.com/</span>
                <input type="text" defaultValue="thrift-elegance" className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:border-black focus:ring-1 focus:ring-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Branding & Visuals Section (Unchanged) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
            <ImageIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Visuals & Branding</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Logo</label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <span className="text-xl font-black text-gray-400">TE</span>
                </div>
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                  Change Logo
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Banner</label>
              <div className="flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-900 cursor-pointer">
                <ImageIcon className="mb-2 h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">Upload a banner image (1200x400px recommended)</span>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Storefront Theme & Colors */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
            <Palette className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Storefront Theme & Colors</h2>
          </div>

          <div className="space-y-8">
            {/* Primary Accent Color */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary Brand Color
              </label>
              <p className="mb-4 text-xs text-gray-500">This color will be used for your "Add to Cart" buttons, badges, and active links on your standalone store.</p>

              <div className="flex flex-wrap items-center gap-4">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-110 ${selectedColor === color.hex ? 'ring-2 ring-gray-900 ring-offset-2 dark:ring-white dark:ring-offset-gray-900' : 'ring-1 ring-gray-200 dark:ring-gray-700'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name} color`}
                  >
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-gray-900 px-2 py-1 text-[10px] font-bold text-white transition-all group-hover:scale-100 dark:bg-white dark:text-gray-900">
                      {color.name}
                    </span>
                  </button>
                ))}

                {/* Custom Hex Picker */}
                <div className="relative ml-4 flex items-center gap-2 border-l border-gray-200 pl-4 dark:border-gray-800">
                  <div
                    className="h-10 w-10 overflow-hidden rounded-full border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="h-16 w-16 -translate-x-3 -translate-y-3 cursor-pointer opacity-0"
                    />
                  </div>
                  <span className="text-sm font-mono uppercase text-gray-500">{selectedColor}</span>
                </div>
              </div>
            </div>

            {/* Default Theme Preference */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Storefront Mode
              </label>
              <p className="mb-4 text-xs text-gray-500">How should your store appear to customers when they first visit? They can still toggle it themselves.</p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === "light" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`}
                >
                  <Sun className={`h-6 w-6 ${theme === "light" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Always Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === "dark" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`}
                >
                  <Moon className={`h-6 w-6 ${theme === "dark" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Always Dark</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === "system" ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800" : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"}`}
                >
                  <Monitor className={`h-6 w-6 ${theme === "system" ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Match User's Device</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" style={{ backgroundColor: selectedColor !== "#000000" ? selectedColor : undefined }}>
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}