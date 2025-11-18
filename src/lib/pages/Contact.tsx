import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-300 mb-6 max-w-2xl text-center">
        We'd love to hear from you! Please reach out using the form below or
        email us at{" "}
        <a href="mailto:support@univents.com" className="text-blue-400">
          support@univents.com
        </a>
      </p>
      <form className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Your Message"
          className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-white font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
