import { Skeleton } from '@mui/material';
import React from 'react';

const OrderCardSkeleton = () => {
  return (
    <div>
      <div className="w-full lg:w-[100%] flex flex-col py-2 m-3 gap-3">
        <Skeleton variant="text" height={45} width={100} />
        <Skeleton variant="rectangular" height={150} width={'96%'} />
      </div>
      <div className="w-full lg:w-[100%] flex flex-col py-2 m-3 gap-3">
        <Skeleton variant="text" height={45} width={100} />
        <Skeleton variant="rectangular" height={150} width={'96%'} />
      </div>
      <div className="w-full lg:w-[100%] flex flex-col py-2 m-3 gap-3">
        <Skeleton variant="text" height={45} width={100} />
        <Skeleton variant="rectangular" height={150} width={'96%'} />
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
