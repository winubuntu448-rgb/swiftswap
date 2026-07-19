'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    nav: { home: "Home", about: "About", privacy: "Privacy Policy" },
    hero: { title: "Convert Your Digital Currencies to Cash Instantly", subtitle: "We buy USDT and USDC from you regardless of quantity, via PayPal or international SWIFT bank transfers." },
    dashboard: { title: "Exchange Dashboard", selectCurrency: "Select Currency", usdt: "USDT (Tether)", usdc: "USDC (USD Coin)", amount: "Amount", network: "Network", bsc: "BSC (Binance Smart Chain)", bscExclusive: "We support Binance Smart Chain (BSC) exclusively for ultra-fast processing of your requests.", noLimits: "No Limits" },
    calculator: { title: "Exchange Calculator", youSend: "You Send", youReceive: "You Receive", fee: "Transaction Fee", total: "Total After Fees" },
    recipient: { title: "Recipient Details", paymentMethod: "Payment Method", paypal: "PayPal", swift: "SWIFT Bank Transfer", paypalEmail: "PayPal Email", bankName: "Bank Name", accountNumber: "Account Number", swiftCode: "SWIFT Code", iban: "IBAN" },
    summary: { title: "Transaction Summary", currency: "Currency", amount: "Amount", paymentMethod: "Payment Method", recipient: "Recipient", fees: "Fees", total: "Total to Receive" },
    action: { connectWallet: "Connect Wallet to Complete Transaction", processing: "Processing...", success: "Transaction Initiated Successfully" },
    security: { title: "Your Funds Are Protected", encryption: "256-bit SSL Encryption", privacy: "Privacy Policy", privacyText: "Your banking data is only connected in the final step" },
    footer: { rights: "All rights reserved" }
  },
  ar: {
    nav: { home: "الرئيسية", about: "عن الموقع", privacy: "سياسة الخصوصية" },
    hero: { title: "حول عملاتك الرقمية إلى سيولة نقدية فوراً", subtitle: "نشتري منك عملات USDT و USDC مهما كانت الكمية، عبر PayPal أو تحويلات SWIFT البنكية الدولية." },
    dashboard: { title: "لوحة التبادل", selectCurrency: "اختر العملة", usdt: "USDT (تيثر)", usdc: "USDC (عملة الدولار)", amount: "المبلغ", network: "الشبكة", bsc: "BSC (سلسلة بينانس الذكية)", bscExclusive: "نحن ندعم شبكة Binance Smart Chain (BSC) حصرياً و فقط لضمان سرعة فائقة في معالجة طلباتك.", noLimits: "بدون حدود" },
    calculator: { title: "حاسبة التبادل", youSend: "ترسل", youReceive: "تستلم", fee: "رسوم المعاملة", total: "الإجمالي بعد الرسوم" },
    recipient: { title: "بيانات المستلم", paymentMethod: "طريقة الدفع", paypal: "بايبال", swift: "تحويل بنكي SWIFT", paypalEmail: "بريد بايبال", bankName: "اسم البنك", accountNumber: "رقم الحساب", swiftCode: "رمز SWIFT", iban: "IBAN" },
    summary: { title: "ملخص المعاملة", currency: "العملة", amount: "المبلغ", paymentMethod: "طريقة الدفع", recipient: "المستلم", fees: "الرسوم", total: "الإجمالي المستلم" },
    action: { connectWallet: "اربط محفظتك لإتمام التحويل", processing: "جاري المعالجة...", success: "تم بدء المعاملة بنجاح" },
    security: { title: "أموالك محمية", encryption: "تشفير SSL 256-bit", privacy: "سياسة الخصوصية", privacyText: "بياناتك البنكية تُربط فقط في الخطوة الأخيرة" },
    footer: { rights: "جميع الحقوق محفوظة" }
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", privacy: "Politique de confidentialité" },
    hero: { title: "Convertissez vos crypto-monnaies en espèces instantanément", subtitle: "Nous achetons vos USDT et USDC quelle que soit la quantité, via PayPal ou virements bancaires SWIFT internationaux." },
    dashboard: { title: "Tableau de bord d'échange", selectCurrency: "Sélectionner la devise", usdt: "USDT (Tether)", usdc: "USDC (USD Coin)", amount: "Montant", network: "Réseau", bsc: "BSC (Binance Smart Chain)", bscExclusive: "Nous supportons exclusivement Binance Smart Chain (BSC) pour un traitement ultra-rapide de vos demandes.", noLimits: "Sans limites" },
    calculator: { title: "Calculateur d'échange", youSend: "Vous envoyez", youReceive: "Vous recevez", fee: "Frais de transaction", total: "Total après frais" },
    recipient: { title: "Détails du destinataire", paymentMethod: "Méthode de paiement", paypal: "PayPal", swift: "Virement bancaire SWIFT", paypalEmail: "Email PayPal", bankName: "Nom de la banque", accountNumber: "Numéro de compte", swiftCode: "Code SWIFT", iban: "IBAN" },
    summary: { title: "Résumé de la transaction", currency: "Devise", amount: "Montant", paymentMethod: "Méthode de paiement", recipient: "Destinataire", fees: "Frais", total: "Total à recevoir" },
    action: { connectWallet: "Connecter le portefeuille pour compléter la transaction", processing: "Traitement en cours...", success: "Transaction initiée avec succès" },
    security: { title: "Vos fonds sont protégés", encryption: "Chiffrement SSL 256-bit", privacy: "Politique de confidentialité", privacyText: "Vos données bancaires ne sont connectées qu'à l'étape finale" },
    footer: { rights: "Tous droits réservés" }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
