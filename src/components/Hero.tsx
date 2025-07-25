import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Globe, Zap, CheckCircle, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: "📄", text: "Invoice Uploaded" },
    { icon: "💰", text: "Payment Verified" },
    { icon: "🏦", text: "Escrow Funded" },
    { icon: "✅", text: "Recipient Confirmed" }
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    // Simulate demo playback
    setTimeout(() => setIsPlaying(false), 5000);
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 cross-purple-gradient rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 cross-purple-gradient rounded-full opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-cross-purple-500/20 border border-cross-purple-300/30 rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
              <Shield className="w-4 h-4 text-cross-purple-300" />
              <span className="text-cross-purple-300 text-sm font-medium">AI-Powered Escrow</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Africa's Smartest{' '}
              <span className="cross-purple-gradient bg-clip-text text-transparent animate-pulse">
                Escrow-Powered
              </span>{' '}
              Business Payment Rail
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 leading-relaxed">
              Empower verified African businesses to securely send payments to Asia, Middle East, 
              and other global corridors in real-time, using AI risk engines and stablecoin escrow rails.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Real-time Global Payments",
                "AI Risk Engine",
                "Stablecoin Escrow",
                "Zero Leakage Guarantee"
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 hover:bg-white/10 p-3 rounded-lg transition-all duration-300 cursor-pointer group"
                >
                  <CheckCircle className="w-5 h-5 text-cross-purple-300 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-white group-hover:text-cross-purple-300 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cross-purple-gradient px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform">
                <span>Start Your First Payment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handlePlayDemo}
                className={`border border-white/20 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-white/10 hover:scale-105 transform ${isPlaying ? 'bg-cross-purple-500/20' : ''}`}
              >
                <Play className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>{isPlaying ? 'Playing Demo...' : 'Watch Demo'}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8 border-t border-white/20">
              {[
                { value: "100%", label: "Success Rate" },
                { value: "30s", label: "Average Time" },
                { value: "50+", label: "Countries" }
              ].map((stat, index) => (
                <div key={index} className="text-center hover:scale-110 transition-transform cursor-pointer">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive Visual */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cross-purple-300/50 transition-all duration-300 hover:scale-105 transform">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 cross-purple-gradient rounded-lg flex items-center justify-center animate-pulse">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Cross Payment</h3>
                      <p className="text-gray-400 text-sm">Transaction #CRS-2024-001</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm font-semibold">✓ Completed</div>
                    <div className="text-gray-400 text-xs">2 min ago</div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="space-y-4">
                  {[
                    { label: "From:", value: "Lagos, Nigeria" },
                    { label: "To:", value: "Shanghai, China" },
                    { label: "Amount:", value: "₦2,500,000 → ¥15,000" },
                    { label: "Fee:", value: "₦12,500 (0.5%)" }
                  ].map((detail, index) => (
                    <div key={index} className="flex justify-between items-center hover:bg-white/5 p-2 rounded transition-colors">
                      <span className="text-gray-400">{detail.label}</span>
                      <span className="text-white font-semibold">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Progress Steps */}
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                        index === currentStep ? 'bg-cross-purple-500/20 border border-cross-purple-300/30' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index <= currentStep ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {index <= currentStep ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className="text-white text-sm">{step.icon} {step.text}</span>
                    </div>
                  ))}
                </div>

                {/* AI Security Badge */}
                <div className="flex items-center space-x-2 bg-cross-purple-500/20 rounded-lg p-3 hover:bg-cross-purple-500/30 transition-colors cursor-pointer">
                  <Zap className="w-4 h-4 text-cross-purple-300 animate-pulse" />
                  <span className="text-cross-purple-300 text-sm">AI Risk Engine Verified</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 cross-purple-gradient rounded-full opacity-20 animate-pulse hover:opacity-40 transition-opacity cursor-pointer"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000 hover:opacity-40 transition-opacity cursor-pointer"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 