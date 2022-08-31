import { MutableRefObject, useCallback, useLayoutEffect, useRef } from "react";

export const useEvent = (handler) => {
  const handlerRef = useRef(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any) => {
    return handlerRef.current(...args);
  }, []);
}