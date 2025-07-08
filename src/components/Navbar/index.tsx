// components/Navbar/index.tsx
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-md shadow-md bg-gray-300 rounded-xl">
      <div className="w-full  p-4 pr-10 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          CarRental Admin
        </Link>
        <div className="">
          <Link href="/login" className="text-xl text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
