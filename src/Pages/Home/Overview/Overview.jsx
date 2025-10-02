import React, { useMemo } from "react";
import useTrade from "../../../hooks/useTrade";
import useUsers from "../../../hooks/useUsers";

const Overview = () => {
  const [treads] = useTrade();
  const [users, refetch, isPending] = useUsers();
  const normalUsers = users?.filter((user) => user.role !== "admin") || [];

  // total count
  const totalUsers = normalUsers.length;

  // ✅ Calculate totals using useMemo for performance
  const { soldEnergy, totalEnergy } = useMemo(() => {
    const soldEnergy = treads
      .filter((t) => t.status === "sold")
      .reduce((sum, t) => sum + t.sellEnergyAmount, 0);

    const totalEnergy = treads.reduce((sum, t) => sum + t.sellEnergyAmount, 0);

    const uniqueUsers = new Set(treads.map((t) => t.userId?._id)).size;

    return { soldEnergy, totalEnergy, totalUsers: uniqueUsers };
  }, [treads]);

  return (
    <div>
      <div
        className="
          bg-white/5
          backdrop-blur-md
          border
          border-white/20
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
        "
      >
        <p className="font-medium text-2xl">Overview</p>

        <div className="flex flex-wrap gap-6">
          {/* Current Usage (Sold Energy) */}
          <div
            className="
              bg-gray-900/5
              backdrop-blur-md
              border
              border-white/10
              rounded-2xl
              shadow-lg
              p-8
              text-white
              space-y-6
            "
          >
            <p className="font-semibold text-xl">Current Usage</p>
            <p>
              <span className="text-3xl">{soldEnergy}</span> kWh
            </p>
          </div>

          {/* Production (Total Energy) */}
          <div
            className="
              bg-gray-900/5
              backdrop-blur-md
              border
              border-white/10
              rounded-2xl
              shadow-lg
              p-8
              text-white
              space-y-6
            "
          >
            <p className="font-semibold text-xl">Production</p>
            <p>
              <span className="text-3xl">{totalEnergy}</span> kWh
            </p>
          </div>

          {/* Total Users */}
          <div
            className="
              bg-gray-900/5
              backdrop-blur-md
              border
              border-white/10
              rounded-2xl
              shadow-lg
              p-8
              text-white
              space-y-6
            "
          >
            <p className="font-semibold text-xl">Total Users</p>
            <p>
              <span className="text-3xl">{totalUsers}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
