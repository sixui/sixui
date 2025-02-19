import { createContext, useContext } from 'react';

export type ISixuiSettings = {
  linkAs: React.ElementType;
};

export type ISixuiContextValue = {
  settings?: ISixuiSettings;
};

export const SixuiContext = createContext<ISixuiContextValue | undefined>(
  undefined,
);

export const useSixuiContext = (): ISixuiContextValue => {
  const context = useContext(SixuiContext);
  if (!context) {
    throw new Error(
      '[@sixui/core] You forgot to wrap your component in <SixuiProvider />.',
    );
  }

  return context;
};
