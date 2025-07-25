import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, CheckCircle, FileText, User, Zap, AlertTriangle,
  Smartphone, Building
} from 'lucide-react';

interface PaymentData {
  amount: number;
  currency: string;
  recipient: {
    name: string;
    email: string;
    phone: string;
    country: string;
    bankAccount: string;
    bankName: string;
  };
  fxRate: number;
  hkdAmount: number;
  usdtAmount: number;
  referenceId: string;
  invoiceFile: File | null;
  invoicePreview: string;
}

interface AgentData {
  id: string;
  name: string;
  location: string;
  reputation: number;
  liquidityScore: number;
  available: boolean;
  assigned: boolean;
}

interface ConfirmationData {
  secureLink: string;
  verified: boolean;
  timeout: number;
  deviceFingerprint: string;
}

type PaymentStep = 'initiation' | 'processing' | 'assigned' | 'paying' | 'confirming' | 'completed' | 'escalated';

const InteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('initiation');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 0,
    currency: 'NGN',
    recipient: {
      name: '',
      email: '',
      phone: '',
      country: 'China',
      bankAccount: '',
      bankName: ''
    },
    fxRate: 580.25,
    hkdAmount: 0,
    usdtAmount: 0,
    referenceId: '',
    invoiceFile: null,
    invoicePreview: ''
  });
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
    secureLink: '',
    verified: false,
    timeout: 30,
    deviceFingerprint: ''
  });
  const [processingStatus, setProcessingStatus] = useState('');
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showRecipientView, setShowRecipientView] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');

  const countdownRef = useRef<number | null>(null);
  // const processingRef = useRef<number | null>(null);

  // Binance API integration
  const [binanceRate, setBinanceRate] = useState<number>(0);
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  // Fetch current USDT rate from Binance
  const fetchBinanceRate = async () => {
    setIsLoadingRate(true);
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTNGN');
      const data = await response.json();
      const rate = parseFloat(data.price);
      setBinanceRate(rate);
      
      // Update payment data with new USDT amount
      if (paymentData.amount > 0) {
        const usdtAmount = paymentData.amount / rate;
        setPaymentData(prev => ({
          ...prev,
          usdtAmount: parseFloat(usdtAmount.toFixed(2))
        }));
      }
    } catch (error) {
      console.error('Error fetching Binance rate:', error);
      // Fallback to a default rate if API fails
      const fallbackRate = 1200; // Approximate NGN/USDT rate
      setBinanceRate(fallbackRate);
      if (paymentData.amount > 0) {
        const usdtAmount = paymentData.amount / fallbackRate;
        setPaymentData(prev => ({
          ...prev,
          usdtAmount: parseFloat(usdtAmount.toFixed(2))
        }));
      }
    } finally {
      setIsLoadingRate(false);
    }
  };

  // Mock FX rates
  // const mockFXRates = {
  //   'NGN/USDT': 1650.50,
  //   'CNY/USDT': 7.20,
  //   'TRY/USDT': 28.50,
  //   'INR/USDT': 82.30
  // };

  // Mock agents
  const mockAgents = [
    {
      id: 'agent_001',
      name: 'Chen Wei',
      location: 'Beijing, China',
      reputation: 4.8,
      liquidityScore: 95,
      available: true,
      assigned: false
    },
    {
      id: 'agent_002',
      name: 'Li Ming',
      location: 'Shanghai, China',
      reputation: 4.9,
      liquidityScore: 92,
      available: true,
      assigned: false
    },
    {
      id: 'agent_003',
      name: 'Wang Fang',
      location: 'Guangzhou, China',
      reputation: 4.7,
      liquidityScore: 88,
      available: true,
      assigned: false
    }
  ];

  // Generate reference ID
  const generateReferenceId = () => {
    return `CRS-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentData(prev => ({
        ...prev,
        invoiceFile: file,
        invoicePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Calculate HKD amount (hidden from business, only for backend)
  useEffect(() => {
    if (paymentData.amount > 0) {
      const hkdAmount = paymentData.amount / paymentData.fxRate;
      setPaymentData(prev => ({
        ...prev,
        hkdAmount: parseFloat(hkdAmount.toFixed(2))
      }));
    }
  }, [paymentData.amount, paymentData.fxRate]);

  // Calculate USDT amount when amount changes
  useEffect(() => {
    if (paymentData.amount > 0 && binanceRate > 0) {
      const usdtAmount = paymentData.amount / binanceRate;
      setPaymentData(prev => ({
        ...prev,
        usdtAmount: parseFloat(usdtAmount.toFixed(2))
      }));
    }
  }, [paymentData.amount, binanceRate]);

  // Fetch Binance rate on component mount
  useEffect(() => {
    fetchBinanceRate();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (currentStep === 'initiation' && countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setError('FX rate expired. Please refresh to get a new rate.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [currentStep, countdown]);

  // Format countdown
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start payment processing
  const startPayment = async () => {
    if (!paymentData.amount || !paymentData.recipient.name || !paymentData.recipient.email || 
        !paymentData.recipient.bankAccount || !paymentData.recipient.bankName || !paymentData.invoiceFile) {
      setError('Please fill in all required fields: amount, recipient name, email, account number, bank name, and upload an invoice.');
      return;
    }

    setError('');
    setIsProcessing(true);
    setCurrentStep('processing');
    setPaymentData(prev => ({ ...prev, referenceId: generateReferenceId() }));

    // Simulate processing steps
    const processingSteps = [
      { status: 'Scanning invoice with OCR...', delay: 2000 },
      { status: 'Validating business details...', delay: 1500 },
      { status: 'Checking recipient information...', delay: 1000 },
      { status: 'Converting NGN to HKD...', delay: 2000 },
      { status: 'Funding escrow smart contract...', delay: 3000 },
      { status: 'Assigning OTC agent...', delay: 2500 }
    ];

    for (const step of processingSteps) {
      setProcessingStatus(step.status);
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }

    // Assign agent
    const availableAgents = mockAgents.filter(agent => agent.available);
    if (availableAgents.length === 0) {
      setEscalationReason('No agents available');
      setCurrentStep('escalated');
      setIsProcessing(false);
      return;
    }

    const selectedAgent = availableAgents[0];
    setAgentData({ ...selectedAgent, assigned: true });
    setCurrentStep('assigned');
    setIsProcessing(false);
  };

  // Agent accepts task
  const agentAcceptsTask = () => {
    setCurrentStep('paying');
    setProcessingStatus('Agent is processing local payment...');
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingStatus('Payment sent to recipient');
      setCurrentStep('confirming');
      
      // Generate secure link
      const secureLink = `https://cross.africa/confirm/${paymentData.referenceId}`;
      setConfirmationData(prev => ({
        ...prev,
        secureLink,
        deviceFingerprint: `device_${Math.random().toString(36).substr(2, 9)}`
      }));
    }, 5000);
  };

  // Show recipient view
  const showRecipientConfirmation = () => {
    setShowRecipientView(true);
  };

  // Recipient confirms payment
  const recipientConfirms = () => {
    setConfirmationData(prev => ({ ...prev, verified: true }));
    setCurrentStep('completed');
  };

  // Reset demo
  const resetDemo = () => {
    setCurrentStep('initiation');
    setPaymentData({
      amount: 0,
      currency: 'NGN',
      recipient: {
        name: '',
        email: '',
        phone: '',
        country: 'China',
        bankAccount: '',
        bankName: ''
      },
      fxRate: 580.25,
      hkdAmount: 0,
      usdtAmount: 0,
      referenceId: '',
      invoiceFile: null,
      invoicePreview: ''
    });
    setAgentData(null);
    setConfirmationData({
      secureLink: '',
      verified: false,
      timeout: 30,
      deviceFingerprint: ''
    });
    setProcessingStatus('');
    setCountdown(900);
    setIsProcessing(false);
    setError('');
    setShowRecipientView(false);
    setEscalationReason('');
  };

  return (
    <div className="min-h-screen cross-gradient-bg py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Cross AI Payment System
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Interactive Demo - Experience the complete payment flow
          </p>
          <button
            onClick={resetDemo}
            className="bg-white/10 px-6 py-3 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            Reset Demo
          </button>
        </div>

        {/* Main Demo Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Business Interface */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3" />
                Business Dashboard
              </h2>

              {currentStep === 'initiation' && (
                <div className="space-y-6">
                  {/* FX Rate Display */}
                  <div className="bg-cross-purple-500/20 rounded-lg p-4 border border-cross-purple-300/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">FX Rate (Locked for 15 min)</span>
                      <span className="text-red-400 font-bold">{formatCountdown(countdown)}</span>
                    </div>
                    <div className="text-2xl font-bold text-cross-purple-300">
                      1 NGN = HK${(1 / paymentData.fxRate).toFixed(6)} (HKD)
                    </div>
                    <div className="mt-2 text-sm text-gray-300">
                      USDT Rate: ₦{binanceRate > 0 ? binanceRate.toFixed(2) : 'Loading...'} = 1 USDT
                    </div>
                    <button
                      onClick={fetchBinanceRate}
                      disabled={isLoadingRate}
                      className="mt-2 text-xs bg-white/10 px-3 py-1 rounded text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      {isLoadingRate ? 'Refreshing...' : 'Refresh USDT Rate'}
                    </button>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Payment Amount (NGN)
                      </label>
                      <input
                        type="number"
                        value={paymentData.amount || ''}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                        placeholder="Enter amount in NGN"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.recipient.name}
                        onChange={(e) => setPaymentData(prev => ({ 
                          ...prev, 
                          recipient: { ...prev.recipient, name: e.target.value }
                        }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                        placeholder="Enter recipient name"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Recipient Email
                      </label>
                      <input
                        type="email"
                        value={paymentData.recipient.email}
                        onChange={(e) => setPaymentData(prev => ({ 
                          ...prev, 
                          recipient: { ...prev.recipient, email: e.target.value }
                        }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                        placeholder="Enter recipient email"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.recipient.bankName}
                        onChange={(e) => setPaymentData(prev => ({ 
                          ...prev, 
                          recipient: { ...prev.recipient, bankName: e.target.value }
                        }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.recipient.bankAccount}
                        onChange={(e) => setPaymentData(prev => ({ 
                          ...prev, 
                          recipient: { ...prev.recipient, bankAccount: e.target.value }
                        }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cross-purple-300 focus:outline-none"
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Upload Invoice
                      </label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="invoice-upload"
                        />
                        <label htmlFor="invoice-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <div className="text-white">Click to upload invoice</div>
                          <div className="text-gray-400 text-sm">PDF, JPG, PNG up to 10MB</div>
                        </label>
                      </div>
                      {paymentData.invoicePreview && (
                        <div className="mt-2 p-2 bg-white/5 rounded border">
                          <FileText className="w-4 h-4 text-green-400 inline mr-2" />
                          <span className="text-white text-sm">Invoice uploaded</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={startPayment}
                      disabled={isProcessing}
                      className="w-full cross-purple-gradient px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Send Payment'}
                    </button>
                  </div>
                </div>
              )}

              {/* Processing Status */}
              {currentStep === 'processing' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <div className="text-white font-semibold">{processingStatus}</div>
                  </div>
                </div>
              )}

              {/* Agent Assignment */}
              {currentStep === 'assigned' && agentData && (
                <div className="space-y-4">
                  <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                    <div className="text-green-300 font-semibold mb-2">Agent Assigned!</div>
                    <div className="text-white">
                      <div className="font-semibold">{agentData.name}</div>
                      <div className="text-sm text-gray-300">{agentData.location}</div>
                      <div className="text-sm text-gray-300">Reputation: {agentData.reputation}/5.0</div>
                    </div>
                  </div>
                  <button
                    onClick={agentAcceptsTask}
                    className="w-full bg-blue-500/20 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-500/30 transition-colors"
                  >
                    Agent Accepts Task
                  </button>
                </div>
              )}

              {/* Payment Processing */}
              {currentStep === 'paying' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <div className="text-white font-semibold">{processingStatus}</div>
                  </div>
                </div>
              )}

              {/* Confirmation Phase */}
              {currentStep === 'confirming' && (
                <div className="space-y-4">
                  <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                    <div className="text-yellow-300 font-semibold mb-2">Waiting for Recipient Confirmation</div>
                    <div className="text-white text-sm">
                      Secure link sent to: {paymentData.recipient.email}
                    </div>
                  </div>
                  <button
                    onClick={showRecipientConfirmation}
                    className="w-full bg-cross-purple-500/20 px-6 py-3 rounded-lg text-white font-semibold hover:bg-cross-purple-500/30 transition-colors"
                  >
                    View Recipient Interface
                  </button>
                </div>
              )}

              {/* Completion */}
              {currentStep === 'completed' && (
                <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-green-300 font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Payment Completed Successfully!
                  </div>
                  <div className="text-white text-sm space-y-1">
                    <div>Reference ID: {paymentData.referenceId}</div>
                    <div>Amount: ₦{paymentData.amount.toLocaleString()} → HK${paymentData.hkdAmount} (HKD)</div>
                    <div>Recipient: {paymentData.recipient.name}</div>
                  </div>
                </div>
              )}

              {/* Escalation */}
              {currentStep === 'escalated' && (
                <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                  <div className="text-red-300 font-semibold mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Transaction Escalated
                  </div>
                  <div className="text-white text-sm">
                    Reason: {escalationReason}
                  </div>
                  <div className="text-white text-sm mt-2">
                    Manual operations team has been notified.
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                  <div className="text-red-300">{error}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - System View */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Cross AI System View
              </h2>

              {/* System Status */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Current Step</div>
                    <div className="text-white font-semibold capitalize">{currentStep}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Reference ID</div>
                    <div className="text-white font-semibold">{paymentData.referenceId || 'Pending'}</div>
                  </div>
                </div>

                {/* Processing Steps */}
                <div className="space-y-3">
                  {[
                    { step: 'Invoice Upload', status: currentStep !== 'initiation' ? 'completed' : 'pending' },
                    { step: 'AI Validation', status: currentStep === 'processing' || currentStep !== 'initiation' ? 'completed' : 'pending' },
                    { step: 'Escrow Funding', status: currentStep === 'processing' || currentStep !== 'initiation' ? 'completed' : 'pending' },
                    { step: 'Agent Assignment', status: currentStep === 'assigned' || currentStep === 'paying' || currentStep === 'confirming' || currentStep === 'completed' ? 'completed' : 'pending' },
                    { step: 'Local Payment', status: currentStep === 'paying' || currentStep === 'confirming' || currentStep === 'completed' ? 'completed' : 'pending' },
                    { step: 'Recipient Confirmation', status: currentStep === 'completed' ? 'completed' : 'pending' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        item.status === 'completed' ? 'text-green-300' : 'text-gray-400'
                      }`}>
                        {item.step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Agent Information */}
                {agentData && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-2">Assigned Agent</div>
                    <div className="text-white">
                      <div className="font-semibold">{agentData.name}</div>
                      <div className="text-sm text-gray-300">{agentData.location}</div>
                      <div className="text-sm text-gray-300">Liquidity Score: {agentData.liquidityScore}%</div>
                    </div>
                  </div>
                )}

                {/* Backend Conversion Data */}
                {paymentData.hkdAmount > 0 && (
                  <div className="bg-white/5 rounded-lg p-4 border border-yellow-500/30">
                    <div className="text-yellow-300 text-sm mb-2">Backend Conversion</div>
                    <div className="text-white text-sm">
                      <div>Input: ₦{paymentData.amount.toLocaleString()} (NGN)</div>
                      <div>HKD FX Rate: 1 NGN = HK${(1 / paymentData.fxRate).toFixed(6)}</div>
                      <div>HKD Output: HK${paymentData.hkdAmount.toFixed(2)} (HKD)</div>
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <div>USDT Rate: ₦{binanceRate.toFixed(2)} = 1 USDT</div>
                        <div>USDT Output: {paymentData.usdtAmount} USDT</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmation Data */}
                {confirmationData.secureLink && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-2">Secure Link Generated</div>
                    <div className="text-white text-sm break-all">{confirmationData.secureLink}</div>
                    <div className="text-gray-400 text-sm mt-1">Device Fingerprint: {confirmationData.deviceFingerprint}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Confirmation Modal */}
        {showRecipientView && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3" />
                Recipient Confirmation
              </h3>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white font-semibold mb-2">Payment Details</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>From: Business Account</div>
                    <div>Amount: {paymentData.usdtAmount} USDT</div>
                    <div>Reference: {paymentData.referenceId}</div>
                    {binanceRate > 0 && (
                      <div className="text-xs text-gray-400 mt-2">
                        Rate: ₦{binanceRate.toFixed(2)} = 1 USDT
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="text-yellow-300 font-semibold mb-2 flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Device Verification
                  </div>
                  <div className="text-white text-sm">
                    Device fingerprint: {confirmationData.deviceFingerprint}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowRecipientView(false)}
                    className="flex-1 bg-white/10 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={recipientConfirms}
                    className="flex-1 cross-purple-gradient px-4 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDemo; 