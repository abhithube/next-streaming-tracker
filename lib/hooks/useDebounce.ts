import { useEffect, useState } from 'react';

const useDebounce = (search: string, delay: number) => {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const debouncer = setTimeout(() => setDebounced(search), delay);
    return () => clearTimeout(debouncer);
  }, [search]);

  return debounced;
};

export default useDebounce;
