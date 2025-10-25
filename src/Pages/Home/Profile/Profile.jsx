// import { useEffect, useState } from "react";
// import { useUser } from "../../../CustomProviders/useContext";
// import useUsers from "../../../hooks/useUsers";
// import axios from "axios";
// import { Camera } from "lucide-react";
// import PrsonalTrade from "./PrsonalTrade/PrsonalTrade";
// import Swal from "sweetalert2";
// import useTrade from "../../../hooks/useTrade";

// const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

// const Profile = () => {
//   const { userEmail } = useUser();
//   const [users, refetch] = useUsers();
//   const [treads] = useTrade();
//   const [loading, setLoading] = useState(false);
//   const [findUser, setFindUser] = useState();
//   const [isOpen, setIsOpen] = useState(false);
//   const [paymentType, setPaymentType] = useState("Bkash");
//   const [paymentNumber, setPaymentNumber] = useState("");
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (users && userEmail) {
//       const currentUser = users.find((user) => user.email === userEmail);
//       setFindUser(currentUser || null);
//       setPreview(currentUser?.userImage || null);
//     }
//   }, [userEmail, users]);

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.patch(
//         `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
//         {
//           $push: {
//             payments: {
//               PMethod: paymentType,
//               number: paymentNumber,
//             },
//           },
//         }
//       );
//       console.log("Payment saved:", res.data);
//       setIsOpen(false);
//       setPaymentNumber("");
//       refetch();
//     } catch (error) {
//       console.error("Error saving payment:", error.response?.data || error);
//       alert("Failed to save payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPreview(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const imgRes = await fetch(img_hosting_url, {
//         method: "POST",
//         body: formData,
//       });
//       const imgData = await imgRes.json();
//       const imgUrl = imgData.success ? imgData.data.display_url : null;

//       if (!imgUrl) {
//         alert("Image upload failed!");
//         return;
//       }

//       await axios.patch(
//         `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
//         { userImage: imgUrl }
//       );

//       Swal.fire("✅ Success", "Profile picture updated!", "success");
//       refetch();
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Something went wrong!");
//     }
//   };

//   const userSoldTrades = treads.filter(
//     (trade) => trade.userId._id === findUser?._id && trade.status === "sold"
//   );

//   const totalEarnings = userSoldTrades.reduce(
//     (sum, trade) => sum + trade.price,
//     0
//   );

//   //  here add the user address
//   const userAddress = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.patch(
//         `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
//         {
//           address: "user address here",
//         }
//       );
//       console.log("Address saved:", res.data);
//       refetch();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] text-[#111827] p-10">
//       {/* Profile Header */}
//       <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-lg p-8 flex justify-between items-center w-[70%] mx-auto">
//         <div className="flex gap-8">
//           <div className="flex flex-col items-center space-y-3">
//             <img
//               src={preview || findUser?.userImage}
//               alt="User"
//               className="w-[100px] h-[100px] object-cover rounded-full border border-gray-300 shadow-sm"
//             />
//             <label
//               htmlFor="upload-photo"
//               className="cursor-pointer flex items-center gap-1 text-[#3B82F6] hover:text-[#2563EB] text-sm font-medium"
//             >
//               <Camera size={16} />
//               Change Photo
//             </label>
//             <input
//               id="upload-photo"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>

//           <div>
//             <p className="text-3xl font-semibold mb-3 capitalize">
//               {findUser?.username}
//             </p>
//             <p className="text-gray-600">Email: {findUser?.email}</p>
//             <p className="text-gray-600">
//               User ID: {findUser?._id ? findUser._id.slice(0, 6) : ""}
//             </p>
//           </div>
//           {/*  here need the btn and then open a model where user can select his address  */}
//         </div>
//       </div>

//       {/* Wallet + Payment Section */}
//       <div className="flex gap-8 mt-10 w-[70%] mx-auto">
//         {/* Payment Setup */}
//         <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md p-8 flex-1">
//           <div className="flex justify-between items-center mb-6">
//             <p className="text-2xl font-semibold">Wallet Setup</p>
//             <button
//               onClick={() => setIsOpen(true)}
//               className="bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-xl shadow text-white transition"
//             >
//               Add Payment
//             </button>
//           </div>

//           {findUser?.payments && findUser?.payments.length > 0 ? (
//             <ul className="space-y-2">
//               {findUser.payments.map((payment, index) => (
//                 <li key={index} className="text-gray-700">
//                   <span className="font-semibold text-[#10B981]">
//                     {payment.PMethod}:
//                   </span>{" "}
//                   {payment.number}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No payment methods added yet.</p>
//           )}
//         </div>

//         {/* Wallet Balance */}
//         <div className="bg-gradient-to-br from-[#10B981] to-[#3B82F6] border border-transparent rounded-2xl shadow-md p-8 flex-1 flex flex-col justify-center items-center text-white text-center">
//           <p className="text-2xl mb-2 font-medium">My Wallet</p>
//           <p className="text-5xl font-bold">{totalEarnings}৳</p>
//         </div>
//       </div>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-96 p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Add Payment
//             </h2>

//             <label className="block mb-2 text-gray-700">Payment Type</label>
//             <select
//               value={paymentType}
//               onChange={(e) => setPaymentType(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
//             >
//               <option value="Bkash">Bkash</option>
//               <option value="Nagad">Nagad</option>
//               <option value="Rocket">Rocket</option>
//               <option value="Card">Card</option>
//             </select>

//             <label className="block mb-2 text-gray-700">Number</label>
//             <input
//               type="text"
//               value={paymentNumber}
//               onChange={(e) =>
//                 /^\d*$/.test(e.target.value) && setPaymentNumber(e.target.value)
//               }
//               placeholder="Enter number"
//               className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] transition text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Trades Section */}
//       <div className="w-[70%] mx-auto mt-10">
//         <p className="text-2xl font-semibold mb-4 text-gray-800">
//           Trade History
//         </p>
//         <PrsonalTrade />
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";
import axios from "axios";
import { Camera, MapPin } from "lucide-react";
import PrsonalTrade from "./PrsonalTrade/PrsonalTrade";
import Swal from "sweetalert2";
import useTrade from "../../../hooks/useTrade";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Profile = () => {
  const { userEmail } = useUser();
  const [users, refetch] = useUsers();
  const [treads] = useTrade();
  const [loading, setLoading] = useState(false);
  const [findUser, setFindUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentType, setPaymentType] = useState("Bkash");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [preview, setPreview] = useState(null);

  const areas = [
    "Natun Bazar",
    "100 Feet",
    "Baridhara J Block",
    "Gulshan 1",
    "Sayednogor",
    "Auto Stand",
  ];

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
      setPreview(currentUser?.userImage || null);
      setSelectedAddress(currentUser?.address || "");
    }
  }, [userEmail, users]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
        {
          $push: {
            payments: {
              PMethod: paymentType,
              number: paymentNumber,
            },
          },
        }
      );
      console.log("Payment saved:", res.data);
      setIsOpen(false);
      setPaymentNumber("");
      refetch();
    } catch (error) {
      console.error("Error saving payment:", error.response?.data || error);
      alert("Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const imgRes = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();
      const imgUrl = imgData.success ? imgData.data.display_url : null;

      if (!imgUrl) {
        alert("Image upload failed!");
        return;
      }

      await axios.patch(
        `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
        { userImage: imgUrl }
      );

      Swal.fire("✅ Success", "Profile picture updated!", "success");
      refetch();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Something went wrong!");
    }
  };

  // 🟢 Total earnings
  const userSoldTrades = treads.filter(
    (trade) => trade.userId._id === findUser?._id && trade.status === "sold"
  );

  const totalEarnings = userSoldTrades.reduce(
    (sum, trade) => sum + trade.price,
    0
  );

  // 🟢 Address update
  const handleAddressSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
        {
          address: selectedAddress,
        }
      );
      console.log("Address saved:", res.data);
      Swal.fire("✅ Success", "Address updated successfully!", "success");
      refetch();
      setAddressModal(false);
    } catch (error) {
      console.log(error);
      Swal.fire("❌ Error", "Failed to update address!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FAF7] text-[#111827] p-10">
      {/* Profile Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-lg p-8 flex justify-between items-center w-[70%] mx-auto">
        <div className="flex gap-8">
          <div className="flex flex-col items-center space-y-3">
            <img
              src={preview || findUser?.userImage}
              alt="User"
              className="w-[100px] h-[100px] object-cover rounded-full border border-gray-300 shadow-sm"
            />
            <label
              htmlFor="upload-photo"
              className="cursor-pointer flex items-center gap-1 text-[#0EA5E9] hover:text-[#0284C7] text-sm font-medium"
            >
              <Camera size={16} />
              Change Photo
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <p className="text-3xl font-semibold mb-3 capitalize">
              {findUser?.username}
            </p>
            <p className="text-gray-600">Email: {findUser?.email}</p>
            <p className="text-gray-600">
              User ID: {findUser?._id ? findUser._id.slice(0, 6) : ""}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#0EA5E9]" />
              <p className="text-gray-700">
                Address:{" "}
                {findUser?.address ? (
                  <span className="font-medium text-[#10B981]">
                    {findUser.address}
                  </span>
                ) : (
                  "No address added yet"
                )}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAddressModal(true)}
          className="bg-[#10B981] hover:bg-[#059669] px-4 py-2 rounded-xl text-white shadow transition"
        >
          Update Address
        </button>
      </div>

      {/* Wallet + Payment Section */}
      <div className="flex gap-8 mt-10 w-[70%] mx-auto">
        {/* Payment Setup */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold">Wallet Setup</p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#0EA5E9] hover:bg-[#0284C7] px-4 py-2 rounded-xl shadow text-white transition"
            >
              Add Payment
            </button>
          </div>

          {findUser?.payments && findUser?.payments.length > 0 ? (
            <ul className="space-y-2">
              {findUser.payments.map((payment, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold text-[#10B981]">
                    {payment.PMethod}:
                  </span>{" "}
                  {payment.number}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No payment methods added yet.</p>
          )}
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-[#10B981] to-[#0EA5E9] border border-transparent rounded-2xl shadow-md p-8 flex-1 flex flex-col justify-center items-center text-white text-center">
          <p className="text-2xl mb-2 font-medium">My Wallet</p>
          <p className="text-5xl font-bold">{totalEarnings}৳</p>
        </div>
      </div>

      {/* Address Modal */}
      {addressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Select Your Address
            </h2>

            <div className="space-y-2">
              {areas.map((area, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    value={area}
                    checked={selectedAddress === area}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  {area}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAddressModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddressSave}
                className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] transition text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Payment
            </h2>

            <label className="block mb-2 text-gray-700">Payment Type</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              <option value="Bkash">Bkash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Card">Card</option>
            </select>

            <label className="block mb-2 text-gray-700">Number</label>
            <input
              type="text"
              value={paymentNumber}
              onChange={(e) =>
                /^\d*$/.test(e.target.value) && setPaymentNumber(e.target.value)
              }
              placeholder="Enter number"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] transition text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trades Section */}
      <div className="w-[70%] mx-auto mt-10">
        <p className="text-2xl font-semibold mb-4 text-gray-800">
          Trade History
        </p>
        <PrsonalTrade />
      </div>
    </div>
  );
};

export default Profile;
