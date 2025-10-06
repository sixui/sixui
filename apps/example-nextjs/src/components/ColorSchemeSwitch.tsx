'use client';

import { Switch, useColorScheme, useHydrated } from '@sixui/core';

export const ColorSchemeSwitch: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const hydrated = useHydrated();

  return (
    <Switch
      label="Dark mode"
      checked={hydrated ? colorScheme === 'dark' : false}
      onChange={hydrated ? toggleColorScheme : undefined}
    />
  );
};
