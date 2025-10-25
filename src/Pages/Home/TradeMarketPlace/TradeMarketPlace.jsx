// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MakeTradeOffer from "../MakeTradeOffer/MakeTradeOffer";
// import useTrade from "../../../hooks/useTrade";

// const TradeMarketPlace = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [treads, refetch] = useTrade();
//   const navigate = useNavigate();

//   // ✅ Filter only today's trades
//   const today = new Date().toISOString().split("T")[0]; // e.g., "2025-10-14"
//   const todaysTrades = treads?.filter((trade) => {
//     const tradeDate = new Date(trade.createdAt).toISOString().split("T")[0];
//     return tradeDate === today;
//   });

//   // ✅ Handle payment redirect
//   const handlePayment = (trade) => {
//     if (trade.status !== "pending") return; // Prevent buying sold trades
//     navigate("/navbar/payment", { state: trade });
//   };

//   refetch();

//   return (
//     <div className="text-white">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-bold">Trade MarketPlace</h1>
//         <button
//           onClick={() => setOpenModal(true)}
//           className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Offer
//         </button>
//       </div>

//       <h1 className="mt-6 mb-4 text-lg">Today's Trade Offers</h1>

//       {/* ✅ Table of today's trades */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-600 text-left">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="p-2 border border-gray-600">#</th>
//               <th className="p-2 border border-gray-600">User Email</th>
//               <th className="p-2 border border-gray-600">Energy (kWh)</th>
//               <th className="p-2 border border-gray-600">Price ($)</th>
//               <th className="p-2 border border-gray-600">Created At</th>
//               <th className="p-2 border border-gray-600">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todaysTrades && todaysTrades.length > 0 ? (
//               todaysTrades.map((trade, idx) => (
//                 <tr key={trade._id} className="hover:bg-gray-800">
//                   <td className="p-2 border border-gray-600">{idx + 1}</td>
//                   <td className="p-2 border border-gray-600">
//                     {trade.userId?.email}
//                   </td>
//                   <td className="p-2 border border-gray-600">
//                     {trade.sellEnergyAmount}
//                   </td>
//                   <td className="p-2 border border-gray-600">{trade.price}</td>
//                   <td className="p-2 border border-gray-600">
//                     {new Date(trade.createdAt).toLocaleString()}
//                   </td>
//                   <td className="p-2 border border-gray-600">
//                     {trade.status === "pending" ? (
//                       <button
//                         onClick={() => handlePayment(trade)}
//                         className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
//                       >
//                         Proceed to Payment
//                       </button>
//                     ) : (
//                       <span className="text-red-400 font-semibold">
//                         Sold Out
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="text-center p-4 text-gray-400 border border-gray-600"
//                 >
//                   No trade offers available for today
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Modal for creating offers */}
//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
//           <div className="bg-gray-800 p-6 rounded-lg w-[400px] relative">
//             <button
//               onClick={() => setOpenModal(false)}
//               className="absolute top-2 right-2 text-white text-lg"
//             >
//               ✖
//             </button>
//             <MakeTradeOffer setOpenModal={setOpenModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TradeMarketPlace;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MakeTradeOffer from "../MakeTradeOffer/MakeTradeOffer";
import useTrade from "../../../hooks/useTrade";

const TradeMarketPlace = () => {
  const [openModal, setOpenModal] = useState(false);
  const [treads, refetch] = useTrade();
  const navigate = useNavigate();

  // ✅ Filter only today's trades
  const today = new Date().toISOString().split("T")[0];
  const todaysTrades = treads?.filter((trade) => {
    const tradeDate = new Date(trade.createdAt).toISOString().split("T")[0];
    return tradeDate === today;
  });

  // ✅ Handle payment redirect
  const handlePayment = (trade) => {
    if (trade.status !== "pending") return;
    navigate("/navbar/payment", { state: trade });
  };

  refetch();

  return (
    <div className="text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-400">
          Trade Marketplace
        </h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
        >
          + Create Offer
        </button>
      </div>

      <h2 className="text-lg font-medium text-gray-300 mb-4">
        Today's Trade Offers
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900/80 text-gray-200">
            <tr>
              {[
                "#",
                "User Email",
                "Energy (kWh)",
                "Price ($)",
                "Created At",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-left border-b border-gray-700 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todaysTrades && todaysTrades.length > 0 ? (
              todaysTrades.map((trade, idx) => (
                <tr
                  key={trade._id}
                  className="hover:bg-blue-950/30 transition-colors duration-150"
                >
                  <td className="p-3 border-b border-gray-800">{idx + 1}</td>
                  <td className="p-3 border-b border-gray-800">
                    {trade.userId?.email}
                  </td>
                  <td className="p-3 border-b border-gray-800">
                    {trade.sellEnergyAmount}
                  </td>
                  <td className="p-3 border-b border-gray-800 text-blue-400 font-semibold">
                    ${trade.price}
                  </td>
                  <td className="p-3 border-b border-gray-800 text-gray-400">
                    {new Date(trade.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-gray-800">
                    {trade.status === "pending" ? (
                      <button
                        onClick={() => handlePayment(trade)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition-all duration-200"
                      >
                        Proceed to Payment
                      </button>
                    ) : (
                      <span className="text-red-400 font-semibold">
                        Sold Out
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-4 text-gray-400 border-t border-gray-800"
                >
                  No trade offers available for today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for creating offers */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900/95 border border-gray-700 p-6 rounded-2xl w-[420px] relative shadow-2xl">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl transition"
            >
              ✕
            </button>
            <MakeTradeOffer setOpenModal={setOpenModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarketPlace;
