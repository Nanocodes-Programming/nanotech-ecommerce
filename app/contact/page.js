'use client'
import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import Header from '@/components/Header';
import ContactCard from '@/components/utils/cards/ContactCard';

const Contact = () => {
  const { data, isLoading } = useSWR(`${API_URL}/website/`);

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
            Have questions about our products or services? We're here to help and would love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 mb-16">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
          <ContactCard name={'Address'} desc={data?.address} />
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
          <div className="h-[400px] w-full bg-gray-200 relative">
            {/* This would be your Google Map embed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 font-medium">Google Map will be displayed here</p>
            </div>
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
          <button className="bg-white text-indigo-600 font-bold rounded-full px-8 py-3 hover:bg-blue-50 transition-colors shadow-md">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;