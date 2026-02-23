import { Store, Globe, Image as ImageIcon, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Store Settings</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your store's profile, visuals, and preferences.</p>
      </div>

      <div className="space-y-6">
        
        {/* Basic Profile Section */}
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
              <p className="mt-1 text-xs text-gray-500">This appears on your store's header to welcome customers.</p>
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

        {/* Branding & Visuals Section */}
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}