import React, { useState, useEffect } from 'react';
import { Shield, Globe, Zap, Users, BarChart3, Lock, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "AI Risk Engine",
      description: "CrossSecure AI™ validates invoices, detects fraud, and monitors device/IP consistency across all transactions.",
      highlights: ["OCR Invoice AI", "Proof Validator", "Collusion Detector", "Liquidity Lying AI"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Payment Corridors",
      description: "Send payments to Asia, Middle East, and 50+ countries with real-time FX rates and local currency payouts.",
      highlights: ["NGN → CNY/TRY/INR", "15-min Rate Lock", "Local Currency Payout", "Real-time Settlement"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Smart Escrow System",
      description: "Zero-leakage escrow powered by stablecoins with multi-sig vaults and automated release mechanisms.",
      highlights: ["USDT Escrow", "Multi-sig Vault", "Auto Release", "Non-custodial"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "OTC Agent Network",
      description: "Verified payout partners with reputation scoring and load balancing for large transactions.",
      highlights: ["Reputation Tracker", "Load Balancing", "Verified Accounts", "Live Liquidity"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Dynamic KYC/KYB",
      description: "Tiered compliance system that auto-escalates based on volume and risk patterns.",
      highlights: ["Tier 0-3 System", "Auto Escalation", "Volume Monitoring", "Enhanced Compliance"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Complete transaction visibility with 30-minute auto-escalation and dispute resolution.",
      highlights: ["Live Status", "30-min Escalation", "Dispute Resolution", "Audit Trail"],
      color: "from-teal-500 to-blue-500"
    }
  ];

  const platformRoles = [
    {
      icon: Users,
      title: "Business (Sender)",
      description: "Uploads invoice, funds in NGN, system converts to stablecoin",
      steps: [
        "Upload invoice with recipient data",
        "Pay in NGN via Paystack/Bank",
        "Upload payment receipt",
        "Track transaction timeline"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Cross AI Core",
      description: "Validates docs, assigns agents, routes flows, monitors risks",
      steps: [
        "AI invoice validation",
        "FX rate locking",
        "Agent assignment",
        "Risk monitoring"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Agent (Payout Partner)",
      description: "Pays locally to supplier/recipient using verified accounts",
      steps: [
        "Local currency payout",
        "Verified accounts only",
        "Proof upload required",
        "Reputation scoring"
      ],
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powered by Advanced AI & Blockchain
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cross combines cutting-edge AI risk engines with secure stablecoin escrow to deliver 
            the most reliable global payment experience for African businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-105 cursor-pointer ${
                activeFeature === index 
                  ? 'border-cross-purple-300/50 bg-cross-purple-500/10 shadow-lg shadow-cross-purple-500/20' 
                  : 'border-white/20 hover:border-cross-purple-300/50'
              }`}
              onClick={() => setActiveFeature(activeFeature === index ? null : index)}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 transform transition-all duration-300 ${
                activeFeature === index ? 'scale-110 rotate-3' : 'hover:scale-105'
              }`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed transition-all duration-300">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center space-x-2 group">
                    <CheckCircle className={`w-4 h-4 transition-all duration-300 ${
                      activeFeature === index ? 'text-cross-purple-300 scale-110' : 'text-cross-purple-300'
                    }`} />
                    <span className={`text-white text-sm transition-all duration-300 ${
                      activeFeature === index ? 'text-cross-purple-300' : ''
                    }`}>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Expandable Details */}
              {activeFeature === index && (
                <div className="mt-6 pt-6 border-t border-white/20 animate-fadeIn">
                  <button className="flex items-center space-x-2 text-cross-purple-300 hover:text-white transition-colors">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Platform Roles Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Platform Roles & Flow
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {platformRoles.map((role, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:border-cross-purple-300/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-cross-purple-300 transition-colors">
                  {role.title}
                </h4>
                <p className="text-gray-300 mb-6 group-hover:text-white transition-colors">
                  {role.description}
                </p>
                <div className="space-y-2 text-left">
                  {role.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-2 group/item">
                      <div className={`w-2 h-2 bg-cross-purple-300 rounded-full transition-all duration-300 group-hover/item:scale-150`}></div>
                      <span className="text-white text-sm group-hover/item:text-cross-purple-300 transition-colors">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Stats */}
        <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Platform Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Transactions", value: "10,000+", icon: "📊" },
              { label: "Countries", value: "50+", icon: "🌍" },
              { label: "Success Rate", value: "99.9%", icon: "✅" },
              { label: "Processing Time", value: "<30s", icon: "⚡" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cross-purple-300/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 