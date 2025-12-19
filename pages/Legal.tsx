
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LegalPage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-offwhite py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-primary">{title}</h1>
        <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-sm prose prose-slate max-w-none space-y-8 text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, and shipping address.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">2. How We Use Information</h3>
      <p>We use your information to process orders, communicate with you about your order, and improve our services. We do not sell your personal data to third parties.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">3. Data Security</h3>
      <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
    </section>
  </LegalPage>
);

export const TermsOfService = () => (
  <LegalPage title="Terms of Service">
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">1. Agreement to Terms</h3>
      <p>By using the Watch Pro store, you agree to be bound by these terms. If you do not agree, please do not use the site.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">2. Product Availability</h3>
      <p>All timepieces are subject to availability. We reserve the right to limit the quantity of products we supply or refuse any order.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">3. Pricing and Payments</h3>
      <p>All prices are listed in Indian Rupees (₹). We reserve the right to change prices at any time without prior notice.</p>
    </section>
  </LegalPage>
);

export const Warranty = () => (
  <LegalPage title="Warranty Info">
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">1. One Year Official Warranty</h3>
      <p>Every timepiece purchased from Watch Pro comes with a 1-year limited warranty from the date of purchase.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">2. What is Covered</h3>
      <p>The warranty covers manufacturing defects in the movement, hands, and dial. If these parts prove to be defective in material or workmanship under normal use, your watch will be repaired or replaced free of charge.</p>
    </section>
    <section className="space-y-4">
      <h3 className="text-xl font-bold text-primary">3. What is Not Covered</h3>
      <p>The warranty does not cover: battery life, crystal/glass, strap, scratches, water damage unless specified, or damage resulting from improper handling or accidents.</p>
    </section>
  </LegalPage>
);
