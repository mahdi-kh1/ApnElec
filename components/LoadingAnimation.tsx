import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-16">
      <div className="relative w-16 h-16 bg-gray-300 rounded-md shadow-md">
        {/* Solar Panel Icon */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-500 rounded-md animate-pulse"></div>

        {/* Sun Animation */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 w-10 h-10 rounded-full bg-yellow-400 opacity-80 animate-sun">
          <div className="w-10 h-10 absolute top-0 left-0 rounded-full border-2 border-yellow-500 animate-spin"></div>
        </div>
      </div>

      {/* Sunbeam Animation */}
      <div className="w-10 h-10 rounded-full bg-yellow-300 opacity-75 animate-beam"></div>

      <style jsx>{`
        @keyframes sun {
          0% { transform: translate(-50%, -8px) scale(1); }
          50% { transform: translate(-50%, 0) scale(1.1); }
          100% { transform: translate(-50%, -8px) scale(1); }
        }
        .animate-sun {
          animation: sun 1.5s ease-in-out infinite;
        }
        .animate-beam {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
