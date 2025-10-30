import React, { useState } from "react";
import useUsers from "../../../../hooks/useUsers";
import axios from "axios";
import { toast } from "react-toastify";

const UserActiveits = () => {
  const [users, refetch] = useUsers();
  const [loadingId, setLoadingId] = useState(null);

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
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-8  min-h-screen text-black">
      <h2 className="text-3xl font-semibold mb-6 text-center text-cyan-600">
        User Activities
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-300 bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-cyan-300 uppercase text-sm tracking-wider">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">User Image</th>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-gray-300 bg-white text-black hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={user.userImage || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border border-gray-400"
                  />
                </td>
                <td className="p-3 font-medium">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>

                <td className="p-3">
                  {user.isDeleted ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full font-semibold">
                      Deactivated
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleToggle(user)}
                    disabled={loadingId === user._id}
                    className={`px-4 py-1.5 rounded-lg text-white text-sm font-semibold shadow-md transition-all duration-200 ${
                      user.isDeleted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } ${
                      loadingId === user._id
                        ? "opacity-60 cursor-not-allowed"
                        : ""
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

            {users?.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActiveits;
