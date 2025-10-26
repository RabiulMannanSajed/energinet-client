import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../CustomProviders/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import {
  FaBolt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaUser,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";

const Payment = () => {
  const { userEmail } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const trade = location.state;

  const [paymentMethod, setPaymentMethod] = useState("BKASH");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [users] = useUsers();
  const [findUser, setFindUser] = useState();
  const [buyerNumber, setBuyerNumber] = useState("");
  // Find current user
  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  useEffect(() => {
    if (findUser?.payments && paymentMethod) {
      const selectedBuyer = findUser.payments.find(
        (p) => p.PMethod.toLowerCase() === paymentMethod.toLowerCase()
      );
      setBuyerNumber(selectedBuyer ? selectedBuyer.number : "");
    }
  }, [paymentMethod, findUser]);
  // Auto-fill seller number
  useEffect(() => {
    if (trade?.userId?.payments && paymentMethod) {
      const selected = trade.userId.payments.find(
        (p) => p.PMethod.toLowerCase() === paymentMethod.toLowerCase()
      );
      setPhoneNumber(selected ? selected.number : "");
    }
  }, [paymentMethod, trade]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        buyerId: findUser?._id,
        sellerId: trade.userId?._id,
        energyAmount: trade.sellEnergyAmount.toString(),
        amount: trade.price.toString(),
        paymentMethod,
        tradeId: trade._id,
        status: "SUCCESS",
        phoneNumber,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/energinet/payment/create-payment",
        payload
      );

      if (res.data.success) {
        await Swal.fire({
          title: "💰 Payment Successful!",
          html: `
            <p>Your transaction was completed successfully.</p>
            <hr class="my-2">
            <p><strong>Amount:</strong> $${trade.price}</p>
            <p><strong>Energy:</strong> ${trade.sellEnergyAmount} kWh</p>
          `,
          icon: "success",
          confirmButtonText: "Go to My Trades",
          confirmButtonColor: "#22c55e",
        });
        navigate("/navbar/trades");
      } else {
        await Swal.fire({
          title: "✅ Payment Completed",
          text: "Your payment was processed successfully.",
          icon: "info",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error);
      await Swal.fire({
        title: "❌ Payment Failed",
        text: "Something went wrong while processing your payment. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!trade) {
    return (
      <div className="text-gray-200 p-8 text-center">
        <p className="text-lg mb-3">
          ⚠️ No trade selected. Go back to the marketplace.
        </p>
        <button
          onClick={() => navigate("/navbar/trade")}
          className="mt-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Market
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center  text-gray-100">
      {/* LEFT SIDE - User Info */}
      <div className="flex-1 flex flex-col justify-center  border-r border-gray-700 p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">
          Trade Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Buyer Info */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-blue-400" />
              <h3 className="text-xl font-semibold">Buyer Info</h3>
            </div>
            <p className="flex items-center gap-2">
              <FaEnvelope /> {findUser?.email || "N/A"}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaIdBadge /> ID: {findUser?._id?.slice(-4) || "----"}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="text-green-400" />
              <h3 className="text-xl font-semibold">Seller Info</h3>
            </div>
            <p className="flex items-center gap-2">
              <FaEnvelope /> {trade.userId?.email}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaIdBadge /> ID: {trade.userId?._id?.slice(-4)}
            </p>
          </div>
        </div>

        {/* Trade Summary */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl mt-8 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaBolt className="text-yellow-400" />
            <h3 className="text-xl font-semibold">Trade Summary</h3>
          </div>
          <p>
            <strong>Energy:</strong> {trade.sellEnergyAmount} kWh
          </p>
          <p>
            <strong>Price:</strong> ${trade.price}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Payment Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            Confirm Payment
          </h1>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-300">
              Select Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="BKASH">Bkash</option>
              <option value="NAGAD">Nagad</option>
              <option value="ROCKET">Rocket</option>
              <option value="CARD">Card</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className=" mb-2 font-medium text-gray-300 flex items-center gap-2">
              Seller’s {paymentMethod} Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-300">
              Buyer’s {paymentMethod} Number
            </label>
            <input
              type="text"
              value={buyerNumber}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-200"
            />
          </div>
          {/* Confirm Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
            }`}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
