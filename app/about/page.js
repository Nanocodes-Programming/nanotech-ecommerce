'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';
import AboutCard from '@/components/utils/cards/AboutCard';
import Image from 'next/image';



const About = () => {
  // Optional: Add scroll animation effect
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

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative w-full pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Decorative tech lines */}
          <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          
          {/* Title with glowing effect */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white glow-text mb-4 animate-float">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Nanotech</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              The premier destination for cutting-edge technology and gaming gear
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -bottom-8 left-1/4 transform -translate-x-1/2">
            <div className="w-32 h-32 border-2 border-blue-500/20 rounded-full"></div>
            <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full absolute top-4 left-4"></div>
            <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full absolute top-8 left-8"></div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute top-12 left-12"></div>
          </div>
          
          <div className="hidden md:block absolute -bottom-8 right-1/4 transform translate-x-1/2">
            <div className="w-32 h-32 border-2 border-pink-500/20 rounded-full"></div>
            <div className="w-24 h-24 border-2 border-pink-500/20 rounded-full absolute top-4 left-4"></div>
            <div className="w-16 h-16 border-2 border-pink-500/20 rounded-full absolute top-8 left-8"></div>
            <div className="w-8 h-8 bg-pink-500/20 rounded-full absolute top-12 left-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section with futuristic border */}
      <div className="container mx-auto px-4 -mt-20 mb-16 relative z-20">
        <div className="relative p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="absolute -inset-[1px] rounded-xl blur"></div>
          <div className="bg-[#0B0719] rounded-xl p-8">
            <AboutCard />
          </div>
        </div>
      </div>

      {/* Futuristic Dot Grid */}
      <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64">
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex">
            {Array.from({ length: 8 }).map((_, colIndex) => (
              <div 
                key={`dot-${rowIndex}-${colIndex}`} 
                className="w-2 h-2 m-6 rounded-full bg-blue-500/30"
                style={{ 
                  animation: 'pulse 3s ease-in-out infinite',
                  animationDelay: `${(rowIndex + colIndex) * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        ))}
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
};

export default About;