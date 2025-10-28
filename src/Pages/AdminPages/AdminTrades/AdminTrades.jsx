import useTrade from "../../../hooks/useTrade";

const AdminTrades = () => {
  const [treads] = useTrade();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Admin Trades
      </h2>

      {treads?.length === 0 ? (
        <p className="text-gray-400">No trades found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm text-gray-500">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  #
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  User Name
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  Sell Energy (kWh)
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  Price (৳)
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-700">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {treads.map((trade, index) => (
                <tr
                  key={trade._id}
                  className="hover:bg-gray-800 hover:text-white transition-colors duration-300"
                >
                  <td className="px-4 py-2 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {trade.userId?.username || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {trade.sellEnergyAmount}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    ৳{trade.price}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.status === "pending"
                          ? "bg-yellow-600 text-yellow-100"
                          : trade.status === "sold"
                          ? "bg-green-600 text-green-100"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {trade.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {new Date(trade.createdAt).toLocaleDateString()}{" "}
                    {new Date(trade.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTrades;
