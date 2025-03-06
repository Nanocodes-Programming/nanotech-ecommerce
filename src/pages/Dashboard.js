import { useDispatch, useSelector } from 'react-redux';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import MainDashboard from '../components/Dashboard/MainDashboard';
import DashboardHeader from '../components/DashboardHeader';
import { setAuthModal } from '../store/reducers/auth_reducer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleLogin = () => {
    dispatch(setAuthModal('LOGIN'));
  };

  return (
    <>
      {authenticated ? (
        <div className="flex h-[90vh] w-[100vw]">
          <div className="hidden md:flex">
            <DashboardSidebar />
          </div>
          <div className="w-full mb-10 md:mb-0 -mt-5 md:mt-0">
            <div className="text-gray-500">
              <DashboardHeader />
            </div>
            <MainDashboard />
          </div>
        </div>
      ) : (
        <div className="h-[90vh] flex items-center justify-center">
          <p
            onClick={handleLogin}
            className="text-3xl cursor-pointer hover:underline hover:text-blue-700 tracking-widest"
          >
            Log in to go to your dashboard
          </p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
