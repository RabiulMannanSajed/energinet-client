import React from "react";

const EnergyForecast = () => {
  return (
    <div className="mt-10 ">
      <div
        className="
          bg-gradient-to-br from-green-800 via-green-700 to-green-600
          text-white rounded-3xl shadow-2xl p-8 
          border border-green-400/20
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green-300/30 pb-4 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            🔋 Energy Forecast
          </h2>
          <span className="bg-green-500/20 text-green-200 px-4 py-1 rounded-full text-sm font-medium border border-green-300/40">
            Next 7 Days
          </span>
        </div>

        {/* Chat Section */}

        {/* Footer */}
        <div className="mt-8 text-center text-green-200/80 text-sm">
          <p>Data generated using AI-based energy prediction algorithms ⚡</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyForecast;
