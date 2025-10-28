// import React from "react";
// import useUsers from "../../../../hooks/useUsers";
// import { useUser } from "../../../../CustomProviders/useContext";
// import { IoPeople } from "react-icons/io5";

// const AdminDashboardUsers = () => {
//   //  here we will shoe all users not admin
//   const [users] = useUsers();

//   const { userEmail } = useUser();
//   const normalUsers = users?.filter((user) => user.role !== "admin") || [];

//   // total count
//   const totalUsers = normalUsers.length;

//   return (
//     <div
//       className="
//                 bg-white/5
//                 backdrop-blur-md
//                 border
//                 border-white/20
//                 rounded-2xl
//                 shadow-lg
//                 p-8
//                 text-white
//                 z-10"
//     >
//       <h2 className="text-xl">Active User </h2>
//       <br />
//       <div className="flex items-center gap-2">
//         <p className="text-2xl ">{totalUsers}</p>
//         <IoPeople className="text-yellow-300 text-2xl font-bold" />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardUsers;

import React from "react";
import useUsers from "../../../../hooks/useUsers";
import { useUser } from "../../../../CustomProviders/useContext";
import { IoPeople } from "react-icons/io5";

const AdminDashboardUsers = () => {
  const [users] = useUsers();
  const { userEmail } = useUser();

  const normalUsers = users?.filter((user) => user.role !== "admin") || [];
  const totalUsers = normalUsers.length;

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        p-6
        hover:shadow-md
        transition-all
        duration-200
        flex
        flex-col
        justify-between
      "
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Active Users</h2>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 text-sky-600">
          <IoPeople size={26} />
        </div>
        <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Showing total registered users (excluding admins)
      </p>
    </div>
  );
};

export default AdminDashboardUsers;
