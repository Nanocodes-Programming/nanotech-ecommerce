'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
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
        
        .privacy-icon {
          position: relative;
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        
        .privacy-icon::before,
        .privacy-icon::after {
          content: '';
          position: absolute;
          background-color: currentColor;
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
              Privacy <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Policy</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We respect your privacy and are committed to protecting your data
            </p>
          </div>
          
          {/* Decorative elements - Shield icon */}
          <div className="hidden md:flex justify-center items-center mb-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse-slow"></div>
              <div className="absolute inset-2 border-2 border-blue-500/30 rounded-full"></div>
              <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
              <svg className="absolute inset-0 w-full h-full text-blue-500/60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section with futuristic border */}
      <div className="container mx-auto px-4 -mt-10 mb-16 relative z-20">
        <div className="relative p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="absolute -inset-[1px] rounded-xl blur"></div>
          <div className="bg-[#0B0719]/90 backdrop-blur-sm rounded-xl p-8 text-blue-100">
            <p className="mb-6">
              At Nanotech Store, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website (nanotech.nanocodes.com.ng) and use our services.
            </p>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">1. Information We Collect</h2>
              <p className="mb-2">We may collect the following types of information:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Personal Information:</span> Name, email address, phone number, billing and shipping address, payment details.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Account Information:</span> Username, password, and order history.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Device Information:</span> IP address, browser type, and operating system.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Usage Data:</span> Pages visited, time spent on our site, and interactions with our services.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">2. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Process and fulfill orders.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Improve our website, products, and customer service.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Communicate with you regarding your orders, promotions, and updates.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Prevent fraud and enhance security.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Comply with legal obligations.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">3. How We Protect Your Data</h2>
              <div className="bg-[#17143a]/50 p-6 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                <p>
                  We implement security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">4. Sharing Your Information</h2>
              <p className="mb-2">We do not sell, rent, or trade your personal information. However, we may share data with:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Service Providers:</span> Payment processors, shipping companies, and IT service providers.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Legal Authorities:</span> If required by law or to protect our rights and customers.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span><span className="text-blue-300 font-medium">Business Transfers:</span> In case of a merger, acquisition, or business sale.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies to improve your experience by storing preferences and analyzing site usage. You can disable cookies through your browser settings, but some features may not function properly.
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">6. Your Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#17143a]/30 rounded-lg border border-pink-500/20">
                  <p className="mb-2 font-medium text-pink-300">You have the right to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                      <span>Access, update, or delete your personal data.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                      <span>Opt out of marketing communications.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-[#17143a]/30 rounded-lg border border-pink-500/20">
                  <p className="mb-2 font-medium text-pink-300">Additionally:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                      <span>Request a copy of your data.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                      <span>Withdraw consent for data processing where applicable.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:sales@nanotech.nanocodes.com.ng" className="text-blue-400 hover:text-blue-300 underline">sales@nanotech.nanocodes.com.ng</a>.
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and continued use of our website constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">9. Contact Information</h2>
              <div className="bg-[#17143a]/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <p className="mb-2">For any questions about this Privacy Policy, contact us:</p>
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
                By using our website, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>

            <footer className="text-center text-blue-300/70 text-sm border-t border-blue-500/20 pt-4 mt-8">
              <p>Nanotech Store reserves the right to modify this policy at any time without prior notice. Please check our website for the latest updates.</p>
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

      {/* Small floating data protection elements */}
      <div className="hidden md:block absolute bottom-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-10 h-10 border border-blue-500/30 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full"></div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 border border-purple-500/30 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}