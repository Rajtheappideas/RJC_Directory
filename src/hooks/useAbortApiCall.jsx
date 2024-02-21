import { useRef } from "react";
import { toast } from "react-hot-toast";

const useAbortApiCall = () => {
  const AbortControllerRef = useRef(null);
  const abortApiCall = () => {
    toast.remove();
    AbortControllerRef.current !== null && AbortControllerRef.current.abort();
  };
  return {
    AbortControllerRef,
    abortApiCall,
  };
};

export default useAbortApiCall;
