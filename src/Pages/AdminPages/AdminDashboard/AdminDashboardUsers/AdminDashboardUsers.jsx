import React from "react";
import useUsers from "../../../../hooks/useUsers";
import { useUser } from "../../../../CustomProviders/useContext";
import { IoPeople } from "react-icons/io5";

const AdminDashboardUsers = () => {
  //  here we will shoe all users not admin
  const [users] = useUsers();

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
                z-10"
    >
      <h2 className="text-xl">Active User </h2>
      <br />
      <div className="flex items-center gap-2">
        <p className="text-2xl ">{totalUsers}</p>
        <IoPeople className="text-yellow-300 text-2xl font-bold" />
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
