'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface RecipientFormProps {
  paymentMethod: 'paypal' | 'swift';
  onPaymentMethodChange: (method: 'paypal' | 'swift') => void;
  recipientData: {
    paypalEmail: string;
    bankName: string;
    accountNumber: string;
    swiftCode: string;
    iban: string;
  };
  onRecipientDataChange: (data: any) => void;
}

export default function RecipientForm({
  paymentMethod,
  onPaymentMethodChange,
  recipientData,
  onRecipientDataChange
}: RecipientFormProps) {
  const { t } = useLanguage();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    onRecipientDataChange({ ...recipientData, [field]: value });
  };

  const inputStyle = (fieldName: string) => ({
    background: '#ffffff',
    border: focusedField === fieldName ? '1px solid #003087' : '1px solid #E5E7EB',
    boxShadow: focusedField === fieldName ? '0 0 0 1px #003087' : 'none',
  });

  const methods = [
    {
      id: 'paypal' as const,
      label: 'PayPal',
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
          alt="PayPal"
          className="w-6 h-6 object-contain"
        />
      ),
      color: '#0070BA',
      activeClass: 'active-blue',
    },
    {
      id: 'swift' as const,
      label: 'SWIFT',
      icon: (
        <img
          src="https://banner2.cleanpng.com/20180620/ack/kisspng-society-for-worldwide-interbank-financial-telecomm-fail-test-5b2a3ea90b41a4.8736419315294952090461.jpg"
          alt="SWIFT"
          className="w-6 h-6 object-contain"
        />
      ),
      color: '#003087',
      activeClass: 'active-blue',
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Method selection */}
      <div>
        <p className="field-label">{t('recipient.paymentMethod')}</p>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {methods.map((method) => {
            const isActive = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                id={`method-${method.id}`}
                onClick={() => onPaymentMethodChange(method.id)}
                className={`select-card group transition-all duration-300 cursor-pointer ${isActive ? method.activeClass : ''}`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3 py-2">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 ease-in-out"
                    style={{
                      background: isActive ? `${method.color}10` : '#ffffff',
                      border: `1px solid ${isActive ? method.color : '#E5E7EB'}`,
                    }}
                  >
                    {method.icon}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold transition-colors ${isActive ? 'text-[#2C3E50]' : 'text-[#4A4A4A]'}`}>
                      {method.label}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* PayPal Form */}
      {paymentMethod === 'paypal' && (
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="field-label" htmlFor="paypal-email">{t('recipient.paypalEmail')}</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#4A4A4A]" fill="none" viewBox="0 0 34 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="paypal-email"
                type="email"
                value={recipientData.paypalEmail}
                onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                onFocus={() => setFocusedField('paypalEmail')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                inputMode="email"
                className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm text-[#2C3E50] outline-none transition-all duration-300 ease-in-out placeholder:text-[#9CA3AF]"
                style={inputStyle('paypalEmail')}
              />
            </div>
          </div>

          <div className="px-3 sm:px-4 py-3 border border-gray-200">
            <p className="text-xs text-[#4A4A4A] leading-relaxed">
              Your PayPal email is encrypted with 256-bit SSL and never stored on our servers.
            </p>
          </div>
        </div>
      )}

      {/* SWIFT Form */}
      {paymentMethod === 'swift' && (
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="field-label" htmlFor="bank-name">{t('recipient.bankName')}</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#4A4A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input
                id="bank-name"
                type="text"
                value={recipientData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                onFocus={() => setFocusedField('bankName')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. BNP Paribas"
                className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm text-[#2C3E50] outline-none transition-all duration-300 ease-in-out placeholder:text-[#9CA3AF]"
                style={inputStyle('bankName')}
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="account-number">{t('recipient.accountNumber')}</label>
            <input
              id="account-number"
              type="text"
              value={recipientData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              onFocus={() => setFocusedField('accountNumber')}
              onBlur={() => setFocusedField(null)}
              placeholder="Account Number"
              inputMode="numeric"
              className="w-full px-4 py-3 sm:py-4 text-sm text-[#2C3E50] outline-none transition-all duration-300 ease-in-out placeholder:text-[#9CA3AF]"
              style={inputStyle('accountNumber')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label" htmlFor="swift-code">{t('recipient.swiftCode')}</label>
              <input
                id="swift-code"
                type="text"
                value={recipientData.swiftCode}
                onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                onFocus={() => setFocusedField('swiftCode')}
                onBlur={() => setFocusedField(null)}
                placeholder="BNPAFRPP"
                inputMode="text"
                className="w-full px-4 py-3 sm:py-4 text-sm text-[#2C3E50] outline-none transition-all duration-300 ease-in-out placeholder:text-[#9CA3AF] font-mono tracking-wide"
                style={inputStyle('swiftCode')}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="iban">{t('recipient.iban')}</label>
              <input
                id="iban"
                type="text"
                value={recipientData.iban}
                onChange={(e) => handleInputChange('iban', e.target.value)}
                onFocus={() => setFocusedField('iban')}
                onBlur={() => setFocusedField(null)}
                placeholder="FR76 XXXX"
                inputMode="text"
                className="w-full px-4 py-3 sm:py-4 text-sm text-[#2C3E50] outline-none transition-all duration-300 ease-in-out placeholder:text-[#9CA3AF] font-mono tracking-wide"
                style={inputStyle('iban')}
              />
            </div>
          </div>

          <div className="px-3 sm:px-4 py-3 border border-gray-200">
            <p className="text-xs text-[#4A4A4A] leading-relaxed">
              Your SWIFT & IBAN details are end-to-end encrypted and never shared with third parties.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
