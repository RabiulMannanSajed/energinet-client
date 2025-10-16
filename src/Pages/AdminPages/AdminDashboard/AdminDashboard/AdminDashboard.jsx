import React from "react";
import AdminDashboardUsers from "../AdminDashboardUsers/AdminDashboardUsers";
import TradeEng from "../TradeEng/TradeEng";
import ForecastChart from "../../../Home/Forcast/ForecastChart";

const AdminDashboard = () => {
  return (
    <div className="text-white ">
      <div className="flex justify-around">
        <AdminDashboardUsers />
        <TradeEng />
      </div>
      <div className="mt-10">
        <ForecastChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
