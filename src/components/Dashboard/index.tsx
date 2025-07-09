// components/Dashboard/index.tsx
import React from "react";
import Table from "../Table/Dashboardtable";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen px-4">
      <h1 className="text-3xl text-black font-bold mt-20 mb-6">
        Admin Dashboard
      </h1>
      <Table />
    </div>
  );
};

export default Dashboard;
