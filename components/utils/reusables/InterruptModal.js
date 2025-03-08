import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import access_denied from '../../../images/access_denied.jpg';

const InterruptModal = () => {
  const authModal = useSelector((state) => state.auth.authModal);

  return (
    <Modal
      open={authModal === 'INTERRUPT'}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="mx-auto flex flex-col justify-center items-center gap-3 h-[50vh] w-[80vw] md:w-[55%] lg:w-[40%] xl:w-[30%] md:shadow-lg rounded-xl bg-white border-none outline-none p-5">
        <img src={access_denied.src} alt="" className="w-40" />
        <p className="text-center text-base lg:text-xl text-gray-900 font-medium">
          Contact Nanocodes Programming Limited on{' '}
          <span className="text-blue-600">+234 915 952 1960</span> or via email
          at <span className="text-blue-600">admin@nanocodes.com.ng</span> to
          avoid taking down this website
        </p>
      </div>
    </Modal>
  );
};

export default InterruptModal;
