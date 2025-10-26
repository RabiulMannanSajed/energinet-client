import React from "react";

const GridConnection = () => {
  return (
    <div
      className="
        bg-gradient-to-br from-green-900 via-emerald-800 to-blue-900
        border border-white/10
        rounded-2xl
        shadow-2xl
        p-8
        text-white
        space-y-6
        transition-all duration-300 hover:shadow-green-700/30
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-emerald-300">
          ⚙️ Grid Connection
        </p>
        <span className="text-sm text-gray-300">Live Status</span>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className="relative">
          {/* glowing status light */}
          <span className="absolute inline-flex h-5 w-5 rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex h-5 w-5 rounded-full bg-green-500"></span>
        </div>
        <p className="text-lg font-medium text-green-400 drop-shadow-md">
          Connected
        </p>
      </div>

      <p className="text-sm text-gray-300 mt-3">
        The grid is currently active and synchronized. Real-time energy flow is
        stable with optimal connectivity.
      </p>
    </div>
  );
};

export default GridConnection;
