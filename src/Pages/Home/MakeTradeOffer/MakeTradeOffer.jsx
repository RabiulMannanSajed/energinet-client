import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";

const MakeTradeOffer = () => {
  const { userEmail } = useUser();
  const [users, refetch, isPending] = useUsers();
  const [findUser, setFindUser] = useState();
  console.log("findUser", findUser);

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        userId: findUser._id,
      };
      // 👇 send form data to backend
      const res = await fetch(
        "http://localhost:5000/api/v1/energinet/treadEnergy/create-treading",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log("Trade created:", result);

      reset(); // ✅ clear form after submit
      alert("Trade offer created successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-4">Create Trade Offer</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg"
      >
        {/* userId */}

        {/* sellEnergyAmount */}
        <div>
          <label className="block mb-1">Sell Energy Amount</label>
          <input
            type="number"
            {...register("sellEnergyAmount", {
              required: "Energy amount is required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            placeholder="Enter energy amount"
          />
          {errors.sellEnergyAmount && (
            <p className="text-red-400 text-sm">
              {errors.sellEnergyAmount.message}
            </p>
          )}
        </div>

        {/* price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-400 text-sm">{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeTradeOffer;
