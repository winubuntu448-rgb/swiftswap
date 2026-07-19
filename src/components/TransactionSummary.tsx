'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransactionSummaryProps {
  currency: 'USDT' | 'USDC';
  amount: string;
  paymentMethod: 'paypal' | 'swift';
  recipientData: {
    paypalEmail: string;
    bankName: string;
    accountNumber: string;
    swiftCode: string;
    iban: string;
  };
}

export default function TransactionSummary({
  currency,
  amount,
  paymentMethod,
  recipientData
}: TransactionSummaryProps) {
  const { t } = useLanguage();

  const calculations = useMemo(() => {
    const amountNum = parseFloat(amount) || 0;
    const feeRate = 0.025;
    const fee = amountNum * feeRate;
    const totalAfterFee = amountNum - fee;
    return {
      fee: fee.toFixed(2),
      totalAfterFee: totalAfterFee.toFixed(2),
      amountNum,
    };
  }, [amount]);

  const recipientDisplay = useMemo(() => {
    if (paymentMethod === 'paypal') {
      return recipientData.paypalEmail || null;
    } else {
      return recipientData.bankName || null;
    }
  }, [paymentMethod, recipientData]);

  const hasAmount = calculations.amountNum > 0;

  const rows = [
    {
      label: t('summary.currency'),
      value: (
        <span className={`font-bold text-sm ${currency === 'USDT' ? 'text-[#26A17B]' : 'text-[#2775CA]'}`}>
          {currency}
        </span>
      ),
    },
    {
      label: t('summary.amount'),
      value: (
        <span className="font-semibold text-gray-900 text-sm">
          {hasAmount ? calculations.amountNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'} {hasAmount ? currency : ''}
        </span>
      ),
    },
    {
      label: t('summary.paymentMethod'),
      value: (
        <span className="font-semibold text-gray-900 text-sm">
          {paymentMethod === 'paypal' ? 'PayPal' : 'SWIFT'}
        </span>
      ),
    },
    {
      label: t('summary.recipient'),
      value: (
        <span className="font-medium text-gray-600 text-sm max-w-[140px] truncate block text-right rtl:text-left">
          {recipientDisplay || '—'}
        </span>
      ),
    },
    {
      label: t('summary.fees'),
      value: (
        <span className="font-semibold text-red-600 text-sm">
          {hasAmount ? `-$${calculations.fee}` : '—'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Rows */}
      <div className="overflow-hidden border border-gray-200">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:bg-gray-50"
            style={{
              borderBottom: i < rows.length - 1 ? '1px solid #E5E7EB' : 'none',
            }}
          >
            <span className="text-sm text-[#4A4A4A]">{row.label}</span>
            {row.value}
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="total-box">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">{t('summary.total')}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">After 2.5% fee</p>
          </div>
          <div className="text-right">
            <span
              className="text-2xl sm:text-3xl font-bold text-[#C5A059]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              ${hasAmount ? parseFloat(calculations.totalAfterFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </span>
            <p className="text-xs text-[#4A4A4A] mt-0.5">USD</p>
          </div>
        </div>
      </div>

      {/* Transaction flow animation */}
      {hasAmount && (
        <div className="relative">
          <div className="flex items-center justify-between">
            {/* Wallet (crypto side) */}
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center relative z-10 border border-gray-200">
                <svg className="w-5 h-5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>

            {/* Animated line */}
            <div className="flex-1 mx-3 sm:mx-4 h-px bg-gray-200">
              <div className="h-full bg-[#C5A059] animate-pulse" style={{ width: '50%' }} />
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center relative z-10 border border-gray-200">
                {paymentMethod === 'paypal' ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
                    alt="PayPal"
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  <img
                    src="https://banner2.cleanpng.com/20180620/ack/kisspng-society-for-worldwide-interbank-financial-telecomm-fail-test-5b2a3ea90b41a4.8736419315294952090461.jpg"
                    alt="SWIFT"
                    className="w-5 h-5 object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-xs text-[#4A4A4A] font-medium">Crypto Wallet</p>
            <p className="text-xs text-[#4A4A4A] font-medium">{paymentMethod === 'paypal' ? 'PayPal' : 'Bank'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
