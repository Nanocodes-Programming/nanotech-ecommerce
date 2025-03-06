import Skeleton from '@mui/material/Skeleton';

const FlashCardSkeleton = () => {
  return (
    <div className="flex gap-3 mt-5">
      <div className="flex flex-col gap-1 p-1">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          width={220}
        />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
      </div>
      <div className="flex flex-col gap-1 p-1">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          width={220}
        />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
      </div>
      <div className="flex flex-col gap-1 p-1">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          width={220}
        />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
      </div>
      <div className="flex flex-col gap-1 p-1">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          width={220}
        />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
      </div>
      <div className="flex flex-col gap-1 p-1">
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={200}
          width={220}
        />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
        <Skeleton variant="text" animation="wave" height={10} width={'100%'} />
      </div>
    </div>
  );
};

export default FlashCardSkeleton;
