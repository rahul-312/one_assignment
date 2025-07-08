// components/Navbar/index.tsx
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-md shadow-md">
      <div className="w-full  px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          CarRental Admin
        </Link>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
