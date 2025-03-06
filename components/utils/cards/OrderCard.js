import useSWR from 'swr';
import { API_URL } from '../../../constants/api';

const OrderCard = ({ itemDetails, orderedItem, orderedItemsArr }) => {
  const url = `${API_URL}/products/id/${orderedItem?.product}`;
  const { data: product } = useSWR(url);

  return (
    <div className="w-full mb-1">
      <div className="flex flex-col p-2">
        <div className="flex items-center justify-between">
          <div className="flex justify-start items-center gap-2">
            <div className="h-16 w-16 overflow-hidden">
              <img src={`${product?.image}`} alt="order" />
            </div>
            <div>
              <p className="text-[#0000009e] text-base md:text-lg capitalize">
                {product?.name}
              </p>

              <p className="text-gray-500 text-sm md:text-base">{`Quantity: ${orderedItem?.quantity}`}</p>
              {/* <button
                disabled={true}
                className="text-white text-xs bg-green-400 py-1 px-2 font-semibold rounded-sm"
              >
                DELIVERED
              </button> */}
            </div>
          </div>
          <div>
            <div className="flex items-center font-semibold text-[#0000009e] text-sm md:text-base">
              <p className="line-through mr-[2px]">N</p>
              <p>{`${orderedItem?.price}/grocery`}</p>
            </div>
            <p className="text-[#0000009e] text-xs md:text-sm mt-1">{`On ${orderedItemsArr?.updated?.slice(
              0,
              10
            )}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
