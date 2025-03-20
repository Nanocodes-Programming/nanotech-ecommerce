'use client'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import Header from '@/components/Header';
import ContactCard from '@/components/utils/cards/ContactCard';
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const Contact = () => {
  const { data, isLoading } = useSWR(`${API_URL}/website/`);
  const [mapPosition, setMapPosition] = useState({ lat: 6.8429, lng: 7.3733 }); // Default coordinates for Nsukka
  
  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
  });

  // Geocode the address to get exact coordinates
  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const address = "AO7 Patsyl Plaza, Opposite Kenechukwu Microfinance Bank, Nsukka, Enugu, Nigeria";
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setMapPosition({ 
            lat: lat(), 
            lng: lng() 
          });
        }
      });
    }
  }, [isLoaded]);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#7c93a3' }, { lightness: -10 }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#a0a4a5' }],
      },
      {
        featureType: 'administrative.province',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#62838e' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f8f8f8' }],
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#c9ebc7' }],
      },
      {
        featureType: 'poi.business',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f4d2c5' }, { visibility: 'simplified' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text',
        stylers: [{ color: '#4e4e4e' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [{ color: '#eaeaea' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'all',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#bbd9e9' }],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 shadow-md">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-blue-500/10 to-transparent py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We&apos;re here to help and would love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 mb-16">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
          <ContactCard name={'Address'} desc={"AO7 Patsyl Plaza, Opposite Kenechukwu Microfinance Bank, Nsukka, Enugu, Nigeria"} />
          <ContactCard name={'Contact'} data={data} />
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h2 className="text-2xl font-bold text-white text-center">Find Us</h2>
            <p className="text-blue-100 text-center mt-1">Visit our store in person</p>
          </div>
          <div className="h-[400px] w-full relative">
            {!isLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapPosition}
                zoom={16}
                options={mapOptions}
              >
                <MarkerF
                  position={mapPosition}
                  title="Nanotech Store"
                  animation={window.google.maps.Animation.DROP}
                 
                />
              </GoogleMap>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-12 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Immediate Assistance?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our customer support team is available Monday through Friday, 9am to 5pm.
          </p>
          <a href="tel:+2348124946594" className="bg-white text-indigo-600 font-bold rounded-full px-8 py-3 hover:bg-blue-50 transition-colors shadow-md inline-block">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;