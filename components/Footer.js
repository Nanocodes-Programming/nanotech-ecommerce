import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import * as yup from 'yup';
import { API_URL } from '../constants/api';
import onics_logo from '../images/onicss.png';
import { scrollToTop } from '../store/actions/customer_actions';
import { setDashboardPage } from '../store/reducers/dashboard_reducer';
import FacebookIcon from './utils/icons/FacebookIcon';
import InstaIcon from './utils/icons/InstaIcon';
import LoadingIcon from './utils/icons/LoadingIcon';
import TwitterIcon from './utils/icons/TwitterIcon';
import InputField from './utils/reusables/InputField';

const styles = {
  main: 'bg-[#000000de] w-full text-white text-lg px-10 xl:px-32 py-7 mt-16',
  wrapper: 'w-full flex flex-col lg:flex-row justify-between mt-2',
  optionsWrapper: 'flex flex-col mb-12 lg:mb-0  gap-3',
  options: 'cursor-pointer hover:text-green-600',
  helpWrapper: 'flex flex-col mb-12 lg:mb-0 gap-3',
  getConnectedWrapper: 'flex flex-col mb-12 lg:mb-0 gap-3',
  socialIcons: 'ml-0 lg:ml-10 mt-3 flex gap-4 items-center',
  informedWrapper: 'flex flex-col mb-12 lg:mb-0 gap-3',
  subscribe:
    'font-semibold text-green-600 cursor-pointer -mt-4 outline-none border-none text-left md:text-center',
  anchor: 'hover:hover:text-green-600',
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
});

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { data: socials } = useSWR(`${API_URL}/website/`);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`${API_URL}/subscribe/`, {
        email: data?.email,
      });

      toast.success('You have successfully subscribed to our newsletter', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: false,
      });
      setIsLoading(false);
      reset();
    } catch (error) {
      toast.error('Sorry, an error occured', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={styles?.main}>
      <div>
        <div
          onClick={() => {
            scrollToTop();
            navigate('/');
          }}
          className="cursor-pointer"
        >
          <img src={onics_logo} alt="" className="h-16" />
        </div>
        <div className={styles?.wrapper}>
          <div className={styles?.optionsWrapper}>
            <p
              onClick={() => {
                scrollToTop();
                navigate('/about');
              }}
              className={styles?.options}
            >
              About
            </p>
            <p className={styles?.options}>Services</p>
            <p
              onClick={() => {
                scrollToTop();
                navigate('/contact');
              }}
              className={styles?.options}
            >
              Contact
            </p>
          </div>

          <div className={styles?.helpWrapper}>
            <p className="font-semibold">Help</p>
            <p
              onClick={() => {
                scrollToTop();
                navigate('/contact');
              }}
              className={styles?.options}
            >
              Customer Support
            </p>
            <p
              onClick={() => {
                scrollToTop();
                dispatch(setDashboardPage('orders'));
                navigate('/dashboard');
              }}
              className={styles?.options}
            >
              Delivery Details
            </p>
          </div>

          <div className={styles?.getConnectedWrapper}>
            <p className="font-semibold">Get connected</p>
            <p className="max-w-[18rem]">
              Join the conversations on social media to stay connected with our
              latest products and services.
            </p>
            <div className={styles?.socialIcons}>
              <a href={socials?.twitter}>
                <TwitterIcon />
              </a>
              <a href={socials?.facebook}>
                <FacebookIcon />
              </a>
              <a href={socials?.instagram}>
                <InstaIcon />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles?.informedWrapper}
          >
            <p className="font-semibold">Stay informed</p>
            <p className="max-w-[16rem]">
              Subscribe to our notification to receive updates of new products
              and services.
            </p>
            <div className="text-[#000000cc]">
              <InputField
                type={'email'}
                error={errors?.email?.message}
                register={register('email')}
                placeholder={'Enter email'}
              />
            </div>
            {isLoading ? (
              <div className="flex justify-start md:justify-center">
                <LoadingIcon />
              </div>
            ) : (
              <button type="submit" className={styles?.subscribe}>
                Subscribe
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="mt-0 lg:mt-12">
        <div>
          <p className="text-center">
            <a href="/#" className={styles?.anchor}>
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="/#" className={styles?.anchor}>
              Terms of Use
            </a>{' '}
            |{' '}
            <a href="/#" className={styles?.anchor}>
              Refund Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
