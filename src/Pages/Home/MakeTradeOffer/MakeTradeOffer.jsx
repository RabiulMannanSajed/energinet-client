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
