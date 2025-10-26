import React, { useMemo } from "react";
import useTrade from "../../../hooks/useTrade";
import useUsers from "../../../hooks/useUsers";

const Overview = () => {
  const [treads] = useTrade();
  const [users] = useUsers();

  const normalUsers = users?.filter((user) => user.role !== "admin") || [];
  const totalUsers = normalUsers.length;

  const { soldEnergy, totalEnergy } = useMemo(() => {
    const soldEnergy = treads
      .filter((t) => t.status === "sold")
      .reduce((sum, t) => sum + t.sellEnergyAmount, 0);

    const totalEnergy = treads.reduce((sum, t) => sum + t.sellEnergyAmount, 0);

    return { soldEnergy, totalEnergy };
  }, [treads]);

  return (
    <div className=" bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl">
      <div className=" mx-auto bg-white/80 backdrop-blur-md border border-emerald-100 rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-emerald-700 mb-8">
          Dashboard Overview
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sold Energy */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-8">
            <p className="text-lg font-medium">Current Usage</p>
            <p className="text-4xl font-bold mt-3">{soldEnergy} kWh</p>
            <p className="text-emerald-100 mt-1 text-sm">Energy sold</p>
          </div>

          {/* Total Production */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 text-green-900 rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-8">
            <p className="text-lg font-medium">Production</p>
            <p className="text-4xl font-bold mt-3">{totalEnergy} kWh</p>
            <p className="text-green-600 mt-1 text-sm">
              Total generated energy
            </p>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-8">
            <p className="text-lg font-medium">Total Users</p>
            <p className="text-4xl font-bold mt-3">{totalUsers}</p>
            <p className="text-emerald-100 mt-1 text-sm">
              Active platform members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
