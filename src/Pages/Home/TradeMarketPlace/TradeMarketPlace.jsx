import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MakeTradeOffer from "../MakeTradeOffer/MakeTradeOffer";
import useTrade from "../../../hooks/useTrade";

const TradeMarketPlace = () => {
  const [openModal, setOpenModal] = useState(false);
  const [treads, refetch] = useTrade();
  const navigate = useNavigate();

  // ✅ Handle payment redirect
  const handlePayment = (trade) => {
    // You can pass trade data using state or query params
    navigate("/navbar/payment", { state: trade });
  };
  refetch();

  return (
    <div className="text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Trade MarketPlace</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Offer
        </button>
      </div>

      <h1 className="mt-6 mb-4 text-lg">All Trade Offers</h1>

      {/* ✅ Table of trades */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600 text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-600">#</th>
              <th className="p-2 border border-gray-600">User Email</th>
              <th className="p-2 border border-gray-600">Energy (kWh)</th>
              <th className="p-2 border border-gray-600">Price ($)</th>
              <th className="p-2 border border-gray-600">Created At</th>
              <th className="p-2 border border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {treads && treads.length > 0 ? (
              treads.map((trade, idx) => (
                <tr key={trade._id} className="hover:bg-gray-800">
                  <td className="p-2 border border-gray-600">{idx + 1}</td>
                  <td className="p-2 border border-gray-600">
                    {trade.userId?.email}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {trade.sellEnergyAmount}
                  </td>
                  <td className="p-2 border border-gray-600">{trade.price}</td>
                  <td className="p-2 border border-gray-600">
                    {new Date(trade.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {trade.status === "pending" ? (
                      <button
                        onClick={() => handlePayment(trade)}
                        className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                      >
                        Proceed to Payment
                      </button>
                    ) : trade.status === "SUCCESS" ? (
                      <span className="text-green-400 font-semibold">
                        Sold Out
                      </span>
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
                  className="text-center p-4 text-gray-400 border border-gray-600"
                >
                  No trade offers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[400px] relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 text-white text-lg"
            >
              ✖
            </button>

            {/* Render MakeTradeOffer Component */}
            <MakeTradeOffer />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarketPlace;
