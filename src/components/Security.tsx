import React, { useState, useEffect } from 'react';
import { Shield, Eye, Fingerprint, AlertTriangle, Lock, CheckCircle, BarChart3, Users, Zap, ArrowRight } from 'lucide-react';

const Security: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const securityModules = [
    {
      icon: Eye,
      title: "OCR Invoice AI",
      description: "Reads uploaded invoices → matches company name, amounts, recipient",
      features: ["Document validation", "Data extraction", "Fraud detection"],
      color: "from-blue-500 to-cyan-500",
      risk: "Low"
    },
    {
      icon: Shield,
      title: "Proof Validator",
      description: "Scans uploaded payment screenshots for tampering, reuse, metadata mismatch",
      features: ["Image analysis", "Metadata verification", "Tamper detection"],
      color: "from-green-500 to-emerald-500",
      risk: "Medium"
    },
    {
      icon: Fingerprint,
      title: "Geo-Behavior Tracker",
      description: "Monitors device/IP consistency for agents, senders, recipients",
      features: ["Device fingerprinting", "IP tracking", "Behavioral analysis"],
      color: "from-purple-500 to-pink-500",
      risk: "High"
    },
    {
      icon: AlertTriangle,
      title: "Collusion Detector",
      description: "Flags repeated suspicious patterns across accounts",
      features: ["Pattern recognition", "Risk scoring", "Alert system"],
      color: "from-orange-500 to-red-500",
      risk: "Critical"
    },
    {
      icon: CheckCircle,
      title: "Confirmation Watcher",
      description: "Measures delay between agent payout & recipient confirmation",
      features: ["Timing analysis", "Performance tracking", "Auto-escalation"],
      color: "from-teal-500 to-blue-500",
      risk: "Medium"
    },
    {
      icon: BarChart3,
      title: "Liquidity Lying AI",
      description: "Detects agents claiming liquidity they don't fulfill",
      features: ["Liquidity verification", "Performance monitoring", "Agent scoring"],
      color: "from-indigo-500 to-purple-500",
      risk: "High"
    }
  ];

  const kycTiers = [
    {
      tier: "Tier 0",
      name: "Trial",
      volume: "≤ ₦50k",
      requirements: ["Phone, email, selfie + NIN"],
      color: "bg-green-500/20 border-green-500/30",
      risk: "Low",
      processingTime: "Instant"
    },
    {
      tier: "Tier 1",
      name: "Basic",
      volume: "₦50k–₦2M/week",
      requirements: ["Full KYC + business invoice", "BVN, utility bill"],
      color: "bg-blue-500/20 border-blue-500/30",
      risk: "Medium",
      processingTime: "24 hours"
    },
    {
      tier: "Tier 2",
      name: "Business",
      volume: "₦2M–₦10M/week",
      requirements: ["KYB: CAC cert", "Bank account matching director name", "Tax ID"],
      color: "bg-purple-500/20 border-purple-500/30",
      risk: "High",
      processingTime: "48 hours"
    },
    {
      tier: "Tier 3",
      name: "Enterprise",
      volume: "₦10M+/week (Custom)",
      requirements: ["POI/POF", "Trade history", "Partner contracts", "Enhanced compliance"],
      color: "bg-orange-500/20 border-orange-500/30",
      risk: "Critical",
      processingTime: "72 hours"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="security" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            CrossSecure AI™ Engine
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced fraud & risk intelligence powered by AI to ensure every transaction is secure, 
            compliant, and traceable.
          </p>
        </div>

        {/* Security Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {securityModules.map((module, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 cursor-pointer hover:scale-105 transform ${
                activeModule === index 
                  ? 'border-cross-purple-300/50 bg-cross-purple-500/10 shadow-lg shadow-cross-purple-500/20' 
                  : 'border-white/20 hover:border-cross-purple-300/50'
              }`}
              onClick={() => setActiveModule(activeModule === index ? null : index)}
              onMouseEnter={() => setActiveModule(index)}
              onMouseLeave={() => setActiveModule(null)}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center mb-6 transform transition-all duration-300 ${
                activeModule === index ? 'scale-110 rotate-3' : 'hover:scale-105'
              }`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white transition-colors duration-300">
                  {module.title}
                </h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRiskColor(module.risk)} bg-white/10`}>
                  {module.risk}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed transition-all duration-300">
                {module.description}
              </p>
              
              <div className="space-y-2">
                {module.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 group">
                    <CheckCircle className={`w-4 h-4 transition-all duration-300 ${
                      activeModule === index ? 'text-cross-purple-300 scale-110' : 'text-cross-purple-300'
                    }`} />
                    <span className={`text-white text-sm transition-all duration-300 ${
                      activeModule === index ? 'text-cross-purple-300' : ''
                    }`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Expandable Details */}
              {activeModule === index && (
                <div className="mt-6 pt-6 border-t border-white/20 animate-fadeIn">
                  <button className="flex items-center space-x-2 text-cross-purple-300 hover:text-white transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* KYC/KYB Tiering System */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Dynamic KYC/KYB Compliance System
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kycTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`${tier.color} rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-105 transform ${
                  selectedTier === index ? 'ring-2 ring-cross-purple-300 ring-opacity-50' : ''
                }`}
                onClick={() => setSelectedTier(selectedTier === index ? null : index)}
              >
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-white mb-2">{tier.tier}</div>
                  <div className="text-lg font-semibold text-white mb-1">{tier.name}</div>
                  <div className="text-sm text-gray-300 mb-2">{tier.volume}</div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(tier.risk)} bg-white/10`}>
                    {tier.risk} Risk
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold text-sm">Required Info:</h4>
                  {tier.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white text-xs leading-relaxed">{req}</span>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Processing:</span>
                      <span className="text-white font-semibold">{tier.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Adaptive Monitoring */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-6 text-center">
              Adaptive Monitoring
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-white group-hover:text-yellow-300 transition-colors">Tier auto-escalation prompts when volume exceeds threshold</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-white group-hover:text-red-300 transition-colors">Manual review for suspicious patterns</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-white group-hover:text-green-300 transition-colors">Real-time risk assessment</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white group-hover:text-blue-300 transition-colors">Continuous compliance monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Security */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Infrastructure Security & Hosting
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                layer: "Backend",
                stack: "Node.js, Go, PostgreSQL / MongoDB",
                icon: Shield,
                status: "Active"
              },
              {
                layer: "Infra",
                stack: "AWS + DigitalOcean failover nodes",
                icon: Lock,
                status: "Redundant"
              },
              {
                layer: "KYC/KYB",
                stack: "Sumsub / Ondato",
                icon: Users,
                status: "Compliant"
              },
              {
                layer: "Stablecoin Vault",
                stack: "Fireblocks / Gnosis Safe / custom MPC custody",
                icon: Lock,
                status: "Multi-sig"
              },
              {
                layer: "Encryption",
                stack: "AES-256 for data, TLS 1.3 HTTPS, HSTS",
                icon: Shield,
                status: "256-bit"
              },
              {
                layer: "Audit Logs",
                stack: "Immutable with 12-month retention",
                icon: BarChart3,
                status: "Immutable"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-cross-purple-300/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <div className="w-10 h-10 cross-purple-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white group-hover:text-cross-purple-300 transition-colors">{item.layer}</h4>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full text-cross-purple-300 bg-cross-purple-500/20">
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{item.stack}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Commitment */}
        <div className="mt-20 bg-gradient-to-r from-cross-purple-500/20 to-blue-500/20 rounded-2xl p-8 border border-cross-purple-300/30 hover:border-cross-purple-300/50 transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 cross-purple-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Final Trust Commitment
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Cross by Fluxel is a zero-leakage, AI-guarded, compliance-first global financial rail. 
              Every transaction is traceable, reversible (if needed), and fully governed by human+AI oversight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security; 