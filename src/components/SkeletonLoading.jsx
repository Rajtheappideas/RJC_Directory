import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({ width, height, count }) => {
  return (
    <div className="w-full  flex items-center gap-5 h-auto">
      <SkeletonTheme
        baseColor="#E5E4E2"
        borderRadius={10}
        highlightColor="#A9A9A9"
      >
        {new Array(count).fill(0).map((skeleton, i) => (
          <Skeleton
            key={i}
            count={1}
            width={width}
            height={height}
            className="h-full w-96"
          />
        ))}
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonLoading;
