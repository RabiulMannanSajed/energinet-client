import React from "react";
import useUsers from "../../../../hooks/useUsers";
import { useUser } from "../../../../CustomProviders/useContext";

const AdminDashboardUsers = () => {
  //  here we will shoe all users not admin
  const [users, refetch, isPending] = useUsers();

  const { userEmail } = useUser();
  const normalUsers = users?.filter((user) => user.role !== "admin") || [];

  // total count
  const totalUsers = normalUsers.length;

  return (
    <div
      className="
                bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex
                justify-between items-center"
    >
      <h2>Total Users: {totalUsers}</h2>
    </div>
  );
};

export default AdminDashboardUsers;
