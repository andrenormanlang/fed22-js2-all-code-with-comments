import React from "react";
import { BarLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <BarLoader color={"#123abc"} loading={true} height={8} width={200} />
    </div>
  );
};

export default LoadingSpinner;
