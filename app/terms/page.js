'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function TermsOfUse() {
  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(elem => {
        const scrollY = window.scrollY;
        const speed = parseFloat(elem.getAttribute('data-speed') || '0.1');
        elem.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0719] text-white relative overflow-hidden">
      {/* Custom CSS for gaming effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(0, 102, 255, 0.7);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        
        .hex-grid {
          position: absolute;
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px);
          transform: rotate(45deg);
          opacity: 0.2;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0719] via-[#17143a] to-[#0B0719]"></div>
        
        {/* Grid pattern */}
        <div className="hex-grid w-full h-full"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-pink-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Placeholder - You would import your actual Header component here */}
      <div className="w-full py-6 bg-[#0B0719]/80 backdrop-blur-sm border-b border-blue-500/20 z-10">
        <div className="container mx-auto px-4">
         <Link href="/" className="flex items-center">
          <h2 className="text-2xl font-bold text-blue-400">Nanotech Store</h2>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full pt-16 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Decorative tech lines */}
          <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          
          {/* Title with glowing effect */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white glow-text mb-4 animate-float">
              Terms of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Use</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Welcome to Nanotech Store!
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -bottom-8 left-1/4 transform -translate-x-1/2">
            <div className="w-32 h-32 border-2 border-blue-500/20 rounded-full"></div>
            <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full absolute top-4 left-4"></div>
            <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full absolute top-8 left-8"></div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute top-12 left-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section with futuristic border */}
      <div className="container mx-auto px-4 -mt-10 mb-16 relative z-20">
        <div className="relative p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="absolute -inset-[1px] rounded-xl blur"></div>
          <div className="bg-[#0B0719]/90 backdrop-blur-sm rounded-xl p-8 text-blue-100">
            <p className="mb-6">
              These Terms of Use govern your access to and use of our website, services, and products. By using our website (nanotech.nanocodes.com.ng), you agree to comply with these terms. If you do not agree, please do not use our site.
            </p>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our website, you agree to abide by these Terms of Use, along with our Privacy Policy and Refund Policy. If you violate any of these terms, we reserve the right to restrict or terminate your access.
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">2. Use of Our Website</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>You must be at least 18 years old or have parental/guardian consent to use our site.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>You agree not to use our website for any illegal, fraudulent, or harmful activities.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Unauthorized access, modification, or disruption of our website is strictly prohibited.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>We reserve the right to modify or discontinue our website without prior notice.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">3. Account Registration</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>Some features may require you to create an account.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>You are responsible for maintaining the confidentiality of your login credentials.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>Any activity under your account is your responsibility.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>We reserve the right to suspend or terminate accounts suspected of fraudulent activities.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">4. Orders and Payments</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>All purchases made through our website are subject to availability and acceptance.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>Prices are subject to change without prior notice.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>We accept various payment methods, and all transactions must be completed before order fulfillment.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>If a payment is flagged as suspicious, we may cancel the order and issue a refund.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">5. Shipping and Delivery</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>We strive to deliver your orders promptly; however, delays may occur due to unforeseen circumstances.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Delivery timelines are estimates and not guaranteed.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Risk of loss passes to the customer once the order is shipped.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">6. Returns and Refunds</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>Refunds and returns are governed by our <a href="/refund-policy" className="text-blue-400 hover:text-blue-300 underline">Refund Policy</a>.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>We only accept returns for eligible products within the specified return period.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">7. Intellectual Property</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>All content on our website, including logos, text, images, and designs, is owned by or licensed to Nanotech Store.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>You may not use, reproduce, or distribute any content without our prior written consent.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">8. User Conduct</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Users must not post offensive, misleading, or illegal content.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Any attempt to hack, disrupt, or harm our website will lead to legal action.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>We reserve the right to remove any content that violates these terms.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">9. Limitation of Liability</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>We are not responsible for any indirect, incidental, or consequential damages arising from your use of our website or products.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                  <span>We do not guarantee uninterrupted, error-free access to our website.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">10. Third-Party Links</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>Our website may contain links to third-party websites. We are not responsible for their content, policies, or practices.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">11. Changes to Terms</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>We may update these Terms of Use at any time without prior notice.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Continued use of our website after modifications constitutes acceptance of the new terms.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">12. Contact Information</h2>
              <div className="bg-[#17143a]/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <p className="mb-2">For any questions regarding these terms, please contact us:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <span><span className="text-pink-400 font-medium">Email:</span> <a href="mailto:sales@nanotech.nanocodes.com.ng" className="text-blue-400 hover:text-blue-300 underline">sales@nanotech.nanocodes.com.ng</a></span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <span><span className="text-pink-400 font-medium">Phone:</span> +234 812 494 6594</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <span><span className="text-pink-400 font-medium">Address:</span> AO7 Patsyl Plaza, Opposite Kenechukwu Microfinance Bank, Nsukka, Enugu, Nigeria</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 my-8">
              <p className="text-center">
                By using our website, you acknowledge that you have read, understood, and agreed to these Terms of Use.
              </p>
            </div>

            <footer className="text-center text-blue-300/70 text-sm border-t border-blue-500/20 pt-4 mt-8">
              <p>Nanotech Store reserves the right to modify these terms at any time without prior notice. Please check our website for the latest updates.</p>
            </footer>
          </div>
        </div>
      </div>

      {/* Tech circuit lines */}
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96">
        <svg className="w-full h-full text-blue-500/20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L30,10 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <path d="M10,30 L20,30 L20,50 L40,50 L40,70 L60,70 L60,90" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <path d="M30,10 L30,20 L50,20 L50,40 L70,40 L70,60 L90,60" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <circle cx="30" cy="10" r="2" fill="currentColor"/>
          <circle cx="30" cy="30" r="2" fill="currentColor"/>
          <circle cx="50" cy="30" r="2" fill="currentColor"/>
          <circle cx="50" cy="50" r="2" fill="currentColor"/>
          <circle cx="70" cy="50" r="2" fill="currentColor"/>
          <circle cx="70" cy="70" r="2" fill="currentColor"/>
          <circle cx="90" cy="70" r="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}