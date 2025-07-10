import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import authService from "@/services/authService";
import Button from "@/utils/Button";

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await authService.login({ email, password });
      router.replace("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:px-20 bg-[#368bb3]">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full shadow-lg">
        {/* Left Side Image */}
        <div className="relative hidden md:block w-1/2">
          <Image
            src="/assets/images/thar.svg"
            alt="Login side image"
            fill
            className="scale-x-[-1]"
            priority
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
