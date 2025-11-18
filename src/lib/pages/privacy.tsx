import React from "react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-gray-300 mb-4">
          Your privacy is important to us. This Privacy Policy outlines how we
          collect, use, and protect your information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-300 mb-4">
          We may collect personal details such as your name, email address, and
          event participation data to provide and improve our services.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-300 mb-4">
          We use collected data to enhance user experience, send event updates,
          respond to inquiries, and improve our platform’s functionality.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          3. Data Protection
        </h2>
        <p className="text-gray-300 mb-4">
          We implement strong security measures to protect your personal
          information from unauthorized access or disclosure. However, no online
          transmission is completely secure, and we cannot guarantee absolute
          protection.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          4. Cookies
        </h2>
        <p className="text-gray-300 mb-4">
          Our site may use cookies to improve your browsing experience. You can
          choose to disable cookies in your browser settings, but some features
          may not function properly.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          5. Changes to This Policy
        </h2>
        <p className="text-gray-300 mb-4">
          We may update this Privacy Policy periodically. Updates will be
          reflected on this page with a revised date.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
          6. Contact Us
        </h2>
        <p className="text-gray-300 mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:privacy@univents.com"
            className="text-blue-400 hover:underline"
          >
            privacy@univents.com
          </a>
          .
        </p>

        <p className="text-sm text-gray-500 text-center mt-8">
          Last updated: October 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
