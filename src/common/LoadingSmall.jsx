import React from "react";

export const LoadingSmall = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
        />
      </svg>
      <p className="text-gray-700">Cargando...</p>
    </div>
  );
};
