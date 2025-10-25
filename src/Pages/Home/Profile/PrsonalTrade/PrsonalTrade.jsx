import { useEffect, useState } from "react";
import { useUser } from "../../../../CustomProviders/useContext";
import useUsers from "../../../../hooks/useUsers";
import useTrade from "../../../../hooks/useTrade";

const PrsonalTrade = () => {
  const { userEmail } = useUser();
  const [treads] = useTrade();

  const myTrades = treads.filter((trade) => trade.userId.email === userEmail);
  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full   rounded-lg">
        <thead className="">
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {myTrades?.length > 0 ? (
            myTrades.map((trade, index) => (
              <tr key={trade._id} className="">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{trade.sellEnergyAmount}</td>
                <td className="py-2 px-4 border-b">{trade.price}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(trade.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b text-red-400">
                  {trade.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No trades found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrsonalTrade;
