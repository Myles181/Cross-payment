import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Clock, User, Smartphone } from 'lucide-react';

interface ConfirmationData {
  referenceId: string;
  amount: number;
  usdtAmount: number;
  recipientName: string;
  recipientEmail: string;
  status: 'pending' | 'confirmed' | 'expired' | 'not_found';
  deviceFingerprint: string;
  timestamp: string;
}

const ConfirmationPage: React.FC = () => {
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { referenceId } = useParams<{ referenceId: string }>();

  useEffect(() => {
    if (!referenceId) {
      setError('Invalid confirmation link');
      setIsLoading(false);
      return;
    }

    // Simulate fetching confirmation data
    const fetchConfirmationData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app this would come from API
      const mockData: ConfirmationData = {
        referenceId: referenceId,
        amount: 50000, // NGN
        usdtAmount: 41.67, // USDT (at ~1200 NGN/USDT rate)
        recipientName: 'Chen Wei',
        recipientEmail: 'chen.wei@example.com',
        status: 'pending',
        deviceFingerprint: `device_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      };
      
      setConfirmationData(mockData);
      setIsLoading(false);
    };

    fetchConfirmationData();
  }, []);

  const handleConfirm = async () => {
    if (!confirmationData) return;
    
    setConfirmationData(prev => prev ? { ...prev, status: 'confirmed' } : null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleReject = async () => {
    if (!confirmationData) return;
    
    setConfirmationData(prev => prev ? { ...prev, status: 'expired' } : null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen cross-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading confirmation details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen cross-gradient-bg flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Invalid Link</h1>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!confirmationData) {
    return (
      <div className="min-h-screen cross-gradient-bg flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Confirmation Not Found</h1>
            <p className="text-gray-300">The confirmation link is invalid or has expired.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cross-gradient-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Cross Payment Confirmation
            </h1>
            <p className="text-xl text-gray-300">
              Verify and confirm your payment receipt
            </p>
          </div>

          {/* Confirmation Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {/* Status Header */}
            <div className="text-center mb-8">
              {confirmationData.status === 'confirmed' ? (
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mr-3" />
                  <h2 className="text-2xl font-bold text-green-400">Payment Confirmed!</h2>
                </div>
              ) : confirmationData.status === 'expired' ? (
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-400 mr-3" />
                  <h2 className="text-2xl font-bold text-red-400">Payment Rejected</h2>
                </div>
              ) : (
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-12 h-12 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold text-yellow-400">Awaiting Confirmation</h2>
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Reference ID</div>
                    <div className="text-white font-mono">{confirmationData.referenceId}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Amount</div>
                    <div className="text-white font-bold text-lg">{confirmationData.usdtAmount} USDT</div>
                    <div className="text-gray-300 text-xs">≈ ₦{confirmationData.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Recipient</div>
                    <div className="text-white">{confirmationData.recipientName}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Email</div>
                    <div className="text-white">{confirmationData.recipientEmail}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Timestamp</div>
                    <div className="text-white">{new Date(confirmationData.timestamp).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Device Fingerprint</div>
                    <div className="text-white font-mono text-xs">{confirmationData.deviceFingerprint}</div>
                  </div>
                </div>
              </div>

              {/* Security Verification */}
              <div className="bg-yellow-500/20 rounded-lg p-6 border border-yellow-500/30">
                <h3 className="text-yellow-300 font-semibold mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Security Verification
                </h3>
                <div className="text-white text-sm space-y-2">
                  <div>• Device fingerprint verified</div>
                  <div>• Secure link validation passed</div>
                  <div>• Cross AI system authenticated</div>
                </div>
              </div>

              {/* Action Buttons */}
              {confirmationData.status === 'pending' && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleReject}
                    className="flex-1 bg-red-500/20 px-6 py-3 rounded-lg text-red-300 font-semibold hover:bg-red-500/30 transition-colors"
                  >
                    Reject Payment
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 cross-purple-gradient px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Confirm Payment
                  </button>
                </div>
              )}

              {/* Confirmation Message */}
              {confirmationData.status === 'confirmed' && (
                <div className="bg-green-500/20 rounded-lg p-6 border border-green-500/30">
                  <div className="text-green-300 text-center">
                    <div className="font-semibold mb-2">Payment Successfully Confirmed!</div>
                    <div className="text-sm">The funds have been released to the recipient.</div>
                  </div>
                </div>
              )}

              {confirmationData.status === 'expired' && (
                <div className="bg-red-500/20 rounded-lg p-6 border border-red-500/30">
                  <div className="text-red-300 text-center">
                    <div className="font-semibold mb-2">Payment Rejected</div>
                    <div className="text-sm">The payment has been cancelled and funds returned.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Powered by Cross AI Payment System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage; 