import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../CustomProviders/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useUsers from "../../../hooks/useUsers";

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
  console.log("findUser", findUser);

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        buyerId: findUser?._id, // logged in buyer
        sellerId: trade.userId?._id, // seller
        energyAmount: trade.sellEnergyAmount,
        amount: trade.price,
        paymentMethod,
        phoneNumber,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/energinet/payment/create-payment",
        payload
      );

      if (res.data.success) {
        alert("Payment successful!");
        navigate("/navbar/trades");
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error);
      alert("Error while processing payment.");
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
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Enter phone number"
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
