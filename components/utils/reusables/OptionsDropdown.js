'use client'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { customLogoutUser } from '../../../store/actions/auth_actions';

const OptionsDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userDashboard = () => {
    router.push('/dashboard');
  };

  const logOut = () => {
    dispatch(customLogoutUser(router));
  };

  return (
    <div className="h-32 w-32 shadow-md rounded-sm absolute bg-white right-2 p-2">
      <p
        className="cursor-pointer hover:bg-gray-50 p-2 rounded-md text-lg"
        onClick={userDashboard}
      >
        Dashboard
      </p>
      <p
        onClick={logOut}
        className="cursor-pointer hover:bg-gray-50 p-2 rounded-md text-lg"
      >
        Log out
      </p>
    </div>
  );
};

export default OptionsDropdown;
