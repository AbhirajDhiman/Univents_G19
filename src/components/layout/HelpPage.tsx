import React, { useState } from 'react';
import { Search, Book, Video, MessageCircle, Mail, Phone, FileText, HelpCircle, Clock, Users, Zap } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    { icon: Book, title: 'Getting Started', desc: 'New to EventPro? Start here', color: 'purple' },
    { icon: Video, title: 'Video Tutorials', desc: 'Watch step-by-step guides', color: 'blue' },
    { icon: FileText, title: 'Documentation', desc: 'Detailed guides & resources', color: 'green' },
    { icon: HelpCircle, title: 'FAQ', desc: 'Common questions answered', color: 'yellow' }
  ];

  const popularTopics = [
    {
      category: 'Account & Booking',
      icon: Users,
      topics: [
        'How to create an account',
        'Booking your first event',
        'Managing your profile',
        'Payment methods & invoices'
      ]
    },
    {
      category: 'Event Planning',
      icon: Zap,
      topics: [
        'Choosing the right package',
        'Working with your coordinator',
        'Vendor selection process',
        'Timeline & scheduling'
      ]
    },
    {
      category: 'Troubleshooting',
      icon: HelpCircle,
      topics: [
        'Cannot access my account',
        'Payment issues',
        'Changing event details',
        'Cancellation policy'
      ]
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      desc: 'Get instant help from our team',
      availability: 'Mon-Fri, 9am-6pm EST',
      action: 'Start Chat',
      color: 'purple'
    },
    {
      icon: Mail,
      title: 'Email Support',
      desc: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      desc: 'Speak with a specialist',
      availability: 'Mon-Fri, 9am-6pm EST',
      action: 'Call Now',
      color: 'green'
    }
  ];

  const guides = [
    {
      title: 'Planning Your Dream Wedding',
      time: '5 min read',
      category: 'Wedding'
    },
    {
      title: 'Corporate Event Checklist',
      time: '8 min read',
      category: 'Corporate'
    },
    {
      title: 'Budget Planning Tips',
      time: '6 min read',
      category: 'General'
    },
    {
      title: 'Vendor Coordination Guide',
      time: '10 min read',
      category: 'Planning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">How Can We Help You?</h1>
          <p className="text-xl text-purple-100 mb-8">Search our help center or browse by category</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or topics..."
                className="flex-1 px-4 py-3 outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickLinks.map((link, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-all cursor-pointer shadow-lg border border-gray-700">
              <link.icon className={`w-12 h-12 mx-auto mb-4 text-${link.color}-400`} />
              <h3 className="font-semibold text-white mb-2">{link.title}</h3>
              <p className="text-gray-400 text-sm">{link.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Topics</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {popularTopics.map((section, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <section.icon className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-white">{section.category}</h3>
              </div>
              <ul className="space-y-3">
                {section.topics.map((topic, topicIdx) => (
                  <li key={topicIdx}>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-start">
                      <span className="mr-2">→</span>
                      <span>{topic}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Support Options */}
      <div className="bg-gray-800 py-20 px-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Contact Support</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, idx) => (
              <div key={idx} className="bg-gray-900 rounded-xl p-8 text-center hover:shadow-xl transition-all border border-gray-700">
                <option.icon className={`w-14 h-14 mx-auto mb-4 text-${option.color}-400`} />
                <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300 mb-3">{option.desc}</p>
                <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  {option.availability}
                </div>
                <button className={`bg-${option.color}-600 hover:bg-${option.color}-700 text-white px-6 py-2 rounded-full font-semibold transition-colors`}>
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 flex items-start hover:bg-gray-750 transition-all cursor-pointer border border-gray-700">
              <Book className="w-10 h-10 text-purple-400 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{guide.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.time}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-purple-400">
                    {guide.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Need Urgent Assistance?</h2>
          <p className="mb-6 text-red-100">If you have an emergency on the day of your event, please contact our 24/7 emergency hotline</p>
          <a href="tel:+1234567890" className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            <Phone className="w-5 h-5 mr-2" />
            Emergency: (123) 456-7890
          </a>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-800 py-16 px-6 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-8">Our team is always ready to assist you with any questions or concerns</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Submit a Request
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}