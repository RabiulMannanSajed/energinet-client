import React from "react";

const Overview = () => {
  return (
    <div className="">
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
        "
      >
        <p className=" font-medium text-2xl"> Overview</p>
        <div className="flex flex-wrap gap-6">
          <div
            className="
          bg-gray-900/5
          backdrop-blur-md
          border
          border-white/10
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
        "
          >
            <p className=" font-semibold text-xl"> Current Usage</p>
            <p>
              {" "}
              <span className="text-3xl">2.5</span> kWh
            </p>
          </div>
          <div
            className="
          bg-gray-900/5
          backdrop-blur-md
          border
          border-white/10
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
        "
          >
            <p className=" font-semibold text-xl"> Current Usage</p>
            <p>
              {" "}
              <span className="text-3xl">2.5</span> kWh
            </p>
          </div>
          <div
            className="
          bg-gray-900/5
          backdrop-blur-md
          border
          border-white/10
          rounded-2xl
          shadow-lg
          p-8
          text-white
          space-y-6
        "
          >
            <p className=" font-semibold text-xl"> Current Usage</p>
            <p>
              {" "}
              <span className="text-3xl">2.5</span> kWh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
