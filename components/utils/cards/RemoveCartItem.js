import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setAuthModal } from '../../../store/reducers/auth_reducer';
import {
  removeCartItem,
  setItemToRemove,
} from '../../../store/reducers/dashboard_reducer';
import CloseIcon from '../icons/CloseIcon';

const RemoveCartItem = () => {
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.auth.authModal);
  const itemToRemove = useSelector((state) => state.dashboard.itemToRemove);

  const handleClose = () => {
    dispatch(setItemToRemove({}));
    dispatch(setAuthModal(null));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(itemToRemove?.product_id));
    toast.success(`Removed item from cart`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
    });
    handleClose();
  };

  return (
    <Modal
      open={authModal === 'REMOVECART'}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="h-[100vh] w-[100vw] flex items-center justify-center"
    >
      <div className="flex flex-col justify-between h-[12rem] md:h-[10rem] w-[90%] md:w-[30rem] md:shadow-lg rounded-lg bg-white border-none outline-none overflow-y-scroll no-scrollbar">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#0000009e]">
              Remove from cart
            </p>
            <div onClick={handleClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>
          <p className="text-[#0000009e] mt-2">
            Do you really want to remove this item from cart?
          </p>
          <button
            onClick={handleRemoveCartItem}
            className="bg-[#FFB800] w-full text-white py-3 px-4 mt-4 rounded-lg"
          >
            REMOVE ITEM
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveCartItem;
