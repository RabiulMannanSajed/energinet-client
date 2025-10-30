// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useUser } from "../../../CustomProviders/useContext";
// import useUsers from "../../../hooks/useUsers";
// import Swal from "sweetalert2";

// const MakeTradeOffer = ({ setOpenModal }) => {
//   const { userEmail } = useUser();
//   console.log("userEmail", userEmail);
//   const [users, refetch, isPending] = useUsers();
//   const [findUser, setFindUser] = useState();
//   console.log("findUser", findUser);

//   useEffect(() => {
//     if (users && userEmail) {
//       const currentUser = users.find((user) => user.email === userEmail);
//       setFindUser(currentUser || null);
//     }
//   }, [userEmail, users]);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         userId: findUser._id,
//       };
//       // 👇 send form data to backend
//       const res = await fetch(
//         `${import.meta.env.VITE_URL}/treadEnergy/create-treading`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await res.json();
//       console.log("Trade created:", result);

//       reset(); // ✅ clear form after submit
//       await Swal.fire({
//         title: "✅ Trade Successful!",
//         text: "YourTrade has been processed successfully.",
//         icon: "success",
//         confirmButtonText: "Go to Trades",
//         confirmButtonColor: "#3085d6",
//       });
//       setOpenModal(false);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="text-white">
//       <h2 className="text-xl font-semibold mb-4">Create Trade Offer</h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg"
//       >
//         {/* userId */}

//         {/* sellEnergyAmount */}
//         <div>
//           <label className="block mb-1">Sell Energy Amount</label>
//           <input
//             type="number"
//             {...register("sellEnergyAmount", {
//               required: "Energy amount is required",
//               min: { value: 1, message: "Must be greater than 0" },
//             })}
//             className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//             placeholder="Enter energy amount"
//           />
//           {errors.sellEnergyAmount && (
//             <p className="text-red-400 text-sm">
//               {errors.sellEnergyAmount.message}
//             </p>
//           )}
//         </div>

//         {/* price */}
//         <div>
//           <label className="block mb-1">Price</label>
//           <input
//             type="number"
//             {...register("price", {
//               required: "Price is required",
//               min: { value: 1, message: "Must be greater than 0" },
//             })}
//             className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//             placeholder="Enter price"
//           />
//           {errors.price && (
//             <p className="text-red-400 text-sm">{errors.price.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//         >
//           Submit Offer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MakeTradeOffer;

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MakeTradeOffer = ({ setOpenModal, editingTrade, refetch }) => {
  const [sellEnergyAmount, setSellEnergyAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingTrade) {
      setSellEnergyAmount(editingTrade.sellEnergyAmount);
      setPrice(editingTrade.price);
    } else {
      setSellEnergyAmount("");
      setPrice("");
    }
  }, [editingTrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellEnergyAmount || !price) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    setLoading(true);

    try {
      if (editingTrade) {
        // ✅ Update existing trade
        await axios.patch(
          `${import.meta.env.VITE_URL}/treadEnergy/${editingTrade._id}`,
          {
            sellEnergyAmount,
            price,
          }
        );
        Swal.fire("Updated!", "Trade offer updated successfully.", "success");
      } else {
        // ✅ Create new trade
        await axios.post(`${import.meta.env.VITE_URL}/treadEnergy`, {
          sellEnergyAmount,
          price,
        });
        Swal.fire("Created!", "Trade offer created successfully.", "success");
      }

      refetch();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-200 mb-1">Sell Energy (kWh)</label>
        <input
          type="number"
          value={sellEnergyAmount}
          onChange={(e) => setSellEnergyAmount(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200"
          placeholder="Enter energy amount"
        />
      </div>

      <div>
        <label className="block text-gray-200 mb-1">Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200"
          placeholder="Enter price"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium transition ${
          editingTrade
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Processing..."
          : editingTrade
          ? "Update Offer"
          : "Create Offer"}
      </button>
    </form>
  );
};

export default MakeTradeOffer;
