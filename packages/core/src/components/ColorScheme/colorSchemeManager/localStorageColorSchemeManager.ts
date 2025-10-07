import type { IStrictColorScheme } from '~/components/Theme/theme.types';
import type { IColorSchemeManager } from './types';
import { DEFAULT_COLOR_SCHEME_STORAGE_KEY } from '../ColorSchemeScript.constants';
import { isValidColorScheme } from './isValidColorScheme';

export interface ILocalStorageColorSchemeManagerOptions {
  key?: string;
}

export const localStorageColorSchemeManager = ({
  key = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
}: ILocalStorageColorSchemeManagerOptions = {}): IColorSchemeManager => {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isValidColorScheme(storedColorScheme)
          ? storedColorScheme
          : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@sixui/core] Local storage color scheme manager was unable to save color scheme.',
          error,
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          if (isValidColorScheme(event.newValue)) {
            onUpdate(event.newValue as IStrictColorScheme);
          }
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
};
