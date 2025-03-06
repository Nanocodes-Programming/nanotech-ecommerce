const LastOrder = ({ lastOrderedItem }) => {
  return (
    <div className="flex flex-col border-b-2 mb-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold mb-1">My last order</p>
        {/* <p className="text-green-600 cursor-pointer font-semibold">Edit</p> */}
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-green-100 py-3 px-3 rounded-md"></div>
          <p className="font-semibold text-gray-500">
            {`${lastOrderedItem?.updated?.slice(
              0,
              10
            )} at ${lastOrderedItem?.updated?.slice(11, 16)}`}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-green-100 py-3 px-3 rounded-md"></div>
          <p className="font-semibold text-gray-500">
            {`${lastOrderedItem?.address} ${lastOrderedItem?.city}`}
          </p>
        </div>
        {/* <div className="flex items-center gap-3 mb-1">
          <div className="bg-green-100 py-1 px-3 rounded-sm">e</div>
          <p className="font-semibold text-gray-500">
            Your message as the client
          </p>
        </div> */}
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-green-100 py-3 px-3 rounded-md"></div>
          <p className="font-semibold text-gray-500">
            Delivery mode: can be via bike or pickup
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastOrder;
