'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExchangeCalculatorProps {
  currency: 'USDT' | 'USDC';
  amount: string;
}

export default function ExchangeCalculator({ currency, amount }: ExchangeCalculatorProps) {
  const { t } = useLanguage();

  const calculations = useMemo(() => {
    const amountNum = parseFloat(amount) || 0;
    const feeRate = 0.025;
    const fee = amountNum * feeRate;
    const totalAfterFee = amountNum - fee;
    return {
      fee: fee.toFixed(2),
      totalAfterFee: totalAfterFee.toFixed(2),
      feeRate: (feeRate * 100).toFixed(1),
      amountNum,
    };
  }, [amount]);

  const hasAmount = calculations.amountNum > 0;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* You Send */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border border-gray-200">
        <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">
          {t('calculator.youSend')}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl sm:text-3xl font-bold text-[#2C3E50]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {hasAmount ? calculations.amountNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </span>
          <span className="text-sm font-bold" style={{ color: currency === 'USDT' ? '#26A17B' : '#2775CA' }}>
            {currency}
          </span>
        </div>
      </div>

      {/* Fee row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
          <div>
            <p className="text-sm text-[#2C3E50] font-medium">{t('calculator.fee')}</p>
            <p className="text-xs text-[#4A4A4A]">{calculations.feeRate}% platform fee</p>
          </div>
        </div>
        <span className="text-base font-semibold text-[#4A4A4A]">
          -{hasAmount ? calculations.fee : '0.00'} $
        </span>
      </div>

      {/* Arrow */}
      <div className="flex justify-center py-2">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* You Receive */}
      <div className="total-box">
        <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">
          {t('calculator.youReceive')}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl sm:text-3xl font-bold text-[#C5A059]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {hasAmount ? parseFloat(calculations.totalAfterFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </span>
          <span className="text-sm font-bold text-[#4A4A4A]">USD</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
          <p className="text-xs text-[#4A4A4A]">{t('calculator.total')}</p>
        </div>
      </div>
    </div>
  );
}
