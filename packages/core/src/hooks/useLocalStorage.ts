import { useCallback, useEffect, useState } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type ISetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export type IUseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

/**
 * Custom hook for managing state synchronized with localStorage.
 * Provides SSR-safe localStorage access with cross-tab synchronization.
 *
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 * @param options - Optional configuration for serialization and initialization
 * @returns A tuple of [value, setValue, removeValue]
 *
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: IUseLocalStorageOptions<T> = {},
): [T, ISetValue<T>, () => void] => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithValue = true,
  } = options;

  // Get value from localStorage (SSR-safe)
  const readValue = useCallback((): T => {
    if (IS_SERVER) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (deserializer(item) as T) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // Set value to localStorage
  const setValue: ISetValue<T> = useCallback(
    (value) => {
      if (IS_SERVER) {
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to localStorage
        window.localStorage.setItem(key, serializer(newValue));

        // Update state
        setStoredValue(newValue);

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: serializer(newValue),
          }),
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (IS_SERVER) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      // Dispatch custom event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: null,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (IS_SERVER) {
      return;
    }

    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key !== key || e.storageArea !== window.localStorage) {
        return;
      }

      try {
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          setStoredValue(deserializer(e.newValue) as T);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Error handling storage event for key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue, deserializer]);

  // Sync with localStorage on mount
  useIsomorphicLayoutEffect(() => {
    if (initializeWithValue) {
      setStoredValue(readValue());
    }
  }, []);

  return [storedValue, setValue, removeValue];
};
