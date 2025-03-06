import Skeleton from '@mui/material/Skeleton';

const CategoryCardSkeleton = () => {
  return (
    <div className="flex gap-3 lg:gap-5">
      <div className="flex flex-col items-center min-w-[15rem] rounded-3xl bg-white shadow-md p-3 m-1 gap-1">
        <Skeleton variant="rectangular" width={190} height={150} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col items-center min-w-[15rem] rounded-3xl bg-white shadow-md p-3 m-1 gap-1">
        <Skeleton variant="rectangular" width={190} height={150} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col items-center min-w-[15rem] rounded-3xl bg-white shadow-md p-3 m-1 gap-1">
        <Skeleton variant="rectangular" width={190} height={150} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col items-center min-w-[15rem] rounded-3xl bg-white shadow-md p-3 m-1 gap-1">
        <Skeleton variant="rectangular" width={190} height={150} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
      <div className="flex flex-col items-center min-w-[15rem] rounded-3xl bg-white shadow-md p-3 m-1 gap-1">
        <Skeleton variant="rectangular" width={190} height={150} />
        <Skeleton variant="text" width={100} height={10} />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
