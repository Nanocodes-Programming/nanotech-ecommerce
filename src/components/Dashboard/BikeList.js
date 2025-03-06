import { useDispatch } from 'react-redux';
import { setAuthModal } from '../../store/reducers/auth_reducer';
import NoCart from '../utils/icons/NoCart';

const BikeList = ({ bikeDeliveries }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full lg:w-[65%] flex flex-col py-2 pb-0 shadow-md rounded-md h-[85vh] overflow-y-scroll no-scrollbar">
      <div className="w-full mb-1">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center text-gray-700 px-2 -mb-3 gap-2">
            <p className="md:text-xl font-semibold px-3 mt-2 text-[#0000009e]">
              Bike delivery details
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(setAuthModal('DELIVERY'));
            }}
            className="w-[8rem] md:w-[10rem] mr-4 py-3 border border-[#FFB800] bg-transparent outline-none rounded-lg font-semibold text-[#FFB800] mt-4 text-sm md:text-base"
          >
            Create a delivery
          </button>
        </div>
        {bikeDeliveries?.map((bikeDelivery) => (
          <div className="flex flex-col p-2 border-b hover:shadow-md hover:cursor-cell px-5 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex justify-start items-center gap-2">
                <div>
                  <p className="text-[#0000009e] text-base md:text-lg capitalize font-medium">
                    {`${bikeDelivery?.first_name} ${bikeDelivery?.last_name}`}
                  </p>

                  <div className="text-[#0000009e] text-sm md:text-base">
                    {`${bikeDelivery?.destination_address}, ${bikeDelivery?.destination_city} ${bikeDelivery?.destination_state} `}
                  </div>

                  <div className="text-[#0000009e] text-sm md:text-base">
                    {`Created on ${bikeDelivery?.updated?.slice(
                      0,
                      10
                    )} at ${bikeDelivery?.updated?.slice(11, 16)}`}
                  </div>

                  <div className="text-[#0000009e] text-sm md:text-base">
                    {`${bikeDelivery?.phone_number}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {bikeDeliveries?.length === 0 && (
          <div className="flex justify-center -mt-40">
            <NoCart />
          </div>
        )}

        {bikeDeliveries === undefined && (
          <div className="flex justify-center -mt-40">
            <NoCart />
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeList;
