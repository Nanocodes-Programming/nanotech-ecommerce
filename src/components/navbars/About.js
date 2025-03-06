import Header from '../Header';
import AboutCard from '../utils/cards/AboutCard';

const About = () => {
  return (
    <div className="w-full flex flex-col h-[90vh] -mb-16 bg-[#2bea0c12]">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>

      <div className="flex items-center p-10">
        <AboutCard />
      </div>
    </div>
  );
};

export default About;
