import { useEffect, useState } from 'react';

export const useAfterHydration = (): boolean => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
