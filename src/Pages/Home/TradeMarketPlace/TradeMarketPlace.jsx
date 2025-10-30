// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MakeTradeOffer from "../MakeTradeOffer/MakeTradeOffer";
// import useTrade from "../../../hooks/useTrade";
// import { useUser } from "../../../CustomProviders/useContext";
// import useUsers from "../../../hooks/useUsers";
// import Swal from "sweetalert2";

// const TradeMarketPlace = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [treads, refetch] = useTrade();
//   const navigate = useNavigate();

//   const { userEmail } = useUser();
//   const [users] = useUsers();
//   const [findUser, setFindUser] = useState(null);

//   useEffect(() => {
//     if (users && userEmail) {
//       const currentUser = users.find((user) => user.email === userEmail);
//       setFindUser(currentUser || null);
//     }
//   }, [userEmail, users]);

//   // ✅ Handle Create Offer Click
//   const handleCreateOffer = () => {
//     if (!findUser) return;

//     const hasAddress = !!findUser.address;
//     const hasPayment = !!findUser.payments && findUser.payments.length > 0;

//     if (!hasAddress || !hasPayment) {
//       Swal.fire({
//         title: "Incomplete Profile",
//         text: "You must add your address and payment method before creating a trade offer.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#2563EB",
//         cancelButtonColor: "#6B7280",
//         confirmButtonText: "Update Now",
//         cancelButtonText: "Cancel",
//         background: "#1E293B",
//         color: "#E2E8F0",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/navbar/profile");
//         }
//       });
//       return;
//     }

//     setOpenModal(true);
//   };

//   // ✅ Handle Payment Click
//   const handlePayment = (trade) => {
//     if (!findUser) return;

//     // 🚫 Prevent buying your own trade
//     if (trade.userId?.email === findUser.email) {
//       Swal.fire({
//         icon: "error",
//         title: "Not Allowed",
//         text: "You cannot purchase your own trade offer.",
//         confirmButtonColor: "#EF4444",
//         background: "#0f172a",
//         color: "#E2E8F0",
//       });
//       return;
//     }

//     // ✅ Check if user has address and payment info
//     if (
//       !findUser.address ||
//       !findUser.payments ||
//       findUser.payments.length === 0
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Profile Incomplete",
//         text: "Please update your address and payment method before proceeding.",
//         showCancelButton: true,
//         confirmButtonText: "Update Profile",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#3B82F6",
//         cancelButtonColor: "#9CA3AF",
//         background: "#0f172a",
//         color: "#E2E8F0",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/navbar/profile");
//         }
//       });
//       return;
//     }

//     // ✅ Proceed with payment if valid
//     if (trade.status !== "pending") return;
//     navigate("/navbar/payment", { state: trade });
//   };

//   // ✅ Filter today's trades
//   const today = new Date().toISOString().split("T")[0];
//   const todaysTrades = treads?.filter((trade) => {
//     const tradeDate = new Date(trade.createdAt).toISOString().split("T")[0];
//     return tradeDate === today;
//   });

//   refetch();

//   return (
//     <div className="text-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-400">
//           Trade Marketplace
//         </h1>
//         <button
//           onClick={handleCreateOffer}
//           className="bg-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
//         >
//           + Create Offer
//         </button>
//       </div>

//       <h2 className="text-lg font-medium text-gray-500 mb-4">
//         Today's Trade Offers
//       </h2>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-900/80 text-gray-200">
//             <tr>
//               {[
//                 "#",
//                 "User Name",
//                 "Energy (kWh)",
//                 "Price ($)",
//                 "Created At",
//                 "Action",
//               ].map((header) => (
//                 <th
//                   key={header}
//                   className="p-3 text-left border-b border-gray-700 font-medium"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-black">
//             {todaysTrades && todaysTrades.length > 0 ? (
//               todaysTrades.map((trade, idx) => (
//                 <tr
//                   key={trade._id}
//                   className="hover:bg-blue-950/10 transition-colors duration-150"
//                 >
//                   <td className="p-3 border-b border-gray-800">{idx + 1}</td>
//                   <td className="p-3 border-b border-gray-800 text-gray-500">
//                     {trade.userId?.username}
//                   </td>
//                   <td className="p-3 border-b border-gray-800 text-gray-500">
//                     {trade.sellEnergyAmount}
//                   </td>
//                   <td className="p-3 border-b border-gray-800 text-blue-400 font-semibold">
//                     ${trade.price}
//                   </td>
//                   <td className="p-3 border-b border-gray-800 text-gray-500">
//                     {new Date(trade.createdAt).toLocaleString()}
//                   </td>
//                   <td className="p-3 border-b border-gray-800">
//                     {trade.status === "pending" ? (
//                       trade.userId?.email === findUser?.email ? (
//                         <span className="text-yellow-400 font-semibold">
//                           Your Offer
//                         </span>
//                       ) : (
//                         <button
//                           onClick={() => handlePayment(trade)}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition-all duration-200"
//                         >
//                           Proceed to Payment
//                         </button>
//                       )
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
//                   className="text-center p-4 text-gray-400 border-t border-gray-800"
//                 >
//                   No trade offers available for today
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
//           <div className="bg-gray-900/95 border border-gray-700 p-6 rounded-2xl w-[420px] relative shadow-2xl">
//             <button
//               onClick={() => setOpenModal(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl transition"
//             >
//               ✕
//             </button>
//             <MakeTradeOffer setOpenModal={setOpenModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TradeMarketPlace;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MakeTradeOffer from "../MakeTradeOffer/MakeTradeOffer";
import useTrade from "../../../hooks/useTrade";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import axios from "axios";

const TradeMarketPlace = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [treads, refetch] = useTrade();
  const navigate = useNavigate();

  const { userEmail } = useUser();
  const [users] = useUsers();
  const [findUser, setFindUser] = useState(null);

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  // Filter today's trades
  const today = new Date().toISOString().split("T")[0];
  const todaysTrades = treads?.filter((trade) => {
    const tradeDate = new Date(trade.createdAt).toISOString().split("T")[0];
    return tradeDate === today;
  });

  // Refresh trades whenever component renders
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Create Offer
  const handleCreateOffer = () => {
    if (!findUser) return;

    const hasAddress = !!findUser.address;
    const hasPayment = !!findUser.payments && findUser.payments.length > 0;

    if (!hasAddress || !hasPayment) {
      Swal.fire({
        title: "Incomplete Profile",
        text: "You must add your address and payment method before creating a trade offer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563EB",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Update Now",
        cancelButtonText: "Cancel",
        background: "#1E293B",
        color: "#E2E8F0",
      }).then((result) => {
        if (result.isConfirmed) navigate("/navbar/profile");
      });
      return;
    }

    setEditingTrade(null);
    setOpenModal(true);
  };

  // Payment
  const handlePayment = (trade) => {
    if (!findUser) return;

    if (trade.userId?.email === findUser.email) {
      Swal.fire({
        icon: "error",
        title: "Not Allowed",
        text: "You cannot purchase your own trade offer.",
        confirmButtonColor: "#EF4444",
        background: "#0f172a",
        color: "#E2E8F0",
      });
      return;
    }

    if (
      !findUser.address ||
      !findUser.payments ||
      findUser.payments.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Profile Incomplete",
        text: "Please update your address and payment method before proceeding.",
        showCancelButton: true,
        confirmButtonText: "Update Profile",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#9CA3AF",
        background: "#0f172a",
        color: "#E2E8F0",
      }).then((result) => {
        if (result.isConfirmed) navigate("/navbar/profile");
      });
      return;
    }

    if (trade.status !== "pending") return;
    navigate("/navbar/payment", { state: trade });
  };

  // Delete trade
  const handleDelete = async (trade) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your trade offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_URL}/treadEnergy/${trade._id}`
        );
        Swal.fire("Deleted!", "Your trade offer has been deleted.", "success");
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete trade.", "error");
      }
    }
  };

  // Edit trade
  const handleEdit = (trade) => {
    setEditingTrade(trade);
    setOpenModal(true);
  };

  return (
    <div className="text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-400">
          Trade Marketplace
        </h1>
        <button
          onClick={handleCreateOffer}
          className="bg-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
        >
          + Create Offer
        </button>
      </div>

      <h2 className="text-lg font-medium text-gray-500 mb-4">
        Today's Trade Offers
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900/80 text-gray-200">
            <tr>
              {[
                "#",
                "User Name",
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
          <tbody className="text-black">
            {todaysTrades && todaysTrades.length > 0 ? (
              todaysTrades.map((trade, idx) => {
                const isOwnerPending =
                  trade.userId?.email === findUser?.email &&
                  trade.status === "pending";

                return (
                  <tr
                    key={trade._id}
                    className="hover:bg-blue-950/10 transition-colors duration-150"
                  >
                    <td className="p-3 border-b border-gray-800">{idx + 1}</td>
                    <td className="p-3 border-b border-gray-800 text-gray-500">
                      {trade.userId?.username}
                    </td>
                    <td className="p-3 border-b border-gray-800 text-gray-500">
                      {trade.sellEnergyAmount}
                    </td>
                    <td className="p-3 border-b border-gray-800 text-blue-400 font-semibold">
                      ${trade.price}
                    </td>
                    <td className="p-3 border-b border-gray-800 text-gray-500">
                      {new Date(trade.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 border-b border-gray-800">
                      {isOwnerPending ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(trade)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(trade)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                          >
                            Delete
                          </button>
                        </div>
                      ) : trade.status === "pending" ? (
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
                );
              })
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

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900/95 border border-gray-700 p-6 rounded-2xl w-[420px] relative shadow-2xl">
            <button
              onClick={() => {
                setOpenModal(false);
                setEditingTrade(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl transition"
            >
              ✕
            </button>
            <MakeTradeOffer
              setOpenModal={setOpenModal}
              editingTrade={editingTrade}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarketPlace;
