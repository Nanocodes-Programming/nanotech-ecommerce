import addressSvg from '../svgs/marker-svgrepo.svg';
import phoneSvg from '../svgs/phone-svg.svg';

const ContactCard = ({ name, desc, data }) => {
  const isAddress = name === 'Address';
  const isContact = name === 'Contact';
  
  return (
    <div className="xl:mx-5 mt-12 rounded-xl shadow-lg overflow-hidden bg-white w-full md:w-[40%] xl:w-[30%] mr-0 lg:mr-5 xl:mr-0 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      {/* Card Header */}
      <div className={`py-6 px-6 ${isAddress ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>
        <div className="flex items-center justify-center mb-3">
          <div className="p-3 bg-white rounded-full shadow-md">
            {isAddress && <img src={addressSvg} alt="Address icon" className="w-8 h-8" />}
            {isContact && <img src={phoneSvg} alt="Contact icon" className="w-8 h-8" />}
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
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        )}
        
        {isContact && (
          <div className="flex flex-col items-center">
            <div className="mb-4 w-16 h-1 bg-purple-500 rounded"></div>
            <div className="space-y-4 w-full">
              {data?.phone_number && (
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <div className="mr-3 p-2 rounded-full bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{data.phone_number}</span>
                </div>
              )}
              
              {data?.email && (
                <div className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <div className="mr-3 p-2 rounded-full bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{data.email}</span>
                </div>
              )}
            </div>
            
            <button className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
              Contact Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;