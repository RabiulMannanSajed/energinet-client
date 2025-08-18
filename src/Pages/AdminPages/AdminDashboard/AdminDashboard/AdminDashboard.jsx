import React from "react";
import AdminDashboardUsers from "../AdminDashboardUsers/AdminDashboardUsers";

const AdminDashboard = () => {
  //  here call cll component
  return (
    <div className="text-white">
      <h1>this admin home</h1>
      <AdminDashboardUsers />
    </div>
  );
};

export default AdminDashboard;
