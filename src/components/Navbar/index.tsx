import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import authService from "@/services/authService";
import { useRouter } from "next/router";
import Button from "@/utils/Button";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkLoginStatus = () => {
    const token = authService.getAccessToken();
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    router.events.on("routeChangeComplete", checkLoginStatus);
    return () => {
      router.events.off("routeChangeComplete", checkLoginStatus);
    };
  }, [router.events]);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // delay in ms
  };

  return (
    <nav
        className={`shadow-md transition-all duration-300 ${
          isLoggedIn ? "backdrop-blur-md bg-gray-300/70" : "bg-gray-300"
        }`}
      >
      <div className="w-full p-4 pr-10 flex justify-between items-center">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="text-xl font-bold text-gray-800"
        >
          CarRental Admin Panel
        </Link>

        {!isLoggedIn ? (
          <Link href="/login" className="text-xl text-gray-700 hover:text-blue-600">
            Login
          </Link>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button className="text-xl text-gray-700 hover:text-blue-600">
              Profile ▾
            </Button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-md flex flex-col z-50">
                <Link
                  href="/profile"
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
