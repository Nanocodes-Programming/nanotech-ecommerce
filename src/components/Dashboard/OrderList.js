import useSWR from 'swr';
import { API_URL } from '../../constants/api';
import OrderCard from '../utils/cards/OrderCard';
import NoCart from '../utils/icons/NoCart';
import CheckoutButton from '../utils/reusables/CheckoutButton';
import OrderCardSkeleton from '../utils/skeletons/OrderCardSkeleton';

// res?.data?.order_id 84ad2589-26dc-46df-9c88-7ba33f89ba60

const OrderList = ({ orderedItems }) => {
  const { data: itemDetails } = useSWR(`${API_URL}/products`);

  return (
    <div className="w-full lg:w-[65%] flex flex-col py-2 pb-0 shadow-md rounded-md h-[85vh] overflow-y-scroll no-scrollbar">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center text-gray-700 px-2 -mb-3 gap-2">
          <p className="md:text-lg font-semibold">ORDERS</p>
        </div>
      </div>
      {orderedItems !== undefined &&
        itemDetails !== undefined &&
        orderedItems?.map((orderedItem) => (
          <div
            className="border-b hover:shadow-md hover:cursor-cell px-2 pt-2"
            key={orderedItem?.id}
          >
            <div className="flex items-center justify-between pt-3">
              <p className="font-semibold text-sm md:text-base text-[#0000009e]">{`Order ID: ${orderedItem?.id?.slice(
                0,
                8
              )} | ${orderedItem?.items?.length} product(s)`}</p>
              <CheckoutButton orderId={orderedItem?.id} />
            </div>
            {orderedItem?.items?.map((item) => (
              <OrderCard
                itemDetails={itemDetails}
                orderedItem={item}
                orderedItemsArr={orderedItem}
              />
            ))}

            {orderedItem?.items?.length === 0 && (
              <div className="flex justify-center -mt-28">
                <NoCart />
              </div>
            )}

            {orderedItem === undefined && (
              <div className="flex justify-center -mt-28">
                <NoCart />
              </div>
            )}
          </div>
        ))}

      {orderedItems === undefined && itemDetails === undefined && (
        <OrderCardSkeleton />
      )}
    </div>
  );
};

export default OrderList;
