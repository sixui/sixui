'use client';

import { Switch, useColorScheme, useHydrated } from '@sixui/core';

export const ColorSchemeSwitch: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const hydrated = useHydrated();

  return (
    <Switch
      label="Dark mode"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      checked={hydrated ? colorScheme === 'dark' : false}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onChange={() => toggleColorScheme()}
    />
  );
};
