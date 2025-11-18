import React from "react";

const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Help Center</h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center">
        Welcome to the Help Center. Here you can find information on how to use
        our platform effectively. If you need additional support, feel free to
        reach out via the Contact page.
      </p>
    </div>
  );
};

export default Help;
