'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gkey from '../public/images/gkey.jpg';
import gconsole from '../public/images/gconsole.jpg';
import gfam from '../public/images/gfam.webp';
import gmouse from '../public/images/gmouse.jpg';

// VideoModal component for playing YouTube videos
const VideoModal = ({ videoId, onClose }) => {
  if (!videoId) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// VideoCard component
const VideoCard = ({ imageSrc, videoId, onClick }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-transform duration-300 hover:scale-105"
      onClick={() => onClick(videoId)}
    >
      <div className="relative aspect-video bg-gray-900">
        <Image 
          src={imageSrc} 
          alt="Gaming gear video thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-rose-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7 text-white translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElevateGamingSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  
  const videos = [
    {
      id: "jHd71igP_Sg",
      thumbnail: gconsole, // You'll need to add these images to your public folder
    },
    {
      id: "ORWeWr7bZyM",
      thumbnail: gmouse,
    },
    {
      id: "wxZ3OGZ7Nqc",
      thumbnail: gkey,
    }
  ];
  
  const playVideo = (videoId) => {
    setActiveVideo(videoId);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  return (
    <section className="relative bg-[#0B0719] text-white overflow-hidden">
      {/* Background image/gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0719] via-[#17143a] to-[#0B0719] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/gfam.webp')] opacity-15 mix-blend-overlay"
        style={{ backgroundImage: `url(${gfam.src})` }}
        ></div>
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Game <br />
              With Our Premium <br /> 
              Gaming Gear
            </h1>
            
            <p className="text-gray-300 mb-8 text-lg">
              Engineered for Unparalleled Performance and Uncompromising Quality. Crafted with the finest materials and state-of-the-art technologies, our gaming gear is designed.
            </p>
            
            <Link href="/shop">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg">
                <span>Watch Video</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
       
        </div>
        
        {/* Video Gallery */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {videos.map((video, index) => (
              <VideoCard 
                key={video.id}
                imageSrc={video.thumbnail}
                videoId={video.id}
                onClick={playVideo}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {activeVideo && <VideoModal videoId={activeVideo} onClose={closeVideo} />}
    </section>
  );
};

export default ElevateGamingSection;