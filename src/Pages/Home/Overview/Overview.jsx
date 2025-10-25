// import React, { useMemo } from "react";
// import useTrade from "../../../hooks/useTrade";
// import useUsers from "../../../hooks/useUsers";

// const Overview = () => {
//   const [treads] = useTrade();
//   const [users, refetch, isPending] = useUsers();
//   const normalUsers = users?.filter((user) => user.role !== "admin") || [];

//   // total count
//   const totalUsers = normalUsers.length;

//   // ✅ Calculate totals using useMemo for performance
//   const { soldEnergy, totalEnergy } = useMemo(() => {
//     const soldEnergy = treads
//       .filter((t) => t.status === "sold")
//       .reduce((sum, t) => sum + t.sellEnergyAmount, 0);

//     const totalEnergy = treads.reduce((sum, t) => sum + t.sellEnergyAmount, 0);

//     const uniqueUsers = new Set(treads.map((t) => t.userId?._id)).size;

//     return { soldEnergy, totalEnergy, totalUsers: uniqueUsers };
//   }, [treads]);

//   return (
//     <div>
//       <div
//         className="
//           bg-green-50
//           backdrop-blur-md
//           border
//           border-white/20
//           rounded-2xl
//           shadow-lg
//           p-8
//           text-green-900
//           space-y-6
//         "
//       >
//         <p className="font-medium text-2xl">Overview</p>

//         <div className="flex flex-wrap gap-6">
//           {/* Current Usage (Sold Energy) */}
//           <div
//             className="
//               bg-white
//               backdrop-blur-md
//               border
//               border-white
//               rounded-2xl
//               shadow-lg
//               p-8
//               text-black
//               space-y-6
//             "
//           >
//             <p className="font-semibold text-xl">Current Usage</p>
//             <p>
//               <span className="text-3xl">{soldEnergy}</span> kWh
//             </p>
//           </div>

//           {/* Production (Total Energy) */}
//           <div
//             className="
//               bg-green-900/10
//               backdrop-blur-md
//               border
//               border-white/10
//               rounded-2xl
//               shadow-lg
//               p-8
//               text-white
//               space-y-6
//             "
//           >
//             <p className="font-semibold text-xl">Production</p>
//             <p>
//               <span className="text-3xl">{totalEnergy}</span> kWh
//             </p>
//           </div>

//           {/* Total Users */}
//           <div
//             className="
//               bg-green-900/40
//               backdrop-blur-md
//               border
//               border-white/10
//               rounded-2xl
//               shadow-lg
//               p-8
//               text-white
//               space-y-6
//             "
//           >
//             <p className="font-semibold text-xl">Total Users</p>
//             <p>
//               <span className="text-3xl">{totalUsers}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;

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
