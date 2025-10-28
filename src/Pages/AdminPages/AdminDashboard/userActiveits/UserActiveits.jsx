import React, { useState } from "react";
import useUsers from "../../../../hooks/useUsers";
import axios from "axios";
import { toast } from "react-toastify";

const UserActiveits = () => {
  const [users, refetch] = useUsers(); // assuming your hook returns [data, refetch]
  const [loadingId, setLoadingId] = useState(null);

  // ✅ Toggle user activation status
  const handleToggle = async (user) => {
    try {
      setLoadingId(user._id);
      const updatedStatus = !user.isDeleted;

      await axios.patch(`${import.meta.env.VITE_URL}/users/${user._id}`, {
        isDeleted: updatedStatus,
      });

      toast.success(
        updatedStatus
          ? "User deactivated successfully!"
          : "User activated successfully!"
      );
      refetch(); // refresh data
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">User Activities</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-gray-700 rounded-2xl">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">User Image</th>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-gray-700 hover:bg-gray-800 transition-all"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={user.userImage || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  {user.isDeleted ? (
                    <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                      Deactivated
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                      Active
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggle(user)}
                    disabled={loadingId === user._id}
                    className={`px-4 py-1 rounded-lg text-white text-sm font-medium ${
                      user.isDeleted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {loadingId === user._id
                      ? "Processing..."
                      : user.isDeleted
                      ? "Activate"
                      : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActiveits;
