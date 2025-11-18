import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="text-gray-300 mb-4">
          By accessing and using our platform, you agree to comply with and be bound by
          the following terms and conditions. Please review them carefully before using
          our services.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-300 mb-4">
          By using our website, you acknowledge that you have read, understood, and agree
          to be bound by these Terms of Service. If you do not agree, please do not use
          our site.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          2. Use of Services
        </h2>
        <p className="text-gray-300 mb-4">
          You agree to use our platform only for lawful purposes and in accordance with
          all applicable laws. Any misuse or unauthorized use of our system is strictly
          prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          3. Intellectual Property
        </h2>
        <p className="text-gray-300 mb-4">
          All content, trademarks, and data on this platform are the property of Univents
          or its licensors and are protected by copyright and trademark laws.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-300 mb-4">
          Univents shall not be liable for any damages arising from the use or inability
          to use our platform, including loss of data, profits, or business opportunities.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          5. Updates to Terms
        </h2>
        <p className="text-gray-300 mb-4">
          We reserve the right to modify these terms at any time. Changes will take effect
          immediately upon posting on this page.
        </p>

        <p className="text-sm text-gray-500 text-center mt-8">
          Last updated: October 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;
