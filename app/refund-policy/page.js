'use client';

import React, { useEffect } from 'react';

export default function RefundPolicy() {
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
              Refund <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Policy</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We strive to make the refund process as smooth as possible
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
              At Nanotech Store, we are committed to providing high-quality laptops and tech gadgets to our customers. 
              We understand that sometimes a purchase may not meet your expectations, and we strive to make the refund process as smooth as possible.
              Please read our refund policy carefully.
            </p>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">1. Eligibility for Refund</h2>
              <p className="mb-2">A refund request may be granted under the following conditions:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>The item received is <span className="text-purple-400 font-medium">defective</span> or <span className="text-purple-400 font-medium">damaged upon arrival</span>.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>The item received <span className="text-purple-400 font-medium">does not match</span> the description on our website.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>The item is <span className="text-purple-400 font-medium">unused, in its original packaging, and in resellable condition</span>.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>The refund request is made within <span className="text-purple-400 font-medium">7 days</span> of delivery.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">2. Non-Refundable Items</h2>
              <p className="mb-2">We do not offer refunds for the following:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Software, digital products, or downloadable content.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Items damaged due to customer misuse, mishandling, or improper installation.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Items purchased on clearance sale or marked as non-refundable.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Items without original packaging, accessories, or missing components.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">3. Refund Process</h2>
              <p className="mb-2">To request a refund, follow these steps:</p>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 flex-shrink-0 w-6 h-6 rounded-full bg-[#17143a] border border-pink-400 flex items-center justify-center text-sm">1</div>
                  <span>Contact us via email at <a href="mailto:sales@nanotech.nanocodes.com.ng" className="text-blue-400 hover:text-blue-300 underline">sales@nanotech.nanocodes.com.ng</a> or call us at +234 812 494 6594 within 7 days of receiving the product.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 flex-shrink-0 w-6 h-6 rounded-full bg-[#17143a] border border-pink-400 flex items-center justify-center text-sm">2</div>
                  <span>Provide your order number, proof of purchase, and clear images or videos of the defect or issue.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 flex-shrink-0 w-6 h-6 rounded-full bg-[#17143a] border border-pink-400 flex items-center justify-center text-sm">3</div>
                  <span>Our team will review your request and provide further instructions.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 flex-shrink-0 w-6 h-6 rounded-full bg-[#17143a] border border-pink-400 flex items-center justify-center text-sm">4</div>
                  <span>If approved, you may be required to return the item to our designated address.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 flex-shrink-0 w-6 h-6 rounded-full bg-[#17143a] border border-pink-400 flex items-center justify-center text-sm">5</div>
                  <span>Once the returned item is inspected and meets our refund criteria, we will process the refund within 7-14 business days.</span>
                </li>
              </ol>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">4. Return Shipping</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>If the return is due to our error (wrong item, defective, or damaged product), we will cover the return shipping cost.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span>If the return is due to a change of mind, the customer is responsible for the return shipping fees.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 glow-text">5. Refund Method</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>Refunds will be processed via the original payment method.</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <span>For payments made via bank transfer or direct deposit, refunds may take an additional 3-5 business days to reflect.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-pink-500 to-blue-500"></div>
              <h2 className="text-2xl font-semibold text-pink-400 mb-4 glow-text">6. Exchange Policy</h2>
              <p>
                Instead of a refund, customers may choose an exchange for the same product or another item of equal value (subject to availability).
              </p>
            </section>

            <section className="mb-8 relative">
              <div className="absolute -left-4 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4 glow-text">7. Contact Information</h2>
              <div className="bg-[#17143a]/50 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <p className="mb-2">For any questions regarding our refund policy, please contact us:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span><span className="text-blue-400 font-medium">Email:</span> <a href="mailto:sales@nanotech.nanocodes.com.ng" className="text-purple-400 hover:text-purple-300 underline">sales@nanotech.nanocodes.com.ng</a></span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span><span className="text-blue-400 font-medium">Phone:</span> +234 812 494 6594</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span><span className="text-blue-400 font-medium">Address:</span> AO7 Patsyl Plaza, Opposite Kenechukwu Microfinance Bank, Nsukka, Enugu, Nigeria</span>
                  </li>
                </ul>
              </div>
            </section>

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
    </div>
  );
}