import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    if (!name || !email || !message || rating === 0) {
      setError("Please fill out all fields and select a rating.");
      return;
    }

    // Simulate form submission
    console.log("Feedback submitted:", { name, email, message, rating });

    // Reset form and show success
    setSubmitted(true);
    setError("");
    setName("");
    setEmail("");
    setMessage("");
    setRating(0);

    // Auto-hide success message
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">We Value Your Feedback</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        {error && <p className="text-red-400 text-center">{error}</p>}
        {submitted && (
          <p className="text-green-400 text-center">
            ✅ Thank you for your feedback!
          </p>
        )}

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-blue-500"
        />

        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl cursor-pointer transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-white font-semibold"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
