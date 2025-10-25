// import React from "react";

// const EnergyForecast = () => {
//   const production = [0, 2, 3, 4, 5, 6];
//   const usage = [6, 12, 6];

//   const maxLen = Math.max(production.length, usage.length);
//   const chatMessages = [];

//   for (let i = 0; i < maxLen; i++) {
//     if (i < production.length) {
//       chatMessages.push({
//         sender: "Producer",
//         text: `Production value: ${production[i]}`,
//       });
//     }
//     if (i < usage.length) {
//       chatMessages.push({ sender: "User", text: `Usage time: ${usage[i]}` });
//     }
//   }
//   return (
//     <div className="mt-6">
//       <div
//         className="
//               bg-white/5
//               backdrop-blur-md
//               border
//               border-white/20
//               rounded-2xl
//               shadow-lg
//               p-8
//               text-white
//               space-y-6
//             "
//       >
//         <div className="flex items-center justify-between font-medium text-2xl">
//           <p>Energy Forecast</p>
//           <p>Next 7 days </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnergyForecast;

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
