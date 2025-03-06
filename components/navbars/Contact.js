import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import Header from '../Header';
import ContactCard from '../utils/cards/ContactCard';

const Contact = () => {
  const { data } = useSWR(`${API_URL}/website/`);

  return (
    <div className="w-full flex flex-col lg:h-[90vh] -mb-16 bg-[#2bea0c12]">
      <div className="bg-gradient-to-br from-green-800 via-green-500 to-green-600 shadow-md px-3 xl:px-32">
        <Header />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center py-10 md:px-5 md:gap-5 lg:gap-0 lg:px-10 px-10 xl:px-28 -mt-28 lg:-mt-5">
        <ContactCard name={'Address'} desc={data?.address} />
        <ContactCard name={'Contact'} data={data} />
        {/* <ContactCard name={'Socials'} /> */}
      </div>
    </div>
  );
};

export default Contact;
