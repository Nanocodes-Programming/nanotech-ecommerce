// No need to import SVG files as we're using inline SVGs

const ContactCard = ({ name, desc, data }) => {
  const isAddress = name === 'Address';
  const isContact = name === 'Contact';
  
  return (
    <div className="xl:mx-5 mt-12 rounded-xl shadow-lg overflow-hidden bg-white w-full md:w-[40%] xl:w-[30%] mr-0 lg:mr-5 xl:mr-0 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      {/* Card Header */}
      <div className={`py-6 px-6 ${isAddress ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>
        <div className="flex items-center justify-center mb-3">
          <div className="p-3 bg-white rounded-full shadow-md">
            {isAddress && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            )}
            {isContact && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center">{name}</h2>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col items-center justify-center">
        {isAddress && (
          <div className="flex flex-col items-center">
            <div className="mb-4 w-16 h-1 bg-blue-500 rounded"></div>
            <p className="text-gray-700 text-lg text-center leading-relaxed">{desc}</p>
            <div className="mt-4 flex items-center justify-center">
              <a 
                href={`https://www.google.com/maps/search/${encodeURIComponent(desc)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        )}
        
        {isContact && (
          <div className="flex flex-col items-center">
            <div className="mb-4 w-16 h-1 bg-purple-500 rounded"></div>
            <div className="space-y-4 w-full">
              
                <a 
                  href={`tel:+234 812 494 6594`}
                  className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <div className="mr-3 p-2 rounded-full bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">+234 812 494 6594</span>
                </a>
            
              
          
                <a 
                  href={`mailto:sales@nanotech.nanocodes.com.ng`}
                  className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <div className="mr-3 p-2 rounded-full bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">sales@nanotech.nanocodes.com.ng</span>
                </a>
            
            </div>
            
            <a 
              href="#contact-form" 
              className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Contact Us
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;