import Header from '@/components/Header';
import AboutCard from '@/components/utils/cards/AboutCard';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 shadow-md">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-green-500/10 to-transparent pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">About Nanotech</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            The premier destination for cutting-edge technology and gadgets
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 -mt-16 mb-16">
        <AboutCard />
      </div>

      {/* Decorative Dots */}
      <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-4 left-4"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-4 left-8"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-4 left-12"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-8 left-4"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-8 left-8"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-8 left-12"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-12 left-4"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-12 left-8"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 absolute top-12 left-12"></div>
      </div>
    </div>
  );
};

export default About;