import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import About from './components/navbars/About';
import CartPage from './components/navbars/CartPage';
import Contact from './components/navbars/Contact';
import Category from './pages/Category';
import CompletePayment from './pages/CompletePayment';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
// import { setAuthModal } from './store/reducers/auth_reducer';

const LoginModal = lazy(() => import('../src/components/auth/login/index'));
const SignupModal = lazy(() => import('../src/components/auth/signup/index'));
const OrderModal = lazy(() => import('../src/components/Dashboard/NewOrder'));
const PaymentModal = lazy(() => import('../src/components/Dashboard/Payment'));
const RemoveCartItemModal = lazy(() =>
  import('../src/components/utils/cards/RemoveCartItem')
);
const DeliveryModal = lazy(() =>
  import('../src/components/Dashboard/NewDelivery')
);
const ProductCardModal = lazy(() =>
  import('../src/components/ProductCardModal')
);
const PasswordResetModal = lazy(() =>
  import('../src/components/auth/password-reset/index')
);

const ChangePasswordModal = lazy(() =>
  import('../src/components/auth/change-password/index')
);

// const InterruptModal = lazy(() =>
//   import('../src/components/utils/reusables/InterruptModal')
// );

function App() {
  // const dispatch = useDispatch();
  // const authModal = useSelector((state) => state.auth.authModal);

  // useEffect(() => {
  //   if (authModal !== 'INTERRUPT') {
  //     dispatch(setAuthModal('INTERRUPT'));
  //   }
  // }, [authModal, dispatch]);

  return (
    <div className="overflow-x-hidden">
      <Suspense>
        <LoginModal />
      </Suspense>
      <Suspense>
        <SignupModal />
      </Suspense>
      <Suspense>
        <OrderModal />
      </Suspense>
      <Suspense>
        <PaymentModal />
      </Suspense>
      <Suspense>
        <RemoveCartItemModal />
      </Suspense>
      <Suspense>
        <DeliveryModal />
      </Suspense>
      <Suspense>
        <ProductCardModal />
      </Suspense>
      <Suspense>
        <PasswordResetModal />
      </Suspense>
      <Suspense>
        <ChangePasswordModal />
      </Suspense>
      {/* <Suspense>
        <InterruptModal />
      </Suspense> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
