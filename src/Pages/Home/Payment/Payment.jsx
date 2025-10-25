import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../CustomProviders/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useUsers from "../../../hooks/useUsers";
import Swal from "sweetalert2";

const Payment = () => {
  const { userEmail } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const trade = location.state; // trade data passed from TradeMarketPlace

  const [paymentMethod, setPaymentMethod] = useState("BKASH");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, refetch, isPending] = useUsers();

  const [findUser, setFindUser] = useState();

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  // Auto-fill seller's number based on selected payment method
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

      console.log(payload);

      const res = await axios.post(
        "http://localhost:5000/api/v1/energinet/payment/create-payment",
        payload
      );
      console.log(res);

      // ✅ Use SweetAlert2
      await Swal.fire({
        title: "✅ Payment Successful!",
        text: "Your payment has been processed successfully.",
        icon: "success",
        confirmButtonText: "Go to Trades",
        confirmButtonColor: "#3085d6",
      });

      // ✅ Navigate after the alert is closed
      navigate("/navbar/trades");
    } catch (error) {
      console.error("Payment error:", error.response?.data || error);
      await Swal.fire({
        title: "❌ Error",
        text: "Error while processing payment.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!trade) {
    return (
      <div className="text-white p-6">
        <p>No trade selected. Go back to marketplace.</p>
        <button
          onClick={() => navigate("/navbar/trade")}
          className="mt-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Market
        </button>
      </div>
    );
  }

  return (
    <div className="text-white p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Payment</h1>

      {/* Trade details */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-2">
        <p>
          <span className="font-bold">Seller:</span> {trade.userId?.email}
        </p>
        <p>
          <span className="font-bold">Energy Amount:</span>{" "}
          {trade.sellEnergyAmount} kWh
        </p>

        <p>
          <span className="font-bold">Price:</span> ${trade.price}
        </p>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block mb-2 font-medium">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="BKASH">Bkash</option>
          <option value="NAGAD">Nagad</option>
          <option value="ROCKET">Rocket</option>
          <option value="CARD">Card</option>
        </select>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block mb-2 font-medium">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          // onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          readOnly
        />
      </div>

      {/* Confirm Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-500"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default Payment;
