import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Lock,
  CheckCircle2,
  X,
  ShieldCheck,
  Building2,
  Smartphone,
  Receipt,
  Download,
  Loader2,
  Sparkles
} from 'lucide-react';
import { InvoiceItem } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: InvoiceItem | null;
  productName?: string;
  amount: number;
  onPaymentSuccess?: (invoiceId?: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  productName,
  amount,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('Apex Technologies LLC');
  const [upiId, setUpiId] = useState('orbit.client@okhdfcbank');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [paidReceipt, setPaidReceipt] = useState<{
    txnId: string;
    date: string;
    totalPaid: number;
  } | null>(null);

  if (!isOpen) return null;

  const totalPayable = Math.max(0, amount - discount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ORBIT2026' || couponCode.toUpperCase() === 'FIRST10') {
      setDiscount(Math.round(amount * 0.1));
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (invoice) {
        const res = await fetch('/api/payments/settle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invoiceId: invoice.id,
            paymentMethod,
            paymentToken: `tok_sim_${Date.now()}`,
          }),
        });
        const data = await res.json();
      }

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#10b981', '#38bdf8'],
      });

      setPaidReceipt({
        txnId: `TXN-ORBIT-${Date.now()}-${Math.floor(Math.random() * 899 + 100)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        totalPaid: totalPayable,
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(invoice?.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Orbit-I Secure Payment Gateway
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </h3>
              <p className="text-[11px] text-slate-400">256-Bit Encrypted Multi-Cloud Processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paidReceipt ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Payment Settled Successfully!</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your transaction has been confirmed and verified on Orbit-I cloud ledger.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-cyan-400">{paidReceipt.txnId}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Item / Milestone:</span>
                  <span className="font-semibold text-white">{productName || invoice?.serviceDescription}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Settled:</span>
                  <span className="font-bold text-emerald-400 text-sm">${paidReceipt.totalPaid.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">PAID & VERIFIED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    const printable = `ORBIT-I PRIVATE LIMITED RECEIPT\nTxn: ${paidReceipt.txnId}\nDate: ${paidReceipt.date}\nAmount: $${paidReceipt.totalPaid}\nStatus: PAID`;
                    const blob = new Blob([printable], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Orbit-I-Receipt-${paidReceipt.txnId}.txt`;
                    a.click();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              {/* Summary banner */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Item / Milestone</div>
                  <div className="text-xs font-bold text-white max-w-[220px] truncate">
                    {productName || invoice?.serviceDescription || 'Orbit-I Enterprise Service'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Amount Due</div>
                  <div className="text-base font-extrabold text-emerald-400">
                    ${totalPayable.toLocaleString()} USD
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2">Select Payment Method</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>UPI / Instant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Wire / SWIFT</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                      <CreditCard className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Expiry</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Supports Google Pay, PhonePe, Paytm, BHIM.</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                  <div className="font-semibold text-white">Orbit-I Corporate Banking Details:</div>
                  <div>Bank: Silicon Valley Commercial Bank / HDFC Cyber City</div>
                  <div>Account: 9948 2011 8847 2910</div>
                  <div>SWIFT/IFSC: ORBTIN00918</div>
                  <div className="text-[10px] text-slate-500">Auto-reconciliation in 15 minutes.</div>
                </div>
              )}

              {/* Coupon input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (try ORBIT2026)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Apply
                </button>
              </div>

              {discount > 0 && (
                <div className="text-xs text-emerald-400 flex items-center justify-between font-medium">
                  <span>Promo Code Applied:</span>
                  <span>-${discount} USD</span>
                </div>
              )}

              {/* Submit Pay Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Authorizing Bank-Grade Transaction...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-cyan-300" />
                    <span>Pay ${totalPayable.toLocaleString()} USD Securely</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>PCI-DSS Level 1 Compliant • SOC2 Certified Architecture</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
