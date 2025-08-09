import React from "react";

const GridConnection = () => {
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
          space-y-6
        "
    >
      <p>Grid Connection</p>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-green-600 w-5 h-5 rounded-2xl"></p>
        <p className="text-green-500">Connected</p>
      </div>
    </div>
  );
};

export default GridConnection;
