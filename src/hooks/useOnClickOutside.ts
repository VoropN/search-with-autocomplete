import React, { useEffect } from 'react';

export const useOnClickOutside = (
  handler: (event: MouseEvent | TouchEvent) => void,
  refs: Array<React.RefObject<any>>
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (refs.some((ref) => ref.current?.contains(event.target))) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [...refs, handler]);
};
