import addressSvg from '../svgs/marker-svgrepo.svg';
import phoneSvg from '../svgs/phone-svg.svg';

const ContactCard = ({ name, desc, data }) => {
  return (
    <div className="xl:mx-5 mt-[7rem] flex flex-col rounded-lg shadow-xl py-10 px-5 h-[20rem] w-full md:w-[40%] xl:w-[30%] mr-0 lg:mr-5 xl:mr-0 bg-white">
      <div className="mr-auto ml-auto">
        {name === 'Address' && <img src={addressSvg} alt="" />}
        {name === 'Contact' && <img src={phoneSvg} alt="" />}
      </div>
      <p className="text-3xl font-bold mr-auto ml-auto text-[#000000bf] mb-5">
        {name}
      </p>
      {name === 'Address' && (
        <div className="flex items-center">
          <p className="text-[#0000009e] text-lg">{desc}</p>
        </div>
      )}
      {name === 'Contact' && (
        <div className="mr-auto ml-auto flex flex-col items-center justify-center">
          <p className="mb-1 text-[#0000009e] text-lg font-semibold">
            {data?.phone_number}
          </p>
          <p className="mb-1 text-[#0000009e] text-lg font-semibold">
            {data?.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
