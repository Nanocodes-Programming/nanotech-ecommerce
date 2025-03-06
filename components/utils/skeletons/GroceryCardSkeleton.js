import { Skeleton } from '@mui/material';

const GroceryCardSkeleton = () => {
  return (
    <div className="flex gap-3 lg:gap-5">
      <div className="flex flex-col justify-evenly items-center max-w-[14rem] min-w-[13rem] h-[20rem] rounded-3xl bg-white shadow-lg p-2 m-1 mb-5">
        <Skeleton variant="rectangular" height={150} width={150} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} height={10} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col justify-evenly items-center max-w-[14rem] min-w-[13rem] h-[20rem] rounded-3xl bg-white shadow-lg p-2 m-1 mb-5">
        <Skeleton variant="rectangular" height={150} width={150} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} height={10} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col justify-evenly items-center max-w-[14rem] min-w-[13rem] h-[20rem] rounded-3xl bg-white shadow-lg p-2 m-1 mb-5">
        <Skeleton variant="rectangular" height={150} width={150} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} height={10} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col justify-evenly items-center max-w-[14rem] min-w-[13rem] h-[20rem] rounded-3xl bg-white shadow-lg p-2 m-1 mb-5">
        <Skeleton variant="rectangular" height={150} width={150} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={100} height={10} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
    </div>
  );
};

export default GroceryCardSkeleton;
