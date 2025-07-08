// components/MainLayout/index.tsx
import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const hideNavbarOn = ["/login"]; // Add more paths if needed
  const shouldHideNavbar = hideNavbarOn.includes(router.pathname);

  return (
    <div className={`min-h-screen ${shouldHideNavbar ? "bg-white" : "bg-gray-50"}`}>
      {/* Conditionally render navbar */}
      {!shouldHideNavbar && (
        <div className="fixed top-4 left-0 right-0 z-50 px-10">
          <Navbar />
        </div>
      )}

      {/* Main content */}
      <main >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
