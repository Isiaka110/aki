import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 dark:bg-[#050505] dark:text-gray-100 transition-colors duration-300 font-sans">
      <Outlet />
    </div>
  );
}