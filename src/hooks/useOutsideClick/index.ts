import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLDivElement | null>, callback: (event: MouseEvent) => void) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && ref.current && event.target && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
}
