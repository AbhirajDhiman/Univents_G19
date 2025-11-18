import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, Phone, Search } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          q: 'What types of events do you manage?',
          a: 'We manage a wide range of events including corporate conferences, weddings, product launches, birthday parties, team building events, trade shows, and social gatherings. No event is too big or too small for our team!'
        },
        {
          q: 'How far in advance should I book your services?',
          a: 'We recommend booking at least 3-6 months in advance for large events and 1-2 months for smaller gatherings. However, we can accommodate shorter timelines depending on availability and event complexity.'
        },
        {
          q: 'Do you provide services outside your local area?',
          a: 'Yes! We offer event management services nationwide and can coordinate destination events. Travel expenses will be included in the quote for out-of-area events.'
        }
      ]
    },
    {
      category: 'Pricing & Packages',
      questions: [
        {
          q: 'How much do your services cost?',
          a: 'Pricing varies based on event type, size, duration, and services required. We offer customized packages to fit different budgets. Contact us for a personalized quote based on your specific needs.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, bank transfers, checks, and online payment platforms. A deposit is required to secure your date, with the balance due according to the payment schedule in your contract.'
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Yes, we offer flexible payment plans for larger events. Typically, we require a 30% deposit to book, with remaining payments split into installments leading up to your event date.'
        }
      ]
    },
    {
      category: 'Planning Process',
      questions: [
        {
          q: 'What is included in your event management service?',
          a: 'Our full-service package includes venue selection, vendor coordination, budget management, timeline creation, on-site coordination, setup and teardown supervision, and post-event follow-up. We customize services based on your needs.'
        },
        {
          q: 'Will I have a dedicated event coordinator?',
          a: 'Absolutely! You will be assigned a dedicated event coordinator who will be your main point of contact throughout the planning process and will be present on your event day to ensure everything runs smoothly.'
        },
        {
          q: 'Can I make changes to my event plan?',
          a: 'Yes, we understand that plans evolve. Changes can be made up to 30 days before your event at no additional charge. Changes within 30 days may incur fees depending on vendor contracts and commitments already made.'
        }
      ]
    },
    {
      category: 'Vendors & Services',
      questions: [
        {
          q: 'Do you work with specific vendors or can I choose my own?',
          a: 'We have a network of trusted, vetted vendors we work with regularly. However, you are welcome to bring your own vendors. We will coordinate with them to ensure seamless integration into your event plan.'
        },
        {
          q: 'What if something goes wrong with a vendor?',
          a: 'We have contingency plans and backup vendors for all critical services. Our team monitors all vendor performance and handles any issues immediately. We also carry event liability insurance for added protection.'
        },
        {
          q: 'Do you provide catering services?',
          a: 'While we don\'t provide catering directly, we partner with excellent catering companies and can help you select the perfect menu for your event, manage tastings, and coordinate all food service logistics.'
        }
      ]
    },
    {
      category: 'Day of Event',
      questions: [
        {
          q: 'Will someone from your team be at my event?',
          a: 'Yes! Your dedicated coordinator and additional team members (depending on event size) will be present throughout your event to manage setup, coordinate vendors, handle any issues, and ensure everything runs according to plan.'
        },
        {
          q: 'What happens if there is an emergency during the event?',
          a: 'Our team is trained to handle emergencies calmly and efficiently. We have protocols in place for various scenarios and maintain communication with venue staff and emergency services if needed.'
        },
        {
          q: 'Can you accommodate last-minute changes on the event day?',
          a: 'We will do our best to accommodate reasonable last-minute requests. However, significant changes may not be possible due to vendor commitments and logistics. We always recommend finalizing details before the event day.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100">Find answers to common questions about our event management services</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-gray-800 rounded-full shadow-lg p-2 flex items-center border border-gray-700">
          <Search className="w-6 h-6 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Search for questions..."
            className="flex-1 px-4 py-3 outline-none bg-transparent text-white placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No questions found matching your search.</p>
          </div>
        ) : (
          filteredFAQs.map((category, catIdx) => (
            <div key={catIdx} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-1 h-8 bg-purple-500 mr-3 rounded"></div>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq) => {
                  const currentIndex = questionIndex++;
                  return (
                    <div
                      key={currentIndex}
                      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl border border-gray-700"
                    >
                      <button
                        onClick={() => toggleFAQ(currentIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-750 transition-colors"
                      >
                        <span className="font-semibold text-gray-100 pr-8">{faq.q}</span>
                        <ChevronDown
                          className={`w-6 h-6 text-purple-400 flex-shrink-0 transition-transform ${
                            openIndex === currentIndex ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openIndex === currentIndex && (
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Still Have Questions Section */}
      <div className="bg-gray-800 py-16 px-6 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-8">We're here to help! Reach out to us through any of these channels</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-750 transition-colors border border-gray-700">
              <MessageCircle className="w-10 h-10 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-gray-400 text-sm mb-3">Available Mon-Fri, 9am-6pm</p>
              <button className="text-purple-400 font-semibold hover:text-purple-300">Start Chat</button>
            </div>
            <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-750 transition-colors border border-gray-700">
              <Mail className="w-10 h-10 mx-auto mb-4 text-blue-400" />
              <h3 className="font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm mb-3">We'll respond within 24 hours</p>
              <a href="mailto:info@eventpro.com" className="text-blue-400 font-semibold hover:text-blue-300">
                info@eventpro.com
              </a>
            </div>
            <div className="p-6 rounded-xl bg-gray-900 hover:bg-gray-750 transition-colors border border-gray-700">
              <Phone className="w-10 h-10 mx-auto mb-4 text-green-400" />
              <h3 className="font-semibold text-white mb-2">Call Us</h3>
              <p className="text-gray-400 text-sm mb-3">Mon-Fri, 9am-6pm EST</p>
              <a href="tel:+1234567890" className="text-green-400 font-semibold hover:text-green-300">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}