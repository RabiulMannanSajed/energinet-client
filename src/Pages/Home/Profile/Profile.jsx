import { useEffect, useState } from "react";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import PrsonalTrade from "./PrsonalTrade/PrsonalTrade";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Profile = () => {
  const { userEmail } = useUser();
  const [users, refetch, isPending] = useUsers();
  const [loading, setLoading] = useState(false);
  const [findUser, setFindUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("Bkash");
  const [paymentNumber, setPaymentNumber] = useState("");

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Send PATCH request to backend
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

  const [preview, setPreview] = useState(findUser?.userImage || null);

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // show preview immediately
    setPreview(URL.createObjectURL(file));

    // upload to imgbb
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

      // send to backend
      await axios.patch(
        `http://localhost:5000/api/v1/energinet/users/${findUser?._id}`,
        { userImage: imgUrl }
      );

      alert("Profile picture updated!");
      refetch();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="text-white">
      <div
        className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex
                justify-between items-center
                w-[70%] mx-auto"
      >
        <div className="flex gap-8">
          <div className="flex flex-col items-center space-y-2">
            {/* Profile image */}
            <div className="">
              <img
                src={findUser?.userImage || preview}
                alt="User"
                className="w-[100px] h-[100px] object-cover rounded-full border"
              />
            </div>

            {/* Upload button with hidden input */}
            <label
              htmlFor="upload-photo"
              className="cursor-pointer flex items-center gap-1 text-white hover:underline text-sm"
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
            <p className="text-3xl mb-5 uppercase">{findUser?.username}</p>
            <p className="text-2xl">{findUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-16 mt-5">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8 text-white space-y-6 z-10 flex-5/12">
          <div className="flex justify-between items-center">
            <p className="text-3xl">Profile SetUp</p>{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-md"
            >
              Add Payment
            </button>
          </div>
          <p className="text-xl">Wallet Setup</p>
          <div>
            {findUser?.payments && findUser?.payments.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {findUser.payments.map((payment, index) => (
                  <li key={index}>
                    <span className="font-semibold">{payment.PMethod}:</span>{" "}
                    {payment.number}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment methods added yet.</p>
            )}
          </div>
          {/* Add Payment Button */}
          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white text-black rounded-2xl shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Add Payment</h2>

                {/* Select Payment Type */}
                <label className="block mb-2">Payment Type</label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full border rounded-lg p-2 mb-4"
                >
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Card">Card</option>
                </select>

                {/* Enter Number */}
                <label className="block mb-2">Number</label>
                <input
                  type="text"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  placeholder="Enter number"
                  className="w-full border rounded-lg p-2 mb-4"
                />

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex-1/12
                justify-between items-center"
        >
          <p className="text-3xl">Preferences</p>
        </div>
      </div>
      <p className="m-5 text-2xl">Tread Energy </p>
      <PrsonalTrade />
    </div>
  );
};

export default Profile;
