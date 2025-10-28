import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../CustomProviders/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";
import { FaBolt, FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  // Find current user
  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  // Buyer payment info
  useEffect(() => {
    if (findUser?.payments && paymentMethod) {
      const selectedBuyer = findUser.payments.find(
        (p) => p.PMethod.toLowerCase() === paymentMethod.toLowerCase()
      );
      setBuyerNumber(selectedBuyer ? selectedBuyer.number : "");
    }
  }, [paymentMethod, findUser]);

  // Seller payment info
  useEffect(() => {
    if (trade?.userId?.payments && paymentMethod) {
      const selected = trade.userId.payments.find(
        (p) => p.PMethod.toLowerCase() === paymentMethod.toLowerCase()
      );
      setPhoneNumber(selected ? selected.number : "");
    }
  }, [paymentMethod, trade]);

  // Countdown timer for OTP
  useEffect(() => {
    if (showOtpModal && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowOtpModal(false);
      Swal.fire({
        icon: "error",
        title: "⏰ OTP Expired",
        text: "Please request a new OTP.",
        confirmButtonColor: "#ef4444",
      });
    }
  }, [showOtpModal, timeLeft]);

  // Payment Handler
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const payload = {
  //       buyerId: findUser?._id,
  //       sellerId: trade.userId?._id,
  //       energyAmount: trade.sellEnergyAmount.toString(),
  //       amount: trade.price.toString(),
  //       paymentMethod,
  //       tradeId: trade._id,
  //       status: "SUCCESS",
  //       phoneNumber,
  //     };

  //     const res = await axios.post(
  //       `${import.meta.env.VITE_URL}/payment/create-payment`,
  //       payload
  //     );

  //     if (res.data.success) {
  //       await Swal.fire({
  //         title: "💰 Payment Successful!",
  //         html: `
  //           <p>Your transaction was completed successfully.</p>
  //           <hr class="my-2">
  //           <p><strong>Amount:</strong> $${trade.price}</p>
  //           <p><strong>Energy:</strong> ${trade.sellEnergyAmount} kWh</p>
  //         `,
  //         icon: "success",
  //         confirmButtonText: "Go to My Trades",
  //         confirmButtonColor: "#22c55e",
  //       });
  //       navigate("/navbar/trades");
  //     } else {
  //       await Swal.fire({
  //         title: "✅ Payment Completed",
  //         text: "Your payment was processed successfully.",
  //         icon: "info",
  //         confirmButtonColor: "#3b82f6",
  //       });
  //       navigate("/navbar/trades");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error.response?.data || error);
  //     await Swal.fire({
  //       title: "❌ Payment Failed",
  //       text: "Something went wrong while processing your payment. Please try again.",
  //       icon: "error",
  //       confirmButtonColor: "#ef4444",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        `${import.meta.env.VITE_URL}/payment/create-payment`,
        payload
      );
      const payment = res.data;

      if (payment && payment._id) {
        const transactionId = payment._id;

        await Swal.fire({
          title: "💰 Payment Successful!",
          html: `
      <p>Your transaction was completed successfully.</p>
      <hr class="my-2">
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Amount:</strong> ৳${trade.price}</p>
      <p><strong>Energy:</strong> ${trade.sellEnergyAmount} kWh</p>
    `,
          icon: "success",
          confirmButtonText: "Go to Trades",
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

        navigate("/navbar/trades");
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

  // Generate OTP and open modal
  const handleConfirmClick = () => {
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedOtp(otp);
    setShowOtpModal(true);
    setTimeLeft(30);
    Swal.fire({
      icon: "info",
      title: "🔐 OTP Sent",
      text: `Your OTP is ${otp}`,
      timer: 3000,
      showConfirmButton: false,
    });
  };

  // Verify OTP
  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setShowOtpModal(false);
      handlePayment();
    } else {
      Swal.fire({
        icon: "error",
        title: "❌ Invalid OTP",
        text: "Please enter the correct OTP.",
      });
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
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center text-gray-100">
      {/* LEFT SIDE - Info */}
      <div className="flex-1 flex flex-col justify-center border-r border-gray-700 p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">
          Trade Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Buyer Info */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Buyer Info</h3>
            <p className="flex items-center gap-2">
              <FaUser className="text-blue-400" /> {findUser?.username}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaEnvelope /> {findUser?.email || "N/A"}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaIdBadge /> ID: {findUser?._id?.slice(-4) || "----"}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Seller Info</h3>
            <p className="flex items-center gap-2">
              <FaUser className="text-green-400" /> {trade.userId?.username}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaEnvelope /> {trade.userId?.email}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaIdBadge /> ID: {trade.userId?._id?.slice(-4)}
            </p>
          </div>
        </div>

        {/* Trade Summary */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl mt-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaBolt className="text-yellow-400" /> Trade Summary
          </h3>
          <p>
            <strong>Energy:</strong> {trade.sellEnergyAmount} kWh
          </p>
          <p>
            <strong>Price:</strong> ${trade.price}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Payment */}
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

          {/* Seller Number */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-300">
              Seller’s {paymentMethod} Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
            />
          </div>

          {/* Buyer Number */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-300">
              Buyer’s {paymentMethod} Number
            </label>
            <input
              type="text"
              value={buyerNumber}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200"
            />
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmClick}
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

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-gray-800">
            <h3 className="text-xl font-semibold text-center mb-2">
              Enter OTP
            </h3>
            <p className="text-sm text-center mb-4 text-gray-500">
              Expires in <b>{timeLeft}s</b>
            </p>

            {/* Progress line */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>

            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              maxLength="5"
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg mb-4 text-center text-lg tracking-widest"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowOtpModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtp}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
