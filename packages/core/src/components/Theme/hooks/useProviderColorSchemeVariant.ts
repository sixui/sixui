import { useCallback, useEffect, useRef, useState } from 'react';

import type { IColorSchemeManager } from '../colorSchemeManager/types';
import type { IOsColorScheme, IThemeColorSchemeVariant } from '../theme.types';
import { useIsomorphicLayoutEffect, useOsColorScheme } from '~/hooks';
import { setColorSchemeAttribute } from '../utils/setColorSchemeAttribute';

export interface IUseProviderColorSchemeVariantProps {
  defaultColorScheme: IOsColorScheme;
  inheritedColorSchemeVariant?: IThemeColorSchemeVariant;
  forceColorScheme?: IOsColorScheme;
  manager: IColorSchemeManager;
  getRootElement: () => HTMLElement | undefined;
}

export interface IUseProviderColorSchemeVariantResult {
  colorSchemeVariant: IThemeColorSchemeVariant;
  setColorScheme: (variant: IOsColorScheme) => void;
  toggleColorScheme: () => void;
  clearColorScheme: () => void;
}

type IMediaQueryCallback = (event: { matches: boolean; media: string }) => void;

export const useProviderColorSchemeVariant = (
  props: IUseProviderColorSchemeVariantProps,
): IUseProviderColorSchemeVariantResult => {
  const {
    defaultColorScheme,
    inheritedColorSchemeVariant,
    forceColorScheme,
    manager,
    getRootElement,
  } = props;

  const media = useRef<MediaQueryList>(null);
  const [managedColorScheme, setManagedColorScheme] = useState(() =>
    manager.get(defaultColorScheme),
  );
  const colorScheme =
    forceColorScheme || inheritedColorSchemeVariant || managedColorScheme;
  const osColorScheme = useOsColorScheme('light', {
    getInitialValueInEffect: false,
  });
  const computedColorSchemeVariant =
    colorScheme === 'auto' ? osColorScheme : colorScheme;

  const setColorScheme = useCallback(
    (colorScheme: IOsColorScheme) => {
      if (forceColorScheme) {
        return;
      }

      setColorSchemeAttribute(colorScheme, getRootElement);
      setManagedColorScheme(colorScheme);
      manager.set(colorScheme);
    },
    [manager, forceColorScheme, getRootElement],
  );

  const toggleColorScheme = useCallback(() => {
    setColorScheme(computedColorSchemeVariant === 'dark' ? 'light' : 'dark');
  }, [setColorScheme, computedColorSchemeVariant]);

  const clearColorScheme = useCallback(() => {
    setManagedColorScheme(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  }, [manager, defaultColorScheme, getRootElement]);

  useEffect(() => {
    manager.subscribe(setColorScheme);

    return manager.unsubscribe;
  }, [manager, setColorScheme]);

  useIsomorphicLayoutEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  }, []);

  useEffect(() => {
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement);

      return;
    }

    setColorSchemeAttribute(managedColorScheme, getRootElement);

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      media.current = window.matchMedia('(prefers-color-scheme: dark)');
    }

    const listener: IMediaQueryCallback = (event) => {
      if (managedColorScheme === 'auto') {
        setColorSchemeAttribute(
          event.matches ? 'dark' : 'light',
          getRootElement,
        );
      }
    };

    media.current?.addEventListener('change', listener);

    return () => media.current?.removeEventListener('change', listener);
  }, [managedColorScheme, forceColorScheme, getRootElement]);

  return {
    colorSchemeVariant: computedColorSchemeVariant,
    setColorScheme,
    toggleColorScheme,
    clearColorScheme,
  };
};
