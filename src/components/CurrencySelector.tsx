'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface CurrencySelectorProps {
  selectedCurrency: 'USDT' | 'USDC';
  onSelect: (currency: 'USDT' | 'USDC') => void;
  amount: string;
  onAmountChange: (amount: string) => void;
}

export default function CurrencySelector({
  selectedCurrency,
  onSelect,
  amount,
  onAmountChange
}: CurrencySelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-[#2C3E50] mb-3 sm:mb-4">
          {t('dashboard.selectCurrency')}
        </label>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => onSelect('USDT')}
            className={`p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse transition-all duration-300 ease-in-out border cursor-pointer ${
              selectedCurrency === 'USDT'
                ? 'border-[#C5A059] bg-white shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png"
                alt="USDT"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>
            <div className="text-left rtl:text-right">
              <p className="font-semibold text-[#2C3E50] text-sm sm:text-base">{t('dashboard.usdt')}</p>
              <p className="text-xs text-[#4A4A4A]">{t('dashboard.bsc')}</p>
            </div>
          </button>

          <button
            onClick={() => onSelect('USDC')}
            className={`p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse transition-all duration-300 ease-in-out border cursor-pointer ${
              selectedCurrency === 'USDC'
                ? 'border-[#003087] bg-white shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1280px-Circle_USDC_Logo.svg.png"
                alt="USDC"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>
            <div className="text-left rtl:text-right">
              <p className="font-semibold text-[#2C3E50] text-sm sm:text-base">{t('dashboard.usdc')}</p>
              <p className="text-xs text-[#4A4A4A]">{t('dashboard.bsc')}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <label className="block text-sm font-medium text-[#2C3E50]">
            {t('dashboard.amount')}
          </label>
          <span className="text-xs font-medium text-[#C5A059]">
            {t('dashboard.noLimits')}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 sm:py-4 text-xl sm:text-2xl font-semibold border border-gray-200 focus:outline-none focus:border-[#003087] transition-all duration-300 ease-in-out"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            min="0"
            step="0.01"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-[#4A4A4A]">
            {selectedCurrency}
          </div>
        </div>
      </div>

      {/* Network Info */}
      <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse p-3 sm:p-4 border border-gray-200">
        <img
          src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
          alt="BSC"
          className="w-5 h-5 object-contain"
        />
        <span className="text-sm font-medium text-[#4A4A4A]">
          {t('dashboard.network')}: <span className="text-[#C5A059]">{t('dashboard.bsc')}</span>
        </span>
      </div>

      {/* BSC Exclusive Message */}
      <div className="text-center text-xs text-[#4A4A4A] p-3 sm:p-4">
        {t('dashboard.bscExclusive')}
      </div>
    </div>
  );
}
