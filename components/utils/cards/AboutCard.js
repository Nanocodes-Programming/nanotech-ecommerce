const AboutCard = () => {
  return (
    <div className="mx-auto mt-8 md:mt-12 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white max-w-3xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
        <h2 className="text-3xl font-bold text-white text-center">
          About Nanotech
        </h2>
        <p className="text-blue-100 text-lg font-medium mt-2 text-center">
          Your Premium Destination for Cutting-Edge Technology
        </p>
      </div>
      
      <div className="p-6 md:p-8 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to Nanotech – where innovation meets convenience. In today's fast-paced digital world, staying connected with the latest technology is essential, and Nanotech stands at the forefront of providing an exceptional shopping experience for all your gadget needs.
        </p>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Our carefully curated selection features cutting-edge smartphones, laptops, smart home devices, audio equipment, and accessories that enhance your digital lifestyle. Whether you're a tech enthusiast looking for the latest innovations or someone seeking reliable devices for everyday use, our comprehensive range caters to all levels of technical expertise.
        </p>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          At Nanotech, we pride ourselves on not just selling products, but offering solutions that seamlessly integrate into your life. Our team of experts is always available to provide personalized recommendations, ensuring you find the perfect gadget that meets your specific requirements and budget.
        </p>
      </div>
      
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
        <p className="text-gray-600 text-center">
          Experience the future of technology shopping with Nanotech – where quality, innovation, and customer satisfaction come together.
        </p>
      </div>
    </div>
  );
};

export default AboutCard;