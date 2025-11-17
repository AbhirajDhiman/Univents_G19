import React from 'react';
import { Calendar, Users, Award, Heart, Target, Zap } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { icon: Calendar, label: 'Events Hosted', value: '500+' },
    { icon: Users, label: 'Happy Clients', value: '1000+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Heart, label: 'Years Experience', value: '10+' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision Planning',
      description: 'Every detail matters. We meticulously plan each event to ensure flawless execution.'
    },
    {
      icon: Zap,
      title: 'Creative Innovation',
      description: 'We bring fresh, creative ideas to make your event unique and memorable.'
    },
    {
      icon: Heart,
      title: 'Client First',
      description: 'Your vision is our mission. We listen, adapt, and deliver beyond expectations.'
    }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Creative Director', image: '👨‍💻' },
    { name: 'Emily Rodriguez', role: 'Event Coordinator', image: '👩‍🎨' },
    { name: 'David Kim', role: 'Operations Manager', image: '👨‍💼' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About EventPro</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We transform ordinary moments into extraordinary experiences. With passion, 
            creativity, and precision, we bring your event vision to life.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-purple-600" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2014, EventPro started with a simple belief: every event deserves 
              to be exceptional. What began as a small team of passionate event planners 
              has grown into a full-service event management company.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Over the years, we've had the privilege of creating unforgettable experiences 
              for corporate conferences, weddings, product launches, and everything in between.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our success is built on relationships, creativity, and an unwavering commitment 
              to excellence. We don't just plan events—we craft experiences that leave lasting impressions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl h-96 flex items-center justify-center text-white text-6xl">
            🎉
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Values</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            These core principles guide everything we do
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center p-8 rounded-xl hover:bg-purple-50 transition-colors">
                <value.icon className="w-14 h-14 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The talented people behind your perfect events
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-6xl">
                {member.image}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8">Let's bring your event vision to life together</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}