import { useEffect, useState } from 'react';

export const useDebounceValue = (value: string, delay: number): string => {
  const [debouncedString, setDebouncedString] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedString(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedString;
};
