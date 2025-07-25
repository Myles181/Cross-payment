import React, { useState, useEffect, useRef } from 'react';
import { Upload, DollarSign, Shield, Users, CheckCircle, Clock, ArrowRight, Play, Pause } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start auto-play if it's enabled
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => {
          const nextStep = (prev + 1) % 6;
          return nextStep;
        });
      }, 4000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  const steps = [
    {
      step: "1",
      icon: Upload,
      title: "Upload Invoice",
      description: "Business uploads invoice with recipient data (name, contact, amount, reason)",
      details: ["AI scans invoice", "Checks invoice/recipient match", "Validates business details"],
      status: "completed",
      duration: "2-3 minutes"
    },
    {
      step: "2",
      icon: DollarSign,
      title: "FX Rate & Payment",
      description: "FX rate shown and locked for 15 minutes, business pays in NGN",
      details: ["NGN → USDC → CNY/TRY/etc", "Pay via Paystack/Flutterwave", "Upload payment receipt"],
      status: "completed",
      duration: "5-10 minutes"
    },
    {
      step: "3",
      icon: Shield,
      title: "AI Verification",
      description: "AI confirms sender identity, amount, date and triggers escrow",
      details: ["OCR + device fingerprint", "Match to registered bank profile", "Escrow smart contract funded"],
      status: "completed",
      duration: "1-2 minutes"
    },
    {
      step: "4",
      icon: Users,
      title: "Agent Assignment",
      description: "AI assigns best-fit agent based on real-time liquidity and score",
      details: ["Live liquidity matching", "Reputation scoring", "Country-specific assignment"],
      status: "active",
      duration: "30 seconds"
    },
    {
      step: "5",
      icon: CheckCircle,
      title: "Local Payout",
      description: "Agent pays recipient in local currency and uploads proof",
      details: ["Local currency payout", "Verified accounts only", "Proof upload required"],
      status: "pending",
      duration: "5-15 minutes"
    },
    {
      step: "6",
      icon: Clock,
      title: "Recipient Confirmation",
      description: "Recipient confirms via secure link, escrow releases to agent",
      details: ["Secure magic link", "Geo/IP/device fingerprinting", "Escrow auto-release"],
      status: "pending",
      duration: "1-30 minutes"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const resetToBeginning = () => {
    setActiveStep(0);
    setIsAutoPlaying(true);
  };

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How Cross Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A seamless 6-step process that transforms your NGN payments into instant global settlements
          </p>
          
          {/* Auto-play Controls */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-white text-sm">
                {isAutoPlaying ? 'Auto-playing' : 'Manual mode'}
              </span>
            </button>
            <button
              onClick={resetToBeginning}
              className="flex items-center space-x-2 bg-cross-purple-500/20 px-4 py-2 rounded-lg border border-cross-purple-300/30 hover:bg-cross-purple-500/30 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span className="text-white text-sm">Reset</span>
            </button>
            <div className="text-gray-400 text-sm">
              Step {activeStep + 1} of 6
            </div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cross-purple-500/50 via-cross-purple-300/50 to-gray-600/50 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div 
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 cursor-pointer hover:scale-105 transform ${
                    index === activeStep 
                      ? 'border-cross-purple-300/50 bg-cross-purple-500/10 shadow-lg shadow-cross-purple-500/20' 
                      : step.status === 'completed' 
                        ? 'border-green-500/50 bg-green-500/10' 
                        : step.status === 'active'
                          ? 'border-cross-purple-300/50 bg-cross-purple-500/10'
                          : 'border-white/20 hover:border-cross-purple-300/30'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                    step.status === 'completed'
                      ? 'bg-green-500'
                      : step.status === 'active'
                        ? 'cross-purple-gradient'
                        : 'bg-gray-600'
                  } ${index === activeStep ? 'scale-110' : ''}`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">{step.step}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <div className={`w-12 h-12 cross-purple-gradient rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${index === activeStep ? 'scale-110 rotate-3' : ''}`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Duration Badge */}
                    <div className="inline-flex items-center px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 mb-4">
                      ⏱️ {step.duration}
                    </div>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-left">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                            step.status === 'completed'
                              ? 'bg-green-400'
                              : step.status === 'active'
                                ? 'bg-cross-purple-300'
                                : 'bg-gray-500'
                          } ${index === activeStep ? 'scale-150' : ''}`}></div>
                          <span className="text-white text-xs">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    step.status === 'completed'
                      ? 'bg-green-500/20 text-green-300'
                      : step.status === 'active'
                        ? 'bg-cross-purple-500/20 text-cross-purple-300'
                        : 'bg-gray-500/20 text-gray-400'
                  } ${index === activeStep ? 'scale-110' : ''}`}>
                    {step.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {step.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                    {step.status === 'pending' && <ArrowRight className="w-3 h-3 mr-1" />}
                    {step.status === 'completed' ? 'Completed' : step.status === 'active' ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Transaction Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Visual Transaction Timeline
          </h3>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { status: "✅ Invoice Created", description: "OCR + AI invoice validation complete", icon: "📄" },
                { status: "🔒 FX Rate Locked", description: "15-min lock based on backend FX feed", icon: "💰" },
                { status: "💰 NGN Payment Done", description: "Receipt uploaded → verified", icon: "🏦" },
                { status: "🏦 Escrow Funded", description: "Stablecoins secured in vault", icon: "🔐" },
                { status: "👥 Agent Assigned", description: "AI matches based on live liquidity and reputation", icon: "🤝" },
                { status: "📤 Payout Confirmed", description: "Agent proof uploaded", icon: "📋" },
                { status: "✅ Recipient Confirmed", description: "Magic link clicked, device/IP/location matched", icon: "✅" },
                { status: "🎉 Escrow Released", description: "Agent gets stablecoin reward", icon: "🎊" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cross-purple-300/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="text-white font-semibold mb-2 group-hover:text-cross-purple-300 transition-colors">{item.status}</div>
                  <div className="text-gray-400 text-sm group-hover:text-white transition-colors">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Auto-Failsafe Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Auto-Failsafe & Risk Events
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                trigger: "Recipient doesn't confirm in 30 min",
                action: "Escalates to manual ops or reassigns to second agent",
                severity: "medium",
                icon: "⏰"
              },
              {
                trigger: "Agent delay > 15 mins",
                action: "Performance score downgraded → may be suspended",
                severity: "high",
                icon: "⚠️"
              },
              {
                trigger: "3 Disputes in 7 days (any party)",
                action: "Account flagged → review by fraud ops",
                severity: "critical",
                icon: "🚨"
              },
              {
                trigger: "Volume spike beyond KYB tier",
                action: "Auto-freeze until KYB upgrade",
                severity: "medium",
                icon: "📈"
              },
              {
                trigger: "High-risk country recipient match",
                action: "Transaction paused → manual OFAC check",
                severity: "high",
                icon: "🌍"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 transform ${
                  item.severity === 'critical' 
                    ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20' 
                    : item.severity === 'high'
                      ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20'
                      : 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                } border`}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-red-300 font-semibold mb-2">{item.trigger}</div>
                <div className="text-gray-300 text-sm">{item.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Overall Progress</h4>
            <span className="text-cross-purple-300 font-semibold">{Math.round((activeStep + 1) / 6 * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="cross-purple-gradient h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(activeStep + 1) / 6 * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 