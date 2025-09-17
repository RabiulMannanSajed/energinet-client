import React from "react";
import AdminDashboardUsers from "../AdminDashboardUsers/AdminDashboardUsers";
import TradeEng from "../TradeEng/TradeEng";

const AdminDashboard = () => {
  return (
    <div className="text-white ">
      <div className="flex justify-around">
        <AdminDashboardUsers />
        <TradeEng />
      </div>
    </div>
  );
};

export default AdminDashboard;
