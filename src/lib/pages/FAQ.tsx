import React from "react";

const FAQ: React.FC = () => {
  const faqs = [
    { q: "How do I create an account?", a: "Click the Sign Up button and follow the steps." },
    { q: "Is there a mobile app?", a: "Yes, available for both iOS and Android." },
    { q: "Can I edit my event after publishing?", a: "Absolutely! You can update any event details anytime." },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="max-w-2xl space-y-6">
        {faqs.map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">{item.q}</h2>
            <p className="text-gray-300">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
