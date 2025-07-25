import React from 'react';
import { 
  Globe, Shield, Users, Zap, Target, Award, TrendingUp, 
  CreditCard, ArrowRight, CheckCircle 
} from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Countries Served', value: '50+', icon: Globe },
    { label: 'Transactions Processed', value: '$2B+', icon: CreditCard },
    { label: 'Active Users', value: '100K+', icon: Users },
    { label: 'Success Rate', value: '99.9%', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Bank-grade security with multi-layer encryption and real-time fraud detection.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Complete cross-border payments in under 15 minutes with AI-powered processing.'
    },
    {
      icon: Target,
      title: 'Global Reach',
      description: 'Connect with local payment networks in over 50 countries worldwide.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Designed for businesses and individuals who need reliable, fast, and secure payments.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Cross AI Founded',
      description: 'Launched with a vision to revolutionize cross-border payments using AI and blockchain technology.'
    },
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Successfully launched the Cross AI payment platform with support for 20+ countries.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to 50+ countries with advanced AI-powered fraud detection and compliance.'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Continuing to innovate with advanced AI features and expanding to new markets.'
    }
  ];

  return (
    <div className="min-h-screen cross-gradient-bg py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="cross-purple-gradient-text">Cross AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing cross-border payments by combining the power of artificial intelligence 
            with blockchain technology to create the fastest, most secure, and most reliable payment 
            network in the world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 cross-purple-gradient rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To eliminate the barriers of traditional cross-border payments by providing instant, 
              secure, and cost-effective solutions that empower businesses and individuals to 
              transact globally without limitations.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To become the world's leading AI-powered payment infrastructure, connecting every 
              country and currency through intelligent, automated, and secure financial networks.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 cross-purple-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Powered by Advanced Technology</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI & Machine Learning</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Real-time fraud detection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Intelligent routing optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Predictive analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Automated compliance checks
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Blockchain Security</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Immutable transaction records
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Smart contract automation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Decentralized escrow
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Multi-signature security
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 cross-purple-gradient rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Network</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  50+ country coverage
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Local payment methods
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Real-time FX rates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Regulatory compliance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-20 h-20 cross-purple-gradient rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.year}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience the Future of Payments?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses and individuals who are already using Cross AI for their 
              cross-border payment needs. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cross-purple-gradient px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-white/10 px-8 py-4 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 