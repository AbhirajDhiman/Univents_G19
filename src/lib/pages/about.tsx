import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">About Univents</h1>

        <p className="text-gray-300 mb-6">
          Univents is a next-generation event management platform designed to make
          organizing and attending university events effortless, engaging, and fun.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-300 mb-6">
          Our mission is to simplify event planning and participation by connecting
          students, faculty, and organizers through a single, intuitive platform.
        </p>

        <h2 className="text-2xl font-semibold text-blue-400 mb-3">
          What We Offer
        </h2>
        <ul className="text-gray-300 text-left list-disc list-inside mb-6">
          <li>Easy event creation and management tools</li>
          <li>Real-time updates and notifications</li>
          <li>Smart registration and attendance tracking</li>
          <li>Modern design with responsive dark mode interface</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-400 mb-3">
          Our Team
        </h2>
        <p className="text-gray-300 mb-6">
          Univents is built by a passionate group of students and developers who
          believe in technology-driven collaboration and community building.
        </p>

        <p className="text-gray-400 text-sm mt-8">
          © {new Date().getFullYear()} Univents. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
