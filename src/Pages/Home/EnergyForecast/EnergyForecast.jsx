import React from "react";

const EnergyForecast = () => {
  const production = [0, 2, 3, 4, 5, 6];
  const usage = [6, 12, 6];

  // For demonstration, combine them as chat messages
  // Let's say production messages come from "Producer"
  // and usage messages come from "User"

  // We'll pair them by index up to max length
  const maxLen = Math.max(production.length, usage.length);
  const chatMessages = [];

  for (let i = 0; i < maxLen; i++) {
    if (i < production.length) {
      chatMessages.push({
        sender: "Producer",
        text: `Production value: ${production[i]}`,
      });
    }
    if (i < usage.length) {
      chatMessages.push({ sender: "User", text: `Usage time: ${usage[i]}` });
    }
  }
  return (
    <div className="mt-6">
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
        <div className="flex items-center justify-between font-medium text-2xl">
          <p>Energy Forecast</p>
          <p>Next 24 hr</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyForecast;
