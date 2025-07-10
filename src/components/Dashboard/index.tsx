import React from "react";
import Table from "../Table/Dashboardtable";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen px-5">
      <h1 className="text-3xl text-black font-bold mt-16">
        Admin Dashboard
      </h1>
      <div>
        <Table />
      </div>
      
    </div>
  );
};

export default Dashboard;
