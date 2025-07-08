// pages/login/index.tsx
import React from "react";
import Login from "@/components/auth/Login";
import MainLayout from "@/components/MainLayout";

const LoginPage: React.FC = () => {
  return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Login />
      </div>
  );
};

export default LoginPage;
