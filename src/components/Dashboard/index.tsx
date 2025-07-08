// components/Dashboard/index.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Placeholder table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4 border-b">Listing ID</th>
              <th className="p-4 border-b">Car Name</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* You can map over data here */}
            <tr className="text-sm text-gray-600 hover:bg-gray-50">
              <td className="p-4 border-b">#12345</td>
              <td className="p-4 border-b">Maruti Swift</td>
              <td className="p-4 border-b text-yellow-600 font-medium">Pending</td>
              <td className="p-4 border-b space-x-2">
                <button className="text-green-600 hover:underline">Approve</button>
                <button className="text-red-600 hover:underline">Reject</button>
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
