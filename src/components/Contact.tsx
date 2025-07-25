import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, Send, 
  Building, Globe, Users, Shield, ArrowRight, CheckCircle 
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@cross.africa',
      description: 'Get help with your account and transactions'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+234 1 700 0000',
      description: 'Speak with our support team directly'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Available 24/7',
      description: 'Chat with our AI assistant or human agent'
    }
  ];

  const officeLocations = [
    {
      city: 'Lagos, Nigeria',
      address: 'Victoria Island, Lagos State',
      phone: '+234 1 700 0000',
      email: 'lagos@cross.africa',
      hours: 'Mon-Fri: 8AM-6PM WAT'
    },
    {
      city: 'Nairobi, Kenya',
      address: 'Westlands, Nairobi',
      phone: '+254 20 000 0000',
      email: 'nairobi@cross.africa',
      hours: 'Mon-Fri: 8AM-6PM EAT'
    },
    {
      city: 'Cape Town, South Africa',
      address: 'Century City, Cape Town',
      phone: '+27 21 000 0000',
      email: 'capetown@cross.africa',
      hours: 'Mon-Fri: 8AM-6PM SAST'
    }
  ];

  const supportCategories = [
    {
      icon: Building,
      title: 'Business Solutions',
      description: 'Enterprise payment solutions and integrations'
    },
    {
      icon: Globe,
      title: 'Global Payments',
      description: 'Cross-border payment support and guidance'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Security features and regulatory compliance'
    },
    {
      icon: Users,
      title: 'Account Management',
      description: 'Account setup, verification, and management'
    }
  ];

  return (
    <div className="min-h-screen cross-gradient-bg py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in <span className="cross-purple-gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about Cross AI? Our team is here to help you with everything from 
            technical support to business partnerships. We're available 24/7 to assist you.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
              <div className="text-cross-purple-300 font-semibold mb-2">{info.value}</div>
              <p className="text-gray-300 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-300">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cross-purple-300 focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="security">Security Concerns</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cross-purple-gradient px-6 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5 mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Support Categories */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">How Can We Help?</h2>
              <p className="text-gray-300 mb-8">
                Choose from our support categories to get the most relevant assistance for your needs.
              </p>
            </div>

            <div className="grid gap-4">
              {supportCategories.map((category, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 group hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 cross-purple-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>
                      <p className="text-gray-300 text-sm">{category.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cross-purple-300 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Need Immediate Help?</h3>
              <p className="text-gray-300 mb-4">
                Our support team is available 24/7 to assist you with urgent matters.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cross-purple-300" />
                  <span className="text-white">+234 1 700 0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cross-purple-300" />
                  <span className="text-white">urgent@cross.africa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{office.city}</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-cross-purple-300 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cross-purple-300" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cross-purple-300" />
                    <span>{office.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-cross-purple-300" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">How long do payments take?</h3>
              <p className="text-gray-300">
                Most payments are completed within 15 minutes. International transfers may take up to 24 hours depending on the destination country and local banking hours.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">What countries do you support?</h3>
              <p className="text-gray-300">
                We currently support payments to over 50 countries across Africa, Asia, Europe, and the Americas. Check our coverage map for specific countries.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Is my money safe?</h3>
              <p className="text-gray-300">
                Yes, all funds are held in secure escrow accounts and protected by bank-grade security measures. We're fully licensed and regulated.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">What are your fees?</h3>
              <p className="text-gray-300">
                Our fees are transparent and competitive. We charge a small percentage based on the transfer amount, typically 1-3% depending on the destination.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses and individuals who trust Cross AI for their cross-border payment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cross-purple-gradient px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-white/10 px-8 py-4 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 